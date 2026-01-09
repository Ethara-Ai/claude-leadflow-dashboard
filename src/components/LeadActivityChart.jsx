import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../hooks/useApp';
import ChartPeriodSelector from './ChartPeriodSelector';
import { generateLeadActivityData } from '../utils/dataUtils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 shadow-xl">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between space-x-4">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {entry.name === 'active' ? 'Active Leads' : 'Calls Completed'}:
            </span>
            <span className="text-sm font-semibold" style={{ color: entry.color }}>
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const LeadActivityChart = () => {
  const { chartPeriod, updateChartPeriod } = useApp();
  const currentPeriod = chartPeriod.leadActivity;
  const data = generateLeadActivityData(currentPeriod);

  const periods = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lead Activity
        </h3>
        <ChartPeriodSelector
          periods={periods}
          selectedPeriod={currentPeriod}
          onPeriodChange={(period) => updateChartPeriod('leadActivity', period)}
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '14px' }}
            formatter={(value) => value === 'active' ? 'Active Leads' : 'Calls Completed'}
          />
          <Area
            type="monotone"
            dataKey="active"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorActive)"
            name="active"
          />
          <Bar dataKey="calls" fill="#10b981" radius={[4, 4, 0, 0]} name="calls" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LeadActivityChart;
