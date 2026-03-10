import { exitError } from './modules/exit.js';
import { getData } from './modules/getData.js';
import { addTask } from './modules/addTask.js';

const options = process.argv.slice(2);
const filePath = 'data.json';

const data = await getData(filePath);
const tasks = JSON.parse(data); 

if (options.length < 1) {
  exitError();
}

if (options[0] === 'add' && options.length === 2) {
  addTask(filePath, tasks, options[1]);
}
else {
  exitError();
}