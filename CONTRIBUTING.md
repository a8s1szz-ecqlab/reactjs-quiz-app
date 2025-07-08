# Contributing to ReactJS Proficiency Quiz Application

Thank you for your interest in contributing to the ReactJS Proficiency Quiz Application! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contribution Workflow](#contribution-workflow)
- [Coding Standards](#coding-standards)
- [Commit Message Convention](#commit-message-convention)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- Basic knowledge of React and Node.js

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/reactjs-quiz-app.git
   cd reactjs-quiz-app
   ```

3. Install dependencies:
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

4. Start development servers:
   ```bash
   ./start-app.sh
   ```

## 🔄 Contribution Workflow

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the coding standards

3. **Test your changes** thoroughly:
   ```bash
   # Frontend
   npm run lint
   npm run build
   
   # Backend
   cd backend
   npm test (if tests exist)
   ```

4. **Commit your changes** using conventional commits:
   ```bash
   git add .
   git commit -m "feat: add new quiz category selection"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with a clear description

## 📝 Coding Standards

### Frontend (React)

- Use functional components with hooks
- Follow ESLint configuration
- Use meaningful component and variable names
- Implement responsive design
- Add proper error handling
- Write clean, readable CSS

### Backend (Node.js)

- Use async/await for asynchronous operations
- Implement proper error handling and logging
- Follow RESTful API conventions
- Add input validation
- Use meaningful function and variable names
- Include JSDoc comments for functions

### General

- Write clear, concise comments
- Keep functions small and focused
- Use consistent naming conventions
- Remove console.log statements before committing
- Ensure code is properly formatted

## 💬 Commit Message Convention

We use [Conventional Commits](https://conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types:

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### Examples:

```bash
feat: add timer functionality to quiz
fix: resolve CORS issue in API calls
docs: update README with new setup instructions
style: format code according to ESLint rules
refactor: improve quiz result calculation logic
test: add unit tests for question validation
chore: update dependencies to latest versions
```

## 🔍 Pull Request Process

1. **Ensure your PR description is clear** and explains:
   - What changes were made
   - Why the changes were necessary
   - How to test the changes

2. **Link related issues** using keywords like "Closes #123"

3. **Update documentation** if necessary

4. **Ensure all checks pass**:
   - Code builds successfully
   - No linting errors
   - Tests pass (if applicable)

5. **Request review** from maintainers

6. **Address review feedback** promptly

## 🐛 Bug Reports

When reporting bugs, please include:

- **Clear description** of the issue
- **Steps to reproduce** the bug
- **Expected behavior** vs actual behavior
- **Environment details** (OS, browser, Node.js version)
- **Screenshots** if applicable
- **Console errors** if any

Use the bug report template:

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10, macOS 12, Ubuntu 20.04]
- Browser: [e.g., Chrome 95, Firefox 94]
- Node.js: [e.g., 16.14.0]

## Additional Context
Any other relevant information
```

## ✨ Feature Requests

For feature requests, please provide:

- **Clear description** of the proposed feature
- **Use case** or problem it solves
- **Potential implementation** ideas (optional)
- **Alternatives considered** (optional)

## 📚 Development Resources

- [React Documentation](https://reactjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the project's coding standards
- Be patient with review processes

## 📞 Getting Help

- Check existing issues and documentation first
- Create a new issue for questions
- Join discussions in pull requests
- Reach out to maintainers if needed

Thank you for contributing! 🎉
