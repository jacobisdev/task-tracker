export const exitError = () => {
  console.error('Usage: ./index.js [option] [description]');
  process.exit(1);
} 

export const exit = () => {
  process.exit(1);
}