// Utility functions for data generation and time formatting

// Time formatting
export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'Just now';
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// Format time
export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

// Generate lead activity data based on period
export const generateLeadActivityData = (period) => {
  const dataPoints = {
    week: 7,
    month: 30,
    year: 12,
  };

  const count = dataPoints[period] || 30;
  const data = [];

  for (let i = count - 1; i >= 0; i--) {
    let label;
    if (period === 'week') {
      const date = new Date();
      date.setDate(date.getDate() - i);
      label = date.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (period === 'month') {
      label = `Day ${count - i}`;
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      label = months[i];
    }

    const baseActive = period === 'week' ? 80 : period === 'month' ? 95 : 2400;
    const baseCalls = period === 'week' ? 25 : period === 'month' ? 28 : 750;

    data.push({
      name: label,
      active: Math.floor(baseActive + Math.random() * (baseActive * 0.3)),
      calls: Math.floor(baseCalls + Math.random() * (baseCalls * 0.4)),
    });
  }

  return data;
};

// Generate conversion rate data based on period
export const generateConversionRateData = (period) => {
  const dataPoints = {
    week: 7,
    month: 30,
    year: 12,
  };

  const count = dataPoints[period] || 30;
  const data = [];

  for (let i = count - 1; i >= 0; i--) {
    let label;
    if (period === 'week') {
      const date = new Date();
      date.setDate(date.getDate() - i);
      label = date.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (period === 'month') {
      label = `Day ${count - i}`;
    } else {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      label = months[i];
    }

    const baseRate = 22;
    data.push({
      name: label,
      rate: parseFloat((baseRate + Math.random() * 6).toFixed(1)),
    });
  }

  return data;
};

// Generate lead source data based on period
export const generateLeadSourceData = (period) => {
  const baseData = {
    week: [
      { name: 'Website', value: 145, color: '#3b82f6' },
      { name: 'Referrals', value: 98, color: '#10b981' },
      { name: 'Social Media', value: 76, color: '#f59e0b' },
      { name: 'Email Campaign', value: 54, color: '#8b5cf6' },
      { name: 'Direct', value: 23, color: '#ef4444' },
    ],
    month: [
      { name: 'Website', value: 997, color: '#3b82f6' },
      { name: 'Referrals', value: 712, color: '#10b981' },
      { name: 'Social Media', value: 569, color: '#f59e0b' },
      { name: 'Email Campaign', value: 427, color: '#8b5cf6' },
      { name: 'Direct', value: 142, color: '#ef4444' },
    ],
    year: [
      { name: 'Website', value: 9954, color: '#3b82f6' },
      { name: 'Referrals', value: 7109, color: '#10b981' },
      { name: 'Social Media', value: 5687, color: '#f59e0b' },
      { name: 'Email Campaign', value: 4265, color: '#8b5cf6' },
      { name: 'Direct', value: 1422, color: '#ef4444' },
    ],
  };

  return baseData[period] || baseData.month;
};

// Generate activities
export const generateActivities = () => {
  return [
    {
      id: 1,
      type: 'call',
      title: 'Call with Acme Corp',
      description: 'Discussed Q1 requirements and pricing',
      lead: 'Acme Corporation',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      priority: 'high',
    },
    {
      id: 2,
      type: 'email',
      title: 'Email sent to TechStart',
      description: 'Product demo follow-up',
      lead: 'TechStart LLC',
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      priority: null,
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Meeting scheduled',
      description: 'Discovery call next Tuesday',
      lead: 'Global Dynamics',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      priority: 'medium',
    },
    {
      id: 4,
      type: 'deal',
      title: 'Deal closed',
      description: 'Annual subscription signed',
      lead: 'Enterprise Solutions',
      timestamp: new Date(Date.now() - 18000000).toISOString(),
      amount: 45000,
      priority: null,
    },
    {
      id: 5,
      type: 'lead',
      title: 'New lead added',
      description: 'Inbound from website contact form',
      lead: 'Innovation Labs',
      timestamp: new Date(Date.now() - 21600000).toISOString(),
      priority: 'high',
    },
    {
      id: 6,
      type: 'proposal',
      title: 'Proposal sent',
      description: 'Custom enterprise package',
      lead: 'Digital Ventures',
      timestamp: new Date(Date.now() - 25200000).toISOString(),
      priority: 'medium',
    },
    {
      id: 7,
      type: 'call',
      title: 'Follow-up call',
      description: 'Answered technical questions',
      lead: 'Smart Solutions',
      timestamp: new Date(Date.now() - 28800000).toISOString(),
      priority: null,
    },
    {
      id: 8,
      type: 'meeting',
      title: 'Demo completed',
      description: 'Showcased platform features',
      lead: 'NextGen Tech',
      timestamp: new Date(Date.now() - 32400000).toISOString(),
      priority: 'low',
    },
  ];
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Get days in month
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get first day of month
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Check if date is today
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

// Check if dates are same day
export const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};
