'use client';

import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import PolicyDocument from '../components/PolicyDocument';

const HomePage = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/documents');
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDocuments();
  }, []);

  const handleUpload = (document) => {
    setDocuments([...documents, document]);
  };

  const handleSummarize = async (id) => {
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to summarize document');
      }

      const data = await response.json();
      const updatedDocuments = documents.map((doc) =>
        doc.id === id ? { ...doc, summary: data.summary } : doc
      );
      setDocuments(updatedDocuments);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <FileUpload onUpload={handleUpload} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {documents.map((document) => (
          <PolicyDocument key={document.id} document={document} onSummarize={handleSummarize} />
        ))}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default HomePage;
