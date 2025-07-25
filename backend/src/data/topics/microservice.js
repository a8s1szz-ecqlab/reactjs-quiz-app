// Microservice Quiz Topic
const microserviceTopic = {
  id: 'microservice',
  name: 'Microservice',
  description: 'Microservices Architecture and Design Patterns',
  icon: '🔬',
  timeLimit: 300, // 16 minutes
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "What is a key characteristic of microservices architecture?",
      options: [
        "Single deployable unit",
        "Loosely coupled services",
        "Shared database",
        "Monolithic design"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Microservices are loosely coupled services that can be developed, deployed, and scaled independently."
    },
    {
      id: 2,
      question: "Which communication pattern is commonly used between microservices?",
      options: [
        "Direct database access",
        "Shared memory",
        "HTTP/REST APIs",
        "File sharing"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "HTTP/REST APIs are a common way for microservices to communicate with each other over the network."
    },
    {
      id: 3,
      question: "What is the purpose of an API Gateway in microservices architecture?",
      options: [
        "Database management",
        "Single entry point for client requests",
        "Code compilation",
        "Memory management"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "An API Gateway serves as a single entry point for all client requests and routes them to appropriate microservices."
    },
    {
      id: 4,
      question: "What is service discovery in microservices?",
      options: [
        "Finding bugs in services",
        "Automatically locating and connecting to services",
        "Creating new services",
        "Deleting unused services"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Service discovery is the mechanism for services to find and communicate with each other automatically."
    },
    {
      id: 5,
      question: "What does 'loosely coupled' mean in microservices context?",
      options: [
        "Services share the same database",
        "Services can be changed independently",
        "Services run on the same server",
        "Services use the same programming language"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Loosely coupled means services can be developed, deployed, and modified independently without affecting other services."
    }
  ]
};

module.exports = microserviceTopic;
