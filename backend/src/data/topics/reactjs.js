// ReactJS Quiz Topic
const reactjsTopic = {
  id: 'reactjs',
  name: 'ReactJS',
  description: 'React JavaScript Library for building user interfaces',
  icon: '⚛️',
  timeLimit: 300, // 5 minutes
  passingScore: 60,
  questions: [
    {
      id: 1,
      question: "What is the correct way to create a functional component in React?",
      options: [
        "const MyComponent = () => { return <div>Hello</div>; }",
        "function MyComponent() { return <div>Hello</div>; }",
        "const MyComponent = function() { return <div>Hello</div>; }",
        "All of the above"
      ],
      correctAnswer: 3,
      difficulty: "beginner",
      explanation: "All three approaches are valid ways to create functional components in React. You can use arrow functions, function declarations, or function expressions."
    },
    {
      id: 2,
      question: "Which React Hook is used to manage state in functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "useState is the fundamental Hook for managing state in functional components. It returns an array with the current state value and a setter function."
    },
    {
      id: 3,
      question: "What is the purpose of the useEffect Hook?",
      options: [
        "To manage component state",
        "To handle side effects and lifecycle events",
        "To create context providers",
        "To optimize component rendering"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "useEffect is used to handle side effects like data fetching, subscriptions, DOM manipulation, and replaces lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount."
    },
    {
      id: 4,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "Java Syntax Extension", 
        "JavaScript Extension",
        "Just Syntax Extension"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "JSX stands for JavaScript XML. It's a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript, making React components more readable and expressive."
    },
    {
      id: 5,
      question: "How do you pass data from a parent component to a child component?",
      options: [
        "Using state",
        "Using props",
        "Using context",
        "Using refs"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Props (properties) are the standard way to pass data from parent to child components in React. They are read-only and help maintain the unidirectional data flow."
    }
  ]
};

module.exports = reactjsTopic;
