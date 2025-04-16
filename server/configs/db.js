import getPrismaInstance from "../utils/PrismaClient.js";

export async function connectToDb() {
  try {
    const prisma = getPrismaInstance();

    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    process.exit(1); // Exit the app if DB connection fails
  }
}
