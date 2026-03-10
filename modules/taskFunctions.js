import { writeFile } from 'node:fs/promises';
import { getData } from './getData.js';
import Task from './task.js';

const filePath = './data.json';
const data = await getData(filePath);
const tasks = (data) ? JSON.parse(data) : []; 

export const addTask = (description) => {
  // TODO: Handle duplicates
  const lastId = tasks.at(-1)?.id ?? 0;
  const id = lastId + 1;
  const status = 'todo'

  tasks.push(new Task(id, description, status));
  writeFile(filePath, JSON.stringify(tasks), { flag: 'w' });

  console.log(`Task added successfully (ID: ${id})`);
}

export const updtTask = (id, description) => {
  // TODO: Don't update the task when a task with that description already exists.
  let taskFound = false;
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      task.description = description
      taskFound = true;
    }
  
    return task;
  })

  if (!taskFound) {
    console.log(`The task (ID: ${id}) wasn't found`);
    return;
  }
  writeFile(filePath, JSON.stringify(updatedTasks), { flag: 'w' });

  console.log(`Task updated successfully`);
}

export const delTask = (id) => {
  // TODO: Substract 1 to every task id if the deleted task wasn't the lastest (investigate if that's a good idea)
  let taskFound = false;

  const updatedTasks = tasks.filter((task) => {
    if (task.id !== id) {
      return task;
    }
    taskFound = true;
  })

  if (!taskFound) {
    console.log(`The task (ID: ${id}) wasn't found`);
    return;
  }
  writeFile(filePath, JSON.stringify(updatedTasks), { flag: 'w' });
}