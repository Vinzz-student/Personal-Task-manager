export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Hari ini';
  } else if (diffDays === 1) {
    return 'Kemarin';
  } else if (diffDays < 7) {
    return `${diffDays} hari yang lalu`;
  } else {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
};

export const validateTask = (taskText, taskDescription = '') => {
  if (!taskText || taskText.trim() === '') {
    return 'Judul task tidak boleh kosong';
  }
  if (taskText.length < 3) {
    return 'Judul task minimal 3 karakter';
  }
  if (taskText.length > 100) {
    return 'Judul task maksimal 100 karakter';
  }
  if (taskDescription.length > 500) {
    return 'Deskripsi maksimal 500 karakter';
  }
  return null;
};

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case 'active':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    default:
      return tasks;
  }
};

export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm.trim()) return tasks;
  
  const term = searchTerm.toLowerCase().trim();
  return tasks.filter(task => 
    task.text.toLowerCase().includes(term) || 
    (task.description && task.description.toLowerCase().includes(term))
  );
};