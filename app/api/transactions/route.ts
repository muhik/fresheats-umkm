import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Cloudflare Pages requires Edge Runtime
export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const dateFrom = searchParams.get('from');
        const dateTo = searchParams.get('to');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '5');
        const skip = (page - 1) * limit;

        let whereClause: any = {};
        if (dateFrom || dateTo) {
            whereClause.date = {};
            if (dateFrom) {
                const startDate = new Date(dateFrom);
                startDate.setHours(0, 0, 0, 0);
                whereClause.date.gte = startDate;
            }
            if (dateTo) {
                const endDate = new Date(dateTo);
                endDate.setHours(23, 59, 59, 999);
                whereClause.date.lte = endDate;
            }
        }

        const transactions = await prisma.transaction.findMany({
            where: whereClause,
            include: { items: true },
            orderBy: { date: 'desc' },
            skip: skip,
            take: limit,
        });

        const totalTransactions = await prisma.transaction.count({ where: whereClause });
        const salesAggregate = await prisma.transaction.aggregate({
            where: whereClause,
            _sum: { total: true },
        });

        return NextResponse.json({
            transactions,
            totalTransactions,
            totalSales: salesAggregate._sum.total || 0,
            page,
            limit,
            totalPages: Math.ceil(totalTransactions / limit),
        });
    } catch (error) {
        console.error('Fetch transactions error:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}
