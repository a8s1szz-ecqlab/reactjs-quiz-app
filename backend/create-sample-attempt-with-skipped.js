const { DatabaseOperations } = require('./src/data/database');
const { getProficiencyLevel } = require('./src/utils/questionUtils');

// Initialize database first
async function initAndRun() {
  await DatabaseOperations.initDatabase();
  await createSampleAttemptWithSkipped();
}

// Sample questions for testing
const sampleQuestions = [
  { id: 1, question: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"], correctAnswer: 0, explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like elements in React." },
  { id: 2, question: "What is the purpose of React hooks?", options: ["To use state in class components", "To use state and lifecycle in functional components", "To create components", "To handle events"], correctAnswer: 1, explanation: "React hooks allow functional components to use state and lifecycle features." },
  { id: 3, question: "What does useState return?", options: ["A state variable", "An array with state and setter", "A function", "An object"], correctAnswer: 1, explanation: "useState returns an array with the current state value and a function to update it." },
  { id: 4, question: "When does useEffect run by default?", options: ["Only on mount", "After every render", "Only on unmount", "Never"], correctAnswer: 1, explanation: "useEffect runs after every render by default." },
  { id: 5, question: "What is a React component?", options: ["A function or class", "Only a function", "Only a class", "A variable"], correctAnswer: 0, explanation: "A React component can be either a function or a class that returns JSX." },
  { id: 6, question: "What is React.memo used for?", options: ["State management", "Memoizing components", "Creating refs", "Handling events"], correctAnswer: 1, explanation: "React.memo is used to memoize components to prevent unnecessary re-renders." },
  { id: 7, question: "What is the virtual DOM?", options: ["A real DOM", "A JavaScript representation of DOM", "A CSS selector", "A HTML template"], correctAnswer: 1, explanation: "The virtual DOM is a JavaScript representation of the actual DOM for efficient updates." },
  { id: 8, question: "What is a key prop used for?", options: ["Styling", "Unique identification", "Event handling", "State management"], correctAnswer: 1, explanation: "The key prop helps React identify which items have changed for efficient re-rendering." },
  { id: 9, question: "What is useContext used for?", options: ["Creating context", "Consuming context", "Both creating and consuming", "Managing state"], correctAnswer: 1, explanation: "useContext is used to consume context values in functional components." },
  { id: 10, question: "What is useCallback used for?", options: ["Memoizing values", "Memoizing functions", "Creating callbacks", "All of the above"], correctAnswer: 1, explanation: "useCallback is used to memoize functions to prevent unnecessary re-creations." }
];

async function createSampleAttemptWithSkipped() {
  console.log('Creating sample attempt with skipped questions...');
  
  // Sample answers with some skipped (null) and some incorrect
  const sampleAnswers = [
    { questionId: 1, selectedAnswer: 0, isCorrect: true, timeSpent: 25 },
    { questionId: 2, selectedAnswer: 1, isCorrect: true, timeSpent: 30 },
    { questionId: 3, selectedAnswer: null, isCorrect: false, timeSpent: 0 }, // SKIPPED
    { questionId: 4, selectedAnswer: 0, isCorrect: false, timeSpent: 45 }, // INCORRECT
    { questionId: 5, selectedAnswer: 1, isCorrect: false, timeSpent: 35 }, // INCORRECT
    { questionId: 6, selectedAnswer: null, isCorrect: false, timeSpent: 0 }, // SKIPPED
    { questionId: 7, selectedAnswer: 1, isCorrect: true, timeSpent: 20 },
    { questionId: 8, selectedAnswer: null, isCorrect: false, timeSpent: 0 }, // SKIPPED
    { questionId: 9, selectedAnswer: 1, isCorrect: true, timeSpent: 30 },
    { questionId: 10, selectedAnswer: 1, isCorrect: true, timeSpent: 25 }
  ];
  
  // Calculate results
  const correctAnswers = sampleAnswers.filter(a => a.isCorrect).length;
  const totalQuestions = sampleQuestions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const proficiencyLevel = getProficiencyLevel(percentage);
  
  // Create incorrect answers details (excluding skipped questions)
  const incorrectAnswers = sampleAnswers
    .filter(answer => !answer.isCorrect && answer.selectedAnswer !== null)
    .map(answer => {
      const question = sampleQuestions.find(q => q.id === answer.questionId);
      return {
        questionId: answer.questionId,
        question: question.question,
        options: question.options,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      };
    });
  
  // Count skipped questions
  const skippedCount = sampleAnswers.filter(answer => answer.selectedAnswer === null).length;
  
  const detailedResults = sampleAnswers.map(answer => {
    const question = sampleQuestions.find(q => q.id === answer.questionId);
    return {
      questionId: answer.questionId,
      question: question.question,
      selectedAnswer: answer.selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: answer.isCorrect,
      timeSpent: answer.timeSpent
    };
  });
  
  const results = {
    score: correctAnswers,
    totalQuestions: totalQuestions,
    percentage: percentage,
    proficiencyLevel: proficiencyLevel,
    totalTime: 210, // Sum of timeSpent (excluding skipped)
    timeLeft: 990, // 1200 - 210
    incorrectAnswers: incorrectAnswers,
    skippedCount: skippedCount,
    detailedResults: detailedResults,
    completedAt: new Date().toISOString()
  };
  
  // Update attempt ATT000002 to be completed with skipped questions
  const updatedAttempt = await DatabaseOperations.updateAttempt('ATT000002', {
    status: 'completed',
    startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
    completedAt: new Date().toISOString(),
    questions: sampleQuestions,
    answers: sampleAnswers,
    results: results
  });
  
  if (updatedAttempt) {
    console.log('✅ Sample attempt with skipped questions created successfully!');
    console.log(`📊 Results: ${correctAnswers}/${totalQuestions} (${percentage}%) - ${skippedCount} skipped, ${incorrectAnswers.length} incorrect`);
    console.log('🔍 Test by visiting: http://localhost:5173/?id=STUD0002');
    console.log('📝 Or take quiz: http://localhost:5173/?id=ATT000002');
  } else {
    console.log('❌ Failed to create sample attempt');
  }
}

initAndRun();
