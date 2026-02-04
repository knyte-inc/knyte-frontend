import { useState, useMemo } from 'react';
import './ActivityLog.css';

const ActivityLog = ({ logs }) => {
  const [selectedEmployee, setSelectedEmployee] = useState('all');

  // Get unique employee names from logs - memoized to prevent recalculation
  const employees = useMemo(() =>
    ['all', ...new Set(logs.map(log => log.employee))],
    [logs]
  );

  // Filter logs based on selected employee - memoized to prevent recalculation
  const filteredLogs = useMemo(() =>
    selectedEmployee === 'all'
      ? logs
      : logs.filter(log => log.employee === selectedEmployee),
    [selectedEmployee, logs]
  );

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const logTime = new Date(timestamp);
    const diffMs = now - logTime;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const handleClearLogs = () => {
    console.log('Clear logs clicked');
    alert('Clear activity logs\nConnect to your backend API here');
    // TODO: Connect to backend API to clear logs
  };

  return (
    <div className="activity-log">
      <div className="activity-log-header">
        <h2 className="activity-log-title">Activity Log</h2>
        <div className="activity-log-controls">
          <select
            className="employee-filter"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            {employees.map(emp => (
              <option key={emp} value={emp}>
                {emp === 'all' ? 'All Employees' : emp}
              </option>
            ))}
          </select>
          <button className="clear-logs-btn" onClick={handleClearLogs}>Clear</button>
        </div>
      </div>

      <div className="activity-log-list">
        {filteredLogs.map((log, index) => (
          <div key={index} className="activity-log-item">
            <div className="activity-content">
              <div className="activity-message">{log.message}</div>
              <div className="activity-meta">
                <span className="activity-employee">{log.employee}</span>
                <span className="activity-separator">•</span>
                <span className="activity-time">{formatTimestamp(log.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
