import { exitError } from './modules/exit.js'
import * as tasks from './modules/taskFunctions.js'

const options = process.argv.slice(2)

if (options.length < 1) {
  exitError()
}

if (options[0] === 'add' && options.length === 2) {
  const description = options[1]

  tasks.add(description)
} else if (options[0] === 'update' && options.length === 3) {
  const id = +options[1]
  const description = options[2]

  tasks.update(id, description)
} else if (options[0] === 'delete' && options.length === 2) {
  const id = +options[1]

  tasks.del(id)
} else if (
  options[0] === 'list' &&
  (options.length === 1 || options.length === 2)
) {
  const status = options[1] ?? 'default'
  const validStatuses = [
    'default',
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
} else if (options[0] === 'mark') {
  // TODO: mark logic
  // TODO: restore tasks from trash with mark
} else {
  exitError()
}
