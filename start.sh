#!/bin/bash
# ─────────────────────────────────────────
# start.sh — Sandoitchi dev session
# Usage: ./start.sh
# Starts Shopify dev server + opens Claude Code in a new terminal tab
# ─────────────────────────────────────────

THEME_DIR=~/Desktop/sandoitchi-theme
STORE=sando-itchi.myshopify.com

cd "$THEME_DIR" || { echo "Theme directory not found: $THEME_DIR"; exit 1; }

echo ""
echo "┌─────────────────────────────────────┐"
echo "│        sandoitchi dev session        │"
echo "│  Preview → http://127.0.0.1:9292    │"
echo "│  Claude Code → open a new tab       │"
echo "│  Run: claude                        │"
echo "└─────────────────────────────────────┘"
echo ""

# Open a new terminal tab for Claude Code
osascript &>/dev/null <<EOF
tell application "Terminal"
  tell application "System Events" to keystroke "t" using command down
  delay 0.5
  do script "cd $THEME_DIR && claude" in front window
end tell
EOF

# Start dev server in this tab
shopify theme dev --store "$STORE"
