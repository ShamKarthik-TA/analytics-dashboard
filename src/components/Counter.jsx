import { useState } from "react";

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

export default Counter