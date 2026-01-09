import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LastUpdated = () => {
  const [timestamp, setTimestamp] = useState(new Date());

  useEffect(() => {
    // Update timestamp when component mounts
    setTimestamp(new Date());
  }, []);

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <p className="text-center text-sm text-gray-500 dark:text-gray-500">
        Last updated: {formatTimestamp(timestamp)}
      </p>
    </motion.div>
  );
};

export default LastUpdated;
