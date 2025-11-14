#!/bin/bash
#
# Test script for semantic-release configuration
# This script tests the release action locally in dry-run mode
#

set -e
set -o pipefail

# Create temporary log file and ensure cleanup on exit
LOG_FILE=$(mktemp)
trap 'rm -f "$LOG_FILE"' EXIT

echo "🧪 Testing semantic-release configuration..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependencies not found. Installing...${NC}"
    pnpm install
fi

echo ""
echo "📋 Checking semantic-release configuration..."
echo ""

# Check if .releaserc.json exists
if [ ! -f ".releaserc.json" ]; then
    echo -e "${RED}❌ .releaserc.json not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Configuration file exists${NC}"
echo ""

# Display current configuration
echo "📄 Current semantic-release configuration:"
head -20 .releaserc.json
echo ""

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 Current branch: $CURRENT_BRANCH"
echo ""

# Check for recent tags
echo "🏷️  Recent version tags:"
git tag -l "v*" | sort -V | tail -5
echo ""

# Run semantic-release in dry-run mode
echo "🔍 Running semantic-release in dry-run mode..."
echo ""

if pnpm exec semantic-release --dry-run --no-ci 2>&1 | tee "$LOG_FILE"; then
    EXIT_CODE=0
else
    EXIT_CODE=$?
fi

echo ""
echo "================================"
echo ""

if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ Semantic-release dry-run completed successfully${NC}"

    # Check if a release would be created
    if grep -q "Published release" "$LOG_FILE"; then
        echo -e "${GREEN}✅ A new release would be created${NC}"
    elif grep -q "therefore a new version won't be published" "$LOG_FILE"; then
        echo -e "${YELLOW}ℹ️  No release would be created (branch not configured for releases)${NC}"
    elif grep -q "There are no relevant changes" "$LOG_FILE"; then
        echo -e "${YELLOW}ℹ️  No release would be created (no relevant changes)${NC}"
    fi
else
    # Check for expected errors (missing GitHub token in local environment)
    if grep -q "ENOGHTOKEN" "$LOG_FILE"; then
        echo -e "${YELLOW}⚠️  GitHub token not found (expected in local environment)${NC}"
        echo -e "${GREEN}✅ Configuration is valid up to GitHub authentication${NC}"
    else
        echo -e "${RED}❌ Semantic-release dry-run failed${NC}"
        echo -e "${RED}Check $LOG_FILE for details${NC}"
        exit 1
    fi
fi

echo ""
echo "================================"
echo ""
echo -e "${GREEN}✅ Release action test completed${NC}"
echo ""
echo "📝 Notes:"
echo "  - This test runs semantic-release in dry-run mode"
echo "  - No actual releases or commits are created"
echo "  - GitHub token errors are expected in local environment"
echo "  - Test logs saved to temporary file (auto-cleaned on exit)"
echo ""
