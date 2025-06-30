import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState("employee");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("employee_id", employeeId);
    localStorage.setItem("role", role);

    if (role === "admin") {
      navigate("/results");
    } else {
      navigate("/vote");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        style={{ display: "block", marginBottom: "1rem" }}
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ display: "block", marginBottom: "1rem" }}
      >
        <option value="employee">Employee</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
