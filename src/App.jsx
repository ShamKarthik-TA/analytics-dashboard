import React, { useState, useEffect, useContext, useRef, createContext } from 'react';

/**
 * 1. useState Hook Example: Simple Counter
 * Scenario: Display and update a count value based on user interaction.
 *
 * `useState` allows functional components to manage state.
 * It returns an array: [currentState, setStateFunction].
 */
function Counter() {
  // `count` is the current state value.
  // `setCount` is the function to update `count`.
  // `0` is the initial state value.
  const [count, setCount] = useState(0);

  const increment = () => {
    // When updating state based on previous state, it's best practice
    // to use the functional update form of `setCount` to avoid stale closures.
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">useState Example: Simple Counter</h2>
      <p className="text-gray-700 text-lg mb-4">Current Count: <span className="font-semibold text-blue-600">{count}</span></p>
      <div className="flex space-x-4">
        <button
          onClick={increment}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-sm"
        >
          Increment
        </button>
        <button
          onClick={decrement}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 shadow-sm"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

/**
 * 2. useEffect Hook Example: Data Fetching with Dependency
 * Scenario: Fetch user data from an API when the component mounts,
 * and re-fetch if the `userId` changes. Also, demonstrate cleanup.
 *
 * `useEffect` allows you to perform side effects (like data fetching,
 * subscriptions, or manually changing the DOM) in functional components.
 * It runs after every render by default, but its behavior can be controlled
 * by the dependency array.
 */
function UserFetcher() {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect for data fetching
  useEffect(() => {
    setLoading(true);
    setUserData(null); // Clear previous data
    setError(null);    // Clear previous error

    const fetchUser = async () => {
      try {
        // Simulate API call using JSONPlaceholder
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Cleanup function (optional):
    // This runs when the component unmounts or before the effect re-runs
    // (if dependencies change). Useful for clearing timers, canceling network requests, etc.
    return () => {
      console.log(`Cleanup for userId ${userId}. (e.g., cancel pending request)`);
      // In a real app, you might cancel the fetch request here using an AbortController.
    };

  }, [userId]); // Dependency Array: This effect re-runs whenever `userId` changes.
                // An empty array `[]` means it runs only once after the initial render (on mount).

  const handleNextUser = () => {
    setUserId(prevId => (prevId < 10 ? prevId + 1 : 1)); // Cycle through users 1-10
  };

  const handlePrevUser = () => {
    setUserId(prevId => (prevId > 1 ? prevId - 1 : 10)); // Cycle through users 1-10
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">useEffect Example: Data Fetching</h2>
      <p className="text-gray-700 text-lg mb-2">Current User ID: <span className="font-semibold text-purple-600">{userId}</span></p>

      {loading && <p className="text-purple-500">Loading user data...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {userData && (
        <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
          <p><span className="font-semibold">Name:</span> {userData.name}</p>
          <p><span className="font-semibold">Email:</span> {userData.email}</p>
          <p><span className="font-semibold">Phone:</span> {userData.phone}</p>
        </div>
      )}

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handlePrevUser}
          className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300 shadow-sm"
        >
          Previous User
        </button>
        <button
          onClick={handleNextUser}
          className="px-6 py-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300 shadow-sm"
        >
          Next User
        </button>
      </div>
    </div>
  );
}

// 3. useContext Hook Example: Theme Toggler
// Scenario: Provide a theme (light/dark) to deeply nested components without passing props manually.
//
// `useContext` allows components to subscribe to React context changes.
// `createContext` creates a Context object.
const ThemeContext = createContext('light'); // Default theme is 'light'

// Component that consumes the theme context
function ThemedButton() {
  const theme = useContext(ThemeContext); // Consume the current theme value
  const buttonClasses = theme === 'dark'
    ? 'bg-gray-800 text-white hover:bg-gray-700'
    : 'bg-yellow-400 text-gray-900 hover:bg-yellow-500';

  return (
    <button className={`px-6 py-3 rounded-md transition duration-300 shadow-sm ${buttonClasses}`}>
      I'm a Themed Button ({theme} mode)
    </button>
  );
}

// Another component that uses ThemedButton, showing no prop drilling needed
function Toolbar() {
  return (
    <div className="p-4 bg-gray-100 rounded-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Toolbar</h3>
      <ThemedButton />
    </div>
  );
}

function ThemeToggler() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // ThemeContext.Provider makes the `theme` value available to all
    // components nested within it, regardless of how deep.
    <ThemeContext.Provider value={theme}>
      <div className="p-6 bg-white rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">useContext Example: Theme Toggler</h2>
        <p className="text-gray-700 text-lg mb-4">Current Theme: <span className="font-semibold text-green-600">{theme.toUpperCase()}</span></p>
        <button
          onClick={toggleTheme}
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 shadow-sm mb-6"
        >
          Toggle Theme
        </button>
        <Toolbar /> {/* Toolbar and ThemedButton automatically get the theme */}
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * 4. useRef Hook Example: Focusing an Input Field
 * Scenario: Focus an input field programmatically without re-rendering the component.
 *
 * `useRef` returns a mutable ref object whose `.current` property is initialized
 * to the passed argument (`initialValue`). The returned ref object will persist
 * for the full lifetime of the component. It's often used to access DOM elements
 * or store mutable values that don't trigger a re-render.
 */
function InputFocus() {
  // Create a ref object. It will hold a reference to the DOM element.
  const inputRef = useRef(null);

  const focusInput = () => {
    // `.current` property of the ref holds the actual DOM element once mounted.
    if (inputRef.current) {
      inputRef.current.focus(); // Programmatically focus the input field
      inputRef.current.style.borderColor = '#4CAF50'; // Optional: highlight
      inputRef.current.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.5)';
    }
  };

  const clearHighlight = () => {
    if (inputRef.current) {
      inputRef.current.style.borderColor = '';
      inputRef.current.style.boxShadow = '';
    }
  };

  // useEffect to focus on mount (optional, for initial load scenario)
  useEffect(() => {
    // You could also focus here initially if desired
    // focusInput();
  }, []); // Run once on mount

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">useRef Example: Focusing Input</h2>
      <p className="text-gray-700 text-lg mb-4">Click the button to focus the input field.</p>
      <input
        type="text"
        ref={inputRef} // Attach the ref to the input DOM element
        placeholder="Type something here..."
        onFocus={clearHighlight} // Clear highlight when manually focused
        className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
      />
      <button
        onClick={focusInput}
        className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300 shadow-sm"
      >
        Focus Input
      </button>
    </div>
  );
}

/**
 * 5. How to Create a JSX Component
 * Scenario: Demonstrate the basic structure of a functional React component
 * that returns JSX.
 *
 * Functional components are plain JavaScript functions that accept "props"
 * (properties or arguments) as their single argument and return React elements,
 * which are typically written using JSX.
 */
function BasicJSXComponent({ title, message }) {
  // Functional components receive props as an object.
  // We use object destructuring to easily access them.
  // Example: { title: "Hello", message: "World" }

  return (
    // JSX must return a single root element. If you need to return multiple
    // elements without an extra DOM node, use a React Fragment (<>...</>).
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        JSX Component Example: A Simple Card
      </h2>
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
        <p className="text-gray-700">{message}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 shadow-sm">
          Click Me (from JSX Component)
        </button>
      </div>
    </div>
  );
}


// Main App component that renders all examples
export default function App() {
  return (
    // Basic container for responsiveness and centering
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Tailwind CSS Script - MUST be in the HTML head in a real app, but here for self-containment */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
        }
        /* Basic styling for demonstration, Tailwind handles most */
        `}
      </style>

      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
          React Hooks & JSX in Action
        </h1>
        <BasicJSXComponent
          title="Hello from a JSX Component!"
          message="This component demonstrates how to define and use a simple functional component with props."
        />

        <Counter />
        <UserFetcher />
        <ThemeToggler />
        <InputFocus />
        {/* Render the new BasicJSXComponent */}

        <p className="text-center text-gray-600 mt-10">
          These examples demonstrate the core functionality of `useState`, `useEffect`, `useContext`, `useRef`, and
          basic JSX component creation in simple, real-life scenarios within functional React components.
        </p>
      </div>
    </div>
  );
}
