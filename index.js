import { exitError } from './modules/exit.js';
import { addTask, updtTask } from './modules/taskFunctions.js';

const options = process.argv.slice(2);


if (options.length < 1) {
  exitError();
}

if (options[0] === 'add' && options.length === 2) {
  const description = options[1];
  
  addTask(description);
} else if (options[0] === 'update' && options.length === 3) {
  const id = options[1];
  const description = options[2];

  updtTask(id, description);
}
else {
  exitError();
}