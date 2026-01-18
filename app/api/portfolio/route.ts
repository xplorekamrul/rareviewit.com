import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      // Fetch all categories with their portfolios
      const categories = await prisma.portfolioCategory.findMany({
         include: {
            portfolios: {
               where: { status: "PUBLISHED" },
               orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
               select: {
                  id: true,
                  title: true,
                  description: true,
                  image: true,
                  tags: true,
                  featured: true,
                  status: true,
                  createdAt: true,
               },
            },
         },
         orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
         { success: true, data: categories },
         {
            headers: {
               "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
            },
         }
      );
   } catch (error) {
      console.error("GET /api/portfolio error:", error);
      return NextResponse.json(
         { success: false, error: "Failed to fetch portfolios" },
         { status: 500 }
      );
   }
}
