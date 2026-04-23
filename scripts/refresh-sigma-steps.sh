#!/usr/bin/env bash
# Refresh Sigma Protocol step commands from a local Sigma clone.
# Cursor discovers commands as .md files; upstream copies often omit the extension.
#
# Usage:
#   ./scripts/refresh-sigma-steps.sh
#   ./scripts/refresh-sigma-steps.sh /path/to/sigma-protocol
#   SIGMA_PROTOCOL_ROOT=/path/to/sigma-protocol ./scripts/refresh-sigma-steps.sh
#
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SIGMA_ROOT="${SIGMA_PROTOCOL_ROOT:-${1:-$HOME/Downloads/sigma-protocol-main}}"
INSTALLER="$SIGMA_ROOT/scripts/install-sigma-commands.sh"

if [[ ! -f "$INSTALLER" ]]; then
  echo "error: Sigma Protocol not found at: $SIGMA_ROOT" >&2
  echo "  (missing: $INSTALLER)" >&2
  echo "Set SIGMA_PROTOCOL_ROOT or pass the clone path as the first argument." >&2
  exit 1
fi

cd "$REPO_ROOT"
bash "$INSTALLER" --force

STEPS_DIR="$REPO_ROOT/.cursor/commands/steps"
shopt -s nullglob
for f in "$STEPS_DIR"/*; do
  [[ -f "$f" ]] || continue
  [[ "$f" == *.md ]] && continue
  mv "$f" "$f.md"
done

echo "Sigma steps refreshed: $STEPS_DIR"
