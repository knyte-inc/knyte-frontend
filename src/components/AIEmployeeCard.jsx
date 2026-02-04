import './AIEmployeeCard.css';

const AIEmployeeCard = ({ employee, onApprovalClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#1e40af'; // dark blue
      case 'working':
        return '#10B981'; // green
      case 'idle':
        return '#6B7280'; // gray
      default:
        return '#6B7280';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Active now';
    if (diffMins < 60) return `Active ${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Active ${diffHours}h ago`;
    return `Active ${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="employee-card">
      <div className="employee-header">
        <div className="employee-info">
          <h2 className="employee-name">{employee.name}</h2>
          <span className="employee-role">{employee.role}</span>
        </div>
        <div className="employee-status" style={{ backgroundColor: getStatusColor(employee.status) }}>
          <span className="status-dot"></span>
          {employee.status}
        </div>
      </div>

      <div className="employee-details">
        <div className="detail-row">
          <span className="detail-label">Current Task:</span>
          <span className="detail-value">{employee.currentTask}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Task Duration:</span>
          <span className="detail-value">{employee.taskDuration}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Last Active:</span>
          <span className="detail-value">{formatLastActive(employee.lastActive)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Created:</span>
          <span className="detail-value">{formatDate(employee.createdAt)}</span>
        </div>
      </div>

      <div className="employee-infrastructure">
        <div className="infra-row">
          <span className="infra-label">VM Instance:</span>
          <span className="infra-value">{employee.vmInstance}</span>
        </div>
        <div className="infra-row">
          <span className="infra-label">GPU:</span>
          <span className={`gpu-indicator ${employee.hasGpu ? 'gpu-enabled' : 'gpu-disabled'}`}>
            {employee.hasGpu ? '● Enabled' : '○ Disabled'}
          </span>
        </div>
      </div>

      {employee.hasApprovalPending && (
        <button className="approval-indicator" onClick={() => onApprovalClick && onApprovalClick(employee.name)}>
          <span className="approval-icon">!</span>
          <span className="approval-text">Approval Needed</span>
          <span className="approval-arrow">→</span>
        </button>
      )}
    </div>
  );
};

export default AIEmployeeCard;
