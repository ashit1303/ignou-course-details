#!/usr/bin/env bash

set -euo pipefail

JSON_FILE="../updated_course_details.json" # "results.json"

sanitize() {
  printf '%s' "$1" \
    | tr -d '\000-\037<>:"/\\|?*' \
    | tr -s '[:space:]' ' ' \
    | sed 's/^ *//; s/ *$//'
}


jq -c '.[] | select(.fileType=="pdf")' "$JSON_FILE" | while read -r row; do
  chp1=$(sanitize "$(jq -r '.chp1 // ""' <<< "$row")")
  chp2=$(sanitize "$(jq -r '.chp2 // ""' <<< "$row")")
  chp3=$(sanitize "$(jq -r '.chp3 // ""' <<< "$row")")
  fileName=$(sanitize "$(jq -r '.fileName' <<< "$row")")

  src="./${fileName}.pdf"

  if [[ ! -f "$src" ]]; then
    echo "⏭️  Missing: $src"
    continue
  fi

  dest="./$chp1/$chp2/$chp3"
  mkdir -p "$dest"

  echo "📁 Moving: $src → $dest/"
  mv "$src" "$dest/"
done

echo "✅ Organization complete"
