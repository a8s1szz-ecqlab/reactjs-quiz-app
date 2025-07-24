// SAP Commerce Cloud Quiz Topic
const sapCommerceCloudTopic = {
  id: 'sap-commerce-cloud',
  name: 'SAP Commerce Cloud',
  description: 'SAP Commerce Cloud (formerly Hybris) Platform Knowledge',
  icon: '🛒',
  timeLimit: 960, // 16 minutes
  passingScore: 80,
  questions: [
    // BEGINNER LEVEL QUESTIONS (1-20)
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
    },
    {
      id: 6,
      question: "What is the HAC in SAP Commerce Cloud?",
      options: [
        "Hybris Administration Console",
        "Hardware Access Control",
        "HTTP Application Cache",
        "Hierarchical Access Control"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "HAC stands for Hybris Administration Console, a web-based tool for administering SAP Commerce Cloud."
    },
    {
      id: 7,
      question: "What is a Product in SAP Commerce Cloud context?",
      options: [
        "A Java object only",
        "An item type representing sellable goods",
        "A database view",
        "A configuration setting"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Product is a fundamental item type in SAP Commerce Cloud representing sellable goods or services."
    },
    {
      id: 8,
      question: "What is the purpose of the ModelService in SAP Commerce Cloud?",
      options: [
        "Database backup",
        "CRUD operations on models",
        "User interface rendering",
        "Email sending"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "ModelService provides methods for creating, reading, updating, and deleting model objects in SAP Commerce Cloud."
    },
    {
      id: 9,
      question: "What is a Catalog in SAP Commerce Cloud?",
      options: [
        "A database table",
        "A container for organizing products",
        "A user role",
        "A configuration file"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "A Catalog is a container that organizes products and categories in SAP Commerce Cloud."
    },
    {
      id: 10,
      question: "What is the default database used by SAP Commerce Cloud?",
      options: [
        "MySQL",
        "Oracle",
        "HSQLDB",
        "PostgreSQL"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "HSQLDB is the default database used by SAP Commerce Cloud for development and testing."
    },
    {
      id: 11,
      question: "What is a Category in SAP Commerce Cloud?",
      options: [
        "A way to organize products hierarchically",
        "A user permission level",
        "A database index",
        "A web page template"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Categories provide hierarchical organization of products in SAP Commerce Cloud catalogs."
    },
    {
      id: 12,
      question: "What is the purpose of the User item type?",
      options: [
        "Database configuration",
        "Representing system and customer users",
        "Product categorization",
        "Order processing"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The User item type represents both system users and customers in SAP Commerce Cloud."
    },
    {
      id: 13,
      question: "What is a Cart in SAP Commerce Cloud?",
      options: [
        "A shopping cart for storing selected products",
        "A deployment container",
        "A configuration template",
        "A database backup"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "A Cart represents a shopping cart containing products selected by a customer for purchase."
    },
    {
      id: 14,
      question: "What is an Order in SAP Commerce Cloud?",
      options: [
        "A system command",
        "A finalized purchase transaction",
        "A product arrangement",
        "A user instruction"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "An Order represents a finalized purchase transaction containing products, pricing, and customer information."
    },
    {
      id: 15,
      question: "What is the platform folder in SAP Commerce Cloud?",
      options: [
        "User documents storage",
        "Core platform files and libraries",
        "Product images directory",
        "Log files location"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The platform folder contains core SAP Commerce Cloud files, libraries, and framework components."
    },
    {
      id: 16,
      question: "What is an Extension in SAP Commerce Cloud?",
      options: [
        "A file extension type",
        "A modular component providing specific functionality",
        "A database connection",
        "A user interface widget"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Extensions are modular components that provide specific functionality and can be enabled or disabled."
    },
    {
      id: 17,
      question: "What is the local.properties file used for?",
      options: [
        "Database schema definition",
        "Local environment configuration",
        "Product catalog data",
        "User interface templates"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The local.properties file contains environment-specific configuration settings for SAP Commerce Cloud."
    },
    {
      id: 18,
      question: "What is a Price in SAP Commerce Cloud?",
      options: [
        "A mathematical calculation",
        "An item type representing product pricing",
        "A currency converter",
        "A discount code"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Price is an item type that represents pricing information for products including currency and value."
    },
    {
      id: 19,
      question: "What is the purpose of the ant command in SAP Commerce Cloud?",
      options: [
        "Insect control",
        "Build and deployment tasks",
        "Database queries",
        "User authentication"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The ant command is used for build and deployment tasks like compiling, building, and initializing the system."
    },
    {
      id: 20,
      question: "What is a Media item type used for?",
      options: [
        "Social media integration",
        "Storing files and images",
        "Audio playback",
        "Video streaming"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The Media item type is used for storing and managing files, images, and other digital assets."
    },

    // INTERMEDIATE LEVEL QUESTIONS (21-40)
    {
      id: 21,
      question: "What is the difference between ProductModel and ProductData?",
      options: [
        "No difference",
        "ProductModel is the persistence layer, ProductData is the DTO",
        "ProductData is deprecated",
        "ProductModel is only for testing"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "ProductModel represents the persistence layer object, while ProductData is a Data Transfer Object used in the service layer."
    },
    {
      id: 22,
      question: "What is the purpose of Type System in SAP Commerce Cloud?",
      options: [
        "Font management",
        "Defining and managing item types and their relationships",
        "User role management",
        "Database indexing"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The Type System defines and manages item types, attributes, and relationships in the SAP Commerce Cloud data model."
    },
    {
      id: 23,
      question: "What is a Relation in SAP Commerce Cloud?",
      options: [
        "Family connection",
        "A relationship between two item types",
        "Database foreign key",
        "User permission"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Relations define relationships between item types, such as one-to-many or many-to-many associations."
    },
    {
      id: 24,
      question: "What is the purpose of Interceptors in SAP Commerce Cloud?",
      options: [
        "Network security",
        "Implementing business logic during model operations",
        "Database optimization",
        "User interface rendering"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Interceptors allow implementing custom business logic before or after model operations like save, load, or remove."
    },
    {
      id: 25,
      question: "What is a Facet in SAP Commerce Cloud search?",
      options: [
        "A database view",
        "A search filter based on product attributes",
        "A user interface component",
        "A configuration setting"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Facets are search filters that allow users to narrow search results based on product attributes like brand, price range, etc."
    },
    {
      id: 26,
      question: "What is the purpose of Solr in SAP Commerce Cloud?",
      options: [
        "Database management",
        "Search and indexing functionality",
        "User authentication",
        "Order processing"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Solr provides powerful search and indexing capabilities for product catalogs and content in SAP Commerce Cloud."
    },
    {
      id: 27,
      question: "What is a Workflow in SAP Commerce Cloud?",
      options: [
        "Code deployment process",
        "Business process automation with states and actions",
        "Database backup procedure",
        "User training program"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Workflows automate business processes by defining states, actions, and transitions between different stages."
    },
    {
      id: 28,
      question: "What is the difference between staged and online catalogs?",
      options: [
        "No difference",
        "Staged for editing, online for live content",
        "Staged is faster",
        "Online is more secure"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Staged catalogs allow content editing and preparation, while online catalogs contain live, published content visible to customers."
    },
    {
      id: 29,
      question: "What is a PriceRow in SAP Commerce Cloud?",
      options: [
        "Database table row",
        "Specific price entry with conditions",
        "Price calculation formula",
        "Currency exchange rate"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "PriceRow represents a specific price entry with conditions like currency, user group, and validity dates."
    },
    {
      id: 30,
      question: "What is the purpose of CronJobs in SAP Commerce Cloud?",
      options: [
        "User interface updates",
        "Scheduled background tasks",
        "Database queries",
        "Order processing"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "CronJobs are scheduled background tasks that perform automated operations like data synchronization or cleanup."
    },
    {
      id: 31,
      question: "What is a Variant Product?",
      options: [
        "A defective product",
        "Different versions of a base product with varying attributes",
        "A discontinued product",
        "A digital product"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Variant Products are different versions of a base product with varying attributes like size, color, or material."
    },
    {
      id: 32,
      question: "What is the purpose of ImpEx in SAP Commerce Cloud?",
      options: [
        "User interface design",
        "Data import and export functionality",
        "Network configuration",
        "Security management"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "ImpEx (Import/Export) is used for importing and exporting data in SAP Commerce Cloud using CSV-like syntax."
    },
    {
      id: 33,
      question: "What is a ConfigurationProperty?",
      options: [
        "Hardware setting",
        "System configuration parameter",
        "User preference",
        "Database constraint"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "ConfigurationProperty represents system configuration parameters that can be set in properties files."
    },
    {
      id: 34,
      question: "What is the purpose of the Classification System?",
      options: [
        "User categorization",
        "Product attribute classification and management",
        "Security classification",
        "Performance classification"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The Classification System manages product attributes and features through hierarchical classification categories."
    },
    {
      id: 35,
      question: "What is a Promotion in SAP Commerce Cloud?",
      options: [
        "Job advancement",
        "Marketing rules for discounts and offers",
        "Product advertisement",
        "User role elevation"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Promotions are marketing rules that define discounts, offers, and special pricing conditions."
    },
    {
      id: 36,
      question: "What is the purpose of Cockpits in SAP Commerce Cloud?",
      options: [
        "Aircraft management",
        "Web-based administrative interfaces",
        "Database management",
        "Server monitoring"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Cockpits are web-based administrative interfaces for managing different aspects of the commerce platform."
    },
    {
      id: 37,
      question: "What is a Consignment in SAP Commerce Cloud?",
      options: [
        "Product shipment",
        "Part of an order shipped together",
        "Product assignment",
        "Inventory allocation"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "A Consignment represents part of an order that is shipped together from a specific warehouse or location."
    },
    {
      id: 38,
      question: "What is the purpose of the FlexibleSearch query cache?",
      options: [
        "Database backup",
        "Improving query performance by caching results",
        "Query logging",
        "Query validation"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The FlexibleSearch query cache improves performance by storing frequently executed query results in memory."
    },
    {
      id: 39,
      question: "What is a PaymentMode in SAP Commerce Cloud?",
      options: [
        "Payment calculation method",
        "Supported payment method configuration",
        "Payment processing speed",
        "Payment security level"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "PaymentMode defines the available payment methods like credit card, PayPal, or bank transfer."
    },
    {
      id: 40,
      question: "What is the purpose of Event System in SAP Commerce Cloud?",
      options: [
        "Calendar management",
        "Asynchronous communication between components",
        "User activity tracking",
        "System monitoring"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The Event System enables asynchronous communication between different components through event publishing and listening."
    },

    // ADVANCED LEVEL QUESTIONS (41-60)
    {
      id: 41,
      question: "How does the ServiceLayer pattern work in SAP Commerce Cloud?",
      options: [
        "Direct database access",
        "Abstraction layer between controllers and models with DTOs",
        "User interface layer only",
        "Network service layer"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "ServiceLayer provides an abstraction between controllers and models, using DTOs and facades for clean separation of concerns."
    },
    {
      id: 42,
      question: "What is the purpose of the Dynamic Attribute framework?",
      options: [
        "Database indexing",
        "Runtime calculation of virtual attributes",
        "User permission management",
        "Configuration management"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Dynamic Attributes allow runtime calculation of virtual attributes that are not stored in the database but computed on-demand."
    },
    {
      id: 43,
      question: "How does the Multi-Tenant architecture work in SAP Commerce Cloud?",
      options: [
        "Single tenant only",
        "Isolated tenant data and configuration",
        "Shared data across all tenants",
        "No tenant support"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Multi-Tenant architecture provides isolated data and configuration for different tenants sharing the same platform instance."
    },
    {
      id: 44,
      question: "What is the purpose of the Commerce Web Services?",
      options: [
        "Database web interface",
        "RESTful APIs for headless commerce integration",
        "User interface web services",
        "System monitoring services"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Commerce Web Services provide RESTful APIs that enable headless commerce scenarios and third-party integrations."
    },
    {
      id: 45,
      question: "How does the Personalization engine work?",
      options: [
        "Random content selection",
        "Rule-based content targeting using customer segments",
        "Static content delivery",
        "Manual content assignment"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Personalization uses rule-based targeting to deliver relevant content and offers based on customer segments and behavior."
    },
    {
      id: 46,
      question: "What is the Advanced Search functionality in Solr integration?",
      options: [
        "Basic keyword search only",
        "Faceted search, auto-suggest, and advanced filtering",
        "Database search only",
        "File system search"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Search provides faceted search, auto-suggest, spell checking, and sophisticated filtering capabilities through Solr."
    },
    {
      id: 47,
      question: "How does the Order Management System (OMS) work?",
      options: [
        "Simple order storage",
        "Complex order orchestration across multiple systems",
        "Order display only",
        "Order backup system"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "OMS orchestrates complex order fulfillment processes across multiple systems, warehouses, and business rules."
    },
    {
      id: 48,
      question: "What is the purpose of the Product Cockpit's advanced features?",
      options: [
        "Basic product listing",
        "Bulk operations, advanced search, and workflow integration",
        "Product image display",
        "Simple product editing"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Product Cockpit provides bulk operations, advanced search capabilities, workflow integration, and sophisticated product management features."
    },
    {
      id: 49,
      question: "How does the Cache Management system work?",
      options: [
        "No caching support",
        "Multi-level caching with invalidation strategies",
        "Simple memory cache only",
        "Database caching only"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Cache Management provides multi-level caching including region-based caches, query caches, and sophisticated invalidation strategies."
    },
    {
      id: 50,
      question: "What is the Advanced Promotion Engine capability?",
      options: [
        "Simple percentage discounts",
        "Complex rule-based promotions with stacking and exclusions",
        "Fixed price reductions only",
        "Manual discount application"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Promotion Engine supports complex rule-based promotions, promotion stacking, exclusions, and sophisticated condition evaluation."
    },
    {
      id: 51,
      question: "How does the Integration Framework handle external systems?",
      options: [
        "Manual data entry only",
        "Automated data synchronization with transformation capabilities",
        "File-based integration only",
        "No external integration"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Integration Framework provides automated data synchronization, transformation, and monitoring for external system integration."
    },
    {
      id: 52,
      question: "What is the purpose of the Advanced Workflow Engine?",
      options: [
        "Simple approval processes",
        "Complex business process automation with parallel execution",
        "Basic task assignment",
        "Manual process management"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Workflow Engine supports complex business processes with parallel execution, conditional branching, and sophisticated state management."
    },
    {
      id: 53,
      question: "How does the Advanced Pricing Framework work?",
      options: [
        "Fixed pricing only",
        "Dynamic pricing with complex rules and calculations",
        "Manual price setting",
        "Single currency support"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Pricing Framework supports dynamic pricing with complex rules, calculations, multi-currency, and user-group specific pricing."
    },
    {
      id: 54,
      question: "What is the purpose of the Advanced Security Framework?",
      options: [
        "Basic password protection",
        "Role-based access control with fine-grained permissions",
        "Simple user authentication",
        "No security features"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Security Framework provides role-based access control, fine-grained permissions, and comprehensive security features."
    },
    {
      id: 55,
      question: "How does the Advanced Catalog Management work?",
      options: [
        "Single catalog support",
        "Multi-catalog management with inheritance and synchronization",
        "Basic product listing",
        "Manual catalog updates"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Catalog Management supports multiple catalogs with inheritance, synchronization, and sophisticated content management features."
    },
    {
      id: 56,
      question: "What is the Advanced Inventory Management capability?",
      options: [
        "Simple stock counting",
        "Multi-warehouse inventory with ATP and reservation",
        "Single location inventory",
        "Manual inventory tracking"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Inventory Management provides multi-warehouse support, Available-to-Promise (ATP) calculations, and inventory reservations."
    },
    {
      id: 57,
      question: "How does the Advanced Content Management work?",
      options: [
        "Static content only",
        "Dynamic content with versioning and approval workflows",
        "Basic HTML pages",
        "No content management"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Content Management provides dynamic content delivery, versioning, approval workflows, and sophisticated content targeting."
    },
    {
      id: 58,
      question: "What is the purpose of the Advanced Analytics Integration?",
      options: [
        "Basic reporting only",
        "Real-time analytics with custom metrics and dashboards",
        "Simple log files",
        "No analytics support"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Analytics Integration provides real-time analytics, custom metrics, sophisticated dashboards, and business intelligence features."
    },
    {
      id: 59,
      question: "How does the Advanced Customer Segmentation work?",
      options: [
        "Single customer group",
        "Dynamic segmentation based on behavior and attributes",
        "Manual customer grouping",
        "No segmentation features"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Customer Segmentation provides dynamic segmentation based on customer behavior, attributes, and sophisticated targeting rules."
    },
    {
      id: 60,
      question: "What is the Advanced Performance Optimization framework?",
      options: [
        "No optimization features",
        "Multi-level caching, query optimization, and performance monitoring",
        "Basic caching only",
        "Manual optimization only"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Advanced Performance Optimization includes multi-level caching, query optimization, performance monitoring, and automated tuning capabilities."
    }
  ]
};

module.exports = sapCommerceCloudTopic;
