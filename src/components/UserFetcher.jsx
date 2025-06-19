import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true); // Simulating initial loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Start loading and clear previous data/errors on dependency change or mount
    setLoading(true);
    setUserData(null);
    setError(null);

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
        setLoading(false); // Set loading to false once fetch is complete
      }
    };

    fetchUser();

    // Cleanup function: This runs when the component unmounts or
    // before the effect re-runs (if dependencies change).
    // Useful for clearing timers, canceling network requests, etc.
    return () => {
      console.log(`Cleanup for userId ${userId}. (e.g., cancel pending request)`);
      // In a real app, you might cancel the fetch request here using an AbortController.
    };

  }, [userId]); // Dependency Array: Effect re-runs whenever `userId` changes.
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

export default UserFetcher