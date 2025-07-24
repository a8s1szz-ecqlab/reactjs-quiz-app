const { quizData, getRandomQuestions, getTopicById, getTopicQuestions, AVAILABLE_TOPICS } = require('../data/questions');

// Get random questions for quiz (without correct answers and explanations)
const getQuizQuestions = (count = 50, topic = 'reactjs') => {
  let sourceData;
  
  // Use topic-specific questions if topic is provided and available
  if (topic && AVAILABLE_TOPICS.includes(topic)) {
    sourceData = getTopicQuestions(topic);
  } else {
    // Fallback to all questions for backward compatibility
    sourceData = quizData;
  }
  
  const randomQuestions = getRandomQuestions(sourceData, count);
  
  // Return questions without correct answers and explanations for security
  return randomQuestions.map(question => ({
    id: question.id,
    question: question.question,
    options: question.options
  }));
};

// Get full question data by ID (for answer validation)
const getQuestionById = (id, topic = null) => {
  // First try topic-specific questions if topic is provided
  if (topic && AVAILABLE_TOPICS.includes(topic)) {
    const topicQuestions = getTopicQuestions(topic);
    const found = topicQuestions.find(question => question.id === id);
    if (found) return found;
  }
  
  // Fallback to searching all questions for backward compatibility
  return quizData.find(question => question.id === id);
};

// Validate answers and calculate results
const validateAnswers = (answers, topic = null) => {
  let correctCount = 0;
  const detailedResults = [];
  
  answers.forEach(answer => {
    const question = getQuestionById(answer.questionId, topic);
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
const getProficiencyLevel = (percentage, topicName = 'Programming') => {
  if (percentage >= 90) return { grade: 'Expert', color: '#4CAF50', message: `${topicName} Master! 🚀` };
  if (percentage >= 80) return { grade: 'Advanced', color: '#8BC34A', message: `Strong ${topicName} Skills! 💪` };
  if (percentage >= 70) return { grade: 'Intermediate', color: '#FF9800', message: `Good ${topicName} Foundation! 👍` };
  if (percentage >= 60) return { grade: 'Beginner+', color: '#FF5722', message: `Learning ${topicName} Well! 📚` };
  return { grade: 'Novice', color: '#F44336', message: `Keep Practicing ${topicName}! 💡` };
};

module.exports = {
  getQuizQuestions,
  getQuestionById,
  validateAnswers,
  getProficiencyLevel
};
