// Import topic-based questions and utilities directly from topics directory
const { 
  localTopics, 
  getTopic, 
  getTopicQuestions, 
  getRandomQuestions: getRandomQuestionsFromTopic,
  AVAILABLE_TOPICS 
} = require('./topics/index');

// Constants
const DEFAULT_TOPIC = 'reactjs'; // Default fallback topic

// Backward compatibility - export ReactJS questions as default
const quizData = localTopics.reactjs ? localTopics.reactjs.questions : [];

// Enhanced getRandomQuestions function that supports topic selection
const getRandomQuestions = (sourceData, count = 50) => {
  if (!sourceData || sourceData.length === 0) {
    return [];
  }
  
  // If requesting more questions than available, return all questions
  if (count >= sourceData.length) {
    return [...sourceData];
  }
  
  // Shuffle and select random questions
  const shuffled = [...sourceData].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Export all necessary functions and data
module.exports = {
  // Backward compatibility exports
  quizData,
  getRandomQuestions,
  
  // New topic-based exports
  quizTopics: localTopics, // Alias for backward compatibility
  getTopicById: getTopic,
  getTopicQuestions: getTopicQuestions,
  AVAILABLE_TOPICS,
  DEFAULT_TOPIC, // Export the default topic constant
  
  // Topic-aware random questions function
  getRandomQuestionsFromTopic
};
