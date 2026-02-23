import React, { useState } from 'react';
import { PlusCircle, AlignLeft } from 'lucide-react'; // <-- PASTIKAN ALIGNLEFT DIIMPORT
import { validateTask } from '../utils/taskUtils';

const TaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateTask(taskText, taskDescription);
    if (validationError) {
      setError(validationError);
      return;
    }

    onAddTask({
      text: taskText.trim(),
      description: taskDescription.trim()
    });
    
    setTaskText('');
    setTaskDescription('');
    setError('');
    setShowDescription(false);
  };

  const handleChange = (e) => {
    setTaskText(e.target.value);
    if (error) setError('');
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
    if (error) setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="space-y-3">
        {/* Input Judul */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={taskText}
              onChange={handleChange}
              placeholder="Judul task..."
              className={`input-field ${error ? 'border-red-300 focus:border-red-400' : ''}`}
              maxLength={100}
            />
            {error && (
              <p className="absolute -bottom-6 left-0 text-sm text-red-500 animate-fade-in">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Tambah Task</span>
          </button>
        </div>

        {/* Tombol Tambah Deskripsi */}
        {!showDescription ? (
          <button
            type="button"
            onClick={() => setShowDescription(true)}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       focus:ring-offset-2 rounded-lg px-3 py-2"
          >
            <AlignLeft className="w-4 h-4" />
            <span>Tambah Deskripsi</span>
          </button>
        ) : (
          <div className="relative animate-slide-in">
            <textarea
              value={taskDescription}
              onChange={handleDescriptionChange}
              placeholder="Deskripsi task (opsional)..."
              className="input-field min-h-[100px] resize-y"
              maxLength={500}
            />
            <button
              type="button"
              onClick={() => setShowDescription(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 
                         bg-white rounded-full p-1 hover:bg-slate-100 transition-colors"
              title="Hapus deskripsi"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Counter Karakter */}
        <div className="flex justify-between text-xs text-slate-400">
          <span>{taskText.length}/100 karakter (judul)</span>
          {taskDescription && (
            <span>{taskDescription.length}/500 karakter (deskripsi)</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;