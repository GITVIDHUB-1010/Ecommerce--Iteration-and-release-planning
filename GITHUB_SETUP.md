# GitHub Setup Guide - Ecommerce Platform

This guide will help you push your ecommerce project to GitHub.

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to https://github.com
2. Click "Sign up"
3. Follow the registration process
4. Verify your email address

## Step 2: Initialize Git Repository Locally

Open PowerShell in your project directory and run:

```powershell
cd "c:\Users\NTC\Downloads\ecommerce-project-v2 (1)\ecommerce"

# Initialize git repository
git init

# Configure git with your details
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check if .gitignore exists, if not it will be created
```

## Step 3: Create .gitignore File

The project should have a .gitignore file. It should contain:

```
node_modules/
.env
.DS_Store
.vscode/
*.log
build/
dist/
.next/
out/
.idea/
*.swp
*.swo
*~
```

## Step 4: Stage Files for Commit

```powershell
# Add all files to git staging area
git add .

# Verify files are staged
git status
```

## Step 5: Create Your First Commit

```powershell
# Create initial commit
git commit -m "Initial commit: Ecommerce platform with Iteration 1 & 2 complete

- 100+ products across 10 categories
- Product search and filtering
- Product detail pages with reviews
- Shopping cart integration
- Responsive design
- 16 user stories completed (100% sprint velocity)"
```

## Step 6: Create Repository on GitHub

1. Go to https://github.com/new
2. Enter repository name: `ecommerce-platform`
3. Add description: "Full-stack ecommerce platform with iterative development and agile methodology"
4. Choose "Public" (if you want to share) or "Private"
5. **Do NOT** initialize with README, .gitignore, or license (you already have these)
6. Click "Create repository"

## Step 7: Connect Local Repository to GitHub

GitHub will show you commands. Run these in PowerShell:

```powershell
# Add remote origin
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ecommerce-platform.git

# Push to GitHub
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## Step 8: Verify on GitHub

1. Go to https://github.com/YOUR-USERNAME/ecommerce-platform
2. You should see all your files and folders
3. The README.md should be displayed

## 🎯 What Gets Pushed to GitHub

Your repository will include:

✅ Frontend code (React components, pages, CSS)  
✅ Backend code (Express.js server, API endpoints)  
✅ Documentation (README.md, PROJECT_ITERATIONS.md, etc.)  
✅ Presentation (presentation.html)  
✅ package.json files for both frontend and backend  

⚠️ NOT pushed (in .gitignore):
- `node_modules/` folders (too large)
- `.env` files (sensitive data)
- Build artifacts

## 📝 Useful Git Commands

### Check Status
```powershell
git status
```

### View Commit History
```powershell
git log --oneline
```

### Pull Latest Changes
```powershell
git pull origin main
```

### Make Additional Commits
```powershell
# Make changes to files
git add .
git commit -m "Your commit message here"
git push origin main
```

## 🔑 Authentication

### Using HTTPS (Recommended for Beginners)
The command `git push -u origin main` will prompt you for credentials:
- Username: Your GitHub username
- Password: Create a **Personal Access Token** (not your password)

### Create Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Click "Generate new token"
3. Name it "ecommerce-project"
4. Select scopes: `repo` (full control of private repositories)
5. Copy the token and use it as password when git prompts

### Using SSH (Alternative)
1. Generate SSH keys: `ssh-keygen -t ed25519 -C "your.email@example.com"`
2. Add to GitHub: Settings → SSH and GPG keys → New SSH key
3. Use: `git remote add origin git@github.com:YOUR-USERNAME/ecommerce-platform.git`

## 📊 Share Your Repository

Once pushed to GitHub:

1. **Copy Repository URL:**
   ```
   https://github.com/YOUR-USERNAME/ecommerce-platform
   ```

2. **Share with Teacher:**
   - Send the repository URL
   - Or generate a shareable link
   - They can view all code, documentation, and commit history

3. **Add a Badge to README:**
   ```markdown
   ![GitHub stars](https://img.shields.io/github/stars/YOUR-USERNAME/ecommerce-platform)
   ![GitHub forks](https://img.shields.io/github/forks/YOUR-USERNAME/ecommerce-platform)
   ```

## 🚀 Next Steps

After pushing to GitHub:

1. **Show Your Teacher:**
   - Repository URL
   - Commit history showing incremental development
   - Documentation files
   - Code quality

2. **Update Repository:**
   - Keep pushing as you work on Iteration 3
   - Add commits for each major feature
   - Update README with progress

3. **Future Improvements:**
   - Add Iteration 3 (Checkout & Orders)
   - Improve documentation
   - Add issue tracking
   - Add pull requests for feature branches

## ⚠️ Troubleshooting

### Error: "fatal: not a git repository"
```powershell
# Make sure you're in the right directory
cd "c:\Users\NTC\Downloads\ecommerce-project-v2 (1)\ecommerce"
git init
```

### Error: "remote origin already exists"
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/ecommerce-platform.git
```

### Error: "permission denied"
- Check GitHub password/token
- Try using Personal Access Token instead
- Verify username is correct

### Pushed without .gitignore
```powershell
# Remove node_modules from git tracking
git rm -r --cached node_modules
git add .gitignore
git commit -m "Add .gitignore and remove node_modules tracking"
git push origin main
```

## 🎓 Benefits of GitHub

✅ Version control and commit history  
✅ Backup of your code  
✅ Easy to share with others  
✅ Show your work to teachers/employers  
✅ Collaboration features  
✅ Issue tracking for bugs  

---

## ✨ Final Checklist

- [ ] Created GitHub account
- [ ] Initialized git repository locally
- [ ] Created .gitignore file
- [ ] Made first commit
- [ ] Created repository on GitHub
- [ ] Pushed code to GitHub
- [ ] Verified files appear in GitHub
- [ ] Shared repository URL with teacher

---

**For detailed setup help, follow the Step 1-8 guide above!**

Good luck! 🚀
