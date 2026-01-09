import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('leadflow-theme');
    return saved || 'light';
  });

  // Loading state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Notes state
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('leadflow-notes');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        content: 'Follow up with Acme Corp about Q1 contract renewal',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        content: 'Prepare demo presentation for TechStart meeting',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
  });

  // Modal states
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
  const [activeFooterModal, setActiveFooterModal] = useState(null);

  // Chart time period state
  const [chartPeriod, setChartPeriod] = useState({
    leadActivity: 'month',
    conversionRate: 'month',
    leadSource: 'month',
  });

  // Alerts state
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      message: '5 leads have not been contacted in over 7 days',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: 2,
      type: 'success',
      message: 'Successfully closed deal with GlobalTech Inc. ($45,000)',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
    },
    {
      id: 3,
      type: 'info',
      message: 'New integration available: Connect with Salesforce',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
    },
    {
      id: 4,
      type: 'error',
      message: 'Email campaign sync failed - retry needed',
      timestamp: new Date(Date.now() - 18000000).toISOString(),
    },
  ]);

  // Meetings state
  const [meetings, setMeetings] = useState(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return [
      {
        id: 1,
        title: 'Product Demo',
        client: 'Acme Corporation',
        date: new Date(currentYear, currentMonth, today.getDate() + 2).toISOString(),
        time: '10:00 AM',
        duration: 60,
        type: 'video',
      },
      {
        id: 2,
        title: 'Contract Review',
        client: 'TechStart LLC',
        date: new Date(currentYear, currentMonth, today.getDate() + 2).toISOString(),
        time: '2:30 PM',
        duration: 45,
        type: 'phone',
      },
      {
        id: 3,
        title: 'Discovery Call',
        client: 'Global Dynamics',
        date: new Date(currentYear, currentMonth, today.getDate() + 5).toISOString(),
        time: '11:00 AM',
        duration: 30,
        type: 'phone',
      },
      {
        id: 4,
        title: 'Quarterly Review',
        client: 'Enterprise Solutions',
        date: new Date(currentYear, currentMonth, today.getDate() + 7).toISOString(),
        time: '3:00 PM',
        duration: 90,
        type: 'video',
      },
      {
        id: 5,
        title: 'Follow-up Meeting',
        client: 'Innovation Labs',
        date: new Date(currentYear, currentMonth, today.getDate()).toISOString(),
        time: '9:00 AM',
        duration: 30,
        type: 'video',
      },
    ];
  });

  // Selected calendar date
  const [selectedDate, setSelectedDate] = useState(null);

  // Welcome banner visibility
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(() => {
    const saved = localStorage.getItem('leadflow-welcome-dismissed');
    return !saved;
  });

  // Theme effect
  useEffect(() => {
    localStorage.setItem('leadflow-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Notes effect
  useEffect(() => {
    localStorage.setItem('leadflow-notes', JSON.stringify(notes));
  }, [notes]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Refresh data
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  // Notes functions
  const addNote = (content) => {
    const newNote = {
      id: Date.now(),
      content,
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Alert functions
  const addAlert = (type, message) => {
    const newAlert = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toISOString(),
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const deleteAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  // Meeting functions
  const addMeeting = (meeting) => {
    const newMeeting = {
      id: Date.now(),
      ...meeting,
    };
    setMeetings(prev => [...prev, newMeeting]);
  };

  const deleteMeeting = (id) => {
    setMeetings(prev => prev.filter(meeting => meeting.id !== id));
  };

  // Chart period update
  const updateChartPeriod = (chartName, period) => {
    setChartPeriod(prev => ({
      ...prev,
      [chartName]: period,
    }));
  };

  // Dismiss welcome banner
  const dismissWelcomeBanner = () => {
    setShowWelcomeBanner(false);
    localStorage.setItem('leadflow-welcome-dismissed', 'true');
  };

  // Export functions
  const exportAsCSV = () => {
    const csvData = [
      ['Metric', 'Value', 'Change'],
      ['Total Leads', '2,847', '+12%'],
      ['Calls Made', '847', '+8%'],
      ['Meetings Scheduled', '156', '+23%'],
      ['Conversion Rate', '24.3%', '+3.2%'],
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leadflow-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    setIsExportMenuOpen(false);
  };

  const exportAsJSON = () => {
    const jsonData = {
      stats: {
        totalLeads: 2847,
        callsMade: 847,
        meetingsScheduled: 156,
        conversionRate: 24.3,
      },
      exportDate: new Date().toISOString(),
      notes: notes,
      alerts: alerts,
      meetings: meetings,
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leadflow-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    setIsExportMenuOpen(false);
  };

  const value = {
    theme,
    toggleTheme,
    isRefreshing,
    refreshData,
    notes,
    addNote,
    deleteNote,
    isNotesModalOpen,
    setIsNotesModalOpen,
    isExportMenuOpen,
    setIsExportMenuOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    exportAsCSV,
    exportAsJSON,
    chartPeriod,
    updateChartPeriod,
    alerts,
    addAlert,
    deleteAlert,
    meetings,
    addMeeting,
    deleteMeeting,
    selectedDate,
    setSelectedDate,
    isAddMeetingModalOpen,
    setIsAddMeetingModalOpen,
    showWelcomeBanner,
    dismissWelcomeBanner,
    activeFooterModal,
    setActiveFooterModal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
