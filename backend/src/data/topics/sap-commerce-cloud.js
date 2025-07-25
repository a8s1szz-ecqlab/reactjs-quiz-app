// SAP Commerce Cloud Quiz Topic
const sapCommerceCloudTopic = {
  id: 'sap-commerce-cloud',
  name: 'SAP Commerce Cloud',
  description: 'SAP Commerce Cloud (formerly Hybris) Platform Knowledge',
  icon: '🛒',
  timeLimit: 300, // 5 minutes
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "What is SAP Commerce Cloud formerly known as?",
      options: [
        "SAP ERP",
        "SAP Hybris",
        "SAP HANA",
        "SAP Ariba"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "SAP Commerce Cloud was formerly known as SAP Hybris before being rebranded."
    },
    {
      id: 2,
      question: "Which framework does SAP Commerce Cloud primarily use?",
      options: [
        ".NET Framework",
        "Django",
        "Spring Framework",
        "Laravel"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "SAP Commerce Cloud is built on the Spring Framework, providing dependency injection and other enterprise features."
    },
    {
      id: 3,
      question: "What is an ItemType in SAP Commerce Cloud?",
      options: [
        "A database table definition",
        "A Java class",
        "A configuration file",
        "A user interface component"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "ItemType defines the structure of data objects in SAP Commerce Cloud, similar to database table definitions."
    },
    {
      id: 4,
      question: "Which file is used to define data models in SAP Commerce Cloud?",
      options: [
        "items.xml",
        "config.properties",
        "web.xml",
        "spring.xml"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "The items.xml file is used to define data models, item types, and their relationships in SAP Commerce Cloud."
    },
    {
      id: 5,
      question: "What is Flexible Search in SAP Commerce Cloud?",
      options: [
        "A search engine",
        "A query language similar to SQL",
        "A user interface component",
        "A deployment tool"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Flexible Search is SAP Commerce Cloud's query language that allows SQL-like queries on the commerce data model."
    }
  ]
};

module.exports = sapCommerceCloudTopic;
