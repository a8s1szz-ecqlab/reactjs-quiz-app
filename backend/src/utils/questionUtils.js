const { quizData, getRandomQuestions } = require('../data/questions');

// Get random questions for quiz (without correct answers and explanations)
const getQuizQuestions = (count = 50) => {
  const randomQuestions = getRandomQuestions(quizData, count);
  
  // Return questions without correct answers and explanations for security
  return randomQuestions.map(question => ({
    id: question.id,
    question: question.question,
    options: question.options
  }));
};

// Get full question data by ID (for answer validation)
const getQuestionById = (id) => {
  return quizData.find(question => question.id === id);
};

// Validate answers and calculate results
const validateAnswers = (answers) => {
  let correctCount = 0;
  const detailedResults = [];
  
  answers.forEach(answer => {
    const question = getQuestionById(answer.questionId);
    if (!question) {
      detailedResults.push({
        questionId: answer.questionId,
        isCorrect: false,
        error: 'Question not found'
      });
      return;
    }
    
    const isCorrect = answer.selectedAnswer === question.correctAnswer;
    if (isCorrect) {
      correctCount++;
    }
    
    detailedResults.push({
      questionId: answer.questionId,
      question: question.question,
      options: question.options,
      selectedAnswer: answer.selectedAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect,
      explanation: question.explanation,
      timeSpent: answer.timeSpent || 0
    });
  });
  
  const totalQuestions = answers.length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  
  // Separate skipped and incorrect answers
  const skippedAnswers = detailedResults.filter(result => result.selectedAnswer === null);
  const incorrectAnswers = detailedResults.filter(result => !result.isCorrect && result.selectedAnswer !== null);
  
  return {
    score: correctCount,
    totalQuestions: totalQuestions,
    percentage: percentage,
    detailedResults: detailedResults,
    incorrectAnswers: incorrectAnswers,
    skippedAnswers: skippedAnswers,
    skippedCount: skippedAnswers.length
  };
};

// Get proficiency level based on percentage
const getProficiencyLevel = (percentage) => {
  if (percentage >= 90) return { grade: 'Expert', color: '#4CAF50', message: 'ReactJS Master! 🚀' };
  if (percentage >= 80) return { grade: 'Advanced', color: '#8BC34A', message: 'Strong ReactJS Skills! 💪' };
  if (percentage >= 70) return { grade: 'Intermediate', color: '#FF9800', message: 'Good ReactJS Foundation! 👍' };
  if (percentage >= 60) return { grade: 'Beginner+', color: '#FF5722', message: 'Learning ReactJS Well! 📚' };
  return { grade: 'Novice', color: '#F44336', message: 'Keep Practicing ReactJS! 💡' };
};

module.exports = {
  getQuizQuestions,
  getQuestionById,
  validateAnswers,
  getProficiencyLevel
};
