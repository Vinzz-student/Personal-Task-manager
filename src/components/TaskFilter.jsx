import React from 'react';
import { ListTodo, CheckCircle2, Circle } from 'lucide-react';

const TaskFilter = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'Semua', icon: ListTodo },
    { id: 'active', label: 'Aktif', icon: Circle },
    { id: 'completed', label: 'Selesai', icon: CheckCircle2 },
  ];

  return (
    <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm border border-slate-200">
      {filters.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onFilterChange(id)}
          className={`filter-btn flex-1 flex items-center justify-center gap-2 ${
            currentFilter === id ? 'active' : 'inactive'
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;