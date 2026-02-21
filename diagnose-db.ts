import "dotenv/config";
import prisma from "./lib/prisma";

async function diagnose() {
    try {
        console.log("Stage 1: Checking DATABASE_URL...");
        const url = process.env.DATABASE_URL;
        if (!url) {
            console.error("ERROR: DATABASE_URL is not defined!");
            return;
        }

        console.log("Stage 2: Testing direct Pool connection...");
        const { Pool, neonConfig } = await import("@neondatabase/serverless");
        const ws = (await import("ws")).default;
        neonConfig.webSocketConstructor = (ws as any);
        const pool = new Pool({ connectionString: url });
        const client = await pool.connect();
        await client.query("SELECT 1");
        client.release();
        await pool.end();
        console.log("Direct Pool connection successful!");

        console.log("Stage 3: Testing Prisma count...");
        const userCount = await prisma.user.count();
        console.log(`Prisma successful. User count: ${userCount}`);
    } catch (error: any) {
        console.error("Diagnostic failed!");
        console.error("Error Message:", error.message);
        console.error("Error Stack:", error.stack);
    } finally {
        process.exit(0);
    }
}

diagnose();
