import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const AddFileUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    uploadFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      // Add more if needed later
    },
  });

  const uploadFile = async (file) => {
    setUploading(true);
    setMessage(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5001/add-file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border-2 border-dashed border-gray-400 rounded-2xl bg-white shadow-md">
      <div
        {...getRootProps()}
        className={`cursor-pointer flex flex-col items-center justify-center p-10 border-2 rounded-xl transition ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-700 text-lg mb-2">
          {isDragActive ? 'Drop the file here...' : 'Drag & drop or click to upload a file'}
        </p>
        <p className="text-sm text-gray-500">Only .pdf and .pptx are supported for now</p>
      </div>

      {uploading && <p className="text-blue-600 mt-4">Uploading & processing...</p>}
      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default AddFileUploader;
