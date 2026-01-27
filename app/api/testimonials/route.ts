import { getTestimonials } from '@/actions/testimonials'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const testimonials = await getTestimonials()

      return NextResponse.json(
         {
            success: true,
            data: testimonials,
         },
         {
            status: 200,
            headers: {
               'Content-Type': 'application/json',
               'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
         }
      )
   } catch (error) {
      console.error('Error fetching testimonials:', error)
      return NextResponse.json(
         {
            success: false,
            error: 'Failed to fetch testimonials',
         },
         { status: 500 }
      )
   }
}
