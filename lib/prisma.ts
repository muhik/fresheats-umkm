import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// Create Prisma client with Turso for Edge Runtime (Cloudflare)
function createPrismaClient(): PrismaClient {
    const tursoUrl = process.env.TURSO_DATABASE_URL;
    const tursoToken = process.env.TURSO_AUTH_TOKEN;

    if (tursoUrl && tursoToken) {
        // Production: Use Turso with libsql adapter
        const adapter = new PrismaLibSql({
            url: tursoUrl,
            authToken: tursoToken,
        });
        return new PrismaClient({ adapter } as any);
    } else {
        // Development: Use local SQLite
        return new PrismaClient();
    }
}

// Always create fresh client for Edge Runtime
export const prisma = createPrismaClient();
export default prisma;
