#!/data/data/com.termux/files/usr/bin/bash
# SupportClaw OAuth Sync Widget
# Syncs Claude Code tokens to SupportClaw over SSH
# Place in ~/.shortcuts/ on phone for Termux:Widget

termux-toast "Syncing SupportClaw auth..."

# Run sync on the configured SupportClaw host.
SERVER="${SUPPORT_CLAW_SERVER:-supportClaw-host}"
RESULT=$(ssh "$SERVER" '$HOME/supportClaw/scripts/sync-claude-code-auth.sh' 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    # Extract expiry time from output
    EXPIRY=$(echo "$RESULT" | grep "Token expires:" | cut -d: -f2-)

    termux-vibrate -d 100
    termux-toast "SupportClaw synced! Expires:${EXPIRY}"

    # Optional: restart supportClaw service
    ssh "$SERVER" 'systemctl --user restart supportClaw' 2>/dev/null
else
    termux-vibrate -d 300
    termux-toast "Sync failed: ${RESULT}"
fi
