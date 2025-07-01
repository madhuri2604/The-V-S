
import { useState } from "react";

export default function VotePage() {
  const [employeeId, setEmployeeId] = useState("");
  const [choice, setChoice] = useState("optionA");
  const [message, setMessage] = useState("");

  const handleVote = async () => {
    try {
      const res = await fetch("http://localhost:8000/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employee_id: employeeId, choice }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Unknown error");

      setMessage("✅ " + data.message);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Vote Here</h2>

      <div>
        <label>
          Employee ID:{" "}
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Choice:{" "}
          <select value={choice} onChange={(e) => setChoice(e.target.value)}>
            <option value="optionA">Option A</option>
            <option value="optionB">Option B</option>
          </select>
        </label>
      </div>

      <button onClick={handleVote} style={{ marginTop: "1rem" }}>
        Submit Vote
      </button>

      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
