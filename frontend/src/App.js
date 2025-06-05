import React, { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeDigits, setIncludeDigits] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/generate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          length,
          include_upper: includeUpper ? 1 : 0,
          include_lower: includeLower ? 1 : 0,
          include_digits: includeDigits ? 1 : 0,
          include_special: includeSpecial ? 1 : 0,
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Could not connect to backend.' });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="card">
        <div className="form-group">
          <label>Password Length: <b>{length}</b></label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={e => setLength(Number(e.target.value))}
          />
        </div>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked={includeUpper} onChange={() => setIncludeUpper(v => !v)} />
            Uppercase (A-Z)
          </label>
          <label>
            <input type="checkbox" checked={includeLower} onChange={() => setIncludeLower(v => !v)} />
            Lowercase (a-z)
          </label>
          <label>
            <input type="checkbox" checked={includeDigits} onChange={() => setIncludeDigits(v => !v)} />
            Numbers (0-9)
          </label>
          <label>
            <input type="checkbox" checked={includeSpecial} onChange={() => setIncludeSpecial(v => !v)} />
            Special (!@#$...)
          </label>
        </div>
        <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Password'}
        </button>
      </div>

      <div className="output-card">
        <h2>Password Output</h2>
        {result && result.error && (
          <div className="error">{result.error}</div>
        )}
        {result && result.password && (
          <div className="output">
            <div className="password">{result.password}</div>
            <div className="meta">
              <span>
                <b>Strength:</b> {result.strength_label} ({result.strength_score}/5)
              </span>
              <span>
                <b>Rules Valid:</b> {result.valid_rules ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
