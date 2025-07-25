const { 
  getDefaultQuestions, 
  getRandomQuestions, 
  getTopicById, 
  getQuestionsByTopic, 
  AVAILABLE_TOPICS 
} = require('../data/topics');

// Get random questions for quiz (without correct answers and explanations)
const getQuizQuestions = async (count = 50, topic = 'reactjs') => {
  try {
    // Use the topic service to get random questions directly
    const questions = await getRandomQuestions(count, topic);
    
    // Return questions without correct answers and explanations for security
    return questions.map(question => ({
      id: question.id,
      question: question.question,
      options: question.options
    }));
  } catch (error) {
    console.error('Error fetching quiz questions for topic:', topic, error.message);
    
    // Fallback to default questions
    try {
      const defaultQuestions = await getDefaultQuestions();
      const shuffled = shuffleArray([...defaultQuestions]);
      const limited = shuffled.slice(0, count);
      
      return limited.map(question => ({
        id: question.id,
        question: question.question,
        options: question.options
      }));
    } catch (fallbackError) {
      console.error('Error fetching default questions:', fallbackError.message);
      throw new Error('Unable to fetch quiz questions');
    }
  }
};

// Helper function to shuffle array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Get full question data by ID (for answer validation)
const getQuestionById = async (id, topic = null) => {
  try {
    // First try topic-specific questions if topic is provided
    if (topic && AVAILABLE_TOPICS.includes(topic)) {
      const topicData = await getTopicById(topic);
      if (topicData && topicData.questions) {
        const found = topicData.questions.find(question => question.id === id);
        if (found) return found;
      }
    }
    
    // Fallback to searching default questions for backward compatibility
    const defaultQuestions = await getDefaultQuestions();
    return defaultQuestions.find(question => question.id === id);
  } catch (error) {
    console.error('Error fetching question by ID:', id, 'topic:', topic, error.message);
    return null;
  }
};

// Validate answers and calculate results
const validateAnswers = async (answers, topic = null) => {
  let correctCount = 0;
  const detailedResults = [];
  
  for (const answer of answers) {
    const question = await getQuestionById(answer.questionId, topic);
    if (!question) {
      detailedResults.push({
        questionId: answer.questionId,
        isCorrect: false,
        error: 'Question not found'
      });
      continue;
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
  }
  
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
