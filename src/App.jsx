import BasicJSXComponent from "./components/BasicJSXComponent";
import Counter from "./components/Counter";
import InputFocus from "./components/InputFocus";
import StatelessFunctionalComponentExample from "./components/StatelessFunctionalComponentExample";
import ThemeToggler from "./components/ThemeToggler";
import UserFetcher from "./components/UserFetcher";

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

        {/* --- Stateless Functional Component Example --- */}
        <StatelessFunctionalComponentExample
          headerText="Welcome to a Stateless Component!"
          description="This component simply displays text passed via props and does not manage any internal state."
        />
        <StatelessFunctionalComponentExample
          headerText="Welcome to a Stateless Component! two"
          description="This component simply displays text passed via props and does not manage any internal state."
        />

        {/* --- Other Hook Examples --- */}
        <Counter />
        <UserFetcher />
        <ThemeToggler />
        <InputFocus />
        <BasicJSXComponent
          title="Hello from a JSX Component!"
          message="This component demonstrates how to define and use a simple functional component with props."
        />

        <p className="text-center text-gray-600 mt-10">
          These examples demonstrate the core functionality of `useState`,
          `useEffect`, `useContext`, `useRef`, basic JSX component creation, and
          the fundamental syntax of functional React components.
        </p>
      </div>
    </div>
  );
}
