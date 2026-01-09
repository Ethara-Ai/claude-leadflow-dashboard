import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ChartPeriodSelector = ({ periods, selectedPeriod, onPeriodChange }) => {
  return (
    <div className="flex items-center space-x-2">
      {periods.map((period) => (
        <motion.button
          key={period.value}
          onClick={() => onPeriodChange(period.value)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedPeriod === period.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {period.label}
        </motion.button>
      ))}
    </div>
  );
};

ChartPeriodSelector.propTypes = {
  periods: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedPeriod: PropTypes.string.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
};

export default ChartPeriodSelector;
