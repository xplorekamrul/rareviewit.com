"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/**
 * Example of how to use the animated snake border card
 * 
 * Usage:
 * <Card animated>
 *   <CardHeader>
 *     <CardTitle>Your Title</CardTitle>
 *     <CardDescription>Your description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Your content here
 *   </CardContent>
 * </Card>
 */

export function CardSnakeBorderDemo() {
   return (
      <div className="grid gap-6 md:grid-cols-3">
         {/* Regular Card */}
         <Card>
            <CardHeader>
               <CardTitle>Regular Card</CardTitle>
               <CardDescription>Standard card without animation</CardDescription>
            </CardHeader>
            <CardContent>
               This is a regular card with a static border.
            </CardContent>
         </Card>

         {/* Animated Snake Border Card - Default Speed (8s) & Line Length (80%) */}
         <Card animated={true}>
            <CardHeader>
               <CardTitle>Default (8s, 80%)</CardTitle>
               <CardDescription>Default speed and line length</CardDescription>
            </CardHeader>
            <CardContent>
               This card has default animation settings.
            </CardContent>
         </Card>

         {/* Animated Snake Border Card - Fast Speed (2s) & Short Line (60%) */}
         <Card animated={true} speed={2} lineLength={60}>
            <CardHeader>
               <CardTitle>Fast & Short (2s, 60%)</CardTitle>
               <CardDescription>Faster animation with shorter line</CardDescription>
            </CardHeader>
            <CardContent>
               This card has a faster animation with a shorter snake line.
            </CardContent>
         </Card>

         {/* Animated Snake Border Card - Slow Speed (6s) & Long Line (90%) */}
         <Card animated={true} speed={6} lineLength={90}>
            <CardHeader>
               <CardTitle>Slow & Long (6s, 90%)</CardTitle>
               <CardDescription>Slower animation with longer line</CardDescription>
            </CardHeader>
            <CardContent>
               This card has a slower animation with a longer snake line.
            </CardContent>
         </Card>

         {/* Animated Snake Border Card - Medium Speed (4s) & Very Short Line (50%) */}
         <Card animated={true} speed={4} lineLength={50}>
            <CardHeader>
               <CardTitle>Medium & Very Short (4s, 50%)</CardTitle>
               <CardDescription>Medium speed with very short line</CardDescription>
            </CardHeader>
            <CardContent>
               This card has a medium animation with a very short snake line.
            </CardContent>
         </Card>

         {/* Animated Snake Border Card - Very Fast (1s) & Minimal Line (40%) */}
         <Card animated={true} speed={1} lineLength={40}>
            <CardHeader>
               <CardTitle>Very Fast & Minimal (1s, 40%)</CardTitle>
               <CardDescription>Very fast animation with minimal line</CardDescription>
            </CardHeader>
            <CardContent>
               This card has a very fast animation with a minimal snake line.
            </CardContent>
         </Card>
      </div>
   )
}