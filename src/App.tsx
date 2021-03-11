import { TaskList } from './components/TaskList'
import { Header } from "./components/Header";
import './styles/global.scss'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { Task } from './types/TaskType';

export function App() {
  const [cookieTasks, setCookieTasks] = useState<Task[]>([])

  useEffect(() => {
    const tasks = Cookies.get('tasks');
    if (tasks) setCookieTasks(JSON.parse(Cookies.get('tasks')) || []);
  }, [])

  return (
    <>
      <Header />
      <TaskList cookieTasks={cookieTasks} />
    </>
  )
}