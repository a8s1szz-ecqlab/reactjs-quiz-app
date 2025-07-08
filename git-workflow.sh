#!/bin/bash

# Git workflow helper script for ReactJS Quiz Application

print_help() {
    echo "Git Workflow Helper for ReactJS Quiz Application"
    echo ""
    echo "Usage: ./git-workflow.sh [command]"
    echo ""
    echo "Commands:"
    echo "  status        - Show git status and branch info"
    echo "  new-feature   - Create a new feature branch"
    echo "  commit        - Stage and commit changes"
    echo "  sync          - Sync with remote repository"
    echo "  clean         - Clean up merged branches"
    echo "  log           - Show commit history"
    echo "  help          - Show this help message"
    echo ""
}

show_status() {
    echo "🔍 Git Status:"
    git status --short
    echo ""
    echo "📊 Branch Information:"
    git branch -v
    echo ""
    echo "📝 Recent Commits:"
    git log --oneline -5
    echo ""
}

create_feature() {
    echo "Creating a new feature branch..."
    read -p "Enter feature name (e.g., user-authentication): " feature_name
    
    if [ -z "$feature_name" ]; then
        echo "❌ Feature name cannot be empty"
        exit 1
    fi
    
    branch_name="feature/$feature_name"
    git checkout -b "$branch_name"
    echo "✅ Created and switched to branch: $branch_name"
}

commit_changes() {
    echo "💾 Committing changes..."
    
    # Show current status
    git status --short
    echo ""
    
    # Add all changes
    read -p "Add all changes? (y/n): " add_all
    if [ "$add_all" = "y" ] || [ "$add_all" = "Y" ]; then
        git add .
        echo "✅ All changes staged"
    else
        echo "Use 'git add <file>' to stage specific files"
        exit 0
    fi
    
    # Get commit type
    echo "Select commit type:"
    echo "1. feat     - New feature"
    echo "2. fix      - Bug fix"
    echo "3. docs     - Documentation changes"
    echo "4. style    - Code style changes"
    echo "5. refactor - Code refactoring"
    echo "6. test     - Adding tests"
    echo "7. chore    - Maintenance tasks"
    
    read -p "Enter number (1-7): " commit_type_num
    
    case $commit_type_num in
        1) commit_type="feat";;
        2) commit_type="fix";;
        3) commit_type="docs";;
        4) commit_type="style";;
        5) commit_type="refactor";;
        6) commit_type="test";;
        7) commit_type="chore";;
        *) echo "❌ Invalid selection"; exit 1;;
    esac
    
    read -p "Enter commit message: " commit_message
    
    if [ -z "$commit_message" ]; then
        echo "❌ Commit message cannot be empty"
        exit 1
    fi
    
    git commit -m "$commit_type: $commit_message"
    echo "✅ Changes committed successfully"
}

show_log() {
    echo "📜 Commit History:"
    git log --oneline --graph --decorate -10
}

# Main script logic
case "$1" in
    "status")
        show_status
        ;;
    "new-feature")
        create_feature
        ;;
    "commit")
        commit_changes
        ;;
    "log")
        show_log
        ;;
    "help"|"")
        print_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        print_help
        exit 1
        ;;
esac
