# GitHub Repository Setup Guide

This guide will help you set up your GitHub repository for the OTP Authentication System with all the necessary configurations, secrets, and deployment settings.

## 🚀 Initial Repository Setup

### 1. Create GitHub Repository

```bash
# Clone or create new repository
git clone https://github.com/yourusername/otp-auth-system.git
cd otp-auth-system

# Or initialize new repository
git init
git remote add origin https://github.com/yourusername/otp-auth-system.git
```

### 2. Push Code to GitHub

```bash
# Add all files
git add .

# Commit with meaningful message
git commit -m "feat: initial OTP authentication system with Firebase"

# Push to main branch
git push -u origin main
```

## 🔒 GitHub Secrets Configuration

Navigate to your repository → Settings → Secrets and variables → Actions

### Required Secrets for Firebase

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Deployment Platform Secrets

#### For Vercel Deployment
```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### For Firebase Hosting
```bash
FIREBASE_SERVICE_ACCOUNT=your_service_account_json
```

#### For Netlify Deployment
```bash
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

## 🏗️ GitHub Actions Workflows

### Workflows Already Configured

1. **CI Workflow** (`.github/workflows/ci.yml`)
   - Runs on every push and PR
   - Tests multiple Node.js versions
   - Runs linting and type checking
   - Builds the project
   - Security auditing

2. **Deployment Workflow** (`.github/workflows/deploy.yml`)
   - Deploys to multiple platforms
   - Runs only on main branch pushes
   - Supports Vercel, Firebase, and Netlify

### Customizing Workflows

Edit the workflow files to match your deployment needs:

```yaml
# .github/workflows/deploy.yml
# Comment out deployment jobs you don't need

jobs:
  # deploy-vercel:     # Enable for Vercel
  # deploy-firebase:   # Enable for Firebase Hosting  
  # deploy-netlify:    # Enable for Netlify
```

## 📋 Issue Templates

Three issue templates are configured:

1. **Bug Report** - For reporting bugs
2. **Feature Request** - For suggesting new features
3. **Firebase Setup** - For Firebase configuration issues

### Using Issue Templates

1. Go to Issues → New Issue
2. Select appropriate template
3. Fill out the required information

## 📝 Pull Request Template

A comprehensive PR template is configured to ensure:
- Clear description of changes
- Testing checklist
- Security considerations
- Performance impact assessment

## 🔧 Repository Settings

### Branch Protection Rules

Navigate to Settings → Branches → Add rule for `main`:

```yaml
Branch name pattern: main
Require pull request reviews before merging: ✅
Require status checks to pass before merging: ✅
  - Require branches to be up to date before merging: ✅
  - Status checks: CI
Restrict pushes that create files: ✅
```

### General Settings

1. **Features to Enable:**
   - ✅ Issues
   - ✅ Projects
   - ✅ Wiki (if needed)
   - ✅ Discussions (if needed)

2. **Pull Requests:**
   - ✅ Allow merge commits
   - ✅ Allow squash merging
   - ✅ Allow rebase merging
   - ✅ Automatically delete head branches

### Security Settings

1. **Security Analysis:**
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Code scanning alerts

2. **Secrets Scanning:**
   - ✅ Enable for repository

## 🚀 Deployment Configuration

### Vercel Setup

1. **Connect Repository:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   ```

2. **Environment Variables:**
   Add all `VITE_FIREBASE_*` variables in Vercel dashboard

3. **Build Settings:**
   ```yaml
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm ci
   ```

### Firebase Hosting Setup

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   ```

2. **Configuration:**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

### Netlify Setup

1. **Connect Repository:**
   - Link GitHub repository in Netlify dashboard
   - Configure build settings

2. **Build Settings:**
   ```yaml
   Build command: npm run build
   Publish directory: dist
   ```

## 📊 Monitoring & Analytics

### GitHub Insights

Monitor your repository health:
- Code frequency
- Commit activity
- Contributors
- Traffic

### Dependabot Configuration

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

## 🏷️ Labels Configuration

Recommended labels for issues and PRs:

```yaml
# Type labels
bug: dc143c
enhancement: 84b6eb
documentation: 0052cc
configuration: 1d76db

# Priority labels
priority-high: d93f0b
priority-medium: fbca04
priority-low: 0e8a16

# Status labels
needs-triage: ededed
in-progress: cccccc
ready-for-review: 0052cc

# Component labels
firebase: ff9800
authentication: 2196f3
ui-ux: e91e63
```

## 🔄 Release Management

### Semantic Versioning

Use conventional commits:
```bash
feat: add new authentication method
fix: resolve OTP verification issue
docs: update setup instructions
style: improve button design
refactor: restructure auth components
test: add unit tests for phone auth
chore: update dependencies
```

### Release Workflow

1. Create release branch: `git checkout -b release/v1.0.0`
2. Update version in `package.json`
3. Update `CHANGELOG.md`
4. Create PR to main
5. Create GitHub release with tag

## 📱 Mobile App Extension

If extending to mobile:

### React Native Setup
```bash
# Additional secrets needed
GOOGLE_SERVICES_JSON=base64_encoded_json
FIREBASE_PLIST=base64_encoded_plist
```

### Expo Setup
```bash
EXPO_TOKEN=your_expo_token
```

## ✅ Setup Checklist

- [ ] Repository created and code pushed
- [ ] All Firebase secrets configured
- [ ] Deployment platform secrets added
- [ ] Branch protection rules enabled
- [ ] Issue templates working
- [ ] PR template configured
- [ ] GitHub Actions workflows running
- [ ] Dependabot enabled
- [ ] Security scanning enabled
- [ ] Deployment configured and tested

## 🆘 Troubleshooting

### Common GitHub Issues

1. **GitHub Actions Failing:**
   ```bash
   # Check secrets are correctly named
   # Verify workflow syntax
   # Check Node.js version compatibility
   ```

2. **Deployment Issues:**
   ```bash
   # Verify environment variables
   # Check build commands
   # Validate Firebase configuration
   ```

3. **Secret Access Issues:**
   ```bash
   # Ensure secrets are at repository level
   # Check secret names match workflow
   # Verify permissions for organization repos
   ```

## 📞 Support

For GitHub-specific issues:
- [GitHub Support](https://support.github.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Security](https://docs.github.com/en/code-security)

---

**Your GitHub repository is now fully configured for the OTP Authentication System! 🎉**