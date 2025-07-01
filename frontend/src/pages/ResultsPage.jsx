// frontend/src/pages/ResultsPage.jsx
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [votingStartTime] = useState(new Date("2025-07-01T10:00:00Z")); // Replace with your actual start time
  const [now, setNow] = useState(new Date());

  // Timer to update time every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const votingEndTime = new Date(votingStartTime.getTime() + 24 * 60 * 60 * 1000);
  const timeLeft = votingEndTime - now;

  const fetchResults = async () => {
    try {
      const res = await fetch("http://localhost:8000/results");
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Failed to fetch results", err);
    }
  };

  useEffect(() => {
    if (showResults || timeLeft <= 0) {
      fetchResults();
    }
  }, [showResults, timeLeft]);

  const formatCountdown = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Voting Results</h2>

      {timeLeft > 0 && !showResults ? (
        <p>
          Voting results will be available in:{" "}
          <strong>{formatCountdown(timeLeft)}</strong>
        </p>
      ) : (
        <div>
          {results ? (
            <>
              <p>Option A: {results.optionA}</p>
              <p>Option B: {results.optionB}</p>
            </>
          ) : (
            <p>Loading results...</p>
          )}
        </div>
      )}

      <button onClick={() => setShowResults(true)} style={{ marginTop: "1rem" }}>
        Override & Show Results (Admin Only)
      </button>
    </div>
  );
}
