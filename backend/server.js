const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const roles = require('./data/roles.json');
const quizzes = require('./data/quizzes.json');

// ---- Core Logic ----
function analyzeSkills(role, userSkills) {
  const requiredSkills = roles[role];
  if (!requiredSkills) return null;

  const verified = requiredSkills.filter(skill => userSkills.includes(skill));
  const missing = requiredSkills.filter(skill => !userSkills.includes(skill));
  const matchScore = Math.round((verified.length / requiredSkills.length) * 100);

  return { matchScore, verifiedSkills: verified, missingSkills: missing };
}

function isValidEvidenceUrl(url) {
  const pattern = /^(https?:\/\/)(www\.)?(github\.com|kaggle\.com|coursera\.org|udemy\.com)\/.+/i;
  return typeof url === 'string' && pattern.test(url);
}

// ---- Routes ----
app.get('/', (req, res) => {
  res.send('SkillProof-AI backend is running');
});

// Health check — useful for deployment platforms and quick "is it alive" checks
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/roles', (req, res) => {
  res.json(roles);
});

// Get quiz questions for a specific skill (so frontend doesn't need to duplicate quiz data)
app.get('/api/quiz/:skill', (req, res) => {
  const { skill } = req.params;
  const questions = quizzes[skill];

  if (!questions) {
    return res.status(404).json({ error: `No quiz found for skill '${skill}'` });
  }

  // Don't send correctIndex to frontend — otherwise a curious student can just read it in devtools
  const safeQuestions = questions.map(q => ({
    question: q.question,
    options: q.options
  }));

  res.json({ skill, questions: safeQuestions });
});

app.post('/api/analyze', (req, res) => {
  const { role, userSkills, evidenceLinks } = req.body;

  if (!role || typeof role !== 'string') {
    return res.status(400).json({ error: "'role' is required and must be a string" });
  }
  if (!Array.isArray(userSkills)) {
    return res.status(400).json({ error: "'userSkills' is required and must be an array" });
  }
  if (evidenceLinks && !Array.isArray(evidenceLinks)) {
    return res.status(400).json({ error: "'evidenceLinks' must be an array if provided" });
  }

  const learningResources = {
  "HTML": "https://developer.mozilla.org/en-US/docs/Web/HTML",
  "CSS": "https://developer.mozilla.org/en-US/docs/Web/CSS",
  "JavaScript": "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
  "React": "https://react.dev/learn",
  "Git": "https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes/",
  "Node.js": "https://nodejs.dev/en/learn/",
  "Express": "https://expressjs.com/en/starter/installing.html",
  "Databases": "https://www.freecodecamp.org/news/database-design-course-for-beginners/",
  "REST APIs": "https://www.freecodecamp.org/news/rest-api-tutorial-rest-client-rest-service-and-api-calls-explained-with-code-examples/",
  "Python": "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
  "SQL": "https://www.freecodecamp.org/learn/relational-database/",
  "Excel": "https://www.freecodecamp.org/news/learn-excel-basics/",
  "Statistics": "https://www.khanacademy.org/math/statistics-probability",
  "Data Visualization": "https://www.freecodecamp.org/news/data-visualization-with-python/",
  "ML Algorithms": "https://www.freecodecamp.org/learn/machine-learning-with-python/",
  "Data Handling": "https://www.freecodecamp.org/learn/data-analysis-with-python/",
  "Linux": "https://www.freecodecamp.org/news/the-linux-commands-handbook/",
  "Docker": "https://docker-curriculum.com/",
  "CI/CD": "https://www.freecodecamp.org/news/what-is-ci-cd/",
  "Cloud Basics": "https://www.freecodecamp.org/news/the-cloud-computing-handbook/"
};

  const result = analyzeSkills(role, userSkills);
  if (!result) {
    return res.status(404).json({ error: `Role '${role}' not found. Check GET /api/roles for valid roles.` });
  }

  const validatedLinks = (evidenceLinks || []).map(link => ({
    url: link,
    valid: isValidEvidenceUrl(link)
  }));

  const recommendations = result.missingSkills.map(skill => ({
  skill: skill,
  resource: learningResources[skill] || "https://www.freecodecamp.org/"
}));

   res.json({ ...result, evidenceLinks: validatedLinks, recommendations });
});

app.post('/api/evaluate-quiz', (req, res) => {
  const { skill, answers } = req.body;

  if (!skill || typeof skill !== 'string') {
    return res.status(400).json({ error: "'skill' is required and must be a string" });
  }
  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "'answers' is required and must be an array" });
  }

  const questions = quizzes[skill];
  if (!questions) {
    return res.status(404).json({ error: `No quiz found for skill '${skill}'. Check GET /api/quiz/:skill for valid skills.` });
  }

  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correctIndex) score++;
  });

  const percentage = Math.round((score / questions.length) * 100);
  res.json({ score, total: questions.length, percentage });
});

// Catch-all for unknown routes (avoids raw ugly errors)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Use PORT from environment (needed for Render/Railway deployment), fallback to 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));