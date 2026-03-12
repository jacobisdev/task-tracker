import { writeFile } from 'node:fs/promises'
import { getData } from './getData.js'
import Task from './task.js'

const filePath = './src/data.json'
const data = await getData(filePath)
const tasks = data ? JSON.parse(data) : []

export const add = async (description) => {
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

  tasks.push(new Task(id, description, status))
  await writeFile(filePath, JSON.stringify(tasks))

  console.log(`Task added successfully! (ID: ${id})`)
}

export const update = async (id, description) => {
  const taskFound = tasks.some((task) => task.id === id)
  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`)
    return
  }

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, description, updatedAt: new Date() } : task,
  )

  await writeFile(filePath, JSON.stringify(updatedTasks))

  console.log(`Task updated successfully! (ID: ${id})`)
}

export const del = async (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, status: 'deleted', deletedAt: new Date() }
      : task,
  )

  const taskFound = updatedTasks.some((task) => task.id === id)
  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`)
    return
  }
  await writeFile(filePath, JSON.stringify(updatedTasks))

  console.log(`Task deleted successfully (ID: ${id})`)
}

export const list = (status) => {
  let taskList

  if (!tasks[0]) {
    console.log('No task were found')
    return
  }

  switch (status) {
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

  logList(status, taskList)
}

function logList(status, list) {
  const includeDeleted = status === 'deleted'

  const maxId = list.at(-1).id.toString().length + 1
  const maxDesc =
    Math.max(
      'description'.length,
      ...list.map((task) => task.description.length),
    ) + 1
  const maxStatus = 'in-progress'.length + 1
  const maxDate = '11/11/1111, 11:11:11 AM'.length

  let header = `${'id'.padEnd(maxId)} ${'Description'.padEnd(maxDesc)} ${'Status'.padEnd(maxStatus)} ${'Created'.padEnd(maxDate)} ${'Updated'.padEnd(maxDate)}`
  if (includeDeleted) header += ` ${'Deleted'.padEnd(maxDate)}`

  const title = '   Tasks   '
  const hyphenAmount = Math.floor(header.length / 2 - title.length / 2)

  for (let i = 0; i < hyphenAmount; i++) process.stdout.write('-')
  process.stdout.write('   Tasks    ')
  for (let i = 0; i < hyphenAmount; i++) process.stdout.write('-')
  console.log()
  console.log(header)

  list.forEach((task) => {
    const id = task.id.toString().padEnd(maxId)
    const desc = task.description.padEnd(maxDesc)
    const stat = task.status.padEnd(maxStatus)
    const created = new Date(task.createdAt).toLocaleString().padEnd(maxDate)
    const updated = new Date(task.updatedAt).toLocaleString().padEnd(maxDate)

    let taskItem = `${id} ${desc} ${stat} ${created} ${updated}`
    if (includeDeleted && task.deletedAt) {
      const deleted = new Date(task.deletedAt).toLocaleString().padEnd(maxDate)
      taskItem += ` ${deleted}`
    }

    console.log(taskItem)
  })
}

export const mark = async (id, status) => {
  const taskFound = tasks.some((task) => task.id === id)
  if (!taskFound) {
    console.warn(`Task not found (ID: ${id})`)
    return
  }

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, status, updatedAt: new Date() } : task,
  )

  await writeFile(filePath, JSON.stringify(updatedTasks))

  console.log(`Task marked successfully (ID: ${id})`)
}
