const API_BASE_URL = 'http://127.0.0.1:8000/api/generate-password';

export const generatePasswordAPI = async (settings) => {
  const response = await fetch(`${API_BASE_URL}/generate-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings),
  });
  if (!response.ok) {
    throw new Error('API request failed');
  }
  return await response.json();
};