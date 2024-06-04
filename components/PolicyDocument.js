'use client';

const PolicyDocument = ({ document }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold">{document.name}</h2>
      {document.summary && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">Summary:</h3>
          <p>{document.summary}</p>
        </div>
      )}
    </div>
  );
};

export default PolicyDocument;
