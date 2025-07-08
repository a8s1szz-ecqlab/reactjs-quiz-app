#!/bin/bash

echo "📊 ReactJS Quiz Application - Git Repository Status"
echo "=================================================="
echo ""

echo "🔍 Repository Information:"
echo "  Repository: ReactJS Proficiency Quiz Application"
echo "  License: MIT"
echo "  Language: JavaScript (React + Node.js)"
echo ""

echo "📂 Branch Structure:"
git branch -v
echo ""

echo "📝 Recent Commits:"
git log --oneline -5
echo ""

echo "📋 Repository Stats:"
echo "  Total commits: $(git rev-list --count HEAD)"
echo "  Total files: $(git ls-files | wc -l)"
echo "  Total lines of code: $(git ls-files | grep -E '\.(js|jsx|css|json)$' | xargs wc -l | tail -1 | awk '{print $1}')"
echo ""

echo "🗂️ Project Structure:"
echo "  Frontend: React 18.2.0 + Vite"
echo "  Backend: Node.js + Express.js"
echo "  Questions: 150+ ReactJS quiz questions"
echo "  API Endpoints: 4 RESTful endpoints"
echo ""

echo "🚀 Quick Start Commands:"
echo "  Start app: ./start-app.sh"
echo "  Git workflow: ./git-workflow.sh"
echo "  Test CORS: ./test-cors.sh"
echo ""

echo "📚 Documentation Files:"
echo "  README.md - Project overview and setup"
echo "  CONTRIBUTING.md - Development guidelines"
echo "  CHANGELOG.md - Version history"
echo "  LICENSE - MIT license"
echo ""

echo "✅ Repository is ready for development and collaboration!"
echo ""
echo "Next steps:"
echo "  1. Push to remote repository: git remote add origin <url> && git push -u origin main"
echo "  2. Set up CI/CD pipeline (optional)"
echo "  3. Create issues for new features"
echo "  4. Start developing on feature branches"
