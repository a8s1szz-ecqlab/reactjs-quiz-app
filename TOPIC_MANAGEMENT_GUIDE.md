# Topic Management System - Modular Architecture

## Overview
The quiz system now uses a modular architecture where each topic is defined in its own separate file. This makes it easy to maintain, extend, and manage individual quiz topics.

## Directory Structure
```
backend/src/data/
├── topics/
│   ├── index.js                # Main aggregator and exports
│   ├── reactjs.js              # ReactJS quiz questions
│   ├── microservice.js         # Microservice quiz questions
│   └── sap-commerce-cloud.js   # SAP Commerce Cloud quiz questions
├── topics.js                   # Backward compatibility wrapper
└── questions.js                # Legacy compatibility layer
```

## File Organization

### Individual Topic Files
Each topic file (e.g., `reactjs.js`, `microservice.js`) contains:
- Topic metadata (id, name, description, icon, timeLimit, passingScore)
- Array of questions with options, correct answers, and explanations
- Exports the complete topic object

### topics/index.js
- Imports all individual topic files
- Aggregates them into a unified `quizTopics` object
- Provides helper functions for topic management
- Exports all necessary functions and constants

### topics.js (Root)
- Simple wrapper that re-exports from `topics/index.js`
- Maintains backward compatibility with existing imports

## Adding a New Topic

### Step 1: Create Topic File
Create a new file in `backend/src/data/topics/` (e.g., `csharp.js`):

```javascript
// C# Quiz Topic
const csharpTopic = {
  id: 'csharp',
  name: 'C#',
  description: 'C# programming language fundamentals',
  icon: '🔷',
  timeLimit: 3600, // 60 minutes
  passingScore: 75,
  questions: [
    {
      id: 1,
      question: "Which keyword is used to define a class in C#?",
      options: [
        "class",
        "Class",
        "define",
        "struct"
      ],
      correctAnswer: 0,
      explanation: "The 'class' keyword is used to define a class in C#."
    },
    // Add more questions...
  ]
};

module.exports = csharpTopic;
```

### Step 2: Update topics/index.js
Add the import and include it in the aggregation:

```javascript
const csharpTopic = require('./csharp');

const quizTopics = {
  reactjs: reactjsTopic,
  microservice: microserviceTopic,
  'sap-commerce-cloud': sapCommerceCloudTopic,
  csharp: csharpTopic  // Add new topic
};

// Also add to individual exports
module.exports = {
  // ... existing exports
  csharpTopic  // Add new topic export
};
```

### Step 3: Update Frontend (Optional)
Add the new topic to the frontend's `availableTopics` array in `AdminDashboard.jsx`:

```javascript
const availableTopics = [
  { id: 'reactjs', name: 'ReactJS', icon: '⚛️', description: 'React JavaScript Library' },
  { id: 'java', name: 'Java', icon: '☕', description: 'Java Programming Language' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨', description: 'JavaScript Programming Language' },
  { id: 'python', name: 'Python', icon: '🐍', description: 'Python Programming Language' },
  { id: 'csharp', name: 'C#', icon: '🔷', description: 'C# Programming Language' }
];
```

## Question Structure
Each question must follow this structure:

```javascript
{
  id: Number,           // Unique within the topic
  question: String,     // The question text
  options: [String],    // Array of 4 answer options
  correctAnswer: Number, // Index of correct answer (0-3)
  explanation: String   // Explanation of the correct answer
}
```

## Topic Metadata
Each topic requires these properties:

```javascript
{
  id: String,           // Unique topic identifier (lowercase, no spaces)
  name: String,         // Display name
  description: String,  // Topic description
  icon: String,         // Emoji or unicode icon
  timeLimit: Number,    // Time limit in seconds
  passingScore: Number, // Passing score percentage (0-100)
  questions: [Object]   // Array of question objects
}
```

## Benefits of Modular Structure

1. **Maintainability**: Each topic is self-contained and easy to edit
2. **Scalability**: Easy to add new topics without touching existing ones
3. **Collaboration**: Multiple developers can work on different topics simultaneously
4. **Organization**: Clear separation of concerns
5. **Testing**: Each topic can be tested independently
6. **Version Control**: Changes to one topic don't affect others

## Testing
Run the test scripts to verify everything works:

```bash
# Test all topics
node test-topics.js

# Test quiz startup process
node test-quiz-startup.js
```

## Best Practices

1. **Question IDs**: Use sequential IDs starting from 1 within each topic
2. **Consistent Structure**: Follow the established question format
3. **Quality Explanations**: Provide clear, educational explanations
4. **Appropriate Difficulty**: Match questions to the topic's skill level
5. **Time Limits**: Set realistic time limits based on question count and complexity
6. **Passing Scores**: Set appropriate passing scores for the topic difficulty

## Current Topics

- **ReactJS** (⚛️): 5 questions, 60 min, 70% pass
- **Java** (☕): 5 questions, 60 min, 75% pass  
- **JavaScript** (🟨): 5 questions, 50 min, 70% pass
- **Python** (🐍): 5 questions, 55 min, 75% pass

Each topic currently has 5 sample questions and can be easily expanded by adding more questions to their respective files.
