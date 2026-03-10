import { writeFile } from 'node:fs/promises';
import Task from './task.js';

export const addTask = async (path, tasks, description) => {
  const lastId = tasks.at(-1)?.id ?? 0;
  const id = lastId + 1;
  const status = 'todo'

  tasks.push(new Task(id, description, status));
  writeFile(path, JSON.stringify(tasks), { flag: 'w' });

  console.log(`Task added successfully (ID: ${id})`);
}