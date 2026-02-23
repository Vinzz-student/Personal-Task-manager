import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { generateId, filterTasks, searchTasks } from './utils/taskUtils';
import { CheckCircle2, TrendingUp, Clock, Search, X, AlignLeft } from 'lucide-react'; // <-- TAMBAHKAN AlignLeft DI SINI

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSearchedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filter);
    return searchTasks(filtered, searchTerm);
  }, [tasks, filter, searchTerm]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const withDescription = tasks.filter(t => t.description && t.description.trim() !== '').length;
    
    return { total, completed, active, completionRate, withDescription };
  }, [tasks]);

  const handleAddTask = (taskData) => {
    const newTask = {
      id: generateId(),
      text: taskData.text,
      description: taskData.description || '',
      completed: false,
      createdAt: Date.now()
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus task ini?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleClearCompleted = () => {
    if (window.confirm('Hapus semua task yang sudah selesai?')) {
      setTasks(tasks.filter(task => !task.completed));
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 
                         bg-clip-text text-transparent mb-2">
            Personal Task Manager
          </h1>
          <p className="text-slate-500 text-lg">
            Kelola tugas Anda dengan mudah dan efisien
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8 animate-slide-in">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 
                          hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200
                          hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Selesai</p>
                <p className="text-2xl font-bold text-slate-800">{stats.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200
                          hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Aktif</p>
                <p className="text-2xl font-bold text-slate-800">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200
                          hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <AlignLeft className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Ada Deskripsi</p>
                <p className="text-2xl font-bold text-slate-800">{stats.withDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative animate-slide-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari task (judul atau deskripsi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 pr-10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl 
                        border border-slate-200 p-6 md:p-8">
          <TaskForm onAddTask={handleAddTask} />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <TaskFilter currentFilter={filter} onFilterChange={setFilter} />
            
            {stats.completed > 0 && (
              <button
                onClick={handleClearCompleted}
                className="btn-secondary text-sm"
              >
                Hapus yang selesai
              </button>
            )}
          </div>

          <TaskList
            tasks={filteredAndSearchedTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />

          {/* Footer */}
          {tasks.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200 text-sm text-slate-400 
                          flex justify-between items-center">
              <span>{stats.active} task aktif</span>
              <span>{stats.completed} selesai</span>
            </div>
          )}
        </main>

        {/* Credit */}
        <footer className="mt-8 text-center text-sm text-slate-400">
          <p>© 2026 Personal Task Manager. Dibuat dengan React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;