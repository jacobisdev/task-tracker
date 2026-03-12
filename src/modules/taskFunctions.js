import { writeFile } from 'node:fs/promises'
import { getData } from './getData.js'
import Task from './task.js'

// Transform the data into an object
const filePath = './src/data.json'
const data = await getData(filePath)
const tasks = data ? JSON.parse(data) : []

// Define the task tracker features
export const add = async (description) => {
  // Exit if the new task already exists
  const duplicate = tasks.find(
    (task) => task.description.toLowerCase() === description.toLowerCase(),
  )

  if (duplicate) {
    console.warn(`Task already exists (ID: ${duplicate.id})`)
    return
  }

  const lastId = tasks.at(-1)?.id ?? 0
  const id = lastId + 1
  const status = 'todo'

  // Overwrite previous tasks by adding the old tasks plus the new one
  tasks.push(new Task(id, description, status))
  await writeFile(filePath, JSON.stringify(tasks))

  console.log(`Task added successfully! (ID: ${id})`)
}

export const update = async (id, description) => {
  // Exit when the task provided to update doesn't exists
  const taskFound = tasks.some((task) => task.id === id)
  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`)
    return
  }

  // Change the description of the task
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, description, updatedAt: new Date() } : task,
  )

  await writeFile(filePath, JSON.stringify(updatedTasks))

  console.log(`Task updated successfully! (ID: ${id})`)
}

export const mark = async (id, status) => {
  const taskFound = tasks.some((task) => task.id === id)
  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`)
    return
  }

  // Change the status of the task
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, status, updatedAt: new Date() } : task,
  )

  await writeFile(filePath, JSON.stringify(updatedTasks))

  console.log(`Task marked successfully (ID: ${id})`)
}

export const del = async (id) => {
  const taskFound = tasks.some((task) => task.id === id)
  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`)
    return
  }

  // Soft delete / hide the task
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, status: 'deleted', deletedAt: new Date() }
      : task,
  )

  await writeFile(filePath, JSON.stringify(updatedTasks))

  console.log(`Task deleted successfully (ID: ${id})`)
}

export const list = (filter) => {
  let taskList

  // Check if there is at least one task
  if (!tasks[0]) {
    console.log('No task were found')
    return
  }

  // Filter the tasks to list what the user wants
  switch (filter) {
    case 'all':
      taskList = tasks.filter((task) => task.status !== 'deleted')
      break
    case 'todo':
      taskList = tasks.filter((task) => task.status === 'todo')
      break
    case 'in-progress':
      taskList = tasks.filter((task) => task.status === 'in-progress')
      break
    case 'done':
      taskList = tasks.filter((task) => task.status === 'done')
      break
    case 'deleted':
      taskList = tasks.filter((task) => task.status === 'deleted')
      break
    default:
      taskList = tasks.filter(
        (task) => task.status !== 'done' && task.status !== 'deleted',
      )
      break
  }

  // Check if there is at least one task after filtering
  if (!taskList[0]) {
    console.log('No task were found')
    return
  }

  logList(filter, taskList)
}

function logList(filter, list) {
  const includeDeleted = filter === 'deleted'

  // Define the space that each table column should take
  const maxId = list.at(-1).id.toString().length + 1
  const maxDesc =
    Math.max(
      'description'.length,
      ...list.map((task) => task.description.length),
    ) + 1
  const maxStatus = 'in-progress'.length + 1
  const maxDate = '11/11/1111, 11:11:11 AM'.length

  // Define the table header
  let header = `${'id'.padEnd(maxId)} ${'Description'.padEnd(maxDesc)} ${'Status'.padEnd(maxStatus)} ${'Created'.padEnd(maxDate)} ${'Updated'.padEnd(maxDate)}`

  // Incorporate the deletion date column
  if (includeDeleted) header += ` ${'Deleted'.padEnd(maxDate)}`

  // Define the table title
  const title = '   Tasks   '
  const hyphenAmount = Math.floor(header.length / 2 - title.length / 2)

  // Print the table title
  for (let i = 0; i < hyphenAmount; i++) process.stdout.write('-')
  process.stdout.write('   Tasks    ')
  for (let i = 0; i < hyphenAmount; i++) process.stdout.write('-')
  console.log()

  //Print the table header
  console.log(header)

  list.forEach((task) => {
    // Recover the task data and
    // define the space that each piece of task data should occupy in the table
    const id = task.id.toString().padEnd(maxId)
    const desc = task.description.padEnd(maxDesc)
    const stat = task.status.padEnd(maxStatus)
    const created = new Date(task.createdAt).toLocaleString().padEnd(maxDate)
    const updated = new Date(task.updatedAt).toLocaleString().padEnd(maxDate)

    let taskItem = `${id} ${desc} ${stat} ${created} ${updated}`

    // Incorporate the deletion date into task to be printed
    if (includeDeleted && task.deletedAt) {
      const deleted = new Date(task.deletedAt).toLocaleString().padEnd(maxDate)
      taskItem += ` ${deleted}`
    }

    // Print each task
    console.log(taskItem)
  })
}
