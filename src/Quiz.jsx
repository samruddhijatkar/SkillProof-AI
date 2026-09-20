import { useState, useEffect } from "react";

const questions = [
<<<<<<< HEAD
  { q: "Which hook manages state in React?", options: ["useEffect", "useState", "useRef", "useMemo"] },
  { q: "Which HTTP method creates a resource?", options: ["GET", "PUT", "POST", "DELETE"] },
  { q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Coded Style Sheets"] },
=======
  { q: "Which hook manages state in React?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: 1 },
  { q: "Which HTTP method creates a resource?", options: ["GET", "PUT", "POST", "DELETE"], answer: 2 },
  { q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Coded Style Sheets"], answer: 0 },
    { q: "What does '===' check in JavaScript?", options: ["Value only", "Value and type", "Type only", "Nothing"], answer: 1 },
  { q: "Which keyword declares a constant?", options: ["var", "let", "const", "define"], answer: 2 },
  { q: "Which tag creates a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
  { q: "Which SQL keyword retrieves data from a table?", options: ["GET", "SELECT", "FETCH", "PULL"], answer: 1 },
  { q: "Which command uploads local commits to GitHub?", options: ["git pull", "git push", "git commit", "git fetch"], answer: 1 },
>>>>>>> 2c0ce5dd6a780a0507ea09da49e7fd0537229b6d
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [warnings, setWarnings] = useState(0);
  const [submitted, setSubmitted] = useState(false);
<<<<<<< HEAD
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setSubmitted(true);
    setLoading(true);

    const answersArray = questions.map((_, i) => answers[i]);

    try {
      const response = await fetch('http://localhost:5000/api/evaluate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: 'JavaScript',
          answers: answersArray
        })
      });

      if (!response.ok) {
        throw new Error('Backend returned an error');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert('Could not connect to Backend server. Ensure Member 3\'s backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };
=======

  const submit = () => setSubmitted(true);
>>>>>>> 2c0ce5dd6a780a0507ea09da49e7fd0537229b6d

  useEffect(() => {
    const onHide = () => {
      if (document.hidden && !submitted) {
        setWarnings((w) => w + 1);
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [submitted]);

  useEffect(() => {
    if (warnings >= 2 && !submitted) submit();
  }, [warnings, submitted]);

  const block = (e) => e.preventDefault();

  if (submitted) {
<<<<<<< HEAD
    if (loading) return <h2>Scoring...</h2>;
    if (!result) return <h2>Something went wrong.</h2>;
    return (
      <div>
        <h2>Submitted!</h2>
        <p>Score: {result.score}/{result.total}</p>
        <p>Percentage: {result.percentage}%</p>
      </div>
    );
=======
    const score = questions.filter((x, i) => answers[i] === x.answer).length;
    return <h2>Submitted. Score: {score}/{questions.length}</h2>;
>>>>>>> 2c0ce5dd6a780a0507ea09da49e7fd0537229b6d
  }

  return (
    <div onCopy={block} onPaste={block} onCut={block} onContextMenu={block} style={{ userSelect: "none" }}>
      <p>Warnings: {warnings}/2 (switching tabs twice auto-submits)</p>
      {questions.map((item, i) => (
        <div key={i}>
          <h3>{item.q}</h3>
          {item.options.map((opt, j) => (
            <label key={j} style={{ display: "block" }}>
              <input type="radio" name={`q${i}`} onChange={() => setAnswers({ ...answers, [i]: j })} /> {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  );
}