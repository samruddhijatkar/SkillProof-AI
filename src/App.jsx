import React, { useState } from 'react';
import StudentDashboard from './StudentDashboard';
import Quiz from './Quiz';
import AdminDashboard from './AdminDashboard';
import CodeEditor from './CodeEditor';

function App() {
  const [page, setPage] = useState('dashboard');

  const navStyle = {
    display: 'flex',
    gap: '8px',
    padding: '16px 24px',
    background: '#1e293b',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const logoStyle = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '18px',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
  };

  const tabStyle = (isActive) => ({
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'all 0.2s ease',
    background: isActive ? '#2563eb' : 'transparent',
    color: isActive ? '#fff' : '#cbd5e1',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={navStyle}>
        <span style={logoStyle}>🎯 SkillProof-AI</span>
        <button style={tabStyle(page === 'dashboard')} onClick={() => setPage('dashboard')}>
          📊 Dashboard
        </button>
        <button style={tabStyle(page === 'quiz')} onClick={() => setPage('quiz')}>
          📝 Quiz
        </button>
        <button style={tabStyle(page === 'admin')} onClick={() => setPage('admin')}>
          🛡️ Admin
        </button>
        <button style={tabStyle(page === 'editor')} onClick={() => setPage('editor')}>
  Code Editor
</button>
      </nav>

      <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {page === 'dashboard' && <StudentDashboard />}
        {page === 'quiz' && <Quiz />}
        {page === 'admin' && <AdminDashboard />}
        {page === 'editor' && <CodeEditor />}
      </div>
    </div>
  );
}

export default App;