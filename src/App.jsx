// src/App.jsx (or src/App.tsx)
import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Hello Tailwind CSS with React!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          This is a simple example demonstrating Tailwind CSS in a React application.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default App;