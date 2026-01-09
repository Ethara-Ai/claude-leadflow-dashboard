import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../hooks/useApp';
import ChartPeriodSelector from './ChartPeriodSelector';
import { generateConversionRateData } from '../utils/dataUtils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 shadow-xl">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        <div className="flex items-center justify-between space-x-4">
          <span className="text-xs text-gray-600 dark:text-gray-400">
            Conversion Rate:
          </span>
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
            {payload[0].value}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const ConversionRateChart = () => {
  const { chartPeriod, updateChartPeriod } = useApp();
  const currentPeriod = chartPeriod.conversionRate;
  const data = generateConversionRateData(currentPeriod);

  const periods = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Conversion Rate
        </h3>
        <ChartPeriodSelector
          periods={periods}
          selectedPeriod={currentPeriod}
          onPeriodChange={(period) => updateChartPeriod('conversionRate', period)}
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            dataKey="name"
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
            domain={[0, 30]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ConversionRateChart;
