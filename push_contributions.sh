#!/bin/bash
# Exit script on any command failure
set -e

echo "--------------------------------------------------"
echo "🚀 Starting split commits process..."
echo "--------------------------------------------------"

# Commit 6: Custom Cursor
echo "Committing Custom Cursor changes..."
git add app/components/CustomCursor.tsx
git commit -m "style: update custom cursor contrast and theme detection"

# Commit 7: About Section
echo "Committing About section changes..."
git add app/components/About.tsx
git commit -m "style: fix About section card borders and backgrounds"

# Commit 8: Skills Icon Color
echo "Committing Skills adaptive color changes..."
git add app/components/Skills.tsx app/components/SkillCard.tsx
git commit -m "style: make Next.js skill icon color theme-adaptive"

# Commit 9: Contact Form Elements
echo "Committing Contact form border changes..."
git add app/components/ContactForm.tsx app/components/ContactMarquee.tsx
git commit -m "style: improve card and input borders in Contact section"

# Commit 10: HackerText and IntroLoader Linting
echo "Committing lint fixes..."
git add app/components/HackerText.tsx app/components/IntroLoader.tsx
git commit -m "refactor: resolve pre-existing lint warnings in HackerText and IntroLoader"

echo "--------------------------------------------------"
echo "✅ All 10 commits created locally!"
echo "--------------------------------------------------"

echo "Pushing commits to GitHub..."
# No secrets in this file. Auth comes from your git credential store / gh / SSH.
# Uses the existing 'origin' remote; plain push (not -f) since main is only ahead.
git push origin main

echo "--------------------------------------------------"
echo "🎉 Successfully pushed all contributions to GitHub!"
echo "--------------------------------------------------"
