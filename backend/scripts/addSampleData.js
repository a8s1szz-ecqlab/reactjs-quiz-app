const DatabaseOperations = require('../src/data/database');

// Sample completed quiz results
const sampleCompletedResults = {
  score: 8,
  totalQuestions: 10,
  percentage: 80,
  proficiencyLevel: {
    grade: 'Good',
    color: '#4CAF50',
    message: 'Solid ReactJS foundation! Continue practicing with advanced concepts.'
  },
  totalTime: 720,
  timeLeft: 480,
  incorrectAnswers: [
    {
      questionId: 3,
      question: "What is the correct way to handle side effects in React functional components?",
      options: ["useEffect", "componentDidMount", "useState", "useCallback"],
      selectedAnswer: 2,
      correctAnswer: 0,
      explanation: "useEffect is the correct hook for handling side effects in functional components."
    },
    {
      questionId: 7,
      question: "Which hook is used to optimize performance by memoizing expensive calculations?",
      options: ["useCallback", "useMemo", "useEffect", "useState"],
      selectedAnswer: 0,
      correctAnswer: 1,
      explanation: "useMemo is used to memoize expensive calculations and avoid unnecessary re-computations."
    }
  ],
  detailedResults: [
    // This would contain all 10 questions with user answers
  ]
};

const sampleQuestions = [
  {
    id: 1,
    question: "What is JSX?",
    options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What is the purpose of React hooks?",
    options: ["To use state in class components", "To use state and lifecycle in functional components", "To create components", "To handle events"],
    correctAnswer: 1
  },
  // Add more sample questions as needed...
];

async function addSampleCompletedAttempt() {
  try {
    console.log('Initializing database...');
    await DatabaseOperations.init();
    
    console.log('Adding sample completed quiz attempt...');
    
    // Update the first attempt to be completed
    const updatedAttempt = await DatabaseOperations.updateAttempt('ATT000001', {
      status: 'completed',
      startedAt: new Date(Date.now() - 1200000).toISOString(), // Started 20 minutes ago
      completedAt: new Date(Date.now() - 480000).toISOString(), // Completed 8 minutes ago
      questions: sampleQuestions.slice(0, 10), // First 10 questions
      answers: [0, 1, 2, 0, 1, 3, 0, 1, 2, 1], // Sample answers
      results: sampleCompletedResults
    });
    
    if (updatedAttempt) {
      console.log('✅ Sample completed attempt created:', updatedAttempt.attemptId);
      console.log('🎯 Student can now view details for this completed attempt');
    } else {
      console.log('❌ Failed to update attempt');
    }
    
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

addSampleCompletedAttempt();
