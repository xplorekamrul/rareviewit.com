import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// ১. OPTIONS রিকোয়েস্ট হ্যান্ডেল করা (Cross-Platform compatibility-র জন্য)
export async function OPTIONS() {
    return new NextResponse(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const adId = searchParams.get('adId');
    const site = searchParams.get('site') || 'unknown';
    const type = searchParams.get('type') || 'impression';

    if (!adId) return new NextResponse(null, { status: 400 });

    try {
        // 1x1 transparent pixel
        const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

        // Fire and forget: database write happens asynchronously
        prisma.adAnalytics.upsert({
            where: { adId: adId },
            update: {
                impressions: type === 'impression' ? { increment: 1 } : undefined,
                clicks: type === 'click' ? { increment: 1 } : undefined,
            },
            create: {
                adId: adId,
                site: site,
                impressions: type === 'impression' ? 1 : 0,
                clicks: type === 'click' ? 1 : 0,
            },
        }).catch(err => console.error("Prisma Tracking Error:", err));

        return new NextResponse(new Uint8Array(pixel), {
            headers: {
                'Content-Type': 'image/gif',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
        });
    } catch (error) {
        console.error("Critical API Error:", error);
        return new NextResponse(null, { status: 500 });
    }
}