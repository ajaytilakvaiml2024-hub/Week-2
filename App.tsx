
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { Loader } from './components/Loader';
import { classifyWasteImage } from './services/geminiService';
import type { ClassificationResult } from './types';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClassify = useCallback(async () => {
    if (!imageFile || !previewUrl) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      // previewUrl is a base64 string like "data:image/jpeg;base64,..."
      // We need to extract the base64 part.
      const base64Data = previewUrl.split(',')[1];
      const mimeType = imageFile.type;
      
      const classificationResult = await classifyWasteImage(base64Data, mimeType);
      setResult(classificationResult);
    } catch (err) {
      console.error(err);
      setError("Failed to classify the image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, previewUrl]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-300">
          <ImageUploader onImageSelect={handleImageSelect} previewUrl={previewUrl} />
          
          {previewUrl && (
            <div className="mt-6 text-center">
              <button
                onClick={handleClassify}
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
              >
                {isLoading ? 'Analyzing...' : 'Classify Waste'}
              </button>
            </div>
          )}

          {isLoading && <Loader />}
          
          {error && (
            <div className="mt-6 p-4 text-center text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {result && !isLoading && (
             <div className="mt-8">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-700 dark:text-gray-300">Analysis Result</h2>
                <ResultCard result={result} />
             </div>
          )}
        </div>
        <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
            <p>Powered by Google Gemini. For educational purposes only.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
