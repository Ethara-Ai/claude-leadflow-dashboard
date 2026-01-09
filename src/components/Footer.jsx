import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import PropTypes from 'prop-types';

const FooterModal = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl glass-card shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {content}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

FooterModal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Footer = () => {
  const { activeFooterModal, setActiveFooterModal } = useApp();

  const handleRefresh = () => {
    window.location.reload();
  };

  const footerLinks = [
    {
      title: 'Product',
      links: [
        {
          name: 'Features',
          modal: 'features',
          content: 'LeadFlow offers comprehensive features including lead tracking, meeting management, activity monitoring, customizable alerts, and advanced analytics. Our platform helps sales teams stay organized and close more deals.'
        },
        {
          name: 'Support',
          modal: 'support',
          content: 'Our support team is available 24/7 to help you get the most out of LeadFlow. Contact us at support@leadflow.com or visit our help center for detailed documentation and video tutorials.'
        },
      ],
    },
    {
      title: 'Resources',
      links: [
        {
          name: 'Community',
          modal: 'community',
          content: 'Join thousands of sales professionals in the LeadFlow community. Share best practices, get tips from experts, and connect with other users to maximize your sales productivity.'
        },
        {
          name: 'Case Studies',
          modal: 'case-studies',
          content: 'Discover how leading companies use LeadFlow to transform their sales processes. Read success stories from businesses that have increased conversion rates by up to 40% using our platform.'
        },
      ],
    },
    {
      title: 'Company',
      links: [
        {
          name: 'Privacy',
          modal: 'privacy',
          content: 'Your privacy is our priority. LeadFlow uses industry-standard encryption and security practices to protect your data. We never share your information with third parties without your explicit consent.'
        },
        {
          name: 'Terms',
          modal: 'terms',
          content: 'By using LeadFlow, you agree to our terms of service. We provide a reliable, secure platform for sales management. For detailed terms and conditions, please contact our legal team.'
        },
      ],
    },
  ];

  return (
    <>
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Tagline */}
            <div className="col-span-1">
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 mb-4 group"
                aria-label="Refresh page"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                  <Zap className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  LeadFlow
                </span>
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Empowering sales teams to track, manage, and close deals faster.
              </p>
            </div>

            {/* Link Columns */}
            {footerLinks.map((section) => (
              <div key={section.title} className="col-span-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => setActiveFooterModal({ title: link.name, content: link.content })}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
              © {new Date().getFullYear()} LeadFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Footer Modals */}
      <AnimatePresence>
        {activeFooterModal && (
          <FooterModal
            title={activeFooterModal.title}
            content={activeFooterModal.content}
            onClose={() => setActiveFooterModal(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
