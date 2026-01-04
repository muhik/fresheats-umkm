import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

// Create Prisma client with Turso for Edge Runtime (Cloudflare)
function createPrismaClient(): PrismaClient {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    if (tursoUrl && tursoToken) {
        // Production: Use Turso
        const libsql = createClient({
            url: tursoUrl,
            authToken: tursoToken,
        });
        const adapter = new PrismaLibSql(libsql);
        return new PrismaClient({ adapter } as any);
    } else {
        // Development: Use local SQLite
        return new PrismaClient();
    }
}

// Always create fresh client for Edge Runtime
export const prisma = createPrismaClient();
export default prisma;
