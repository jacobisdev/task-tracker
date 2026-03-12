import { exitError } from './modules/exit.js'
import * as tasks from './modules/taskFunctions.js'

// Get user arguments
const options = process.argv.slice(2)

// Exit if no argument is provided
if (options.length < 1) {
  exitError()
}

// Check the user input
const validAdd = options[0] === 'add' && options.length === 2
const validUpdate = options[0] === 'update' && options.length === 3
const validDelete = options[0] === 'delete' && options.length === 2
const validList =
  options[0] === 'list' && (options.length === 1 || options.length === 2)
const validMark = options[0] === 'mark' && options.length === 3

// Call functions depending on the user's input
if (validAdd) {
  const description = options[1]

  tasks.add(description)
} else if (validUpdate) {
  // Check if valid id was provided
  const id = +options[1]
  if (!Number.isInteger(id)) exitError()

  const description = options[2]

  tasks.update(id, description)
} else if (validDelete) {
  const id = +options[1]
  if (!Number.isInteger(id)) exitError()

  tasks.del(id)
} else if (validList) {
  const filter = options[1]

  // Check if valid filters were provided
  const validFilters = [
    undefined,
    'all',
    'todo',
    'in-progress',
    'done',
    'deleted',
  ]

  if (validFilters.includes(filter)) {
    tasks.list(filter)
  } else {
    exitError()
  }
} else if (validMark) {
  const id = +options[1]
  if (!Number.isInteger(id)) exitError()

  const status = options[2]

  // Check if valid status was provided
  const validStatuses = ['todo', 'in-progress', 'done']

  if (validStatuses.includes(status)) {
    tasks.mark(id, status)
  } else {
    exitError()
  }
} else {
  exitError()
}
