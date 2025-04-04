export const fetchAPI = async (endpoint: string, options = {}) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'access-key': `c759d8d4-66bf-4e8a-8d43-939efd60cb28`,
    },
  };

  const response = await fetch(`${endpoint}`, { ...defaultOptions, ...options });

  const result = await response.json();
  return result;
};
