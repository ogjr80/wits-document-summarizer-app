'use client';

import { useState } from 'react';

const FileUpload = ({ onUpload }) => {
  const [error, setError] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      onUpload(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleUpload} className="p-4">
      <input type="file" name="file" />
      <button type="submit" className="btn btn-primary mt-2">
        Upload
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default FileUpload;
