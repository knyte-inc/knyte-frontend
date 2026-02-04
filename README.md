# KNYTE Dashboard

A futuristic AI employee management dashboard built for Knyte's 8-day YC demo. This dashboard provides real-time monitoring, activity logging, and approval workflows for autonomous AI developer agents.

## Design Philosophy

The UI follows a **cyberpunk/sci-fi aesthetic** with a dark blue color scheme (#1e40af) inspired by Brev's design language. The interface emphasizes:

- **Glassmorphism**: Frosted glass cards with backdrop blur effects
- **Neon Accents**: Glowing borders and pulsing status indicators
- **Terminal Aesthetic**: Monospace fonts for technical data and scanline overlay
- **Smooth Animations**: Breathing glows, gradient shifts, and micro-interactions
- **Product Metaphor**: Task-based metrics over infrastructure details (no CPU/memory stats)

## Tech Stack

### Frontend Framework
- **React 18** - Component-based UI library
- **Vite** - Next-generation build tool with HMR

### Styling
- **Vanilla CSS** - Custom CSS with modern features:
  - CSS Grid & Flexbox layouts
  - CSS animations and keyframes
  - Backdrop filters for glassmorphism
  - Custom scrollbar styling

### Development Tools
- **ESLint** - Code linting with React rules
- **npm** - Package management

## Project Structure

```
knyte-dashboard/
├── src/
│   ├── components/
│   │   ├── AIEmployeeCard.jsx       # Employee status card
│   │   ├── AIEmployeeCard.css
│   │   ├── ActivityLog.jsx          # Activity log with filtering
│   │   ├── ActivityLog.css
│   │   ├── ApprovalCard.jsx         # Approval workflow UI
│   │   └── ApprovalCard.css
│   ├── App.jsx                      # Main app component
│   ├── App.css                      # App layout & theme
│   ├── index.css                    # Global styles
│   └── main.jsx                     # React entry point
├── public/                          # Static assets
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd knyte-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Current Features

### 1. AI Employee Status Card
**File**: [AIEmployeeCard.jsx](src/components/AIEmployeeCard.jsx)

Displays individual AI employee information with:
- Employee name (monospace terminal-style)
- Role badge
- Pulsing status indicator (working/active/idle)
- Current task description
- Task duration
- Last active timestamp (relative time)
- Created date (exact date format)
- VM instance information
- GPU status indicator
- Approval pending indicator
- Glassmorphism card with glow on hover
- Animated status with breathing glow effect

**Props**:
```javascript
{
  name: string,          // e.g., "dev-ai-001"
  role: string,          // e.g., "Developer"
  status: string,        // "working" | "active" | "idle"
  currentTask: string,   // Task description
  taskDuration: string,  // e.g., "12 minutes"
  lastActive: Date,      // JavaScript Date object
  createdAt: Date,       // JavaScript Date object
  vmInstance: string,    // e.g., "vm-dev-us-east-1a-042"
  hasGpu: boolean,       // GPU enabled/disabled
  hasApprovalPending: boolean  // Shows approval indicator
}
```

### 2. Activity Log
**File**: [ActivityLog.jsx](src/components/ActivityLog.jsx)

Real-time activity feed with:
- Employee filter dropdown
- Relative timestamps
- Glassmorphism with sliding accent bar on hover
- Auto-scrolling list (max 400px height)
- Clear logs functionality

**Log Entry Props**:
```javascript
{
  type: string,      // "file" | "git" | "command" | "test" | "error"
  message: string,   // Activity description
  employee: string,  // Employee name
  timestamp: Date    // JavaScript Date object
}
```

### 3. Approval Request Card
**File**: [ApprovalCard.jsx](src/components/ApprovalCard.jsx)

Prominent approval workflow UI with:
- Expandable syntax-highlighted diff viewer
- Color-coded additions (green) and deletions (red)
- Approve/Decline buttons with state management
- Impact badge (Low/Medium/High)
- Smooth scroll-to functionality when clicking approval indicator

**Approval Props**:
```javascript
{
  id: string,
  type: string,        // e.g., "Pull Request"
  employee: string,    // Employee requesting approval
  description: string, // Detailed explanation
  requested: string,   // What permission is needed
  impact: string,      // "Low" | "Medium" | "High"
  diff: {
    file: string,      // File path
    additions: number,
    deletions: number,
    content: string    // Diff content with +/- prefixes
  }
}
```

## Mock Data

Currently using in-memory mock data in [App.jsx](src/App.jsx). This demonstrates the UI without backend dependencies.

### Employee Mock Data
```javascript
const [employees, setEmployees] = useState([
  {
    name: 'dev-ai-001',
    role: 'Developer',
    status: 'working',
    currentTask: 'Fixing auth bug in login.py',
    taskDuration: '12 minutes',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastActive: new Date(Date.now() - 2 * 60000),
    vmInstance: 'vm-dev-us-east-1a-042',
    hasGpu: true,
    hasApprovalPending: true
  }
]);
```

### Activity Log Mock Data
5 sample entries showing file modifications, git operations, command execution, and test results.

### Approval Request Mock Data
Sample PR approval with actual diff content for authentication bug fix.

## Design Tokens

### Colors
- **Primary Blue**: `#1e40af` (dark blue)
- **Secondary Blue**: `#3b82f6` (lighter blue)
- **Success Green**: `#10B981`
- **Error Red**: `#ef4444`
- **Warning Yellow**: `#fbbf24`
- **Background**: `#0f1419`
- **Card Background**: `rgba(26, 31, 46, 0.6)` with blur

### Typography
- **Body Font**: System font stack (SF Pro, Segoe UI, Roboto)
- **Monospace**: Monaco, Courier New
- **Headings**: 700 weight, -0.02em letter spacing
- **Code/Data**: Monaco monospace

### Effects
- **Glassmorphism**: `backdrop-filter: blur(12px)`
- **Glow**: Multiple layered box-shadows with blue tint
- **Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth easing
- **Animations**: 2-3s ease-in-out for breathing effects

## Browser Support

Modern browsers with support for:
- CSS Grid & Flexbox
- CSS backdrop-filter
- CSS animations & keyframes
- ES2020+ JavaScript features

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

This is a demo project for Knyte's YC presentation. For production use, consider:
- Adding TypeScript for type safety
- Implementing comprehensive error boundaries
- Adding unit tests (Jest/Vitest + React Testing Library)
- Setting up E2E tests (Playwright/Cypress)
- Adding accessibility improvements (ARIA labels, keyboard navigation)

## License

Proprietary - Knyte 2024

---

Built with ⚡️ by Guntash for Knyte's YC Demo Day
