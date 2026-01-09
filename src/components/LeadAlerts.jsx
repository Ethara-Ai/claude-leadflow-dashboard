import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info, CheckCircle, Plus, X } from 'lucide-react';
import PropTypes from 'prop-types';
import { useApp } from '../hooks/useApp';
import { formatTimeAgo } from '../utils/dataUtils';

const AlertIcon = ({ type }) => {
  const icons = {
    error: { icon: AlertCircle, color: 'text-red-600 dark:text-red-400' },
    warning: { icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400' },
    info: { icon: Info, color: 'text-blue-600 dark:text-blue-400' },
    success: { icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
  };

  const { icon: Icon, color } = icons[type] || icons.info;

  return <Icon className={`w-5 h-5 ${color}`} />;
};

AlertIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

const AlertItem = ({ alert, onDelete }) => {
  const borderColors = {
    error: 'border-l-red-500',
    warning: 'border-l-amber-500',
    info: 'border-l-blue-500',
    success: 'border-l-green-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
      className={`glass-card p-4 border-l-4 ${borderColors[alert.type]} group`}
    >
      <div className="flex items-start space-x-3">
        <AlertIcon type={alert.type} />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 dark:text-white">
            {alert.message}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {formatTimeAgo(alert.timestamp)}
          </p>
        </div>
        <button
          onClick={() => onDelete(alert.id)}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Delete alert"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </motion.div>
  );
};

AlertItem.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const LeadAlerts = () => {
  const { alerts, addAlert, deleteAlert } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddAlert = (e) => {
    e.preventDefault();
    if (alertMessage.trim()) {
      addAlert(alertType, alertMessage.trim());
      setAlertMessage('');
      setAlertType('info');
      setShowAddForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Lead Alerts
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold">
            {alerts.length}
          </span>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          aria-label="Add alert"
        >
          <Plus className={`w-5 h-5 transition-transform ${showAddForm ? 'rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            onSubmit={handleAddAlert}
            className="mb-4 overflow-hidden"
          >
            <div className="glass-card p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alert Type
                </label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  placeholder="Enter alert message..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                  disabled={!alertMessage.trim()}
                >
                  Add Alert
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setAlertMessage('');
                  }}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} onDelete={deleteAlert} />
          ))}
        </AnimatePresence>
      </div>

      {alerts.length === 0 && !showAddForm && (
        <p className="text-center text-gray-500 dark:text-gray-500 py-8">
          No alerts at the moment
        </p>
      )}
    </motion.div>
  );
};

export default LeadAlerts;
