'use client';

import { useState } from 'react';

const QueryForm = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  const handleQuery = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error('Failed to query embeddings');
      }

      const data = await response.json();
      onResults(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleQuery} className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary mt-2">
        Query
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default QueryForm;
