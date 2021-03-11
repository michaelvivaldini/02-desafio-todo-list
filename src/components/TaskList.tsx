import { useEffect, useState } from 'react'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
import Cookies from 'js-cookie'

import { Task } from '../types/TaskType';

import '../styles/tasklist.scss'

interface TaskListProps {
  cookieTasks: Task[];
}

export function TaskList({ cookieTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(cookieTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    setTasks(cookieTasks);
  }, [cookieTasks])

  function handleCreateNewTask() {
    if (!newTaskTitle) return;
    const task: Task = {
      id: '_' + Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      isComplete: false
    }
    setTasks([...tasks, task]);
    Cookies.set('tasks', JSON.stringify([...tasks, task]));
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: string) {
    const oldTask: Task = tasks.find(task => task.id == id) as Task;

    const editedTask = {
      ...oldTask,
      isComplete: !oldTask?.isComplete
    }

    const newTasks: Task[] = tasks.filter(task => task.id !== id);

    setTasks([...newTasks, editedTask])
    Cookies.set('tasks', JSON.stringify([...newTasks, editedTask]));
  }

  function handleRemoveTask(id: string) {
    const newTasks: Task[] = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    Cookies.set('tasks', JSON.stringify(newTasks));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(input) => setNewTaskTitle(input.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}