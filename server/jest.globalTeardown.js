require("dotenv-flow/config");
const PrismaClient = require("@prisma/client").PrismaClient;

// delete the contents of the database, keep the tables
async function emptyDB(prisma) {
  const tablenames = await prisma.$queryRaw`
  SELECT tablename FROM pg_tables WHERE schemaname='public'
`;
  const usersTable = `"auth"."users"`;
  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .concat(usersTable)
    .join(", ");

  try {
    const result = await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables} CASCADE;`
    );
  } catch (error) {
    console.log({ error });
  }
}

module.exports = async function (globalConfig, projectConfig) {
  const prisma = new PrismaClient();
  await emptyDB(prisma);
};
