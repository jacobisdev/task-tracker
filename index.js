import { exitError } from './modules/exit.js';
import { addTask, updtTask, delTask, listTasks } from './modules/taskFunctions.js';
//import * as tasks from './modules/taskFunctions.js'

const options = process.argv.slice(2);


if (options.length < 1) {
  exitError();
}

if (options[0] === 'add' && options.length === 2) {
  const description = options[1];
  
  addTask(description);
  // tasks.add(description);
} else if (options[0] === 'update' && options.length === 3) {
  const id = +options[1];
  const description = options[2];

  updtTask(id, description);
} else if (options[0] === 'delete' && options.length === 2) {
  const id = +options[1];

  delTask(id);
} else if (options[0] === 'list' && (options.length === 1 || options.length === 2)) {
  const status = options[1] ?? 'all';

  listTasks(status);
}
else {
  exitError();
}