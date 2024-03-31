import { initialData } from "./seed";

(async () => {
  await main();
})();

function main() {
  
  if (process.env.NODE_ENV === 'production') return;
  
  console.log('Seed started 🚀');
  // TODO: Seed your database here !

  console.log('Seed executed 🎉👍');
}