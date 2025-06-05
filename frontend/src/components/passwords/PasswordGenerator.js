import React, { useState } from 'react';
import './PasswordGenerator.css';

const PasswordGenerator = ({ onGenerate, isLoading }) => {
  const [settings, setSettings] = useState({
    length: 12,
    include_upper: 1,
    include_lower: 1,
    include_digits: 1,
    include_special: 1
  });

  const handleLengthChange = (e) => {
    setSettings({
      ...settings,
      length: parseInt(e.target.value)
    });
  };

  const handleCheckboxChange = (field) => {
    setSettings({
      ...settings,
      [field]: settings[field] ? 0 : 1
    });
  };

  const handleGenerate = () => {
    onGenerate(settings);
  };

  return (
    <div className="password-generator">
      <h2>Advanced Password Generator</h2>
      <div className="control-group">
        <label>Password Length: {settings.length}</label>
        <input
          type="range"
          min="8"
          max="32"
          value={settings.length}
          onChange={handleLengthChange}
        />
      </div>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={settings.include_upper === 1}
            onChange={() => handleCheckboxChange('include_upper')}
          />
          Include Uppercase (A-Z)
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.include_lower === 1}
            onChange={() => handleCheckboxChange('include_lower')}
          />
          Include Lowercase (a-z)
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.include_digits === 1}
            onChange={() => handleCheckboxChange('include_digits')}
          />
          Include Numbers (0-9)
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.include_special === 1}
            onChange={() => handleCheckboxChange('include_special')}
          />
          Include Special (!@#$...)
        </label>
      </div>
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Password'}
      </button>
    </div>
  );
};

export default PasswordGenerator;