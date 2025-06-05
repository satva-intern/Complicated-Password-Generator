import React, { useState } from 'react';
import './PasswordOutput.css';

const PasswordOutput = ({ passwordData, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (passwordData?.password) {
      navigator.clipboard.writeText(passwordData.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrengthColor = (label) => {
    switch (label) {
      case 'Very Strong': return '#1dd1a1';
      case 'Strong': return '#2ed573';
      case 'Medium': return '#ffa502';
      case 'Weak': return '#ff6b7a';
      default: return '#ff4757';
    }
  };

  return (
    <div className="password-output">
      <h1>Password Output</h1>
      {isLoading ? (
        <div className="loading">Generating password...</div>
      ) : passwordData ? (
        passwordData.error ? (
          <div className="error">{passwordData.error}</div>
        ) : (
          <div className="output-content">
            <div className="password-display">
              <span className="password-text" onClick={copyToClipboard}>
                {passwordData.password}
              </span>
              <button className="copy-btn" onClick={copyToClipboard}>
                {copied ? '✓' : '📋'}
              </button>
            </div>
            <div className="password-info">
              <span style={{ color: getStrengthColor(passwordData.strength_label) }}>
                Strength: {passwordData.strength_label} ({passwordData.strength_score}/5)
              </span>
              <span>
                Rules Valid: {passwordData.valid_rules ? <span style={{color:'#2ed573'}}>Yes</span> : <span style={{color:'#ff4757'}}>No</span>}
              </span>
            </div>
          </div>
        )
      ) : (
        <div className="placeholder">Generate a password using the sidebar.</div>
      )}
    </div>
  );
};

export default PasswordOutput;