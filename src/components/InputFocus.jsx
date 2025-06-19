import { useEffect, useRef } from "react";

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
    // We are deliberately keeping this styling for visual feedback on focus.
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


export default InputFocus