import React from 'react';
import TaskItem from './TaskItem';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 px-4 animate-fade-in">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <ClipboardList className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            Belum ada task
          </h3>
          <p className="text-slate-400">
            Tambahkan task baru untuk memulai
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div key={task.id} className="task-enter" style={{ animationDelay: `${index * 50}ms` }}>
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;