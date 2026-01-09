import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useApp } from '../hooks/useApp';
import ChartPeriodSelector from './ChartPeriodSelector';
import { generateLeadSourceData } from '../utils/dataUtils';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass-card p-3 shadow-xl">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
          {data.name}
        </p>
        <div className="flex items-center justify-between space-x-4">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Leads:
          </span>
          <span className="text-sm font-semibold" style={{ color: data.payload.color }}>
            {data.value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const LeadSourceChart = () => {
  const { chartPeriod, updateChartPeriod } = useApp();
  const currentPeriod = chartPeriod.leadSource;
  const data = generateLeadSourceData(currentPeriod);

  const periods = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Lead Source Distribution
        </h3>
        <ChartPeriodSelector
          periods={periods}
          selectedPeriod={currentPeriod}
          onPeriodChange={(period) => updateChartPeriod('leadSource', period)}
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: '14px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default LeadSourceChart;
