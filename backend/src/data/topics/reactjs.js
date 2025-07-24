// ReactJS Quiz Topic
const reactjsTopic = {
  id: 'reactjs',
  name: 'ReactJS',
  description: 'React JavaScript Library for building user interfaces',
  icon: '⚛️',
  timeLimit: 960, // 16 minutes
  passingScore: 80,
  questions: [
    // BEGINNER LEVEL QUESTIONS (1-50)
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
    },
    {
      id: 6,
      question: "What is the correct syntax for conditional rendering in JSX?",
      options: [
        "{condition ? <div>True</div> : <div>False</div>}",
        "{if(condition) <div>True</div>}",
        "{condition && <div>True</div>}",
        "Both A and C"
      ],
      correctAnswer: 3,
      difficulty: "beginner",
      explanation: "Both ternary operator (condition ? true : false) and logical AND (condition && element) are valid JSX conditional rendering patterns."
    },
    {
      id: 7,
      question: "What is the purpose of the key prop in React lists?",
      options: [
        "To style list items",
        "To help React identify changed items for efficient re-rendering",
        "To set the order of items",
        "To make items clickable"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The key prop helps React identify which items have changed, been added, or removed, enabling efficient re-rendering of lists."
    },
    {
      id: 8,
      question: "What is the difference between state and props?",
      options: [
        "No difference, they're the same",
        "State is mutable, props are immutable",
        "Props are mutable, state is immutable",
        "Both are always immutable"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "State is mutable data managed within a component, while props are immutable data passed from parent to child components."
    },
    {
      id: 9,
      question: "How do you handle events in React?",
      options: [
        "Using onclick attribute",
        "Using onClick prop with camelCase",
        "Using addEventListener",
        "Using event handlers in HTML"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "React uses camelCase event props like onClick, onChange, onSubmit to handle events, which are SyntheticEvents that wrap native events."
    },
    {
      id: 10,
      question: "What is a React Fragment?",
      options: [
        "A broken component",
        "A way to group elements without adding extra DOM nodes",
        "A component lifecycle method",
        "A state management tool"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "React.Fragment (or <>) allows you to group multiple elements without adding an extra wrapper element to the DOM."
    },
    {
      id: 11,
      question: "What is the correct way to update state in a functional component?",
      options: [
        "state.count = 5",
        "setState({count: 5})",
        "setCount(5)",
        "updateState({count: 5})"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "When using useState, you call the setter function (setCount) to update state. Direct mutation of state is not allowed."
    },
    {
      id: 12,
      question: "What is the Virtual DOM?",
      options: [
        "A physical representation of the DOM",
        "A JavaScript representation of the real DOM kept in memory",
        "A browser API",
        "A CSS framework"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The Virtual DOM is a JavaScript representation of the real DOM kept in memory, which React uses to efficiently update the actual DOM."
    },
    {
      id: 13,
      question: "How do you create a class component in React?",
      options: [
        "class MyComponent extends React.Component",
        "class MyComponent extends Component",
        "Both A and B are correct",
        "class MyComponent implements Component"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "Both syntaxes are correct: you can extend React.Component or import Component and extend it directly."
    },
    {
      id: 14,
      question: "What is the purpose of the render method in class components?",
      options: [
        "To handle events",
        "To return JSX that describes the UI",
        "To manage state",
        "To handle lifecycle events"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The render method in class components returns JSX that describes what the UI should look like for the current state and props."
    },
    {
      id: 15,
      question: "What is the correct way to import React?",
      options: [
        "import React from 'react'",
        "import * as React from 'react'",
        "const React = require('react')",
        "All of the above"
      ],
      correctAnswer: 3,
      difficulty: "beginner",
      explanation: "All three import syntaxes are valid ways to import React, though ES6 import syntax is most commonly used."
    },
    {
      id: 16,
      question: "What does the useState Hook return?",
      options: [
        "The current state value",
        "A function to update state",
        "An array with state value and setter function",
        "An object with state properties"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "useState returns an array with two elements: the current state value and a function to update that state."
    },
    {
      id: 17,
      question: "What is the purpose of React.StrictMode?",
      options: [
        "To enforce coding standards",
        "To identify potential problems and side effects in development",
        "To improve performance",
        "To handle errors"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "React.StrictMode helps identify potential problems by intentionally double-invoking functions and highlighting unsafe patterns in development mode."
    },
    {
      id: 18,
      question: "How do you add CSS classes to JSX elements?",
      options: [
        "Using class attribute",
        "Using className attribute",
        "Using css attribute",
        "Using style attribute only"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "JSX uses className instead of class because class is a reserved keyword in JavaScript."
    },
    {
      id: 19,
      question: "What is the correct way to handle form inputs in React?",
      options: [
        "Using uncontrolled components only",
        "Using controlled components with state",
        "Using direct DOM manipulation",
        "Using jQuery"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Controlled components where form input values are controlled by React state are the recommended approach for handling forms."
    },
    {
      id: 20,
      question: "What is the default behavior of useEffect without dependencies?",
      options: [
        "Runs once on mount",
        "Runs on every render",
        "Never runs",
        "Runs only on unmount"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "useEffect without a dependency array runs after every render, including the initial render and all updates."
    },
    {
      id: 21,
      question: "What is the correct way to destructure props in a functional component?",
      options: [
        "function MyComponent({name, age}) { return <div>{name}</div>; }",
        "function MyComponent(props) { const {name, age} = props; return <div>{name}</div>; }",
        "Both A and B are correct",
        "function MyComponent(...props) { return <div>{props.name}</div>; }"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "Both destructuring in the parameter list and destructuring inside the function body are valid approaches for accessing props."
    },
    {
      id: 22,
      question: "What is the purpose of the React.createElement function?",
      options: [
        "To create DOM elements",
        "To create React elements (what JSX compiles to)",
        "To create new components",
        "To create event handlers"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "React.createElement is what JSX compiles to. It creates React elements that describe what should appear on the screen."
    },
    {
      id: 23,
      question: "How do you add inline styles to a React element?",
      options: [
        "style=\"color: red\"",
        "style={{color: 'red'}}",
        "css={{color: 'red'}}",
        "inlineStyle={{color: 'red'}}"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "React uses the style prop with a JavaScript object where CSS properties are camelCased and values are strings."
    },
    {
      id: 24,
      question: "What is the difference between a React element and a React component?",
      options: [
        "No difference, they're the same",
        "Element is an instance of a component",
        "Component is a function/class, element is what it returns",
        "Elements are faster than components"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "A component is a function or class that returns JSX, while an element is the actual JSX that describes the UI structure."
    },
    {
      id: 25,
      question: "How do you comment in JSX?",
      options: [
        "// This is a comment",
        "<!-- This is a comment -->",
        "{/* This is a comment */}",
        "/* This is a comment */"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "JSX comments use the {/* */} syntax because they need to be JavaScript expressions within the JSX."
    },
    {
      id: 26,
      question: "What is the correct way to render a list of items in React?",
      options: [
        "items.map(item => <div>{item.name}</div>)",
        "items.map(item => <div key={item.id}>{item.name}</div>)",
        "items.forEach(item => <div>{item.name}</div>)",
        "for(let item of items) <div>{item.name}</div>"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Use the map method to transform array items into JSX elements, and always provide a unique key prop for each item."
    },
    {
      id: 27,
      question: "What happens if you don't provide a key prop in a list?",
      options: [
        "The app crashes",
        "React shows a warning and may have performance issues",
        "Nothing happens",
        "The list doesn't render"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "React will show a warning in the console and may have performance issues when updating the list because it can't efficiently track changes."
    },
    {
      id: 28,
      question: "How do you create a default value for a useState Hook?",
      options: [
        "useState() with no arguments",
        "useState(defaultValue)",
        "useState().default(value)",
        "useState.default(value)"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "You pass the initial/default value as an argument to useState, like useState('default value') or useState(0)."
    },
    {
      id: 29,
      question: "What is the correct syntax for a React component that takes children?",
      options: [
        "function MyComponent(children) { return <div>{children}</div>; }",
        "function MyComponent({children}) { return <div>{children}</div>; }",
        "function MyComponent(props.children) { return <div>{props.children}</div>; }",
        "function MyComponent() { return <div>{this.children}</div>; }"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Children are passed as a special prop called 'children' which can be destructured from props or accessed as props.children."
    },
    {
      id: 30,
      question: "What is the purpose of the useEffect cleanup function?",
      options: [
        "To clean up the component's state",
        "To remove event listeners and cancel subscriptions",
        "To delete the component",
        "To clear the console"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The cleanup function returned by useEffect is used to clean up subscriptions, event listeners, or timers to prevent memory leaks."
    },
    {
      id: 31,
      question: "How do you prevent a form from submitting in React?",
      options: [
        "return false",
        "event.preventDefault()",
        "event.stopPropagation()",
        "event.cancel()"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Use event.preventDefault() in the form's onSubmit handler to prevent the default form submission behavior."
    },
    {
      id: 32,
      question: "What is the correct way to conditionally apply a CSS class in React?",
      options: [
        "className={condition ? 'class1' : 'class2'}",
        "class={condition ? 'class1' : 'class2'}",
        "className={condition && 'class1'}",
        "Both A and C are correct"
      ],
      correctAnswer: 3,
      difficulty: "beginner",
      explanation: "Both ternary operator for choosing between classes and logical AND for conditionally applying a class are valid patterns."
    },
    {
      id: 33,
      question: "What is the difference between function components and arrow function components?",
      options: [
        "Function components are faster",
        "Arrow functions don't have their own 'this' binding",
        "No functional difference in React",
        "Arrow functions can't use Hooks"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "In React functional components, there's no practical difference between function declarations and arrow functions since we don't use 'this'."
    },
    {
      id: 34,
      question: "How do you handle input changes in a controlled component?",
      options: [
        "Use the onChange event handler",
        "Use the onInput event handler",
        "Use the onUpdate event handler",
        "Use the onType event handler"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Use the onChange event handler to capture input changes and update the component's state accordingly."
    },
    {
      id: 35,
      question: "What is the correct way to set initial state based on props?",
      options: [
        "useState(props.initialValue)",
        "useState(() => props.initialValue)",
        "Both A and B are correct",
        "useState().setInitial(props.initialValue)"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "Both approaches work, but using a function (lazy initial state) is preferred when the initial value is expensive to compute."
    },
    {
      id: 36,
      question: "What does the 'React' import provide access to?",
      options: [
        "Only JSX compilation",
        "React.createElement, React.Fragment, and other React APIs",
        "Only component creation",
        "Only Hook functions"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "The React import provides access to React.createElement (for JSX), React.Fragment, React.StrictMode, and other core React APIs."
    },
    {
      id: 37,
      question: "How do you display a variable value in JSX?",
      options: [
        "Using curly braces: {variableName}",
        "Using double quotes: \"variableName\"",
        "Using dollar sign: $variableName",
        "Using parentheses: (variableName)"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Use curly braces {} to embed JavaScript expressions, including variables, in JSX."
    },
    {
      id: 38,
      question: "What is the correct way to update an object in state?",
      options: [
        "setState({...state, newProperty: value})",
        "setState(state.newProperty = value)",
        "state.newProperty = value",
        "setState(Object.assign(state, {newProperty: value}))"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Always create a new object using the spread operator to ensure React detects the state change and re-renders."
    },
    {
      id: 39,
      question: "What is the purpose of React Developer Tools?",
      options: [
        "To write React code",
        "To debug and inspect React components in the browser",
        "To deploy React applications",
        "To test React components"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "React Developer Tools is a browser extension that allows you to inspect React component hierarchies, props, state, and performance."
    },
    {
      id: 40,
      question: "How do you create a multi-line JSX element?",
      options: [
        "Wrap in parentheses: (JSX)",
        "Use semicolons between lines",
        "Use plus signs to concatenate",
        "Multi-line JSX is not allowed"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Wrap multi-line JSX in parentheses to avoid automatic semicolon insertion issues and improve readability."
    },
    {
      id: 41,
      question: "What is the correct way to bind event handlers in functional components?",
      options: [
        "No binding needed, just pass the function reference",
        "Use .bind(this)",
        "Use arrow functions in render",
        "Use Function.prototype.call"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Functional components don't need binding like class components. Just pass the function reference or define inline arrow functions."
    },
    {
      id: 42,
      question: "How do you create a component that accepts optional props?",
      options: [
        "Props are optional by default",
        "Use defaultProps",
        "Use default parameters in function signature",
        "All of the above"
      ],
      correctAnswer: 3,
      difficulty: "beginner",
      explanation: "Props are optional by default, and you can provide defaults using defaultProps or ES6 default parameters."
    },
    {
      id: 43,
      question: "What is the correct way to import a named export in React?",
      options: [
        "import {ComponentName} from './Component'",
        "import ComponentName from './Component'",
        "import * as ComponentName from './Component'",
        "import './Component' as ComponentName"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Use curly braces {} to import named exports. Default exports don't need curly braces."
    },
    {
      id: 44,
      question: "How do you create a simple counter component with useState?",
      options: [
        "const [count] = useState(0); <button onClick={() => count++}>",
        "const [count, setCount] = useState(0); <button onClick={() => setCount(count + 1)}>",
        "const count = useState(0); <button onClick={() => count++}>",
        "const [count, setCount] = useState(); <button onClick={() => setCount++}>"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Destructure useState to get the current value and setter function, then use the setter to update state."
    },
    {
      id: 45,
      question: "What is the purpose of the 'key' prop in React?",
      options: [
        "To uniquely identify elements for efficient re-rendering",
        "To set the display order of elements",
        "To provide accessibility features",
        "To style elements"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "The key prop helps React identify which items have changed, been added, or removed, enabling efficient updates to lists."
    },
    {
      id: 46,
      question: "How do you create a component with multiple return statements?",
      options: [
        "Not possible in React",
        "Use if-else statements with early returns",
        "Use switch statements",
        "Both B and C are correct"
      ],
      correctAnswer: 3,
      difficulty: "beginner",
      explanation: "You can use conditional statements like if-else or switch with early returns to conditionally render different JSX."
    },
    {
      id: 47,
      question: "What is the correct way to handle multiple input fields in a form?",
      options: [
        "Create separate useState for each field",
        "Use one useState with an object containing all fields",
        "Both A and B are valid approaches",
        "Use refs for all inputs"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "Both approaches work: separate useState hooks for each field or one useState with an object. Choose based on your needs."
    },
    {
      id: 48,
      question: "How do you create a React component that renders nothing?",
      options: [
        "return null",
        "return undefined",
        "return false",
        "return ''"
      ],
      correctAnswer: 0,
      difficulty: "beginner",
      explanation: "Return null from a component to render nothing. This is a valid way to conditionally hide components."
    },
    {
      id: 49,
      question: "What is the correct syntax for a React functional component with TypeScript?",
      options: [
        "const MyComponent: React.FC = () => <div>Hello</div>",
        "function MyComponent(): JSX.Element { return <div>Hello</div>; }",
        "Both A and B are correct",
        "const MyComponent = (): React.Component => <div>Hello</div>"
      ],
      correctAnswer: 2,
      difficulty: "beginner",
      explanation: "Both React.FC (FunctionComponent) and explicit JSX.Element return types are valid TypeScript patterns for React components."
    },
    {
      id: 50,
      question: "How do you pass data from child to parent component?",
      options: [
        "Using props",
        "Using callback functions passed as props",
        "Using global variables",
        "Using localStorage"
      ],
      correctAnswer: 1,
      difficulty: "beginner",
      explanation: "Pass callback functions from parent to child as props. The child can call these functions to send data back to the parent."
    },

    // INTERMEDIATE LEVEL QUESTIONS (51-100)
    {
      id: 51,
      question: "What is the purpose of the dependency array in useEffect?",
      options: [
        "To list all variables used in the effect",
        "To control when the effect should re-run",
        "To prevent memory leaks",
        "To improve performance"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "The dependency array controls when useEffect re-runs. The effect only re-runs when one of the dependencies changes."
    },
    {
      id: 52,
      question: "What is React Context used for?",
      options: [
        "State management within a component",
        "Sharing data across component tree without prop drilling",
        "Component styling",
        "Event handling"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React Context provides a way to share data across the component tree without having to pass props down manually at every level."
    },
    {
      id: 53,
      question: "What is the difference between useCallback and useMemo?",
      options: [
        "No difference",
        "useCallback memoizes functions, useMemo memoizes values",
        "useMemo is faster",
        "useCallback is for class components only"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useCallback memoizes function references to prevent unnecessary re-renders, while useMemo memoizes computed values."
    },
    {
      id: 54,
      question: "What is prop drilling and how can it be avoided?",
      options: [
        "A performance optimization technique",
        "Passing props through multiple component levels; avoided with Context or state management",
        "A debugging method",
        "A component testing strategy"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Prop drilling is passing props through multiple component levels. It can be avoided using Context API or state management libraries."
    },
    {
      id: 55,
      question: "What is the purpose of useReducer Hook?",
      options: [
        "To reduce component size",
        "To manage complex state logic with actions",
        "To improve performance",
        "To replace useState completely"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useReducer is useful for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one."
    },
    {
      id: 56,
      question: "What are controlled vs uncontrolled components?",
      options: [
        "No difference",
        "Controlled components have state managed by React, uncontrolled use DOM state",
        "Controlled components are faster",
        "Uncontrolled components are always better"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Controlled components have their state managed by React, while uncontrolled components store their state in the DOM."
    },
    {
      id: 57,
      question: "What is React.memo and when should it be used?",
      options: [
        "A Hook for memoization",
        "A HOC that prevents re-renders when props haven't changed",
        "A state management tool",
        "A testing utility"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React.memo is a higher-order component that memoizes the result and skips re-rendering if props haven't changed."
    },
    {
      id: 58,
      question: "What is the purpose of useRef Hook?",
      options: [
        "To manage state",
        "To access DOM elements and persist values across renders",
        "To handle side effects",
        "To create context"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useRef provides a way to access DOM elements directly and persist mutable values across renders without triggering re-renders."
    },
    {
      id: 59,
      question: "What is lazy loading in React?",
      options: [
        "Loading components slowly",
        "Loading components only when needed using React.lazy",
        "A performance anti-pattern",
        "Loading data asynchronously"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Lazy loading allows you to load components only when they're needed using React.lazy and Suspense, improving initial load times."
    },
    {
      id: 60,
      question: "What are Error Boundaries?",
      options: [
        "Components that catch JavaScript errors in component tree",
        "CSS boundaries for styling",
        "Network error handlers",
        "Form validation boundaries"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree and display fallback UI."
    },
    {
      id: 61,
      question: "What is the purpose of React.Suspense?",
      options: [
        "To suspend component execution",
        "To handle loading states for lazy components and data fetching",
        "To pause animations",
        "To debug components"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React.Suspense allows you to handle loading states for lazy-loaded components and async operations with fallback UI."
    },
    {
      id: 62,
      question: "What is the difference between useLayoutEffect and useEffect?",
      options: [
        "No difference",
        "useLayoutEffect runs synchronously after DOM mutations",
        "useLayoutEffect is faster",
        "useEffect is deprecated"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useLayoutEffect runs synchronously after all DOM mutations but before the browser paints, useful for DOM measurements."
    },
    {
      id: 63,
      question: "What are Higher-Order Components (HOCs)?",
      options: [
        "Components with higher priority",
        "Functions that take a component and return a new component",
        "Components at the top of the tree",
        "Complex components with many features"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "HOCs are functions that take a component and return a new component, used for sharing logic between components."
    },
    {
      id: 64,
      question: "What is the purpose of React.forwardRef?",
      options: [
        "To forward state to child components",
        "To forward refs through component hierarchy",
        "To forward props automatically",
        "To forward events"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React.forwardRef allows you to forward refs through component hierarchy to access child component's DOM nodes."
    },
    {
      id: 65,
      question: "What is the synthetic event system in React?",
      options: [
        "Artificial events for testing",
        "Cross-browser wrapper around native events",
        "Events that don't exist in browsers",
        "Events created by third-party libraries"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "SyntheticEvents are React's cross-browser wrapper around native events, providing consistent behavior across browsers."
    },
    {
      id: 66,
      question: "What is the purpose of custom Hooks?",
      options: [
        "To replace built-in Hooks",
        "To extract and reuse stateful logic between components",
        "To improve performance",
        "To handle errors"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Custom Hooks allow you to extract stateful logic into reusable functions that can be shared between components."
    },
    {
      id: 67,
      question: "What is the reconciliation process in React?",
      options: [
        "Error handling process",
        "Algorithm to determine minimum DOM changes needed",
        "State synchronization",
        "Component mounting process"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Reconciliation is React's algorithm for determining what changes need to be made to the DOM to update the UI efficiently."
    },
    {
      id: 68,
      question: "What are React Portals?",
      options: [
        "Entry points to applications",
        "Way to render children into DOM nodes outside parent hierarchy",
        "Navigation components",
        "Data loading mechanisms"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Portals provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component."
    },
    {
      id: 69,
      question: "What is the purpose of useImperativeHandle?",
      options: [
        "To handle imperative programming",
        "To customize ref exposure from child to parent",
        "To improve performance",
        "To handle side effects"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useImperativeHandle customizes the instance value that is exposed to parent components when using ref."
    },
    {
      id: 70,
      question: "What is render optimization and why is it important?",
      options: [
        "Making components look better",
        "Preventing unnecessary re-renders to improve performance",
        "Rendering components faster",
        "Optimizing CSS rendering"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Render optimization prevents unnecessary re-renders using techniques like React.memo, useMemo, and useCallback to improve performance."
    },
    {
      id: 71,
      question: "What is the difference between state updates and refs in terms of re-rendering?",
      options: [
        "Both trigger re-renders",
        "State updates trigger re-renders, ref updates don't",
        "Refs trigger re-renders, state updates don't",
        "Neither triggers re-renders"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "State updates trigger component re-renders, while ref updates are mutable and don't cause re-renders, making them useful for values that don't affect the UI."
    },
    {
      id: 72,
      question: "How do you properly handle async operations in useEffect?",
      options: [
        "Make useEffect itself async",
        "Create async function inside useEffect and call it",
        "Use await directly in useEffect",
        "Use .then() chains only"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Create an async function inside useEffect and call it immediately, since useEffect cannot be async itself."
    },
    {
      id: 73,
      question: "What is the purpose of the React.Children API?",
      options: [
        "To create child components",
        "To manipulate and iterate over children props",
        "To count child elements",
        "To style child components"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React.Children provides utilities to manipulate the children prop, including map, forEach, count, and toArray methods."
    },
    {
      id: 74,
      question: "What is the difference between defaultProps and default parameters?",
      options: [
        "No difference",
        "defaultProps is for class components, default parameters for functions",
        "defaultProps works for all props, default parameters only for destructured props",
        "Default parameters are newer and better"
      ],
      correctAnswer: 2,
      difficulty: "intermediate",
      explanation: "defaultProps sets defaults for all props, while default parameters only work for destructured props in the function signature."
    },
    {
      id: 75,
      question: "How do you implement component composition in React?",
      options: [
        "Using inheritance",
        "Using children props and render props patterns",
        "Using mixins",
        "Using global state"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React favors composition over inheritance using children props, render props, and higher-order components to share functionality."
    },
    {
      id: 76,
      question: "What is the purpose of displayName in React components?",
      options: [
        "To set the component's visible name",
        "To help with debugging in React DevTools",
        "To define component hierarchy",
        "To set accessibility labels"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "displayName is used by React DevTools to show meaningful component names in the component tree for easier debugging."
    },
    {
      id: 77,
      question: "How do you handle focus management in React applications?",
      options: [
        "Use autofocus attributes",
        "Use refs with focus() method and proper event handling",
        "Focus is handled automatically",
        "Use CSS focus selectors only"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Use refs to access DOM elements and call focus() method, combined with proper keyboard event handling for accessibility."
    },
    {
      id: 78,
      question: "What is the difference between React.cloneElement and React.createElement?",
      options: [
        "No difference",
        "cloneElement copies existing elements, createElement creates new ones",
        "cloneElement is faster",
        "createElement is deprecated"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React.cloneElement clones and returns a new React element with new props, while createElement creates a completely new element."
    },
    {
      id: 79,
      question: "How do you implement proper form validation in React?",
      options: [
        "Use HTML5 validation only",
        "Combine controlled components, state management, and validation libraries",
        "Use uncontrolled components only",
        "Validation is not needed in React"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Effective form validation combines controlled components for real-time feedback, state management for validation errors, and validation libraries for complex rules."
    },
    {
      id: 80,
      question: "What is the purpose of React.StrictMode's double invocation?",
      options: [
        "To improve performance",
        "To detect side effects and help identify problems",
        "To run code twice for redundancy",
        "To test component stability"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "StrictMode intentionally double-invokes functions to help detect side effects and ensure components are resilient to being called multiple times."
    },
    {
      id: 81,
      question: "How do you implement conditional CSS classes efficiently?",
      options: [
        "Use multiple className props",
        "Use template literals or libraries like classnames",
        "Use inline styles only",
        "Use CSS variables"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Use template literals for simple cases or libraries like 'classnames' for complex conditional CSS class logic."
    },
    {
      id: 82,
      question: "What is the purpose of the useDebugValue Hook?",
      options: [
        "To debug component state",
        "To display debug information in React DevTools for custom hooks",
        "To log errors",
        "To measure performance"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useDebugValue displays custom hook debug information in React DevTools, helping developers understand custom hook behavior."
    },
    {
      id: 83,
      question: "How do you handle dynamic imports for code splitting?",
      options: [
        "Use import() with React.lazy and Suspense",
        "Use require() statements",
        "Use webpack directly",
        "Dynamic imports are not supported"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "Use dynamic import() with React.lazy() to create lazy-loaded components and Suspense to handle loading states."
    },
    {
      id: 84,
      question: "What is the difference between functional and class component lifecycle?",
      options: [
        "No lifecycle in functional components",
        "useEffect replaces lifecycle methods in functional components",
        "Class components are faster",
        "Functional components have more lifecycle methods"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Functional components use useEffect to replicate class component lifecycle methods like componentDidMount, componentDidUpdate, and componentWillUnmount."
    },
    {
      id: 85,
      question: "How do you implement proper state management for complex forms?",
      options: [
        "Use multiple useState hooks",
        "Use useReducer for complex state logic",
        "Use global state only",
        "Use localStorage"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useReducer is ideal for complex form state management as it handles multiple related state updates and complex state transitions."
    },
    {
      id: 86,
      question: "What is the purpose of React's key prop beyond list rendering?",
      options: [
        "Only used for lists",
        "Forces component remount when key changes",
        "Improves performance always",
        "Required for all components"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Changing a component's key forces React to unmount and remount the component, useful for resetting component state."
    },
    {
      id: 87,
      question: "How do you implement proper event delegation in React?",
      options: [
        "React handles it automatically through SyntheticEvents",
        "Use addEventListener manually",
        "Event delegation is not needed",
        "Use jQuery for event delegation"
      ],
      correctAnswer: 0,
      difficulty: "intermediate",
      explanation: "React automatically implements event delegation through its SyntheticEvent system, attaching listeners to the document root."
    },
    {
      id: 88,
      question: "What is the difference between useCallback and creating functions in render?",
      options: [
        "No difference",
        "useCallback prevents function recreation on every render",
        "useCallback is always faster",
        "Functions in render are deprecated"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "useCallback memoizes function references, preventing unnecessary re-creations and child re-renders when the function is passed as a prop."
    },
    {
      id: 89,
      question: "How do you handle component communication without prop drilling?",
      options: [
        "Use global variables",
        "Use Context API, custom hooks, or state management libraries",
        "Always use prop drilling",
        "Use localStorage for communication"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Avoid prop drilling using Context API for theme/auth data, custom hooks for shared logic, or state management libraries for complex state."
    },
    {
      id: 90,
      question: "What is the purpose of React.Fragment's key prop?",
      options: [
        "Fragments don't support keys",
        "To identify fragments in lists of fragments",
        "For styling fragments",
        "Keys are not needed for fragments"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "When rendering lists of fragments, use the full <React.Fragment key={id}> syntax instead of <> to provide keys for efficient reconciliation."
    },
    {
      id: 91,
      question: "How do you implement proper component testing with React Testing Library?",
      options: [
        "Test implementation details",
        "Test user interactions and accessibility",
        "Test only props and state",
        "Testing is not necessary"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React Testing Library encourages testing user interactions and behavior rather than implementation details, focusing on accessibility and user experience."
    },
    {
      id: 92,
      question: "What is the difference between controlled and uncontrolled inputs in forms?",
      options: [
        "No difference",
        "Controlled inputs have value from state, uncontrolled use defaultValue",
        "Controlled inputs are always better",
        "Uncontrolled inputs are faster"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Controlled inputs get their value from React state and update via onChange, while uncontrolled inputs use defaultValue and are managed by the DOM."
    },
    {
      id: 93,
      question: "How do you implement proper loading states in React?",
      options: [
        "Use global loading state only",
        "Combine local state, Suspense, and loading indicators",
        "Loading states are handled automatically",
        "Use CSS animations only"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Implement loading states using local component state for data fetching, Suspense for lazy loading, and proper loading indicators for user feedback."
    },
    {
      id: 94,
      question: "What is the purpose of React's Profiler component?",
      options: [
        "To profile user behavior",
        "To measure component performance and render times",
        "To profile network requests",
        "To profile memory usage"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React Profiler component measures rendering performance, providing data about component render times and what caused re-renders."
    },
    {
      id: 95,
      question: "How do you handle component state persistence across unmounts?",
      options: [
        "State automatically persists",
        "Use external storage like localStorage or state management libraries",
        "Use refs to preserve state",
        "State persistence is not possible"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Component state is lost on unmount. Use localStorage, sessionStorage, or state management libraries to persist state across component lifecycles."
    },
    {
      id: 96,
      question: "What is the difference between React.memo and useMemo?",
      options: [
        "No difference",
        "React.memo wraps components, useMemo memoizes values",
        "useMemo is for components only",
        "React.memo is deprecated"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React.memo is a higher-order component that memoizes component renders, while useMemo memoizes computed values within components."
    },
    {
      id: 97,
      question: "How do you implement proper SEO optimization in React?",
      options: [
        "SEO is not possible with React",
        "Use server-side rendering, meta tags, and structured data",
        "Use only client-side rendering",
        "SEO is handled automatically"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "React SEO requires server-side rendering or static generation, proper meta tag management, structured data, and ensuring content is crawlable."
    },
    {
      id: 98,
      question: "What is the purpose of React's concurrent features?",
      options: [
        "To run multiple React apps",
        "To prioritize updates and improve user experience",
        "To handle multiple users",
        "To improve bundle size"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Concurrent features allow React to prioritize urgent updates over less important ones, keeping the UI responsive during heavy rendering work."
    },
    {
      id: 99,
      question: "How do you handle form submission with validation in React?",
      options: [
        "Use HTML5 validation only",
        "Prevent default, validate state, then submit",
        "Submit without validation",
        "Use browser defaults"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Handle form submission by preventing default behavior, validating current state, displaying errors if needed, and submitting only if validation passes."
    },
    {
      id: 100,
      question: "What is the purpose of React's error recovery features?",
      options: [
        "To prevent all errors",
        "To gracefully handle errors and provide fallback UI",
        "To automatically fix errors",
        "To log errors only"
      ],
      correctAnswer: 1,
      difficulty: "intermediate",
      explanation: "Error boundaries and error recovery features help applications gracefully handle JavaScript errors by providing fallback UI instead of crashing."
    },

    // ADVANCED LEVEL QUESTIONS (101-120)
    {
      id: 101,
      question: "How does React's Fiber architecture improve performance?",
      options: [
        "Uses faster algorithms",
        "Enables incremental rendering and priority-based updates",
        "Reduces bundle size",
        "Eliminates virtual DOM"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Fiber enables incremental rendering, allowing React to split rendering work into chunks and prioritize high-priority updates for better user experience."
    },
    {
      id: 102,
      question: "What is Concurrent Mode in React?",
      options: [
        "Running multiple React apps simultaneously",
        "Rendering features that help apps stay responsive by prioritizing updates",
        "Multi-threading in React",
        "Concurrent data fetching"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Concurrent Mode allows React to interrupt rendering to handle high-priority updates, keeping the app responsive during heavy rendering work."
    },
    {
      id: 103,
      question: "What are the rules of Hooks and why are they important?",
      options: [
        "Performance guidelines",
        "Must be called at top level and in same order every render",
        "Naming conventions",
        "Testing requirements"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Hooks must be called at the top level and in the same order every render to ensure React can correctly associate Hook calls with state."
    },
    {
      id: 104,
      question: "How does React's batching work and what changed in React 18?",
      options: [
        "No batching exists",
        "React 18 introduced automatic batching for all updates including promises and timeouts",
        "Batching was removed in React 18",
        "Only manual batching is available"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React 18 introduced automatic batching for all updates, including those in promises, timeouts, and native event handlers, improving performance."
    },
    {
      id: 105,
      question: "What is the purpose of React.startTransition?",
      options: [
        "To start CSS transitions",
        "To mark updates as non-urgent for better user experience",
        "To begin component lifecycle",
        "To start animations"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "startTransition marks updates as non-urgent, allowing React to prioritize more urgent updates like user input for better responsiveness."
    },
    {
      id: 106,
      question: "How do you implement proper error boundaries with React Hooks?",
      options: [
        "Using useError Hook",
        "Error boundaries must be class components; Hooks can't catch errors",
        "Using try-catch in useEffect",
        "Using useErrorBoundary Hook"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Error boundaries must be class components because there's no Hook equivalent for componentDidCatch and getDerivedStateFromError."
    },
    {
      id: 107,
      question: "What is the difference between shallow and deep comparison in React?",
      options: [
        "No difference",
        "Shallow compares references, deep compares nested values",
        "Shallow is always faster",
        "Deep comparison is not supported"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Shallow comparison only checks if references are the same, while deep comparison checks nested values. React uses shallow comparison for performance."
    },
    {
      id: 108,
      question: "How do you optimize bundle size in React applications?",
      options: [
        "Using only class components",
        "Code splitting, tree shaking, lazy loading, and analyzing bundles",
        "Removing all dependencies",
        "Using inline styles only"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Bundle optimization involves code splitting, tree shaking unused code, lazy loading components, and analyzing bundle composition."
    },
    {
      id: 109,
      question: "What is the React Profiler and how is it used?",
      options: [
        "A user authentication system",
        "A tool for measuring component performance and render times",
        "A state management library",
        "A testing framework"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React Profiler measures performance of React applications, tracking which components render, how long they take, and why they re-render."
    },
    {
      id: 110,
      question: "How do you implement effective memoization strategies?",
      options: [
        "Memoize everything always",
        "Strategic use of React.memo, useMemo, and useCallback based on profiling",
        "Never use memoization",
        "Only memoize expensive operations"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Effective memoization requires strategic use based on actual performance measurements, considering the cost of memoization vs. re-computation."
    },
    {
      id: 111,
      question: "What are the performance implications of context updates?",
      options: [
        "No performance impact",
        "All consumers re-render when context value changes",
        "Only direct children re-render",
        "Context updates are async"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "When context value changes, all consuming components re-render, which can cause performance issues if not managed properly with memoization."
    },
    {
      id: 112,
      question: "How do you implement proper data fetching patterns with Hooks?",
      options: [
        "Always use useEffect",
        "Combine useEffect, useState, custom hooks, and error handling",
        "Use class components only",
        "Fetch data in render function"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Proper data fetching involves useEffect for side effects, useState for loading/error states, custom hooks for reusability, and proper cleanup."
    },
    {
      id: 113,
      question: "What is the purpose of React.useDeferredValue?",
      options: [
        "To defer component mounting",
        "To defer non-urgent updates for better performance",
        "To delay prop updates",
        "To defer error handling"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "useDeferredValue defers updating non-urgent parts of the UI, allowing urgent updates to be processed first for better user experience."
    },
    {
      id: 114,
      question: "How do you handle complex state management without external libraries?",
      options: [
        "Use only useState",
        "Combine useReducer, Context, and custom hooks",
        "Use global variables",
        "Use localStorage"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Complex state management can be handled by combining useReducer for complex logic, Context for sharing state, and custom hooks for reusability."
    },
    {
      id: 115,
      question: "What are the security considerations in React applications?",
      options: [
        "React handles all security automatically",
        "XSS prevention, secure data handling, and proper sanitization",
        "No security considerations needed",
        "Only HTTPS is required"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React security involves preventing XSS attacks, properly handling user input, sanitizing data, and following secure coding practices."
    },
    {
      id: 116,
      question: "How do you implement proper accessibility in React components?",
      options: [
        "Accessibility is handled automatically",
        "Use semantic HTML, ARIA attributes, keyboard navigation, and screen reader support",
        "Only use div elements",
        "Accessibility is not important"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Proper accessibility requires semantic HTML, appropriate ARIA attributes, keyboard navigation support, and consideration for screen readers."
    },
    {
      id: 117,
      question: "What is the React DevTools Profiler and how does it help?",
      options: [
        "A code formatter",
        "A tool for analyzing component performance and identifying bottlenecks",
        "A testing framework",
        "A deployment tool"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React DevTools Profiler helps identify performance bottlenecks by showing component render times, why components re-rendered, and performance insights."
    },
    {
      id: 118,
      question: "How do you implement proper testing strategies for React components?",
      options: [
        "No testing needed",
        "Unit tests, integration tests, and end-to-end tests with proper mocking",
        "Only manual testing",
        "Only unit tests are sufficient"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Comprehensive testing includes unit tests for individual components, integration tests for component interactions, and e2e tests for user workflows."
    },
    {
      id: 119,
      question: "What is the proper way to handle memory leaks in React?",
      options: [
        "Memory leaks don't occur in React",
        "Cleanup subscriptions, timeouts, and event listeners in useEffect cleanup",
        "Use more memory",
        "Restart the application"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Prevent memory leaks by properly cleaning up subscriptions, timeouts, intervals, and event listeners in useEffect cleanup functions."
    },
    {
      id: 120,
      question: "How do you implement proper server-side rendering (SSR) optimization?",
      options: [
        "SSR is not supported",
        "Hydration strategies, code splitting, and performance monitoring",
        "Client-side rendering only",
        "Static generation only"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "SSR optimization involves proper hydration strategies, code splitting for faster initial loads, and monitoring performance metrics."
    },
    {
      id: 121,
      question: "What is React's Scheduler and how does it work with Concurrent Features?",
      options: [
        "A component scheduling library",
        "Internal API that prioritizes and schedules work based on urgency",
        "A third-party task scheduler",
        "A deprecated React feature"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React's Scheduler is an internal API that manages task prioritization, enabling concurrent features by scheduling high-priority updates first and yielding control back to the browser when needed."
    },
    {
      id: 122,
      question: "How do you implement proper code splitting with React.lazy and Suspense for optimal performance?",
      options: [
        "Split every component individually",
        "Use route-based splitting and strategic component-level splitting with loading boundaries",
        "Only split at the top level",
        "Code splitting is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Effective code splitting combines route-based splitting for major sections, strategic component-level splitting for heavy components, and proper Suspense boundaries for optimal loading experiences."
    },
    {
      id: 123,
      question: "What is the React DevTools Profiler's 'Interactions' feature and how is it used?",
      options: [
        "For profiling user interactions",
        "Traces performance from user action to completion across async operations",
        "For debugging component interactions",
        "For measuring network interactions"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "The Interactions feature traces performance from a user action (like a click) through all resulting renders and async operations, providing end-to-end performance insights."
    },
    {
      id: 124,
      question: "How do you implement proper React application architecture for large-scale applications?",
      options: [
        "Use only hooks everywhere",
        "Layer architecture with smart/dumb components, custom hooks, and clear data flow",
        "Put everything in one component",
        "Use only class components"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Large-scale React apps benefit from layered architecture separating smart/dumb components, custom hooks for business logic, clear data flow patterns, and proper module boundaries."
    },
    {
      id: 125,
      question: "What is React's Time Slicing and how does it improve user experience?",
      options: [
        "A way to slice images",
        "Breaks rendering work into small chunks to maintain responsiveness",
        "A performance measurement tool",
        "A debugging feature"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Time Slicing allows React to break rendering work into small chunks, yielding control back to the browser between chunks to maintain responsiveness during heavy rendering tasks."
    },
    {
      id: 126,
      question: "How do you implement proper React component performance monitoring in production?",
      options: [
        "Use console.log statements",
        "Implement React Profiler API, performance observers, and custom metrics",
        "Performance monitoring is automatic",
        "Only use development tools"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Production performance monitoring involves React Profiler API for component metrics, Performance Observer API for browser metrics, and custom instrumentation for business-specific measurements."
    },
    {
      id: 127,
      question: "What are React's experimental features and how should they be evaluated?",
      options: [
        "Always use experimental features",
        "Evaluate stability, RFC status, and migration path before adoption",
        "Never use experimental features",
        "Experimental features are just suggestions"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Experimental React features should be evaluated based on their stability, RFC (Request for Comments) status, community feedback, and clear migration paths before production adoption."
    },
    {
      id: 128,
      question: "How do you implement proper React application state hydration strategies?",
      options: [
        "Hydration happens automatically",
        "Coordinate server state, client state, and progressive hydration patterns",
        "Use only client-side state",
        "Hydration is not necessary"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Proper hydration strategies involve coordinating server-rendered state with client state, implementing progressive hydration for large apps, and handling hydration mismatches gracefully."
    },
    {
      id: 129,
      question: "What is React's Suspense for Data Fetching and how does it differ from traditional patterns?",
      options: [
        "Just another loading pattern",
        "Declarative loading states that coordinate across component boundaries",
        "Only for lazy loading",
        "A replacement for useEffect"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Suspense for Data Fetching enables declarative loading states that can coordinate across component boundaries, avoiding loading waterfalls and providing better user experiences than traditional imperative patterns."
    },
    {
      id: 130,
      question: "How do you implement proper React application caching strategies?",
      options: [
        "Cache everything always",
        "Implement layered caching with component memoization, data caching, and HTTP caching",
        "Use only browser caching",
        "Caching is not needed in React"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Effective React caching involves multiple layers: component-level memoization, data layer caching (like SWR/React Query), HTTP caching, and proper cache invalidation strategies."
    },
    {
      id: 131,
      question: "What is React's Selective Hydration and when should it be used?",
      options: [
        "Hydrating only selected components",
        "Prioritizes interactive components during hydration for faster TTI",
        "A debugging technique",
        "Selective hydration is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Selective Hydration allows React to prioritize hydrating components that users are trying to interact with, improving Time to Interactive (TTI) for better perceived performance."
    },
    {
      id: 132,
      question: "How do you implement proper React application memory optimization techniques?",
      options: [
        "Memory optimization is automatic",
        "Implement weak references, object pooling, and strategic component unmounting",
        "Use more memory",
        "Memory optimization is not possible"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Memory optimization involves using weak references for caches, implementing object pooling for frequently created objects, strategic component unmounting, and proper cleanup of subscriptions and timers."
    },
    {
      id: 133,
      question: "What is React's useMutableSource Hook and what problem does it solve?",
      options: [
        "For managing mutable state",
        "Safely reads from mutable external sources during concurrent rendering",
        "A replacement for useState",
        "useMutableSource is deprecated"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "useMutableSource (now replaced by useSyncExternalStore) allows safe reading from mutable external sources like stores during concurrent rendering, preventing tearing and inconsistent states."
    },
    {
      id: 134,
      question: "How do you implement proper React application internationalization (i18n) with performance considerations?",
      options: [
        "Load all translations at once",
        "Implement lazy loading, locale splitting, and optimized translation lookups",
        "Use only English",
        "i18n has no performance impact"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Performance-optimized i18n involves lazy loading translations, splitting locales by routes/components, implementing efficient translation lookups, and considering cultural formatting performance."
    },
    {
      id: 135,
      question: "What is React's Double Buffering in Concurrent Mode and how does it work?",
      options: [
        "Using two render buffers",
        "Prepares next screen off-screen while current screen remains interactive",
        "A graphics rendering technique",
        "Double buffering is not a React concept"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Double Buffering in React's Concurrent Mode allows preparing the next screen off-screen while keeping the current screen fully interactive, enabling smooth transitions without blocking."
    },
    {
      id: 136,
      question: "How do you implement proper React application error recovery and resilience patterns?",
      options: [
        "Use try-catch everywhere",
        "Implement error boundaries, retry logic, graceful degradation, and fallback mechanisms",
        "Errors are not recoverable",
        "Error recovery is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Resilient React apps implement layered error boundaries, automatic retry logic, graceful degradation strategies, fallback UI mechanisms, and proper error reporting systems."
    },
    {
      id: 137,
      question: "What is React's useTransition Hook and how does it improve user experience?",
      options: [
        "For CSS transitions",
        "Marks updates as non-urgent and provides pending state feedback",
        "For component transitions",
        "useTransition is deprecated"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "useTransition allows marking state updates as non-urgent transitions, keeping the UI responsive during heavy operations while providing pending state feedback to users."
    },
    {
      id: 138,
      question: "How do you implement proper React application progressive enhancement strategies?",
      options: [
        "Progressive enhancement is not applicable",
        "Layer interactive features on top of functional HTML with graceful fallbacks",
        "Use only JavaScript",
        "Enhancement is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Progressive enhancement in React involves ensuring core functionality works without JavaScript, then layering interactive features on top with proper fallbacks and graceful degradation."
    },
    {
      id: 139,
      question: "What is React's Tree Shaking optimization and how do you maximize its effectiveness?",
      options: [
        "Removing unused React features",
        "Dead code elimination through proper imports and build configuration",
        "A debugging tool",
        "Tree shaking is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Tree shaking eliminates dead code by using ES6 imports, configuring bundlers properly, marking side-effect-free code, and structuring components for optimal elimination of unused exports."
    },
    {
      id: 140,
      question: "How do you implement proper React application real-time updates with optimistic UI patterns?",
      options: [
        "Always wait for server confirmation",
        "Update UI immediately, then reconcile with server response and handle conflicts",
        "Use only server updates",
        "Real-time updates are not possible"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Optimistic UI patterns update the interface immediately based on user actions, then reconcile with server responses, handling conflicts gracefully and providing immediate feedback."
    },
    {
      id: 141,
      question: "What is React's Reconciler and how can you create custom reconcilers?",
      options: [
        "The built-in reconciliation algorithm",
        "Core engine that can be customized to target different platforms",
        "A debugging tool",
        "Custom reconcilers are not possible"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React's Reconciler is the core engine that can be customized with different host configs to target platforms beyond DOM, like React Native, React Three Fiber, or custom renderers."
    },
    {
      id: 142,
      question: "How do you implement proper React application micro-frontend integration patterns?",
      options: [
        "Micro-frontends are not compatible with React",
        "Module federation, shared dependencies, and isolated state management",
        "Use separate React instances",
        "Integration is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React micro-frontend integration involves module federation for sharing code, managing shared dependencies, implementing isolated state management, and coordinating communication between micro-apps."
    },
    {
      id: 143,
      question: "What is React's useSyncExternalStore Hook and when should it be used?",
      options: [
        "For syncing internal state",
        "Subscribes to external data sources safely during concurrent rendering",
        "A replacement for useState",
        "Only for Redux integration"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "useSyncExternalStore safely subscribes to external data sources (like stores, browser APIs) during concurrent rendering, preventing tearing and ensuring consistent reads."
    },
    {
      id: 144,
      question: "How do you implement proper React application streaming and progressive loading strategies?",
      options: [
        "Load everything at once",
        "Implement chunked loading, progressive rendering, and priority-based resource loading",
        "Use only lazy loading",
        "Streaming is not possible"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Streaming strategies involve chunked HTML delivery, progressive rendering as chunks arrive, priority-based resource loading, and maintaining interactivity during progressive loading."
    },
    {
      id: 145,
      question: "What are React's Advanced Patterns for cross-cutting concerns (logging, analytics, etc.)?",
      options: [
        "Use global variables",
        "Higher-order components, render props, custom hooks, and context providers",
        "Inline everything",
        "Cross-cutting concerns are not supported"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Cross-cutting concerns are handled through patterns like HOCs for behavior injection, render props for logic sharing, custom hooks for stateful logic, and context providers for app-wide concerns."
    },
    {
      id: 146,
      question: "How do you implement proper React application performance budgets and monitoring?",
      options: [
        "Performance budgets are not necessary",
        "Set metrics targets, implement automated monitoring, and establish performance CI/CD gates",
        "Use only development metrics",
        "Monitoring is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Performance budgets involve setting specific metrics targets (LCP, FID, CLS), implementing automated monitoring systems, establishing CI/CD performance gates, and creating alerting for regressions."
    },
    {
      id: 147,
      question: "What is React's Server Components architecture and how does it differ from SSR?",
      options: [
        "Server Components are the same as SSR",
        "Components that run on server with zero client JavaScript and seamless integration",
        "A deployment strategy",
        "Server Components are deprecated"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "React Server Components run entirely on the server with zero client JavaScript, seamlessly integrating with client components, enabling new performance and data access patterns beyond traditional SSR."
    },
    {
      id: 148,
      question: "How do you implement proper React application edge computing and CDN optimization strategies?",
      options: [
        "Edge computing is not relevant",
        "Deploy static assets, implement edge-side includes, and optimize for geographical distribution",
        "Use only central servers",
        "Optimization is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Edge optimization involves deploying static assets to CDN edges, implementing edge-side includes for dynamic content, optimizing for geographical distribution, and leveraging edge computing for faster responses."
    },
    {
      id: 149,
      question: "What are React's Advanced Testing Patterns for complex applications?",
      options: [
        "Only unit tests are needed",
        "Integration testing, visual regression, performance testing, and accessibility testing",
        "Testing is not necessary for complex apps",
        "Use only manual testing"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Complex React apps require multi-layered testing: integration tests for component interactions, visual regression for UI consistency, performance testing for metrics, and accessibility testing for compliance."
    },
    {
      id: 150,
      question: "How do you implement proper React application backward compatibility and migration strategies?",
      options: [
        "Backward compatibility is not possible",
        "Gradual migration paths, feature flags, adapter patterns, and version coexistence",
        "Rewrite everything at once",
        "Migration is automatic"
      ],
      correctAnswer: 1,
      difficulty: "advanced",
      explanation: "Backward compatibility involves implementing gradual migration paths, using feature flags for controlled rollouts, creating adapter patterns for legacy integration, and enabling version coexistence during transitions."
    }
  ]
};

module.exports = reactjsTopic;
