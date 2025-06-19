/**
 * 5. Basic JSX Component Example
 * Scenario: Demonstrate the basic structure of a functional React component
 * that returns JSX and receives simple props.
 *
 * Functional components are plain JavaScript functions that accept "props"
 * (properties or arguments) as their single argument and return React elements,
 * which are typically written using JSX.
 */
function BasicJSXComponent({ title, message }) {
  // Functional components receive props as an object.
  // We use object destructuring to easily access them (e.g., `title` and `message`).

  return (
    // JSX must return a single root element. If you need to return multiple
    // elements without an extra DOM node, use a React Fragment (<>...</>).
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        5. JSX Component Example: A Simple Card
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

export default BasicJSXComponent