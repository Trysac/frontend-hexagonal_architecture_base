#!/usr/bin/env bash
# Local validation for the FORKS-A improvement branches (equivalent of `make ci`, see docs/adr/0001).
# For each line of scripts/validate-targets.txt ("<branch> <project-dir> <expect pass|fail>"):
# fresh git worktree of the branch -> npm ci -> npm run lint -> jest --ci (max 2 workers).
# Also runs gitleaks on every branch diff against upstream/main.
# Appends one line to devlog/ci.jsonl and saves logs in evidence/<date>/.
set -uo pipefail
ROOT=$(git rev-parse --show-toplevel) || exit 1; [ -n "$ROOT" ] && [ -d "$ROOT/.git" ] || { echo "run from the main checkout" >&2; exit 1; }; cd "$ROOT"
DAY=$(date +%F); EVID="evidence/$DAY"; mkdir -p "$EVID" devlog
WT="$ROOT/validate-wt"; grep -qx 'validate-wt/' .git/info/exclude 2>/dev/null || echo 'validate-wt/' >> .git/info/exclude
export CYPRESS_INSTALL_BINARY=0 CI=true
start=$(date +%s); ok=0; bad=0; failed_step=null; total=0; tfail=0
SUMMARY="$EVID/validate-summary.txt"; : > "$SUMMARY"
git fetch -q origin; git fetch -q upstream
while read -r branch proj expect; do
  [[ -z "${branch:-}" || "$branch" == \#* ]] && continue
  dir="$WT/${branch//\//_}"
  git check-ref-format --branch "$branch" >/dev/null || { echo "bad branch name: $branch" >&2; exit 1; }
  [ -d "$dir" ] || git worktree add -q --force "$dir" "origin/$branch" || exit 1
  [ -f "$dir/.git" ] || { echo "$dir is not a worktree, aborting" >&2; exit 1; }
  git -C "$dir" checkout -q --detach "origin/$branch"
  log="$ROOT/$EVID/validate-${branch//\//_}-${proj//\//_}.log"
  ( cd "$dir/$proj" && npm ci --no-audit --no-fund >"$log" 2>&1 ) ; i=$?
  ( cd "$dir/$proj" && npm run lint >>"$log" 2>&1 ) ; l=$?
  ( cd "$dir/$proj" && npx jest --config=jest.config.js --ci --maxWorkers=2 >>"$log" 2>&1 ) ; t=$?
  line=$(grep -E '^Tests:' "$log" | tail -1)
  p=$(echo "$line" | grep -oE '[0-9]+ passed' | grep -oE '[0-9]+'); f=$(echo "$line" | grep -oE '[0-9]+ failed' | grep -oE '[0-9]+')
  total=$((total + ${p:-0} + ${f:-0})); tfail=$((tfail + ${f:-0}))
  if [ $i -eq 0 ] && [ $l -eq 0 ] && [ $t -eq 0 ]; then res=pass; else res=fail; fi
  if [ "$res" = "$expect" ]; then ok=$((ok+1)); verdict=OK; else bad=$((bad+1)); verdict=UNEXPECTED; failed_step="\"$branch:$proj\""; fi
  echo "$verdict $branch $proj install=$i lint=$l test=$t expected=$expect ${line:-no-tests}" | tee -a "$SUMMARY"
done < scripts/validate-targets.txt
# secrets scan on what each branch adds on top of upstream
for b in $(cut -d' ' -f1 scripts/validate-targets.txt | grep -v '^#' | sort -u); do
  if gitleaks git --log-opts="upstream/main..origin/$b" --no-banner --no-color --redact . >>"$EVID/gitleaks.log" 2>&1; then echo "OK gitleaks $b" | tee -a "$SUMMARY"; else bad=$((bad+1)); failed_step="\"gitleaks:$b\""; echo "UNEXPECTED gitleaks $b" | tee -a "$SUMMARY"; fi
done
for d in "$WT"/*; do [ -d "$d" ] && git -c core.longpaths=true worktree remove --force "$d" >/dev/null 2>&1; done; rm -rf "$WT"; git worktree prune
# scan the fork documentation too (not only the branch commits)
for p in docs devlog scripts README.md STATE.md; do
  [ -e "$p" ] || continue
  if gitleaks dir --no-banner --no-color --redact "$p" >>"$EVID/gitleaks.log" 2>&1; then echo "OK gitleaks dir $p" | tee -a "$SUMMARY"; else bad=$((bad+1)); failed_step="\"gitleaks:$p\""; echo "UNEXPECTED gitleaks dir $p" | tee -a "$SUMMARY"; fi
done
# public repo: replace local home paths in the evidence logs
sed -i -E "s#[A-Za-z]:[\\/]+Users[\\/]+[^\\/ ]+#~#g; s#/[a-z]/Users/[^/ ]+#~#g" "$EVID"/*.log
min=$(awk "BEGIN{printf \"%.1f\", ($(date +%s)-$start)/60}")
concl=$([ $bad -eq 0 ] && echo success || echo failure)
echo "{\"schema\":\"devlog.v1\",\"type\":\"ci\",\"at\":\"$(date +%Y-%m-%dT%H:%M:%S%:z)\",\"branch\":\"$(git rev-parse --abbrev-ref HEAD)\",\"sha\":\"$(git rev-parse --short HEAD)\",\"target\":\"ci\",\"conclusion\":\"$concl\",\"minutes\":$min,\"failed_step\":$failed_step,\"tests_total\":$total,\"tests_failed\":$tfail,\"checks_ok\":$ok,\"checks_unexpected\":$bad}" >> devlog/ci.jsonl
echo "conclusion=$concl minutes=$min tests_total=$total tests_failed=$tfail"
[ $bad -eq 0 ]
