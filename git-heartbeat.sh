#!/bin/bash

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HEARTBEAT_FILE="$PROJECT_DIR/app/data/heartbeat.json"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "--- Portfolio Heartbeat Script ---"

# Ensure heartbeat file exists or update it
echo "{ \"lastHeartbeat\": \"$TIMESTAMP\" }" > "$HEARTBEAT_FILE"
echo "Updated heartbeat to $TIMESTAMP"

# Git operations
cd "$PROJECT_DIR" || exit

# Check if there are changes (should be, since we just wrote the file)
if [[ -n $(git status --porcelain "$HEARTBEAT_FILE") ]]; then
    echo "Staging changes..."
    git add "$HEARTBEAT_FILE"
    
    # Commit with a meaningful message
    COMMIT_MSG="chore(heartbeat): update activity timestamp [$TIMESTAMP]"
    echo "Committing: $COMMIT_MSG"
    git commit -m "$COMMIT_MSG"
    
    # Push to main
    echo "Pushing to GitHub..."
    git push origin main
    
    echo "✅ Heartbeat successful! Your GitHub contribution should appear shortly."
else
    echo "⚠️ No changes detected. Heartbeat not updated."
fi
