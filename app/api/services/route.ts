import { getServices } from '@/actions/services'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const services = await getServices()

      return NextResponse.json(
         {
            success: true,
            data: services,
         },
         {
            status: 200,
            headers: {
               'Content-Type': 'application/json',
               'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Methods': 'GET, OPTIONS',
               'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
         }
      )
   } catch (error) {
      console.error('Error fetching services:', error)
      return NextResponse.json(
         {
            success: false,
            error: 'Failed to fetch services',
         },
         { status: 500 }
      )
   }
}

export async function OPTIONS() {
   return NextResponse.json({}, {
      headers: {
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'GET, OPTIONS',
         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
   })
}
