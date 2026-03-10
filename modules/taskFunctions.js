import { writeFile } from 'node:fs/promises';
import { getData } from './getData.js';
import Task from './task.js';

const filePath = './data.json';
const data = await getData(filePath);
const tasks = (data) ? JSON.parse(data) : []; 

export const addTask = async (description) => {
  // TODO: Handle duplicates
  const lastId = tasks.at(-1)?.id ?? 0;
  const id = lastId + 1;
  const status = 'todo'

  tasks.push(new Task(id, description, status));
  writeFile(filePath, JSON.stringify(tasks), { flag: 'w' });

  console.log(`Task added successfully (ID: ${id})`);
}

export const updtTask = async (id, description) => {
  let taskFounded = false;
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      task.description = description
      taskFounded = true;
    }
  
    return task;
  })

  if (!taskFounded) {
    console.log(`The task (ID: ${id}) wasn't found`);
    return;
  }

  writeFile(filePath, JSON.stringify(updatedTasks), { flag: 'w' });

  console.log(`Task updated successfully`);
}