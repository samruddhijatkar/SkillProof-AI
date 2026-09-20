import { useState } from "react";

const students = [
  { id: 1, name: "Aditi Jadhav", role: "Frontend Developer", score: 82, verified: true },
  { id: 2, name: "Rohan Patil", role: "Backend Developer", score: 64, verified: true },
  { id: 3, name: "Sneha Kulkarni", role: "Data Analyst", score: 45, verified: false },
  { id: 4, name: "Omkar Shinde", role: "Frontend Developer", score: 91, verified: true },
  { id: 5, name: "Neha More", role: "Data Analyst", score: 30, verified: false },
];

const scoreColor = (s) => (s >= 75 ? "#16a34a" : s >= 50 ? "#d97706" : "#dc2626");

export default function AdminDashboard() {
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortDesc, setSortDesc] = useState(true);

  const roles = ["All", ...new Set(students.map((s) => s.role))];

  const rows = students
    .filter((s) => roleFilter === "All" || s.role === roleFilter)
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  const avg = rows.length
    ? Math.round(rows.reduce((sum, s) => sum + s.score, 0) / rows.length)
    : 0;

  return (
    <div style={{ padding: 16 }}>
      <h2>Employer & College Analytics</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          Filter by role:{" "}
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            {roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>{" "}
        <button onClick={() => setSortDesc(!sortDesc)}>
          Sort by score {sortDesc ? "↓" : "↑"}
        </button>
        <span style={{ marginLeft: 16 }}>
          Students: {rows.length} | Average score: {avg}%
        </span>
      </div>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Selected Role</th>
            <th>Readiness Score</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.role}</td>
              <td style={{ color: scoreColor(s.score), fontWeight: "bold" }}>{s.score}%</td>
              <td>
                <span
                  style={{
                    padding: "2px 10px",
                    borderRadius: 12,
                    color: "white",
                    background: s.verified ? "#16a34a" : "#6b7280",
                  }}
                >
                  {s.verified ? "✔ Verified" : "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}