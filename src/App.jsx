import { useState } from "react";
import Quiz from "./Quiz";
import CodeEditor from "./CodeEditor";
import AdminDashboard from "./AdminDashboard";

function App() {
  const [view, setView] = useState("test");

  return (
    <div>
      <nav style={{ padding: 8 }}>
        <button onClick={() => setView("test")}>Assessment</button>{" "}
        <button onClick={() => setView("admin")}>Admin Dashboard</button>
      </nav>

      {view === "test" ? (
        <>
          <Quiz />
          <CodeEditor />
        </>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
}

export default App;