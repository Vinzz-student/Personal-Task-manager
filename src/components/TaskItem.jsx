import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle, Calendar, AlignLeft, ChevronDown, ChevronUp } from 'lucide-react'; // <-- PASTIKAN SEMUA ICON DIIMPORT
import { formatDate } from '../utils/taskUtils';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className="flex-shrink-0 mt-0.5 focus:outline-none group"
          aria-label={task.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
        >
          {task.completed ? (
            <CheckCircle className="w-6 h-6 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
          ) : (
            <Circle className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          {/* Judul Task */}
          <div className="flex items-start justify-between gap-2">
            <p className={`text-base transition-all duration-300 ${
              task.completed 
                ? 'text-slate-500 line-through decoration-2 decoration-indigo-400/50' 
                : 'text-slate-800 font-medium'
            }`}>
              {task.text}
            </p>
            
            {/* Tombol Aksi */}
            <div className="flex items-center gap-1">
              {/* Tombol Lihat Deskripsi (jika ada) */}
              {task.description && (
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 
                             hover:bg-indigo-50 rounded-lg transition-all duration-200
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  title={showDescription ? "Sembunyikan deskripsi" : "Lihat deskripsi"}
                >
                  {showDescription ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              )}
              
              {/* Tombol Hapus */}
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 
                           hover:bg-red-50 rounded-lg transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Hapus task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Meta Info: Tanggal */}
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.createdAt)}</span>
            
            {task.description && (
              <>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <AlignLeft className="w-3 h-3" />
                <span>Memiliki deskripsi</span>
              </>
            )}
          </div>

          {/* Deskripsi Task (Expandable) */}
          {task.description && showDescription && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 
                          animate-slide-in">
              <p className="text-sm text-slate-600 whitespace-pre-wrap break-words">
                {task.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;