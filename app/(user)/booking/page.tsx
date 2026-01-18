// app/booking/page.tsx
import { generateMetadata as generateSEOMetadata } from "@/lib/seo"
import { booking } from "@/data/corpus"
import BookingClient from "./BookingClient"

export const metadata = generateSEOMetadata({
  title: booking.meta.title,
  description: booking.meta.description,
  path: booking.meta.path,
  ogImage: booking.meta.ogImage,
})

export default function Page() {
  return <BookingClient />
}
