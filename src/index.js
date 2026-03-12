import { exitError } from './modules/exit.js'
import * as tasks from './modules/taskFunctions.js'

const options = process.argv.slice(2)

if (options.length < 1) {
  exitError()
}

const validAdd = options[0] === 'add' && options.length === 2
const validUpdate = options[0] === 'update' && options.length === 3
const validDelete = options[0] === 'delete' && options.length === 2
const validList =
  options[0] === 'list' && (options.length === 1 || options.length === 2)
const validMark = options[0] === 'mark' && options.length === 3

if (validAdd) {
  const description = options[1]

  tasks.add(description)
} else if (validUpdate) {
  const id = +options[1]
  if (!Number.isInteger(id)) exitError()

  const description = options[2]

  tasks.update(id, description)
} else if (validDelete) {
  const id = +options[1]
  if (!Number.isInteger(id)) exitError()

  tasks.del(id)
} else if (validList) {
  const status = options[1]
  const validStatuses = [
    undefined,
    'all',
    'todo',
    'in-progress',
    'done',
    'deleted',
  ]

  if (validStatuses.includes(status)) {
    tasks.list(status)
  } else {
    exitError()
  }
} else if (validMark) {
  const id = +options[1]
  if (!Number.isInteger(id)) exitError()
    
  const status = options[2]
  const validStatuses = ['todo', 'in-progress', 'done']

  if (validStatuses.includes(status)) {
    tasks.mark(id, status)
  } else {
    exitError()
  }
} else {
  exitError()
}
