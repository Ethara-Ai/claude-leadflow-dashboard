# LeadFlow - Premium Sales Dashboard

A modern, feature-rich sales dashboard built with React, Vite, Tailwind CSS, Framer Motion, Recharts, and Lucide Icons.

![LeadFlow Dashboard](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ Features

### 🎨 Modern UI/UX
- **Premium Design**: Frosted glass effect cards with smooth animations
- **Dark/Light Mode**: Toggle between themes with persistent localStorage
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations throughout the app
- **Accessibility**: Keyboard navigation and screen reader support

### 📊 Dashboard Components

#### Header
- Logo with gradient styling
- Theme toggle (Dark/Light mode with persistence)
- Refresh button with loading state
- Notes modal access
- Export dropdown (CSV/JSON)
- Mobile hamburger menu

#### Stats Cards
- **Total Leads**: 2,847 leads (+12% from last month)
- **Calls Made**: 847 calls (+8% this week)
- **Meetings Scheduled**: 156 meetings (+23% from last month)
- **Conversion Rate**: 24.3% (+3.2% vs last month)
- Animated on scroll with hover effects

#### Charts (with Week/Month/Year filters)
1. **Lead Activity Chart**: Combined area + bar chart showing active leads and calls completed
2. **Conversion Rate Chart**: Line chart tracking conversion percentage over time
3. **Lead Source Distribution**: Donut chart breaking down lead sources (Website 35%, Referrals 25%, Social Media 20%, Email 15%, Direct 5%)

#### Meeting Calendar
- Interactive monthly calendar
- Navigate between months
- Highlight today and selected dates
- Dots indicate days with meetings
- Click dates to view scheduled meetings
- Meeting details with video/phone call icons
- Add new meetings with modal form

#### Activities Feed
- Timeline-style activity feed
- Activity types: Calls, Emails, Meetings, Deals, New Leads, Proposals
- Priority badges (High, Medium, Low)
- Time ago formatting
- Deal amounts displayed

#### Lead Alerts
- Color-coded alerts (Info, Success, Warning, Error)
- Add custom alerts
- Delete alerts with smooth animation
- Alert count badge

#### Notes System
- Create and save notes about leads
- Delete old notes
- Persistent storage in localStorage
- Timestamps for each note

### 🔧 Technical Features
- **Error Boundary**: Graceful error handling
- **Context API**: Centralized state management
- **Custom Hooks**: `useApp` hook for easy context access
- **PropTypes**: Type checking for all components
- **Utility Functions**: Data generation, formatting, time calculations
- **Loading States**: Skeleton placeholders and loading indicators
- **Modal System**: Reusable modal components
- **Export Functionality**: Download data as CSV or JSON

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd leadflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
leadflow/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx
│   │   ├── Header.jsx
│   │   ├── WelcomeBanner.jsx
│   │   ├── StatsCards.jsx
│   │   ├── ChartPeriodSelector.jsx
│   │   ├── LeadActivityChart.jsx
│   │   ├── ConversionRateChart.jsx
│   │   ├── LeadSourceChart.jsx
│   │   ├── MeetingCalendar.jsx
│   │   ├── ActivitiesFeed.jsx
│   │   ├── LeadAlerts.jsx
│   │   ├── NotesModal.jsx
│   │   ├── AddMeetingModal.jsx
│   │   ├── Footer.jsx
│   │   └── LastUpdated.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── hooks/
│   │   └── useApp.js
│   ├── utils/
│   │   └── dataUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🎯 Key Technologies

- **React 18**: Modern React with hooks and context
- **Vite**: Lightning-fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth, performant animations
- **Recharts**: Flexible charting library
- **Lucide React**: Beautiful, consistent icon set
- **PropTypes**: Runtime type checking

## 🎨 Color Palette

### Light Mode
- Background: `bg-gray-50`
- Cards: `bg-white/80` with backdrop blur
- Text: `text-gray-900`

### Dark Mode
- Background: `bg-gray-950`
- Cards: `bg-gray-900/80` with backdrop blur and subtle glow
- Text: `text-gray-100`

### Accent Colors
- Primary: Blue (`#3b82f6`)
- Success: Green (`#10b981`)
- Warning: Amber (`#f59e0b`)
- Error: Red (`#ef4444`)
- Purple: (`#8b5cf6`)

## 📱 Responsive Design

- **Mobile** (< 640px): Single column layout, hamburger menu
- **Tablet** (640px - 1024px): 2-column grids where appropriate
- **Desktop** (> 1024px): Full multi-column layout

## 🔐 Data Persistence

The following data is stored in localStorage:
- Theme preference (dark/light)
- Notes
- Welcome banner dismissal state

## 🎭 Animations

- **Page Load**: Staggered fade-in of sections
- **Hover Effects**: Card lift and shadow effects (200ms transitions)
- **Modal Transitions**: Smooth scale and fade animations
- **Loading States**: Pulsing skeleton placeholders
- **Theme Switch**: Smooth color transitions (300ms)

## 🌟 Future Enhancements

- User authentication
- Backend API integration
- Real-time data updates
- Advanced filtering and sorting
- Team collaboration features
- Custom dashboard layouts
- Email notifications
- Mobile app version

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Built with ❤️ using modern web technologies

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email support@leadflow.com or visit our help center.

---

**LeadFlow** - Empowering sales teams to track, manage, and close deals faster.