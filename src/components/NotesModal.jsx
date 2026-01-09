import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus } from 'lucide-react';
import { useApp } from '../hooks/useApp';
import { formatTimeAgo } from '../utils/dataUtils';
import PropTypes from 'prop-types';

const NoteItem = ({ note, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-4 group"
    >
      <div className="flex items-start justify-between space-x-3">
        <div className="flex-1">
          <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
            {note.content}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            {formatTimeAgo(note.createdAt)}
          </p>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Delete note"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const NotesModal = () => {
  const { isNotesModalOpen, setIsNotesModalOpen, notes, addNote, deleteNote } = useApp();
  const [noteContent, setNoteContent] = useState('');

  if (!isNotesModalOpen) return null;

  const handleAddNote = (e) => {
    e.preventDefault();
    if (noteContent.trim()) {
      addNote(noteContent.trim());
      setNoteContent('');
    }
  };

  const handleClose = () => {
    setIsNotesModalOpen(false);
    setNoteContent('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl max-h-[90vh] glass-card shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notes
            </h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close notes"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="mb-6">
              <div className="space-y-3">
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write a note about your leads..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button
                  type="submit"
                  disabled={!noteContent.trim()}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Note</span>
                </button>
              </div>
            </form>

            {/* Notes List */}
            <div className="space-y-3">
              <AnimatePresence>
                {notes.map((note) => (
                  <NoteItem key={note.id} note={note} onDelete={deleteNote} />
                ))}
              </AnimatePresence>
            </div>

            {notes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-500">
                  No notes yet. Add your first note above!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotesModal;
