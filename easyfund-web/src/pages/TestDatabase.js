import { useEffect, useState } from 'react';
import { startupApi } from '../api/startupApi.js';
import '../styles/pages/TestDatabase.css';

const TestDatabase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await startupApi.getStartupData();
        setData(response);
        setConnectionStatus('Successfully connected to MongoDB!');
        setLoading(false);
      } catch (error) {
        setError('Failed to connect to database');
        setConnectionStatus('Connection failed');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="test-database-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="test-database-container">
        <div className="error-message">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="test-database-container">
      <div className="connection-status">
        <div className={`status-indicator ${connectionStatus.includes('Successfully') ? 'connected' : 'disconnected'}`}></div>
        <h2>{connectionStatus}</h2>
      </div>

      <div className="data-preview">
        <h3>Database Content Preview:</h3>
        <p>Total Records: {data.length}</p>
        
        <div className="data-grid">
          {data.map((item, index) => (
            <div key={index} className="data-card">
              <h4>Record #{index + 1}</h4>
              <pre>{JSON.stringify(item, null, 2)}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestDatabase; 