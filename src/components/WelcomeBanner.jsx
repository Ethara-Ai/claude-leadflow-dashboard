import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../hooks/useApp';

const WelcomeBanner = () => {
  const { showWelcomeBanner, dismissWelcomeBanner } = useApp();

  return (
    <AnimatePresence>
      {showWelcomeBanner && (
        <motion.div
          initial={{ opacity: 0, y: -20, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="glass-card p-4 sm:p-6 relative">
              <button
                onClick={dismissWelcomeBanner}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Dismiss welcome message"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>

              <div className="pr-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to LeadFlow! 👋
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Your comprehensive sales dashboard for tracking leads, managing meetings,
                  and monitoring team performance. Get insights at a glance and stay on top
                  of your sales pipeline.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeBanner;
