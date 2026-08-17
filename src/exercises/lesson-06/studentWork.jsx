import { useState } from 'react';
import UserProfile from './components/UserProfile';
import TaskFilter from './components/TaskFilter';
import TaskItem from './components/TaskItem';
import { filterTasks } from './utils/taskFilters';
import useTasks from './hooks/useTasks';

export default function StudentWork() {
  const [filter, setFilter] = useState('all');
  const { tasks, loading } = useTasks();

  //  #1: Data fetching + state + UI logic all mixed together
  const visibleTasks = filterTasks(tasks, filter);

  // #2: Filtering logic inside component
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      {/* #3: Hardcoded UI, not reusable */}
      <UserProfile name="Student" />

      {/* #4: Repeated button JSX */}
      <TaskFilter filter={filter} onFilterChange={setFilter} />

      {/* #5: Inline list rendering */}
      <ul>
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
