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
  
  console.log('Seed started 🚀');

  const { categories, products } = initialData;

  const categoriesData = categories.map(
    (categoryName) => ({ name: categoryName })
  );

  await prisma.category.createMany({ data: categoriesData });

  console.log('Categories Inserted 👍');

  const categoriesDB = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // <category_name, category_id>


  products.forEach(async (product) => {
    const { images, type, ...attributesRest } = product;

    await Promise.all([
      await prisma.product.create({
       data: {
         ...attributesRest,
         categoryId: categoriesMap[type],
       }
     }),
    ]);

  });

  console.log('Seed executed 🎉👍');
}