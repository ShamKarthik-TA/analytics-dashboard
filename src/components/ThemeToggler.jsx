// 3. useContext Hook Example: Theme Toggler
// Scenario: Provide a theme (light/dark) to deeply nested components without passing props manually.
//
// `useContext` allows components to subscribe to React context changes.

import { createContext, useContext, useState } from "react";

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

export default ThemeToggler