import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import "dotenv/config";

neonConfig.webSocketConstructor = ws;

async function testDirect() {
    const connectionString = process.env.DATABASE_URL;
    console.log("Direct test with:", connectionString?.substring(0, 30));

    // Try passing it as a plain string first
    const pool = new Pool({ connectionString });

    try {
        console.log("Connecting...");
        const client = await pool.connect();
        console.log("Connected!");
        const res = await client.query("SELECT NOW()");
        console.log("Result:", res.rows[0]);
        client.release();
    } catch (err) {
        console.error("Direct connection failed:", err);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

testDirect();
