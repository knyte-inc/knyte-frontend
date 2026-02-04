import { useState } from 'react';
import './ApprovalCard.css';

const ApprovalCard = ({ approval, onApprove, onDecline }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderDiffLine = (line, index) => {
    let className = 'diff-line';
    if (line.startsWith('+')) {
      className += ' diff-line-addition';
    } else if (line.startsWith('-')) {
      className += ' diff-line-deletion';
    } else if (line.startsWith('@@')) {
      className += ' diff-line-location';
    }
    return (
      <div key={index} className={className}>
        {line}
      </div>
    );
  };

  return (
    <div className="approval-card">
      <div className="approval-header">
        <div className="approval-info">
          <h3 className="approval-title">Approval Required</h3>
          <span className="approval-type">{approval.type}</span>
        </div>
        <div className="approval-badge">{approval.employee}</div>
      </div>

      <div className="approval-body">
        <p className="approval-description">{approval.description}</p>

        <div className="approval-details">
          <div className="approval-detail-item">
            <span className="approval-detail-label">Requested:</span>
            <span className="approval-detail-value">{approval.requested}</span>
          </div>
          <div className="approval-detail-item">
            <span className="approval-detail-label">Impact:</span>
            <span className={`approval-impact ${approval.impact.toLowerCase()}`}>
              {approval.impact}
            </span>
          </div>
        </div>

        {approval.diff && (
          <div className="approval-diff-section">
            <button
              className="approval-diff-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? '▼' : '▶'} View Changes
            </button>

            {isExpanded && (
              <div className="approval-diff">
                <div className="diff-header">
                  <span className="diff-file">{approval.diff.file}</span>
                  <span className="diff-stats">
                    <span className="diff-additions">+{approval.diff.additions}</span>
                    <span className="diff-deletions">-{approval.diff.deletions}</span>
                  </span>
                </div>
                <div className="diff-content">
                  {approval.diff.content.split('\n').map((line, index) => renderDiffLine(line, index))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="approval-actions">
        <button className="approval-btn decline-btn" onClick={onDecline}>
          Decline
        </button>
        <button className="approval-btn approve-btn" onClick={onApprove}>
          Approve
        </button>
      </div>
    </div>
  );
};

export default ApprovalCard;
