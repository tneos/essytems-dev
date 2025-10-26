const {PrismaClient} = require("@prisma/client");
const data = require("./mock-data.json");
const prisma = new PrismaClient();

async function main() {
  const clerkId = "user_33ostuFYlIlubtNjvN92lBxztW9";
  // Assign data to specific user
  const employees = data.map(employee => {
    return {
      ...employee,
      clerkId,
    };
  });
  //   console.log(employees);
  // Add to database
  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
