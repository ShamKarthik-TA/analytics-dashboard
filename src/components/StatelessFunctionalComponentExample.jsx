/**
 * 7. Stateless Functional Component Example
 * Scenario: A very simple component that only renders UI based on props,
 * without using any state, effects, or refs. This is the most basic form
 * of a functional component.
 */
function StatelessFunctionalComponentExample({ headerText, description }) {
  // This component doesn't use useState, useEffect, useContext, or useRef.
  // It simply receives props and renders them.
  // Its output is solely determined by the props it receives.

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Stateless Functional Component Example
      </h2>
      <div className="bg-pink-50 p-4 rounded-md border border-pink-200">
        <h3 className="text-xl font-semibold text-pink-800 mb-2">{headerText}</h3>
        <p className="text-gray-700">{description}</p>
        <p className="text-sm text-gray-500 mt-2">
          (This component is stateless - it only depends on the props you give it!)
        </p>
      </div>
    </div>
  );
}

export default StatelessFunctionalComponentExample