import { motion } from 'framer-motion';
import { Users, Phone, Calendar, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { formatNumber } from '../utils/dataUtils';

const StatCard = ({ icon: Icon, title, value, change, changeText, color, index }) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card-hover p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>

          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>

          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {value}
          </p>

          <div className="flex items-center space-x-1">
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
              +{change}
            </span>
            <span className="text-gray-500 dark:text-gray-500 text-sm">
              {changeText}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  changeText: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'amber', 'purple']).isRequired,
  index: PropTypes.number.isRequired,
};

const StatsCards = () => {
  const stats = [
    {
      icon: Users,
      title: 'Total Leads',
      value: formatNumber(2847),
      change: '12%',
      changeText: 'from last month',
      color: 'blue',
    },
    {
      icon: Phone,
      title: 'Calls Made',
      value: formatNumber(847),
      change: '8%',
      changeText: 'this week',
      color: 'green',
    },
    {
      icon: Calendar,
      title: 'Meetings Scheduled',
      value: formatNumber(156),
      change: '23%',
      changeText: 'from last month',
      color: 'amber',
    },
    {
      icon: TrendingUp,
      title: 'Conversion Rate',
      value: '24.3%',
      change: '3.2%',
      changeText: 'vs last month',
      color: 'purple',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
