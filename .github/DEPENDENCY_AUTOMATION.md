# Dependency Automation

This repository has multiple options configured for automated dependency updates. Choose the one that best fits your workflow.

## Option 1: GitHub Dependabot (Recommended)

**Status:** ✅ Configured in `.github/dependabot.yml`

### Features:
- Automatically creates PRs for dependency updates
- Groups related packages together (Astro, React, Tailwind, etc.)
- Runs weekly on Mondays at 9 AM
- Includes security vulnerability updates
- Max 10 PRs open at once

### Setup:
Already configured! Dependabot is enabled by default on GitHub. Just commit the `dependabot.yml` file.

### Customization:
Edit `.github/dependabot.yml` to:
- Change schedule (daily, weekly, monthly)
- Adjust grouping rules
- Ignore specific packages
- Change PR limits

---

## Option 2: Renovate Bot

**Status:** ⚠️ Optional (config in `renovate.json`)

### Features:
- More powerful than Dependabot
- Dependency dashboard for overview
- Better package grouping
- Auto-merge capabilities (disabled by default)
- Semantic commit messages

### Setup:
1. Install the [Renovate GitHub App](https://github.com/apps/renovate)
2. The `renovate.json` config will be automatically detected
3. Renovate will create a "Dependency Dashboard" issue

### Customization:
Edit `renovate.json` to adjust settings. See [Renovate docs](https://docs.renovatebot.com/).

---

## Option 3: GitHub Actions Workflow

**Status:** ✅ Configured in `.github/workflows/update-dependencies.yml`

### Features:
- Runs on schedule (weekly) or manually
- Updates ALL dependencies at once
- Runs checks before creating PR
- Single PR with all updates

### Setup:
Already configured! The workflow will run automatically or can be triggered manually from the Actions tab.

### Manual Trigger:
1. Go to Actions → Update Dependencies
2. Click "Run workflow"
3. Review the created PR

---

## Recommendation

**For most projects:** Use **Dependabot** (Option 1)
- Built into GitHub
- No external services needed
- Good balance of features and simplicity

**For advanced users:** Use **Renovate** (Option 2)
- More configuration options
- Better for monorepos
- Dependency dashboard is very useful

**For full control:** Use **GitHub Actions** (Option 3)
- Complete control over update process
- Can add custom checks
- Single PR instead of multiple

---

## Current Configuration

All three options are configured with:
- **Schedule:** Weekly on Mondays
- **Grouping:** Related packages grouped together
- **Labels:** Automatic labels for organization
- **Checks:** Run tests/checks when possible

You can use **only one** or **combine** them:
- Dependabot for regular updates + Actions for manual full updates
- Renovate as primary + Actions as backup

---

## Security Updates

All options include automatic security vulnerability updates. GitHub will also create Dependabot security alerts for critical vulnerabilities.

---

## Disabling Automation

To disable:
- **Dependabot:** Delete `.github/dependabot.yml` or disable in repo settings
- **Renovate:** Uninstall the GitHub App
- **Actions:** Delete `.github/workflows/update-dependencies.yml` or disable the workflow
