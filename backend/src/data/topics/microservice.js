// Microservice Quiz Topic
const microserviceTopic = {
  id: 'microservice',
  name: 'Microservice',
  description: 'Microservices Architecture and Design Patterns',
  icon: '🔬',
  timeLimit: 960, // 16 minutes
  passingScore: 80,
  questions: [
    // BEGINNER LEVEL QUESTIONS (1-20)
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
    },
    {
      id: 6,
      question: "What is a container in microservices deployment?",
      options: [
        "A database storage unit",
        "A lightweight, portable execution environment",
        "A network protocol",
        "A programming framework"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Containers provide a lightweight, portable way to package and deploy microservices with their dependencies."
    },
    {
      id: 7,
      question: "What is the main advantage of microservices over monolithic architecture?",
      options: [
        "Simpler deployment",
        "Single point of failure",
        "Independent scaling and development",
        "Shared database access"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "Microservices allow independent scaling, development, and deployment of different parts of an application."
    },
    {
      id: 8,
      question: "What is Docker commonly used for in microservices?",
      options: [
        "Database management",
        "Containerization",
        "Load balancing",
        "Code compilation"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Docker is used to containerize microservices, making them portable and easy to deploy."
    },
    {
      id: 9,
      question: "What is a RESTful API?",
      options: [
        "A database query language",
        "An architectural style for web services",
        "A programming language",
        "A container orchestration tool"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "REST is an architectural style that uses HTTP methods and follows stateless communication principles."
    },
    {
      id: 10,
      question: "What does HTTP status code 200 mean?",
      options: [
        "Bad Request",
        "Success",
        "Not Found",
        "Internal Server Error"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "HTTP status code 200 indicates that the request was successful."
    },
    {
      id: 11,
      question: "What is load balancing in microservices?",
      options: [
        "Distributing requests across multiple service instances",
        "Balancing database tables",
        "Managing memory usage",
        "Organizing code files"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Load balancing distributes incoming requests across multiple instances of a service to improve performance and availability."
    },
    {
      id: 12,
      question: "What is JSON commonly used for in microservices?",
      options: [
        "Database storage",
        "Data exchange between services",
        "User interface design",
        "Server configuration"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "JSON is a lightweight data format commonly used for exchanging data between microservices."
    },
    {
      id: 13,
      question: "What is the purpose of health checks in microservices?",
      options: [
        "Code quality assessment",
        "Monitoring service availability",
        "Performance optimization",
        "Security scanning"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Health checks monitor whether a service is running properly and can respond to requests."
    },
    {
      id: 14,
      question: "What is Kubernetes primarily used for?",
      options: [
        "Database management",
        "Container orchestration",
        "Code compilation",
        "Network security"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Kubernetes is a container orchestration platform that manages deployment, scaling, and operation of containerized applications."
    },
    {
      id: 15,
      question: "What is the database-per-service pattern?",
      options: [
        "All services share one database",
        "Each service has its own database",
        "No databases are used",
        "Only NoSQL databases are allowed"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The database-per-service pattern ensures each microservice has its own database to maintain independence."
    },
    {
      id: 16,
      question: "What is horizontal scaling?",
      options: [
        "Adding more powerful hardware",
        "Adding more service instances",
        "Increasing memory size",
        "Upgrading CPU speed"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Horizontal scaling involves adding more instances of a service to handle increased load."
    },
    {
      id: 17,
      question: "What is a microservice endpoint?",
      options: [
        "A database connection",
        "A URL where the service can be accessed",
        "A configuration file",
        "A deployment script"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "An endpoint is a specific URL where a microservice exposes its functionality to be accessed by other services or clients."
    },
    {
      id: 18,
      question: "What does CRUD stand for?",
      options: [
        "Create, Read, Update, Delete",
        "Connect, Route, Upload, Download",
        "Configure, Run, Use, Deploy",
        "Cache, Retrieve, Update, Distribute"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "CRUD represents the four basic operations that can be performed on data: Create, Read, Update, and Delete."
    },
    {
      id: 19,
      question: "What is the purpose of logging in microservices?",
      options: [
        "Data storage",
        "Monitoring and debugging",
        "User authentication",
        "Load balancing"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Logging helps monitor service behavior, debug issues, and track system activity across distributed microservices."
    },
    {
      id: 20,
      question: "What is DevOps in the context of microservices?",
      options: [
        "A programming language",
        "A cultural practice combining development and operations",
        "A database technology",
        "A security protocol"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "DevOps is a cultural and technical practice that combines software development and IT operations to enable faster, more reliable deployments."
    },

    // INTERMEDIATE LEVEL QUESTIONS (21-40)
    {
      id: 21,
      question: "Which pattern helps handle failures in microservices?",
      options: [
        "Singleton pattern",
        "Factory pattern",
        "Circuit breaker pattern",
        "Observer pattern"
      ],
      correctAnswer: 2,
      difficulty: "intermediate",
      explanation: "Circuit breaker pattern helps prevent cascading failures by stopping calls to failing services temporarily."
    },
    {
      id: 22,
      question: "What is eventual consistency in distributed systems?",
      options: [
        "Data is immediately consistent across all services",
        "Data will become consistent over time",
        "Data is never consistent",
        "Only one service maintains data consistency"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Eventual consistency means that while data may be temporarily inconsistent, it will eventually become consistent across all services."
    },
    {
      id: 23,
      question: "What is the Saga pattern used for?",
      options: [
        "Managing distributed transactions",
        "Load balancing",
        "Service discovery",
        "Data caching"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "The Saga pattern manages distributed transactions by breaking them into a series of smaller, compensatable transactions."
    },
    {
      id: 24,
      question: "What is CQRS in microservices architecture?",
      options: [
        "Command Query Responsibility Segregation",
        "Centralized Query Routing System",
        "Container Quality Resource Sharing",
        "Cross-Query Response Service"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "CQRS separates read and write operations, allowing them to be optimized independently."
    },
    {
      id: 25,
      question: "What is the purpose of a service mesh?",
      options: [
        "Database clustering",
        "Managing service-to-service communication",
        "User interface routing",
        "File system management"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "A service mesh provides infrastructure for handling service-to-service communication, including security, monitoring, and traffic management."
    },
    {
      id: 26,
      question: "What is the Bulkhead pattern?",
      options: [
        "A data storage technique",
        "Isolating critical resources to prevent cascading failures",
        "A deployment strategy",
        "A testing methodology"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The Bulkhead pattern isolates critical resources to prevent failures in one area from affecting the entire system."
    },
    {
      id: 27,
      question: "What is distributed tracing?",
      options: [
        "Tracking requests across multiple microservices",
        "Distributing database queries",
        "Load balancing algorithms",
        "Container deployment strategies"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "Distributed tracing tracks requests as they flow through multiple microservices, helping with debugging and performance monitoring."
    },
    {
      id: 28,
      question: "What is the strangler fig pattern?",
      options: [
        "A security pattern",
        "Gradually replacing a monolith with microservices",
        "A data migration strategy",
        "A testing approach"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The strangler fig pattern gradually replaces parts of a monolithic application with microservices over time."
    },
    {
      id: 29,
      question: "What is idempotency in API design?",
      options: [
        "APIs that always return the same response",
        "Operations that produce the same result when repeated",
        "APIs that never change",
        "Single-use API endpoints"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Idempotency means that repeating the same operation multiple times produces the same result as doing it once."
    },
    {
      id: 30,
      question: "What is the purpose of API versioning?",
      options: [
        "Tracking API usage",
        "Managing backward compatibility during API evolution",
        "Improving API performance",
        "Securing API endpoints"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "API versioning allows services to evolve their interfaces while maintaining backward compatibility for existing clients."
    },
    {
      id: 31,
      question: "What is a sidecar proxy in service mesh?",
      options: [
        "A backup service instance",
        "A proxy running alongside each service instance",
        "A central routing service",
        "A database connection pool"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "A sidecar proxy runs alongside each service instance to handle communication concerns like security, monitoring, and traffic management."
    },
    {
      id: 32,
      question: "What is the difference between synchronous and asynchronous communication?",
      options: [
        "Sync is faster, async is slower",
        "Sync waits for response, async doesn't",
        "Sync uses HTTP, async uses messaging",
        "No difference"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Synchronous communication waits for a response before continuing, while asynchronous communication doesn't wait and can continue processing."
    },
    {
      id: 33,
      question: "What is event sourcing?",
      options: [
        "Storing events rather than current state",
        "Finding the source of events",
        "Event-driven programming",
        "Source code management for events"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "Event sourcing stores the sequence of events that led to the current state, rather than just storing the current state."
    },
    {
      id: 34,
      question: "What is the CAP theorem?",
      options: [
        "Consistency, Availability, Partition tolerance trade-offs",
        "Create, Access, Process operations",
        "Cache, API, Performance optimization",
        "Container, Application, Platform layers"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "CAP theorem states that distributed systems can only guarantee two of three properties: Consistency, Availability, and Partition tolerance."
    },
    {
      id: 35,
      question: "What is a message broker?",
      options: [
        "A service that facilitates asynchronous communication",
        "A database management tool",
        "A load balancer",
        "A security gateway"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "A message broker facilitates asynchronous communication between services by receiving, storing, and forwarding messages."
    },
    {
      id: 36,
      question: "What is blue-green deployment?",
      options: [
        "Using two color-coded environments for zero-downtime deployment",
        "A testing strategy",
        "A security practice",
        "A monitoring technique"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "Blue-green deployment uses two identical environments (blue and green) to enable zero-downtime deployments by switching traffic between them."
    },
    {
      id: 37,
      question: "What is the retry pattern and when should it be used?",
      options: [
        "Always retry failed requests immediately",
        "Retry failed requests with exponential backoff for transient failures",
        "Never retry failed requests",
        "Retry only database operations"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The retry pattern should be used for transient failures with exponential backoff to avoid overwhelming the failing service."
    },
    {
      id: 38,
      question: "What is container orchestration?",
      options: [
        "Managing the lifecycle of containers at scale",
        "Creating container images",
        "Monitoring container performance",
        "Securing container networks"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "Container orchestration manages the deployment, scaling, networking, and lifecycle of containers across a cluster of machines."
    },
    {
      id: 39,
      question: "What is the purpose of correlation IDs?",
      options: [
        "Database relationships",
        "Tracking requests across multiple services",
        "Load balancing decisions",
        "Security authentication"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Correlation IDs help track a single request as it flows through multiple microservices, enabling better debugging and monitoring."
    },
    {
      id: 40,
      question: "What is canary deployment?",
      options: [
        "Deploying to a small subset of users first",
        "Deploying only to production",
        "Deploying with yellow warning flags",
        "Emergency rollback deployment"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "Canary deployment gradually rolls out changes to a small subset of users before full deployment, reducing risk."
    },

    // ADVANCED LEVEL QUESTIONS (41-60)
    {
      id: 41,
      question: "How does the Two-Phase Commit protocol work in distributed transactions?",
      options: [
        "It commits all transactions immediately",
        "It uses prepare and commit phases with a coordinator",
        "It only works with two services",
        "It doesn't handle failures"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Two-Phase Commit uses a coordinator to first prepare all participants, then commit the transaction only if all participants agree."
    },
    {
      id: 42,
      question: "What are the trade-offs of using eventual consistency vs strong consistency?",
      options: [
        "Eventual consistency offers better performance but weaker guarantees",
        "Strong consistency is always better",
        "There are no trade-offs",
        "Eventual consistency is only for NoSQL databases"
      ],
      correctAnswer: 0,
      difficulty: "advanced",
      explanation: "Eventual consistency provides better performance and availability but offers weaker consistency guarantees compared to strong consistency."
    },
    {
      id: 43,
      question: "In the context of microservices, what is the difference between orchestration and choreography?",
      options: [
        "No difference, they're the same",
        "Orchestration uses a central coordinator, choreography is decentralized",
        "Choreography is only for databases",
        "Orchestration is faster than choreography"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Orchestration uses a central service to coordinate interactions, while choreography allows services to interact directly based on events."
    },
    {
      id: 44,
      question: "What is the polyglot persistence approach in microservices?",
      options: [
        "Using only one database technology",
        "Using different database technologies for different services",
        "Supporting multiple programming languages",
        "Using multiple data centers"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Polyglot persistence allows different microservices to use the most appropriate database technology for their specific needs."
    },
    {
      id: 45,
      question: "How does the CQRS pattern handle eventual consistency?",
      options: [
        "It doesn't handle consistency",
        "It uses event sourcing and read model projections",
        "It requires immediate consistency",
        "It only works with SQL databases"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "CQRS often uses event sourcing and asynchronously updates read models, accepting eventual consistency for better performance."
    },
    {
      id: 46,
      question: "What is the purpose of domain-driven design (DDD) in microservices architecture?",
      options: [
        "Database design only",
        "Identifying service boundaries based on business domains",
        "User interface design",
        "Network configuration"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "DDD helps identify appropriate microservice boundaries by analyzing business domains and their bounded contexts."
    },
    {
      id: 47,
      question: "How does distributed consensus work in systems like Raft or Paxos?",
      options: [
        "All nodes must agree simultaneously",
        "A majority of nodes must agree on a decision",
        "Only the leader node decides",
        "Consensus is not needed"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Distributed consensus algorithms like Raft and Paxos require a majority of nodes to agree on decisions to ensure consistency and fault tolerance."
    },
    {
      id: 48,
      question: "What is the outbox pattern and why is it used?",
      options: [
        "A deployment pattern",
        "Ensuring reliable message publication in distributed transactions",
        "A security pattern",
        "A testing pattern"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "The outbox pattern ensures reliable message publication by storing events in the same database transaction as business data, then publishing them separately."
    },
    {
      id: 49,
      question: "How do you handle data consistency across microservices without distributed transactions?",
      options: [
        "You can't maintain consistency",
        "Use sagas, event sourcing, and eventual consistency",
        "Always use distributed transactions",
        "Merge all services into one"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Data consistency can be maintained using patterns like sagas for distributed transactions, event sourcing, and accepting eventual consistency."
    },
    {
      id: 50,
      question: "What is the shared-nothing architecture principle?",
      options: [
        "Services share databases",
        "Services don't share any resources or state",
        "Services share memory",
        "Services share configuration"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Shared-nothing architecture means each service manages its own resources and state independently, improving scalability and fault isolation."
    },
    {
      id: 51,
      question: "How does backpressure work in reactive systems?",
      options: [
        "It prevents system startup",
        "Consumers signal producers to slow down when overwhelmed",
        "It only applies to databases",
        "It speeds up processing"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Backpressure allows overwhelmed consumers to signal upstream producers to slow down, preventing system overload."
    },
    {
      id: 52,
      question: "What is the difference between horizontal and vertical partitioning in databases?",
      options: [
        "No difference",
        "Horizontal splits by rows, vertical splits by columns",
        "Horizontal is faster",
        "Vertical requires more servers"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Horizontal partitioning (sharding) splits data by rows across multiple databases, while vertical partitioning splits by columns."
    },
    {
      id: 53,
      question: "How do you implement distributed caching in microservices?",
      options: [
        "Each service has its own cache only",
        "Use a shared cache layer with cache invalidation strategies",
        "Never use caching",
        "Only cache in the database"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Distributed caching uses shared cache layers with proper invalidation strategies to maintain consistency across services."
    },
    {
      id: 54,
      question: "What is the command query responsibility segregation (CQRS) write model optimization?",
      options: [
        "Optimizing for read operations",
        "Optimizing write operations separately from reads",
        "No optimization needed",
        "Optimizing network calls"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "CQRS allows separate optimization of write models for commands and read models for queries, improving overall performance."
    },
    {
      id: 55,
      question: "How do you handle cross-cutting concerns in microservices?",
      options: [
        "Ignore them",
        "Use service mesh, sidecar patterns, and shared libraries",
        "Implement in each service separately",
        "Use only centralized solutions"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Cross-cutting concerns like logging, security, and monitoring can be handled through service mesh, sidecar patterns, and carefully designed shared libraries."
    },
    {
      id: 56,
      question: "What is the difference between pessimistic and optimistic locking in distributed systems?",
      options: [
        "No difference",
        "Pessimistic locks immediately, optimistic checks at commit time",
        "Optimistic is always better",
        "They only apply to databases"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Pessimistic locking locks resources immediately to prevent conflicts, while optimistic locking checks for conflicts only at commit time."
    },
    {
      id: 57,
      question: "How do you implement gradual rollouts with feature flags in microservices?",
      options: [
        "Deploy to all services at once",
        "Use dynamic configuration and percentage-based routing",
        "Manual deployment only",
        "Feature flags don't work with microservices"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Feature flags enable gradual rollouts through dynamic configuration and percentage-based routing, allowing controlled feature exposure."
    },
    {
      id: 58,
      question: "What is the materialized view pattern in CQRS?",
      options: [
        "Storing raw events only",
        "Pre-computed, optimized read models updated asynchronously",
        "Real-time database views",
        "Caching strategy only"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Materialized views in CQRS are pre-computed, optimized read models that are updated asynchronously from the write side events."
    },
    {
      id: 59,
      question: "How do you handle temporal coupling in microservices architecture?",
      options: [
        "Accept it as unavoidable",
        "Use asynchronous messaging and event-driven architecture",
        "Synchronize all services",
        "Merge coupled services"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Temporal coupling can be reduced through asynchronous messaging, event-driven architecture, and designing for eventual consistency."
    },
    {
      id: 60,
      question: "What is the bounded context concept in domain-driven design for microservices?",
      options: [
        "Technical service boundaries",
        "Logical boundaries where a domain model applies consistently",
        "Physical server boundaries",
        "Database table boundaries"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Bounded context defines the logical boundary within which a particular domain model is consistent and applicable, often corresponding to microservice boundaries."
    }
  ]
};

module.exports = microserviceTopic;
