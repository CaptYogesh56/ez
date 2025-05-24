import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [role, setRole] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async () => {
    try {
      setLoading(true);
      const prompt = userAnswer
        ? `Answer this interview question for ${role}: ${userAnswer}`
        : `Give me a answer of ${role}`;

      const res = await axios.post('http://localhost:5000/api/interview', {
        question: prompt,
      });

      setResponse(res.data.answer);
    } catch (err) {
      setError('❌ Connection failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="gradient-background"></div>
      
      <div className="main-card">
        <h1 className="title">
          <span className="ai-gradient">AI Interview Coach</span> 🚀
        </h1>

        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="modern-input"
          />
          <label className="input-label">Job Role (e.g., UI/UX Designer)</label>
          <div className="input-highlight"></div>
        </div>

        <div className="input-group">
          <textarea
            placeholder=" "
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="modern-textarea"
          />
          <label className="input-label">Describe more</label>
          <div className="input-highlight"></div>
        </div>

        <button 
          onClick={handleSend} 
          disabled={loading}
          className="send-button"
        >
          {loading ? (
            <div className="loader"></div>
          ) : (
            <>
              Generate Response
              <span className="button-icon">✨</span>
            </>
          )}
        </button>

        {error && <div className="error-message">{error}</div>}

        {response && (
          <div className="response-card">
            <div className="ai-header">
              <div className="pulse-dot"></div>
              <h3>AI Feedback</h3>
              <div className="ai-icon">🤖</div>
            </div>
            <div className="response-content">
              {response.split('\n').map((line, index) => (
                <p key={index} className="response-text">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;