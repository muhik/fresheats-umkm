import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Cloudflare Pages requires Edge Runtime
export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, total } = body;

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        const transactionId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const transaction = await prisma.transaction.create({
            data: {
                id: transactionId,
                total: total,
                items: {
                    create: items.map((item: any) => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        subtotal: item.price * item.quantity,
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        return NextResponse.json({ success: true, transaction });
    } catch (error) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 });
    }
}
