// Topic Management Index
// This file imports all individual topic files and provides a unified interface

const reactjsTopic = require('./reactjs');
const microserviceTopic = require('./microservice');
const sapCommerceCloudTopic = require('./sap-commerce-cloud');

// Aggregate all topics into a single object
const quizTopics = {
  reactjs: reactjsTopic,
  microservice: microserviceTopic,
  'sap-commerce-cloud': sapCommerceCloudTopic
};

// Helper functions for topic management
const getAllTopics = () => {
  return Object.values(quizTopics).map(topic => ({
    id: topic.id,
    name: topic.name,
    description: topic.description,
    icon: topic.icon,
    questionCount: topic.questions.length,
    timeLimit: topic.timeLimit,
    passingScore: topic.passingScore
  }));
};

const getTopicById = (topicId) => {
  return quizTopics[topicId] || null;
};

const getQuestionsByTopic = (topicId) => {
  const topic = getTopicById(topicId);
  return topic ? topic.questions : [];
};

// Backward compatibility - default to ReactJS for existing functionality
const getDefaultQuestions = () => {
  return quizTopics.reactjs.questions;
};

// Get random questions function (moved here for centralization)
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

// Export for backward compatibility and new topic functionality
module.exports = {
  // Legacy exports for backward compatibility
  quizData: getDefaultQuestions(),
  
  // New topic-based exports
  quizTopics,
  getAllTopics,
  getTopicById, 
  getQuestionsByTopic,
  getDefaultQuestions,
  getRandomQuestions,
  
  // Topic constants
  DEFAULT_TOPIC: 'reactjs',
  AVAILABLE_TOPICS: Object.keys(quizTopics),
  
  // Individual topic exports (for direct access if needed)
  reactjsTopic,
  microserviceTopic,
  sapCommerceCloudTopic
};
