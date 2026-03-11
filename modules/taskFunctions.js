import { writeFile } from 'node:fs/promises';
import { getData } from './getData.js';
import Task from './task.js';

const filePath = './data.json';
const data = await getData(filePath);
const tasks = (data) ? JSON.parse(data) : []; 

export const add = async (description) => {
  const duplicate = tasks.find(t => 
    t.description.toLowerCase() === description.toLowerCase()
  );
  
  if (duplicate) {
    console.warn(`Task already exists (ID: ${duplicate.id})`);
    return;
  }

  const lastId = tasks.at(-1)?.id ?? 0;
  const id = lastId + 1;
  const status = 'todo';

  tasks.push(new Task(id, description, status));
  await writeFile(filePath, JSON.stringify(tasks));

  console.log(`Task added successfully! (ID: ${id})`);
}

export const update = async (id, description) => {
  const updatedTasks = tasks.map((task) => 
    task.id === id
      ? {...task, description, updatedAt: new Date()}
      : task
  )

  const taskFound = updatedTasks.some(t => t.id === id);
  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`);
    return;
  }
  await writeFile(filePath, JSON.stringify(updatedTasks), { flag: 'w' });

  console.log(`Task updated successfully! (ID: ${id})`);
}

export const del = async (id) => {
  let taskFound = false;
  const updatedTasks = tasks.filter((task) => {
    if (task.id !== id) {
      return task;
    }
    taskFound = true;
  })

  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`);
    return;
  }
  await writeFile(filePath, JSON.stringify(updatedTasks), { flag: 'w' });

  console.log(`Task deleted successfully (ID: ${id})`)
}

export const list = (status) => {
  let taskList;

  switch(status) {
    case 'all':
      taskList = tasks;
      break;
    case 'todo':
      taskList = tasks.filter((task) => task.status === 'todo');
      break;
    case 'in-progress':
      taskList = tasks.filter((task) => task.status === 'in-progress');
      break;
    case 'done':
      taskList = tasks.filter((task) => task.status === 'done');
      break;
  }

  console.log('---------------   Tasks   ---------------');
  console.log('ID Description Status Created Updated');
  taskList.forEach(task => {
    const id = task.id;
    const desc = task.description;
    const stat = task.status;
    const createdAt = new Date(task.createdAt).toLocaleString();
    const updatedAt = new Date(task.updatedAt).toLocaleString();

    console.log(`${id} ${desc} ${stat} ${createdAt} ${updatedAt}`);
  });
  // console.table(taskList)
}