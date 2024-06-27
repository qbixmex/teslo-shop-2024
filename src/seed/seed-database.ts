import prisma from "../lib/prisma";
import { initialData } from "./seed";
import 'dotenv/config';

async function main() {

  console.log('Clearing data 🧹');

  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Deleted all tables 👍');

  console.log('Seed started 🚀');

  const { categories, products, users } = initialData;

  await prisma.user.createMany({ data: users });

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

    const productDB = await prisma.product.create({
      data: {
        ...attributesRest,
        categoryId: categoriesMap[type],
      }
    });

    const imagesData = images.map((url) => ({
      url: url,
      productId: productDB.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });

  });

  console.log('Products and Product Images Inserted 👍');

  console.log('Seed executed 🎉');
}

(() => {
  if ( process.env.NODE_ENV === 'production' ) return;
  main();
})();