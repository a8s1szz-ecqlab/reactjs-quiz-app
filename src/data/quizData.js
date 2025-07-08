export const quizData = [
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
    explanation: "All three approaches are valid ways to create functional components in React. You can use arrow functions, function declarations, or function expressions."
  },
  {
    id: 2,
    question: "Which React Hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
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
    explanation: "Props (properties) are used to pass data from parent components to child components. They are read-only and help make components reusable and modular."
  },
  {
    id: 6,
    question: "Which of the following is the correct way to handle events in React?",
    options: [
      "onClick='handleClick()'",
      "onClick={handleClick()}",
      "onClick={handleClick}",
      "onClick='handleClick'"
    ],
    correctAnswer: 2,
    explanation: "In React, event handlers are passed as references to functions using curly braces: onClick={handleClick}. You don't include parentheses unless you want to call the function immediately."
  },
  {
    id: 7,
    question: "What is the Virtual DOM in React?",
    options: [
      "A copy of the real DOM stored in memory",
      "A faster version of the real DOM",
      "A lightweight representation of the real DOM in JavaScript",
      "A debugging tool for React applications"
    ],
    correctAnswer: 2,
    explanation: "The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to optimize updates by comparing (diffing) the virtual DOM tree with the previous version and only updating the parts that changed."
  },
  {
    id: 8,
    question: "What is the correct dependency array for useEffect to run only once?",
    options: [
      "useEffect(() => {}, [state])",
      "useEffect(() => {})",
      "useEffect(() => {}, [])",
      "useEffect(() => {}, null)"
    ],
    correctAnswer: 2,
    explanation: "An empty dependency array [] makes useEffect run only once after the initial render, similar to componentDidMount. No dependency array means it runs after every render."
  },
  {
    id: 9,
    question: "Which Hook would you use to access context in a functional component?",
    options: ["useState", "useEffect", "useContext", "useCallback"],
    correctAnswer: 2,
    explanation: "useContext Hook is used to consume context values in functional components. It accepts a context object and returns the current context value for that context."
  },
  {
    id: 10,
    question: "What is the correct way to update state when the new state depends on the previous state?",
    options: [
      "setState(state + 1)",
      "setState(prevState => prevState + 1)",
      "setState(currentState + 1)",
      "setState(() => state + 1)"
    ],
    correctAnswer: 1,
    explanation: "When the new state depends on the previous state, you should use the functional update form: setState(prevState => prevState + 1). This ensures you're working with the most current state value."
  },
  {
    id: 11,
    question: "What is React.Fragment used for?",
    options: [
      "To create reusable components",
      "To group multiple elements without adding extra nodes to the DOM",
      "To handle component errors",
      "To optimize component performance"
    ],
    correctAnswer: 1,
    explanation: "React.Fragment (or <>) allows you to group multiple elements together without adding an extra wrapper element to the DOM. This helps keep the DOM clean and avoids unnecessary nesting."
  },
  {
    id: 12,
    question: "Which of the following is NOT a valid way to create refs in React?",
    options: [
      "useRef Hook",
      "createRef() method",
      "callback refs",
      "useState Hook"
    ],
    correctAnswer: 3,
    explanation: "useState is used for state management, not for creating refs. Valid ways to create refs include useRef Hook (for functional components), createRef() method, and callback refs."
  },
  {
    id: 13,
    question: "What is the purpose of React.memo()?",
    options: [
      "To memoize expensive calculations",
      "To prevent unnecessary re-renders of functional components",
      "To create memory-efficient components",
      "To store component state in memory"
    ],
    correctAnswer: 1,
    explanation: "React.memo() is a higher-order component that prevents unnecessary re-renders by doing a shallow comparison of props. If props haven't changed, the component won't re-render."
  },
  {
    id: 14,
    question: "What does the 'key' prop do in React lists?",
    options: [
      "It provides unique styling to list items",
      "It helps React identify which items have changed, added, or removed",
      "It defines the order of list items",
      "It enables click events on list items"
    ],
    correctAnswer: 1,
    explanation: "The 'key' prop helps React identify which list items have changed, been added, or removed. This enables efficient updates to the DOM and maintains component state correctly during re-renders."
  },
  {
    id: 15,
    question: "Which Hook is used to optimize expensive calculations in React?",
    options: ["useState", "useEffect", "useMemo", "useCallback"],
    correctAnswer: 2,
    explanation: "useMemo Hook is used to memoize expensive calculations and only recalculate them when their dependencies change. This helps optimize performance by avoiding unnecessary computations on every render."
  },
  {
    id: 16,
    question: "What is the purpose of useCallback Hook?",
    options: [
      "To memoize values",
      "To memoize function definitions",
      "To handle side effects",
      "To manage component state"
    ],
    correctAnswer: 1,
    explanation: "useCallback Hook returns a memoized version of the callback function that only changes if one of the dependencies has changed. This is useful for optimizing child components that rely on referential equality."
  },
  {
    id: 17,
    question: "How do you conditionally render elements in React?",
    options: [
      "Using if-else statements in JSX",
      "Using ternary operators or logical && in JSX",
      "Using switch statements in JSX",
      "Using for loops in JSX"
    ],
    correctAnswer: 1,
    explanation: "In React, you can conditionally render elements using ternary operators (condition ? elementA : elementB) or logical AND operators (condition && element) within JSX."
  },
  {
    id: 18,
    question: "What is the correct way to handle forms in React?",
    options: [
      "Using uncontrolled components only",
      "Using controlled components with state",
      "Using traditional HTML form handling",
      "React doesn't support forms"
    ],
    correctAnswer: 1,
    explanation: "React recommends using controlled components where form data is handled by React state. This provides better control over form validation, submission, and user input."
  },
  {
    id: 19,
    question: "What is prop drilling in React?",
    options: [
      "A performance optimization technique",
      "Passing props through multiple component layers",
      "A debugging method",
      "A way to validate props"
    ],
    correctAnswer: 1,
    explanation: "Prop drilling refers to the process of passing data from a parent component to deeply nested child components through multiple intermediate components that don't use the data themselves."
  },
  {
    id: 20,
    question: "Which lifecycle method is equivalent to useEffect with an empty dependency array?",
    options: [
      "componentDidUpdate",
      "componentWillUnmount",
      "componentDidMount",
      "componentWillMount"
    ],
    correctAnswer: 2,
    explanation: "useEffect with an empty dependency array [] runs only once after the component mounts, which is equivalent to the componentDidMount lifecycle method in class components."
  },
  {
    id: 21,
    question: "What is the purpose of useReducer Hook?",
    options: [
      "To replace useState in all cases",
      "To manage complex state logic with multiple sub-values",
      "To handle side effects",
      "To optimize component performance"
    ],
    correctAnswer: 1,
    explanation: "useReducer is useful for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one. It's an alternative to useState for more complex state management."
  },
  {
    id: 22,
    question: "What is the correct way to update an object in state?",
    options: [
      "state.property = newValue",
      "setState({...state, property: newValue})",
      "setState(state.property = newValue)",
      "setState(Object.assign(state, {property: newValue}))"
    ],
    correctAnswer: 1,
    explanation: "In React, state should be treated as immutable. Use the spread operator to create a new object: setState({...state, property: newValue}) to ensure React detects the state change."
  },
  {
    id: 23,
    question: "What is React StrictMode used for?",
    options: [
      "To enforce coding standards",
      "To identify potential problems in development",
      "To improve performance",
      "To enable TypeScript support"
    ],
    correctAnswer: 1,
    explanation: "React.StrictMode is a development tool that helps identify potential problems in your application by intentionally double-invoking functions and highlighting unsafe lifecycles and deprecated APIs."
  },
  {
    id: 24,
    question: "How do you prevent a component from rendering?",
    options: [
      "Return undefined from render",
      "Return null from render",
      "Return false from render",
      "Return an empty string from render"
    ],
    correctAnswer: 1,
    explanation: "To prevent a component from rendering, you should return null from the render method. This tells React not to render anything for that component."
  },
  {
    id: 25,
    question: "What is the difference between controlled and uncontrolled components?",
    options: [
      "Controlled components are faster",
      "Controlled components have their state managed by React, uncontrolled by DOM",
      "Uncontrolled components are deprecated",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "Controlled components have their form data handled by React state, while uncontrolled components store their form data in the DOM and are accessed via refs when needed."
  },
  {
    id: 26,
    question: "What is the purpose of React.createContext()?",
    options: [
      "To create new components",
      "To share data across the component tree without prop drilling",
      "To create higher-order components",
      "To manage local component state"
    ],
    correctAnswer: 1,
    explanation: "React.createContext() creates a Context object that allows you to share data across the component tree without having to pass props down manually at every level."
  },
  {
    id: 27,
    question: "What is a Higher-Order Component (HOC)?",
    options: [
      "A component that renders other components",
      "A function that takes a component and returns a new component",
      "A component with higher performance",
      "A component that uses advanced React features"
    ],
    correctAnswer: 1,
    explanation: "A Higher-Order Component (HOC) is a function that takes a component and returns a new component with additional props or behavior. It's a pattern for reusing component logic."
  },
  {
    id: 28,
    question: "What is the correct way to handle async operations in useEffect?",
    options: [
      "Make useEffect async directly",
      "Create an async function inside useEffect",
      "Use Promise.then() directly in useEffect",
      "Both B and C are correct"
    ],
    correctAnswer: 3,
    explanation: "You cannot make useEffect async directly. Instead, create an async function inside useEffect or use Promise.then(). Both approaches work for handling async operations."
  },
  {
    id: 29,
    question: "What is React.lazy() used for?",
    options: [
      "To delay component rendering",
      "To implement code splitting and lazy loading",
      "To optimize performance",
      "To handle loading states"
    ],
    correctAnswer: 1,
    explanation: "React.lazy() is used for code splitting and lazy loading components. It allows you to dynamically import components and render them only when needed, reducing the initial bundle size."
  },
  {
    id: 30,
    question: "What is the purpose of Suspense in React?",
    options: [
      "To handle errors in components",
      "To display fallback UI while lazy components load",
      "To pause component execution",
      "To handle asynchronous data fetching"
    ],
    correctAnswer: 1,
    explanation: "Suspense allows you to display fallback UI (like a loading spinner) while waiting for lazy components to load or for asynchronous operations to complete."
  },
  {
    id: 31,
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useLayoutEffect runs before browser paint",
      "useEffect is for side effects, useLayoutEffect for layout",
      "useLayoutEffect is synchronous, useEffect is asynchronous",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useLayoutEffect runs synchronously before the browser repaints, while useEffect runs after the render is committed to the screen. useLayoutEffect is useful for DOM measurements and synchronous updates."
  },
  {
    id: 32,
    question: "What is React.forwardRef() used for?",
    options: [
      "To forward props to child components",
      "To forward refs to child components",
      "To forward state to child components",
      "To forward events to child components"
    ],
    correctAnswer: 1,
    explanation: "React.forwardRef() is used to forward refs from a parent component to a child component, allowing the parent to access the child's DOM node or imperative methods."
  },
  {
    id: 33,
    question: "What is the correct way to handle errors in React components?",
    options: [
      "Using try-catch blocks in render",
      "Using Error Boundaries",
      "Using useError Hook",
      "Using console.error()"
    ],
    correctAnswer: 1,
    explanation: "Error Boundaries are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI instead of crashing the component tree."
  },
  {
    id: 34,
    question: "What is the purpose of useImperativeHandle Hook?",
    options: [
      "To handle imperative programming",
      "To customize the instance value exposed to parent components when using ref",
      "To improve performance",
      "To handle side effects"
    ],
    correctAnswer: 1,
    explanation: "useImperativeHandle customizes the instance value that is exposed to parent components when using ref. It should be used with forwardRef to expose imperative methods to parent components."
  },
  {
    id: 35,
    question: "What is the difference between React.Component and React.PureComponent?",
    options: [
      "PureComponent has better performance",
      "PureComponent implements shouldComponentUpdate with shallow comparison",
      "PureComponent is for functional components",
      "There is no difference"
    ],
    correctAnswer: 1,
    explanation: "React.PureComponent implements shouldComponentUpdate() with a shallow prop and state comparison, which can improve performance by preventing unnecessary re-renders when props and state haven't changed."
  },
  {
    id: 36,
    question: "What is the purpose of the dependency array in useEffect?",
    options: [
      "To list all variables used in the effect",
      "To control when the effect should re-run",
      "To improve performance",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The dependency array controls when useEffect re-runs by specifying which values the effect depends on. It should include all variables from component scope that are used inside the effect."
  },
  {
    id: 37,
    question: "What is React Fiber?",
    options: [
      "A new component type",
      "React's reconciliation algorithm",
      "A performance monitoring tool",
      "A state management library"
    ],
    correctAnswer: 1,
    explanation: "React Fiber is React's reconciliation algorithm that enables incremental rendering, allowing React to pause work and come back to it later, improving responsiveness for complex applications."
  },
  {
    id: 38,
    question: "What is the correct way to pass a function as a prop?",
    options: [
      "<Child onClick={handleClick()}/>",
      "<Child onClick='handleClick'/>",
      "<Child onClick={handleClick}/>",
      "<Child onClick={() => handleClick()}>"
    ],
    correctAnswer: 2,
    explanation: "Functions should be passed as references without parentheses: <Child onClick={handleClick}/>. Including parentheses would call the function immediately during render."
  },
  {
    id: 39,
    question: "What is the purpose of React.createElement()?",
    options: [
      "To create DOM elements",
      "To create React elements (virtual DOM nodes)",
      "To create component instances",
      "To create HTML elements"
    ],
    correctAnswer: 1,
    explanation: "React.createElement() creates React elements (virtual DOM nodes). JSX is syntactic sugar that gets compiled to React.createElement() calls."
  },
  {
    id: 40,
    question: "What is the difference between state and props?",
    options: [
      "State is mutable, props are immutable",
      "State is internal to component, props are passed from parent",
      "State triggers re-renders when changed",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "State is mutable data internal to a component that triggers re-renders when changed. Props are immutable data passed from parent components to child components."
  },
  {
    id: 41,
    question: "What is the purpose of useDebugValue Hook?",
    options: [
      "To debug component rendering",
      "To display a label for custom Hooks in React DevTools",
      "To log values to console",
      "To handle debugging in production"
    ],
    correctAnswer: 1,
    explanation: "useDebugValue is used to display a label for custom Hooks in React DevTools, making it easier to debug and understand what custom Hooks are doing."
  },
  {
    id: 42,
    question: "What is reconciliation in React?",
    options: [
      "The process of resolving conflicts",
      "The process of comparing virtual DOM trees and updating the real DOM",
      "The process of validating props",
      "The process of managing state"
    ],
    correctAnswer: 1,
    explanation: "Reconciliation is React's process of comparing the current virtual DOM tree with the previous one and determining what changes need to be made to the real DOM to make them match."
  },
  {
    id: 43,
    question: "What is the correct way to update an array in state?",
    options: [
      "state.push(newItem)",
      "setState([...state, newItem])",
      "setState(state.concat(newItem))",
      "Both B and C are correct"
    ],
    correctAnswer: 3,
    explanation: "Arrays in state should be treated as immutable. Use spread operator setState([...state, newItem]) or concat method setState(state.concat(newItem)) to create a new array."
  },
  {
    id: 44,
    question: "What is the purpose of React DevTools?",
    options: [
      "To debug React applications",
      "To inspect component hierarchy and props",
      "To profile performance",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React DevTools is a browser extension that allows you to debug React applications, inspect component hierarchy, view props and state, and profile component performance."
  },
  {
    id: 45,
    question: "What is the difference between rendering and mounting?",
    options: [
      "Rendering creates virtual DOM, mounting adds to real DOM",
      "They are the same thing",
      "Mounting happens before rendering",
      "Rendering is faster than mounting"
    ],
    correctAnswer: 0,
    explanation: "Rendering is the process of creating virtual DOM elements, while mounting is the process of adding those elements to the real DOM for the first time."
  },
  {
    id: 46,
    question: "What is the purpose of cleanup function in useEffect?",
    options: [
      "To improve performance",
      "To prevent memory leaks and cancel subscriptions",
      "To clear component state",
      "To validate dependencies"
    ],
    correctAnswer: 1,
    explanation: "The cleanup function in useEffect is used to prevent memory leaks by canceling subscriptions, clearing timers, or cleaning up other resources when the component unmounts or dependencies change."
  },
  {
    id: 47,
    question: "What is React.cloneElement() used for?",
    options: [
      "To copy components",
      "To clone and modify React elements",
      "To duplicate component instances",
      "To create component copies"
    ],
    correctAnswer: 1,
    explanation: "React.cloneElement() clones a React element and allows you to add or modify props. It's useful for enhancing children elements with additional props."
  },
  {
    id: 48,
    question: "What is the correct way to handle multiple state variables?",
    options: [
      "Use multiple useState calls",
      "Use one useState with an object",
      "Use useReducer for complex state",
      "All approaches are valid"
    ],
    correctAnswer: 3,
    explanation: "You can use multiple useState calls for simple values, one useState with an object for related data, or useReducer for complex state logic. The choice depends on your specific use case."
  },
  {
    id: 49,
    question: "What is the purpose of React.Children utility?",
    options: [
      "To count child components",
      "To manipulate and transform children props",
      "To validate child components",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.Children provides utilities for dealing with the props.children data structure. You can map, count, validate, and transform children elements using these utilities."
  },
  {
    id: 50,
    question: "What is the difference between React.memo() and useMemo()?",
    options: [
      "React.memo() is for components, useMemo() is for values",
      "React.memo() prevents re-renders, useMemo() memoizes calculations",
      "React.memo() is a HOC, useMemo() is a Hook",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.memo() is a higher-order component that prevents unnecessary re-renders of components, while useMemo() is a Hook that memoizes expensive calculations and returns cached values when dependencies haven't changed."
  },
  {
    id: 51,
    question: "What is the purpose of React.StrictMode?",
    options: [
      "To enforce strict type checking",
      "To identify potential problems and unsafe practices",
      "To improve performance in production",
      "To enable ES6 strict mode"
    ],
    correctAnswer: 1,
    explanation: "React.StrictMode is a development tool that helps identify potential problems by intentionally double-invoking functions, detecting unsafe lifecycles, and warning about deprecated APIs."
  },
  {
    id: 52,
    question: "How do you handle forms with multiple input fields in React?",
    options: [
      "Use separate useState for each field",
      "Use a single useState with an object",
      "Use useReducer for complex forms",
      "All of the above are valid approaches"
    ],
    correctAnswer: 3,
    explanation: "All approaches are valid depending on the complexity. Single useState with object is common for simple forms, separate useState for independent fields, and useReducer for complex form logic."
  },
  {
    id: 53,
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useLayoutEffect runs synchronously after DOM mutations",
      "useEffect runs asynchronously after render commits",
      "useLayoutEffect blocks visual updates until complete",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useLayoutEffect runs synchronously after DOM mutations but before the browser paints, while useEffect runs asynchronously after the render commits to the screen."
  },
  {
    id: 54,
    question: "What is prop drilling and how can you avoid it?",
    options: [
      "Passing props through multiple component layers",
      "Can be avoided using Context API",
      "Can be avoided using state management libraries",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Prop drilling refers to passing data through multiple component layers. It can be avoided using Context API, Redux, Zustand, or other state management solutions."
  },
  {
    id: 55,
    question: "What is the purpose of the dependency array in useCallback?",
    options: [
      "To specify when the callback should be recreated",
      "To list all variables used in the callback",
      "To optimize performance by preventing unnecessary re-renders",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The dependency array in useCallback determines when the memoized callback should be recreated, helping optimize performance by preventing unnecessary re-renders of child components."
  },
  {
    id: 56,
    question: "How do you implement conditional rendering with multiple conditions?",
    options: [
      "Using nested ternary operators",
      "Using logical && operators",
      "Using if-else statements before return",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React supports multiple ways to implement conditional rendering: nested ternary operators, logical operators, if-else statements, and switch statements before the return."
  },
  {
    id: 57,
    question: "What is the purpose of React.Fragment?",
    options: [
      "To group elements without adding DOM nodes",
      "To improve performance",
      "To handle component errors",
      "To create reusable components"
    ],
    correctAnswer: 0,
    explanation: "React.Fragment allows you to group multiple elements without adding an extra wrapper element to the DOM, keeping the DOM structure clean."
  },
  {
    id: 58,
    question: "How do you update an array in React state immutably?",
    options: [
      "Using push() method",
      "Using spread operator [...array, newItem]",
      "Using concat() method",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "To update arrays immutably in React, use spread operator [...array, newItem] or concat() method. Avoid mutating methods like push(), pop(), or splice()."
  },
  {
    id: 59,
    question: "What is the purpose of useRef Hook?",
    options: [
      "To access DOM elements directly",
      "To store mutable values that persist across renders",
      "To avoid re-renders when value changes",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useRef can access DOM elements directly, store mutable values that persist across renders, and the changes don't trigger re-renders unlike useState."
  },
  {
    id: 60,
    question: "How do you optimize React app performance?",
    options: [
      "Using React.memo for components",
      "Using useMemo and useCallback for expensive operations",
      "Implementing code splitting with React.lazy",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React performance can be optimized using React.memo, useMemo, useCallback, code splitting, avoiding unnecessary re-renders, and proper state management."
  },
  {
    id: 61,
    question: "What is the difference between controlled and uncontrolled components?",
    options: [
      "Controlled components have React managing the form data",
      "Uncontrolled components use refs to access form data",
      "Controlled components provide better form validation",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Controlled components have their form data handled by React state, while uncontrolled components store form data in the DOM and are accessed via refs."
  },
  {
    id: 62,
    question: "How do you handle errors in React components?",
    options: [
      "Using try-catch blocks",
      "Using Error Boundaries",
      "Using componentDidCatch lifecycle method",
      "Both B and C"
    ],
    correctAnswer: 3,
    explanation: "Error Boundaries catch JavaScript errors in component trees using componentDidCatch or static getDerivedStateFromError. Try-catch doesn't work for React errors."
  },
  {
    id: 63,
    question: "What is the purpose of React.createContext()?",
    options: [
      "To share data across component tree without prop drilling",
      "To create global state",
      "To provide themes and configuration",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.createContext() creates a context object for sharing data like themes, user information, or configuration across the component tree without prop drilling."
  },
  {
    id: 64,
    question: "How do you implement lazy loading in React?",
    options: [
      "Using React.lazy() function",
      "Using dynamic import() syntax",
      "Wrapping with React.Suspense",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Lazy loading in React is implemented using React.lazy() with dynamic import(), and components must be wrapped with React.Suspense to handle loading states."
  },
  {
    id: 65,
    question: "What is the purpose of useReducer Hook?",
    options: [
      "To manage complex state logic",
      "To handle state with multiple sub-values",
      "When next state depends on previous state",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useReducer is useful for complex state logic, managing state with multiple sub-values, and when the next state depends on the previous one, similar to Redux reducers."
  },
  {
    id: 66,
    question: "How do you prevent unnecessary re-renders in React?",
    options: [
      "Using React.memo for functional components",
      "Using PureComponent for class components",
      "Using useMemo and useCallback for expensive operations",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Prevent unnecessary re-renders using React.memo, PureComponent, useMemo for expensive calculations, and useCallback for function references."
  },
  {
    id: 67,
    question: "What is the difference between state and props?",
    options: [
      "State is mutable, props are immutable",
      "State is local to component, props are passed from parent",
      "State changes trigger re-renders",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "State is mutable data local to a component that triggers re-renders when changed. Props are immutable data passed from parent components."
  },
  {
    id: 68,
    question: "How do you handle asynchronous operations in useEffect?",
    options: [
      "Create async function inside useEffect",
      "Use .then() with promises",
      "Use async/await with IIFE",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Since useEffect cannot be async directly, you can create async functions inside it, use .then() with promises, or use async/await with immediately invoked function expressions."
  },
  {
    id: 69,
    question: "What is React reconciliation?",
    options: [
      "The process of comparing virtual DOM trees",
      "Determining minimum changes needed for real DOM",
      "React's diffing algorithm",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Reconciliation is React's process of comparing virtual DOM trees to determine the minimum set of changes needed to update the real DOM efficiently."
  },
  {
    id: 70,
    question: "How do you share logic between components?",
    options: [
      "Using custom Hooks",
      "Using Higher-Order Components (HOCs)",
      "Using render props pattern",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Logic can be shared between components using custom Hooks (recommended), Higher-Order Components, render props pattern, or context providers."
  },
  {
    id: 71,
    question: "What is the purpose of React.forwardRef()?",
    options: [
      "To forward refs to child components",
      "To access child component's DOM node",
      "To expose imperative methods to parent",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.forwardRef() forwards refs to child components, allowing parent components to access child DOM nodes or imperative methods."
  },
  {
    id: 72,
    question: "How do you implement component composition in React?",
    options: [
      "Using props.children",
      "Using render props",
      "Using slots pattern",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Component composition can be achieved using props.children for simple composition, render props for flexible composition, or slots pattern for multiple placeholders."
  },
  {
    id: 73,
    question: "What is the difference between React elements and components?",
    options: [
      "Elements are objects describing DOM nodes",
      "Components are functions or classes that return elements",
      "Elements are created by React.createElement()",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React elements are plain objects describing DOM nodes, while components are functions or classes that return elements. Elements are created by React.createElement() or JSX."
  },
  {
    id: 74,
    question: "How do you handle side effects in React?",
    options: [
      "Using useEffect Hook",
      "Using lifecycle methods in class components",
      "Using custom Hooks for complex side effects",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Side effects are handled using useEffect in functional components, lifecycle methods in class components, or custom Hooks for reusable side effect logic."
  },
  {
    id: 75,
    question: "What is React Fiber?",
    options: [
      "React's reconciliation algorithm",
      "Enables incremental rendering",
      "Allows interrupting and resuming work",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React Fiber is the reconciliation algorithm that enables incremental rendering, allowing React to interrupt and resume work for better performance and user experience."
  },
  {
    id: 76,
    question: "How do you implement event handling in React?",
    options: [
      "Using SyntheticEvents",
      "Passing event handlers as props",
      "Using camelCase event names",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React uses SyntheticEvents for cross-browser compatibility, event handlers are passed as props with camelCase names like onClick, onChange."
  },
  {
    id: 77,
    question: "What is the purpose of React.Suspense?",
    options: [
      "To handle loading states for lazy components",
      "To display fallback UI while waiting for data",
      "To work with React.lazy() for code splitting",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.Suspense displays fallback UI while waiting for lazy components to load or for asynchronous data fetching, working seamlessly with React.lazy()."
  },
  {
    id: 78,
    question: "How do you implement list rendering in React?",
    options: [
      "Using map() function",
      "Providing unique key prop for each item",
      "Using index as key only when items don't reorder",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "List rendering uses map() function with unique key props for each item. Avoid using array index as key when items can reorder to prevent rendering issues."
  },
  {
    id: 79,
    question: "What is the difference between useCallback and useMemo?",
    options: [
      "useCallback memoizes functions",
      "useMemo memoizes values",
      "Both help prevent unnecessary re-renders",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useCallback memoizes function references to prevent child re-renders, while useMemo memoizes computed values to avoid expensive recalculations."
  },
  {
    id: 80,
    question: "How do you handle component lifecycle in functional components?",
    options: [
      "Using useEffect for componentDidMount",
      "Using useEffect cleanup for componentWillUnmount",
      "Using useEffect dependencies for componentDidUpdate",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useEffect handles all lifecycle phases: empty dependency array for mount, cleanup function for unmount, and dependencies for updates."
  },
  {
    id: 81,
    question: "What is React Context and when should you use it?",
    options: [
      "For sharing data across deeply nested components",
      "For themes, authentication, and global settings",
      "To avoid prop drilling",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React Context is used for sharing data like themes, authentication, or global settings across deeply nested components without prop drilling."
  },
  {
    id: 82,
    question: "How do you implement custom Hooks?",
    options: [
      "Functions starting with 'use'",
      "Can call other Hooks inside",
      "Used to extract component logic",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Custom Hooks are functions starting with 'use' that can call other Hooks and are used to extract and share component logic between components."
  },
  {
    id: 83,
    question: "What is the purpose of useImperativeHandle?",
    options: [
      "To customize instance value exposed to parent",
      "Used with forwardRef",
      "To expose imperative methods",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useImperativeHandle customizes the instance value exposed to parent components when using ref, typically used with forwardRef to expose imperative methods."
  },
  {
    id: 84,
    question: "How do you handle component updates in React?",
    options: [
      "Using useEffect with dependencies",
      "Using componentDidUpdate in class components",
      "Comparing previous and current props/state",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Component updates are handled using useEffect with dependencies in functional components or componentDidUpdate in class components, comparing previous and current values."
  },
  {
    id: 85,
    question: "What is React's Virtual DOM?",
    options: [
      "JavaScript representation of real DOM",
      "Enables efficient diffing algorithm",
      "Minimizes direct DOM manipulation",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Virtual DOM is a JavaScript representation of the real DOM that enables efficient diffing and minimizes expensive direct DOM manipulations."
  },
  {
    id: 86,
    question: "How do you implement state management in large React applications?",
    options: [
      "Using Redux for complex state",
      "Using Context API for simpler state",
      "Using custom Hooks for local state logic",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Large applications use Redux for complex global state, Context API for simpler shared state, and custom Hooks for reusable local state logic."
  },
  {
    id: 87,
    question: "What is the purpose of React.cloneElement()?",
    options: [
      "To clone React elements",
      "To add or modify props",
      "To enhance children elements",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.cloneElement() clones React elements and allows adding or modifying props, commonly used to enhance children elements with additional props."
  },
  {
    id: 88,
    question: "How do you implement routing in React applications?",
    options: [
      "Using React Router library",
      "Using Browser Router for web apps",
      "Using Route components for path matching",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React routing is implemented using React Router library with BrowserRouter for web apps and Route components for path matching and component rendering."
  },
  {
    id: 89,
    question: "What is the purpose of React.Children utility?",
    options: [
      "To manipulate props.children",
      "To map, count, or transform children",
      "To handle children regardless of type",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.Children provides utilities to manipulate props.children, including methods to map, count, transform, and handle children regardless of their type."
  },
  {
    id: 90,
    question: "How do you implement animations in React?",
    options: [
      "Using CSS transitions and animations",
      "Using React Transition Group",
      "Using libraries like Framer Motion",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React animations can be implemented using CSS transitions, React Transition Group for complex transitions, or animation libraries like Framer Motion."
  },
  {
    id: 91,
    question: "What is the difference between React and ReactDOM?",
    options: [
      "React contains core functionality",
      "ReactDOM handles DOM-specific operations",
      "ReactDOM provides rendering methods",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React contains the core functionality like components and hooks, while ReactDOM handles DOM-specific operations like rendering components to the DOM."
  },
  {
    id: 92,
    question: "How do you handle forms validation in React?",
    options: [
      "Using controlled components with validation logic",
      "Using libraries like Formik or React Hook Form",
      "Using custom validation hooks",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Form validation can be handled using controlled components with custom validation, libraries like Formik or React Hook Form, or custom validation hooks."
  },
  {
    id: 93,
    question: "What is React's concurrent features?",
    options: [
      "Ability to interrupt and resume rendering",
      "Automatic batching of state updates",
      "Improved user experience with better responsiveness",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React's concurrent features include the ability to interrupt and resume rendering, automatic batching of state updates, and improved responsiveness for better user experience."
  },
  {
    id: 94,
    question: "How do you implement testing in React components?",
    options: [
      "Using Jest for unit testing",
      "Using React Testing Library for component testing",
      "Using Enzyme for shallow rendering",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React testing is implemented using Jest for unit testing, React Testing Library for component testing focused on user behavior, or Enzyme for shallow rendering."
  },
  {
    id: 95,
    question: "What is the purpose of React DevTools?",
    options: [
      "To inspect component hierarchy",
      "To debug props and state",
      "To profile performance",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React DevTools allows developers to inspect component hierarchy, debug props and state, profile performance, and understand component behavior during development."
  },
  {
    id: 96,
    question: "How do you implement server-side rendering (SSR) with React?",
    options: [
      "Using Next.js framework",
      "Using ReactDOMServer.renderToString()",
      "Using Gatsby for static generation",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "SSR can be implemented using Next.js framework, ReactDOMServer.renderToString() for custom solutions, or Gatsby for static site generation."
  },
  {
    id: 97,
    question: "What is the purpose of React.StrictMode in development?",
    options: [
      "Identifies unsafe lifecycles",
      "Warns about deprecated APIs",
      "Helps detect side effects",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.StrictMode in development identifies unsafe lifecycles, warns about deprecated APIs, and helps detect side effects by double-invoking functions."
  },
  {
    id: 98,
    question: "How do you optimize bundle size in React applications?",
    options: [
      "Using tree shaking to remove unused code",
      "Implementing code splitting with React.lazy",
      "Using dynamic imports for large libraries",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Bundle size optimization includes tree shaking to remove unused code, code splitting with React.lazy, and dynamic imports for large libraries and components."
  },
  {
    id: 99,
    question: "What is the difference between React.Component and React.PureComponent?",
    options: [
      "PureComponent implements shallow comparison",
      "PureComponent automatically implements shouldComponentUpdate",
      "PureComponent can prevent unnecessary re-renders",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.PureComponent implements shouldComponentUpdate with shallow comparison of props and state, potentially preventing unnecessary re-renders compared to React.Component."
  },
  {
    id: 100,
    question: "How do you implement accessibility (a11y) in React applications?",
    options: [
      "Using semantic HTML elements",
      "Adding ARIA attributes for screen readers",
      "Implementing keyboard navigation",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Accessibility in React involves using semantic HTML, adding ARIA attributes for screen readers, implementing keyboard navigation, and following WCAG guidelines."
  },
  {
    id: 101,
    question: "What is the purpose of React.StrictMode?",
    options: [
      "To enable strict JavaScript mode",
      "To highlight potential problems in development",
      "To improve performance in production",
      "To enforce TypeScript usage"
    ],
    correctAnswer: 1,
    explanation: "React.StrictMode is a development tool that helps identify potential problems by intentionally double-invoking functions and highlighting unsafe lifecycle methods and deprecated APIs."
  },
  {
    id: 102,
    question: "How do you handle form validation in React?",
    options: [
      "Using controlled components with state",
      "Using libraries like Formik or React Hook Form",
      "Using custom validation functions",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Form validation in React can be handled through controlled components with state validation, third-party libraries like Formik or React Hook Form, or custom validation functions."
  },
  {
    id: 103,
    question: "What is the difference between React.memo and useMemo?",
    options: [
      "React.memo wraps components, useMemo memoizes values",
      "React.memo is for class components, useMemo for functional",
      "React.memo is deprecated, useMemo is modern",
      "They are identical in functionality"
    ],
    correctAnswer: 0,
    explanation: "React.memo is a higher-order component that memoizes the entire component, while useMemo is a Hook that memoizes specific computed values within a component."
  },
  {
    id: 104,
    question: "How do you implement lazy loading for images in React?",
    options: [
      "Using the loading='lazy' attribute",
      "Using Intersection Observer API",
      "Using libraries like react-lazyload",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Image lazy loading can be implemented using the native loading='lazy' attribute, Intersection Observer API for custom solutions, or libraries like react-lazyload."
  },
  {
    id: 105,
    question: "What is the purpose of the key prop in React lists?",
    options: [
      "To provide unique identification for elements",
      "To optimize reconciliation algorithm",
      "To prevent unnecessary re-renders",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The key prop provides unique identification for list elements, helps React's reconciliation algorithm efficiently update the DOM, and prevents unnecessary re-renders."
  },
  {
    id: 106,
    question: "How do you implement infinite scrolling in React?",
    options: [
      "Using Intersection Observer API",
      "Using scroll event listeners",
      "Using libraries like react-infinite-scroll-component",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Infinite scrolling can be implemented using Intersection Observer API, scroll event listeners with throttling, or libraries like react-infinite-scroll-component."
  },
  {
    id: 107,
    question: "What is the difference between React Fiber and the old reconciliation algorithm?",
    options: [
      "Fiber enables incremental rendering",
      "Fiber allows prioritization of updates",
      "Fiber can pause and resume work",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React Fiber is a complete rewrite of the reconciliation algorithm that enables incremental rendering, update prioritization, and the ability to pause and resume work."
  },
  {
    id: 108,
    question: "How do you handle authentication in React applications?",
    options: [
      "Using JWT tokens with localStorage",
      "Using authentication providers and context",
      "Using libraries like Auth0 or Firebase Auth",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Authentication in React can be handled using JWT tokens stored securely, authentication providers with React Context, or third-party services like Auth0 or Firebase Auth."
  },
  {
    id: 109,
    question: "What is the purpose of React Developer Tools?",
    options: [
      "To debug React component hierarchy",
      "To inspect props and state",
      "To profile component performance",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React Developer Tools is a browser extension that allows debugging React component hierarchy, inspecting props and state, and profiling component performance."
  },
  {
    id: 110,
    question: "How do you implement drag and drop functionality in React?",
    options: [
      "Using HTML5 Drag and Drop API",
      "Using libraries like react-dnd",
      "Using mouse events with state management",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Drag and drop can be implemented using the HTML5 Drag and Drop API, libraries like react-dnd for complex scenarios, or custom mouse event handling with state management."
  },
  {
    id: 111,
    question: "What is the difference between shallow and deep comparison in React?",
    options: [
      "Shallow compares references, deep compares values",
      "Shallow is faster, deep is more accurate",
      "Shallow is used by PureComponent, deep by memo",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Shallow comparison checks object references and first-level properties, while deep comparison recursively checks all nested values. Shallow is faster and used by PureComponent."
  },
  {
    id: 112,
    question: "How do you implement real-time data updates in React?",
    options: [
      "Using WebSockets",
      "Using Server-Sent Events (SSE)",
      "Using polling with setInterval",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Real-time data updates can be implemented using WebSockets for bidirectional communication, Server-Sent Events for server-to-client updates, or polling with setInterval."
  },
  {
    id: 113,
    question: "What is the purpose of React.createRef() vs useRef()?",
    options: [
      "createRef() is for class components, useRef() for functional",
      "createRef() creates new refs, useRef() persists across renders",
      "createRef() is legacy, useRef() is modern",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "createRef() is used in class components and creates new ref objects on each render, while useRef() is for functional components and persists the same ref object across renders."
  },
  {
    id: 114,
    question: "How do you optimize React application performance?",
    options: [
      "Using React.memo and useMemo",
      "Implementing code splitting and lazy loading",
      "Using virtualization for large lists",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React performance optimization includes memoization with React.memo and useMemo, code splitting with lazy loading, virtualization for large datasets, and proper state management."
  },
  {
    id: 115,
    question: "What is the difference between controlled and uncontrolled inputs?",
    options: [
      "Controlled inputs have value managed by React state",
      "Uncontrolled inputs manage their own state",
      "Controlled inputs use onChange handlers",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Controlled components have their value managed by React state and use onChange handlers, while uncontrolled components manage their own state internally."
  },
  {
    id: 116,
    question: "How do you implement internationalization (i18n) in React?",
    options: [
      "Using libraries like react-i18next",
      "Using React Context for locale management",
      "Using format functions for dates and numbers",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Internationalization in React involves using libraries like react-i18next, React Context for locale management, and proper formatting functions for dates, numbers, and currencies."
  },
  {
    id: 117,
    question: "What is the purpose of React.Fragment?",
    options: [
      "To group multiple elements without adding DOM nodes",
      "To avoid wrapper div elements",
      "To improve performance by reducing DOM nodes",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.Fragment allows grouping multiple elements without adding extra DOM nodes, avoiding unnecessary wrapper divs and keeping the DOM structure clean."
  },
  {
    id: 118,
    question: "How do you handle state management in large React applications?",
    options: [
      "Using Redux for global state",
      "Using Zustand or Context API",
      "Using component-level state for local data",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "State management in large applications typically involves Redux for complex global state, lighter solutions like Zustand or Context API, and component-level state for local data."
  },
  {
    id: 119,
    question: "What is the difference between React components and React elements?",
    options: [
      "Components are functions/classes, elements are objects",
      "Components are reusable, elements are instances",
      "Components define UI, elements represent DOM nodes",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Components are functions or classes that define UI logic, while elements are plain objects that describe what should appear on screen and represent DOM nodes."
  },
  {
    id: 120,
    question: "How do you implement custom hooks in React?",
    options: [
      "Functions starting with 'use' that call other hooks",
      "Functions that encapsulate reusable logic",
      "Functions that follow React hooks rules",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Custom hooks are functions that start with 'use', call other hooks, encapsulate reusable stateful logic, and must follow the rules of hooks."
  },
  {
    id: 121,
    question: "What is the purpose of the dependency array in useEffect?",
    options: [
      "To control when the effect runs",
      "To prevent infinite loops",
      "To optimize performance",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "The dependency array in useEffect controls when the effect runs, prevents infinite loops by specifying dependencies, and optimizes performance by avoiding unnecessary executions."
  },
  {
    id: 122,
    question: "How do you implement server-side rendering (SSR) with React?",
    options: [
      "Using Next.js framework",
      "Using ReactDOMServer.renderToString",
      "Using Gatsby for static sites",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "SSR can be implemented using Next.js framework for full SSR support, ReactDOMServer.renderToString for custom solutions, or Gatsby for static site generation."
  },
  {
    id: 123,
    question: "What is the difference between React.createElement and JSX?",
    options: [
      "JSX is syntactic sugar for React.createElement",
      "JSX gets compiled to React.createElement calls",
      "They produce the same React elements",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "JSX is syntactic sugar that gets compiled to React.createElement calls by Babel. Both approaches produce the same React elements but JSX is more readable."
  },
  {
    id: 124,
    question: "How do you handle concurrent rendering in React 18?",
    options: [
      "Using Suspense boundaries",
      "Using startTransition for non-urgent updates",
      "Using useDeferredValue for delayed values",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Concurrent rendering in React 18 uses Suspense boundaries for loading states, startTransition for marking non-urgent updates, and useDeferredValue for deferring expensive updates."
  },
  {
    id: 125,
    question: "What is the purpose of React portals?",
    options: [
      "To render children outside the parent DOM hierarchy",
      "To create modals and tooltips",
      "To break out of CSS overflow constraints",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React portals allow rendering children into a DOM node outside the parent component's hierarchy, useful for modals, tooltips, and breaking out of CSS constraints."
  },
  {
    id: 126,
    question: "How do you implement theme switching in React applications?",
    options: [
      "Using CSS custom properties (variables)",
      "Using React Context for theme state",
      "Using CSS-in-JS libraries with theme providers",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Theme switching can be implemented using CSS custom properties for dynamic styling, React Context for theme state management, or CSS-in-JS libraries with theme providers."
  },
  {
    id: 127,
    question: "What is the difference between React.cloneElement and React.Children.map?",
    options: [
      "cloneElement clones single elements, Children.map iterates",
      "cloneElement adds props, Children.map transforms",
      "cloneElement preserves refs, Children.map creates new",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.cloneElement clones and modifies single elements while preserving refs, while React.Children.map iterates over children and can transform them into new elements."
  },
  {
    id: 128,
    question: "How do you implement progressive web app (PWA) features in React?",
    options: [
      "Using service workers for offline functionality",
      "Using web app manifest for installability",
      "Using workbox for caching strategies",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "PWA features in React include service workers for offline functionality, web app manifest for app installability, and tools like Workbox for advanced caching strategies."
  },
  {
    id: 129,
    question: "What is the purpose of React's reconciliation algorithm?",
    options: [
      "To efficiently update the DOM",
      "To compare new and old virtual DOM trees",
      "To minimize expensive DOM operations",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React's reconciliation algorithm efficiently updates the DOM by comparing new and old virtual DOM trees and performing minimal necessary changes to optimize performance."
  },
  {
    id: 130,
    question: "How do you implement data fetching patterns in React?",
    options: [
      "Using useEffect with async functions",
      "Using libraries like SWR or React Query",
      "Using custom hooks for data fetching",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Data fetching in React can use useEffect with async functions, libraries like SWR or React Query for caching and synchronization, or custom hooks for reusable logic."
  },
  {
    id: 131,
    question: "What is the difference between React.lazy and dynamic imports?",
    options: [
      "React.lazy is for components, dynamic imports for modules",
      "React.lazy requires Suspense, dynamic imports don't",
      "React.lazy returns special React component type",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React.lazy is specifically for lazy-loading React components and requires Suspense boundaries, while dynamic imports can load any module and return promises."
  },
  {
    id: 132,
    question: "How do you implement virtualization in React applications?",
    options: [
      "Using libraries like react-window",
      "Using react-virtualized for complex scenarios",
      "Implementing custom virtualization with scroll events",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Virtualization can be implemented using libraries like react-window for simple cases, react-virtualized for complex scenarios, or custom solutions using scroll event handling."
  },
  {
    id: 133,
    question: "What is the purpose of React's act() function in testing?",
    options: [
      "To wrap state updates in tests",
      "To ensure all updates are flushed",
      "To make tests behave like production",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React's act() function wraps code that triggers state updates in tests, ensures all updates are flushed synchronously, and makes test behavior match production."
  },
  {
    id: 134,
    question: "How do you handle routing in React applications?",
    options: [
      "Using React Router for client-side routing",
      "Using Next.js for file-based routing",
      "Using Reach Router (now merged with React Router)",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Routing in React can use React Router for flexible client-side routing, Next.js for file-based routing with SSR, or other routing solutions depending on needs."
  },
  {
    id: 135,
    question: "What is the difference between React DevTools Profiler and browser DevTools?",
    options: [
      "React Profiler shows component-specific performance",
      "React Profiler tracks React-specific metrics",
      "React Profiler integrates with React's scheduling",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React DevTools Profiler provides React-specific performance insights, tracks component render times and causes, and integrates with React's scheduling and concurrent features."
  },
  {
    id: 136,
    question: "How do you implement micro-frontends with React?",
    options: [
      "Using module federation with Webpack",
      "Using single-spa framework",
      "Using iframe-based solutions",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Micro-frontends with React can use module federation for runtime sharing, single-spa for orchestration, iframe-based solutions for isolation, or other integration patterns."
  },
  {
    id: 137,
    question: "What is the purpose of React's Suspense component?",
    options: [
      "To handle loading states declaratively",
      "To work with lazy-loaded components",
      "To coordinate async operations",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React Suspense handles loading states declaratively, works with lazy-loaded components and data fetching, and helps coordinate async operations in the component tree."
  },
  {
    id: 138,
    question: "How do you implement animation in React applications?",
    options: [
      "Using CSS transitions and animations",
      "Using libraries like Framer Motion",
      "Using React Transition Group",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Animations in React can use CSS transitions and animations, libraries like Framer Motion for advanced animations, React Transition Group for component transitions, or other animation libraries."
  },
  {
    id: 139,
    question: "What is the difference between React 17 and React 18?",
    options: [
      "React 18 introduces concurrent rendering",
      "React 18 has automatic batching",
      "React 18 includes new hooks like useDeferredValue",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "React 18 introduces concurrent rendering, automatic batching for better performance, new hooks like useDeferredValue and useTransition, and Suspense improvements."
  },
  {
    id: 140,
    question: "How do you implement search functionality in React?",
    options: [
      "Using debounced input with useEffect",
      "Using libraries like Fuse.js for fuzzy search",
      "Using server-side search with API calls",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Search functionality can use debounced input handling, libraries like Fuse.js for client-side fuzzy search, server-side search with API integration, or combination approaches."
  },
  {
    id: 141,
    question: "What is the purpose of React's error boundaries?",
    options: [
      "To catch JavaScript errors in component tree",
      "To prevent entire app crashes",
      "To provide fallback UI for errors",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Error boundaries catch JavaScript errors anywhere in the component tree, prevent entire application crashes, log errors, and display fallback UI instead of broken components."
  },
  {
    id: 142,
    question: "How do you implement file upload in React?",
    options: [
      "Using input type='file' with onChange handler",
      "Using drag and drop with onDrop events",
      "Using libraries like react-dropzone",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "File upload can use HTML input with file type and onChange handlers, drag and drop with onDrop events, or libraries like react-dropzone for enhanced functionality."
  },
  {
    id: 143,
    question: "What is the difference between React hooks and higher-order components (HOCs)?",
    options: [
      "Hooks provide stateful logic without nesting",
      "HOCs wrap components, hooks are used inside",
      "Hooks are more composable and reusable",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Hooks provide stateful logic without component nesting, are used inside components rather than wrapping them, and offer better composition and reusability than HOCs."
  },
  {
    id: 144,
    question: "How do you implement table sorting and filtering in React?",
    options: [
      "Using array methods like sort() and filter()",
      "Using libraries like react-table",
      "Using custom hooks for table logic",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Table sorting and filtering can use native array methods, libraries like react-table for advanced features, custom hooks for reusable table logic, or combination approaches."
  },
  {
    id: 145,
    question: "What is the purpose of React's useLayoutEffect hook?",
    options: [
      "To run effects synchronously after DOM mutations",
      "To measure DOM elements before paint",
      "To avoid visual flicker in layouts",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useLayoutEffect runs synchronously after DOM mutations but before the browser paints, useful for measuring DOM elements and avoiding visual flicker in layout changes."
  },
  {
    id: 146,
    question: "How do you implement pagination in React applications?",
    options: [
      "Using state to track current page and page size",
      "Using URL parameters for page state",
      "Using libraries like react-paginate",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Pagination can use component state for page tracking, URL parameters for shareable page state, libraries like react-paginate for UI components, or custom pagination logic."
  },
  {
    id: 147,
    question: "What is the difference between React's development and production builds?",
    options: [
      "Production builds are minified and optimized",
      "Development builds include helpful warnings",
      "Production builds have smaller bundle sizes",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Development builds include helpful warnings and debugging tools, while production builds are minified, optimized, and have smaller bundle sizes with warnings removed."
  },
  {
    id: 148,
    question: "How do you implement responsive design in React applications?",
    options: [
      "Using CSS media queries",
      "Using React hooks to detect screen size",
      "Using libraries like react-responsive",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Responsive design in React can use CSS media queries, custom hooks to detect screen size changes, libraries like react-responsive, or CSS-in-JS solutions with breakpoints."
  },
  {
    id: 149,
    question: "What is the purpose of React's useImperativeHandle hook?",
    options: [
      "To customize ref values exposed to parent components",
      "To work with forwardRef",
      "To expose imperative APIs",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "useImperativeHandle customizes the instance value exposed when using refs with forwardRef, allowing parent components to call imperative methods on child components."
  },
  {
    id: 150,
    question: "How do you implement code quality tools in React projects?",
    options: [
      "Using ESLint for code linting",
      "Using Prettier for code formatting",
      "Using TypeScript for type checking",
      "All of the above"
    ],
    correctAnswer: 3,
    explanation: "Code quality in React projects involves ESLint for linting JavaScript/TypeScript, Prettier for consistent formatting, TypeScript for type safety, and testing tools for quality assurance."
  }
];

// Function to shuffle array using Fisher-Yates algorithm
export const shuffleQuestions = (questions) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to get a random subset of questions
export const getRandomQuestions = (questions, count = 50) => {
  const shuffled = shuffleQuestions(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
};
