import { useState, useRef } from 'react';
import AIEmployeeCard from './components/AIEmployeeCard';
import ActivityLog from './components/ActivityLog';
import ApprovalCard from './components/ApprovalCard';
import './App.css';
import './no-animations.css';

function App() {
  const approvalCardRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for AI Employees
  const [employees, setEmployees] = useState([
    {
      name: 'dev-ai-001',
      role: 'Developer',
      status: 'working',
      currentTask: 'Fixing auth bug in login.py',
      taskDuration: '12 minutes',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      lastActive: new Date(Date.now() - 2 * 60000), // 2 minutes ago
      vmInstance: 'vm-dev-us-east-1a-042',
      hasGpu: true,
      hasApprovalPending: true
    }
  ]);

  // Mock data for Activity Logs
  const [activityLogs] = useState([
    {
      type: 'file',
      message: 'Modified login.py: Fixed authentication token validation',
      employee: 'dev-ai-001',
      timestamp: new Date(Date.now() - 2 * 60000) // 2 minutes ago
    },
    {
      type: 'git',
      message: 'Created branch: fix/auth-bug',
      employee: 'dev-ai-001',
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      type: 'command',
      message: 'Ran tests: pytest tests/auth/ --verbose',
      employee: 'dev-ai-001',
      timestamp: new Date(Date.now() - 8 * 60000)
    },
    {
      type: 'test',
      message: 'All tests passed (12/12)',
      employee: 'dev-ai-001',
      timestamp: new Date(Date.now() - 10 * 60000)
    },
    {
      type: 'file',
      message: 'Read requirements.txt',
      employee: 'dev-ai-001',
      timestamp: new Date(Date.now() - 15 * 60000)
    }
  ]);

  // Mock data for Approval Request
  const [approvalRequest, setApprovalRequest] = useState({
    id: 'apr-001',
    type: 'Pull Request',
    employee: 'dev-ai-001',
    description: 'Request to create a pull request for fixing the authentication bug in login.py. The fix addresses token validation issues that were causing login failures.',
    requested: 'Permission to create PR',
    impact: 'Low',
    diff: {
      file: 'src/auth/login.py',
      additions: 12,
      deletions: 5,
      content: `@@ -45,7 +45,12 @@ def validate_token(token):
-    if not token:
-        return False
-    return verify_signature(token)
+    if not token or len(token) == 0:
+        logger.warning("Empty token provided")
+        return False
+
+    try:
+        return verify_signature(token)
+    except SignatureExpired:
+        logger.error("Token signature expired")
+        return False`
    }
  });

  const handleApprovalClick = (employeeName) => {
    // Scroll to approval card smoothly
    if (approvalCardRef.current) {
      approvalCardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  const handleApprove = () => {
    if (!approvalRequest) return;

    console.log('Approved:', approvalRequest.id);

    // Update employee to remove approval pending flag
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.name === approvalRequest.employee
          ? { ...emp, hasApprovalPending: false }
          : emp
      )
    );

    // Clear the approval request
    setApprovalRequest(null);
  };

  const handleDecline = () => {
    if (!approvalRequest) return;

    console.log('Declined:', approvalRequest.id);

    // Update employee to remove approval pending flag
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.name === approvalRequest.employee
          ? { ...emp, hasApprovalPending: false }
          : emp
      )
    );

    // Clear the approval request
    setApprovalRequest(null);
  };

  const handleCreateEmployee = () => {
    console.log('Create new employee clicked');
    alert('Create Employee - Connect to your backend API here');
    // TODO: Connect to backend API to create new employee
  };

  const handleTabChange = (tab) => {
    console.log('Tab changed to:', tab);
    setActiveTab(tab);
    // TODO: Filter employees based on selected tab
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="logo">KNYTE</span>
          </h1>
          <button className="create-employee-btn" onClick={handleCreateEmployee}>
            + Hire New Employee
          </button>
        </div>
      </header>

      <div className="app-container">
        <div className="main-section">
          <div className="section-header">
            <h2 className="section-title">My AI Employees</h2>
            <div className="section-tabs">
              <button
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => handleTabChange('all')}
              >
                All
              </button>
              <button
                className={`tab ${activeTab === 'mine' ? 'active' : ''}`}
                onClick={() => handleTabChange('mine')}
              >
                Mine
              </button>
              <button
                className={`tab ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => handleTabChange('team')}
              >
                Team
              </button>
            </div>
          </div>

          {employees.map((employee, index) => (
            <AIEmployeeCard
              key={index}
              employee={employee}
              onApprovalClick={handleApprovalClick}
            />
          ))}
        </div>

        <div className="sidebar">
          {approvalRequest && (
            <div ref={approvalCardRef}>
              <ApprovalCard
                approval={approvalRequest}
                onApprove={handleApprove}
                onDecline={handleDecline}
              />
            </div>
          )}
          <ActivityLog logs={activityLogs} />
        </div>
      </div>
    </div>
  );
}

export default App;
