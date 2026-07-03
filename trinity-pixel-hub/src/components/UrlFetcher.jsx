import { useState } from 'react';

export default function UrlFetcher() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const text = await response.text();
      setResult(text);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4">Fetch URL Content</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-3 py-2 rounded bg-tph-dark text-white focus:outline-none focus:ring-2 focus:ring-tph-cyan"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-4 py-2 bg-tph-cyan text-black rounded hover:bg-tph-pink transition"
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>
      {error && <p className="text-red-400">Error: {error}</p>}
      {result && (
        <pre className="whitespace-pre-wrap bg-tph-dark p-3 rounded overflow-auto text-white">
          {result}
        </pre>
      )}
    </div>
  );
}
