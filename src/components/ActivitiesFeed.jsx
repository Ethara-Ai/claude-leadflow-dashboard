import { motion } from 'framer-motion';
import { Phone, Mail, Calendar, CheckCircle, UserPlus, FileText } from 'lucide-react';
import PropTypes from 'prop-types';
import { formatTimeAgo, formatCurrency } from '../utils/dataUtils';
import { generateActivities } from '../utils/dataUtils';

const ActivityIcon = ({ type }) => {
  const icons = {
    call: { icon: Phone, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    email: { icon: Mail, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    meeting: { icon: Calendar, color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
    deal: { icon: CheckCircle, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
    lead: { icon: UserPlus, color: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400' },
    proposal: { icon: FileText, color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' },
  };

  const { icon: Icon, color } = icons[type] || icons.call;

  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
  );
};

ActivityIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

const PriorityBadge = ({ priority }) => {
  if (!priority) return null;

  const colors = {
    high: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    low: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  };

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[priority]}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

PriorityBadge.propTypes = {
  priority: PropTypes.string,
};

const ActivityItem = ({ activity, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative pl-10 pb-6 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-700 last:hidden" />

      {/* Icon */}
      <div className="absolute left-0 top-0">
        <ActivityIcon type={activity.type} />
      </div>

      {/* Content */}
      <div className="glass-card p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {activity.title}
              </h4>
              <PriorityBadge priority={activity.priority} />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
              {activity.description}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {activity.lead}
            </p>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap ml-4">
            {formatTimeAgo(activity.timestamp)}
          </span>
        </div>
        {activity.amount && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">
              {formatCurrency(activity.amount)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    priority: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const ActivitiesFeed = () => {
  const activities = generateActivities();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="glass-card p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activities
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
          Latest updates from your team
        </p>
      </div>

      <div className="max-h-[600px] overflow-y-auto scrollbar-hide">
        {activities.map((activity, index) => (
          <ActivityItem key={activity.id} activity={activity} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default ActivitiesFeed;
