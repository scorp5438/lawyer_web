export const getEnv = (key, defaultValue = '') => {
    const reactAppKey = `REACT_APP_${key}`;
    return process.env[reactAppKey] || defaultValue;
};