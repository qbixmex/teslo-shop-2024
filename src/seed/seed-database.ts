import { prisma } from "../lib";
import { initialData } from "./seed";

(async () => {
  await main();
})();

async function main() {
  
  if (process.env.NODE_ENV === 'production') return;

  console.log('Clearing data 🧹');

  await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  console.log('Deleted all tables 👍');
  
  // console.log('Seed started 🚀');
  // TODO: Seed your database here !


  console.log('Seed executed 🎉👍');
}