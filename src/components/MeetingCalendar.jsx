import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Video, Phone, X } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { getDaysInMonth, getFirstDayOfMonth, isToday, isSameDay, formatTime } from '../utils/dataUtils';

const MeetingCalendar = () => {
  const { meetings, selectedDate, setSelectedDate, setIsAddMeetingModalOpen } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
  };

  const getMeetingsForDate = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return meetings.filter(meeting => isSameDay(meeting.date, date));
  };

  const hasMeetings = (day) => {
    return getMeetingsForDate(day).length > 0;
  };

  const selectedDateMeetings = selectedDate
    ? meetings.filter(meeting => isSameDay(meeting.date, selectedDate))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Meeting Schedule
        </h3>
        <button
          onClick={() => setIsAddMeetingModalOpen(true)}
          className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          aria-label="Add meeting"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
          {monthNames[currentMonth]} {currentYear}
        </h4>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 dark:text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(currentYear, currentMonth, day);
            const isTodayDate = isToday(date);
            const isSelected = selectedDate && isSameDay(date, selectedDate);
            const hasMeetingsDate = hasMeetings(day);

            return (
              <motion.button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all ${
                  isTodayDate
                    ? 'bg-blue-600 text-white font-semibold'
                    : isSelected
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm">{day}</span>
                {hasMeetingsDate && (
                  <div
                    className={`w-1 h-1 rounded-full mt-1 ${
                      isTodayDate
                        ? 'bg-white'
                        : isSelected
                        ? 'bg-blue-600 dark:bg-blue-400'
                        : 'bg-blue-600 dark:bg-blue-400'
                    }`}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Date Meetings */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 dark:border-gray-700 pt-4"
          >
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm font-semibold text-gray-900 dark:text-white">
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </h5>
              <button
                onClick={() => setSelectedDate(null)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Clear selection"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {selectedDateMeetings.length > 0 ? (
              <div className="space-y-2">
                {selectedDateMeetings.map(meeting => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h6 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {meeting.title}
                          </h6>
                          {meeting.type === 'video' ? (
                            <Video className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Phone className="w-4 h-4 text-green-600 dark:text-green-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {meeting.client}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {meeting.time} • {meeting.duration} min
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-500 text-center py-4">
                No meetings scheduled for this day
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MeetingCalendar;
