export default function TestPage() {
   const colors = [
      { name: 'background', bgClass: 'bg-background', textClass: 'text-foreground', border: true },
      { name: 'foreground', bgClass: 'bg-foreground', textClass: 'text-background' },
      { name: 'card', bgClass: 'bg-card', textClass: 'text-card-foreground', border: true },
      { name: 'card-foreground', bgClass: 'bg-card-foreground', textClass: 'text-card' },
      { name: 'popover', bgClass: 'bg-popover', textClass: 'text-popover-foreground', border: true },
      { name: 'popover-foreground', bgClass: 'bg-popover-foreground', textClass: 'text-popover' },
      { name: 'primary', bgClass: 'bg-primary', textClass: 'text-primary-foreground' },
      { name: 'primary-foreground', bgClass: 'bg-primary-foreground', textClass: 'text-primary' },
      { name: 'secondary', bgClass: 'bg-secondary', textClass: 'text-secondary-foreground', border: true },
      { name: 'secondary-foreground', bgClass: 'bg-secondary-foreground', textClass: 'text-secondary' },
      { name: 'muted', bgClass: 'bg-muted', textClass: 'text-muted-foreground', border: true },
      { name: 'muted-foreground', bgClass: 'bg-muted-foreground', textClass: 'text-muted' },
      { name: 'accent', bgClass: 'bg-accent', textClass: 'text-accent-foreground' },
      { name: 'accent-foreground', bgClass: 'bg-accent-foreground', textClass: 'text-accent' },
      { name: 'destructive', bgClass: 'bg-destructive', textClass: 'text-destructive-foreground' },
      { name: 'destructive-foreground', bgClass: 'bg-destructive-foreground', textClass: 'text-destructive' },
      { name: 'border', bgClass: 'bg-border', textClass: 'text-foreground', border: true },
      { name: 'input', bgClass: 'bg-input', textClass: 'text-foreground', border: true },
      { name: 'ring', bgClass: 'bg-ring', textClass: 'text-background' },
      { name: 'chart-1', bgClass: 'bg-chart-1', textClass: 'text-background' },
      { name: 'chart-2', bgClass: 'bg-chart-2', textClass: 'text-background' },
      { name: 'chart-3', bgClass: 'bg-chart-3', textClass: 'text-background' },
      { name: 'chart-4', bgClass: 'bg-chart-4', textClass: 'text-background' },
      { name: 'chart-5', bgClass: 'bg-chart-5', textClass: 'text-background' },
      { name: 'sidebar', bgClass: 'bg-sidebar', textClass: 'text-sidebar-foreground', border: true },
      { name: 'sidebar-foreground', bgClass: 'bg-sidebar-foreground', textClass: 'text-sidebar' },
      { name: 'sidebar-primary', bgClass: 'bg-sidebar-primary', textClass: 'text-sidebar-primary-foreground' },
      { name: 'sidebar-primary-foreground', bgClass: 'bg-sidebar-primary-foreground', textClass: 'text-sidebar-primary' },
      { name: 'sidebar-accent', bgClass: 'bg-sidebar-accent', textClass: 'text-sidebar-accent-foreground', border: true },
      { name: 'sidebar-accent-foreground', bgClass: 'bg-sidebar-accent-foreground', textClass: 'text-sidebar-accent' },
      { name: 'sidebar-border', bgClass: 'bg-sidebar-border', textClass: 'text-foreground', border: true },
      { name: 'sidebar-ring', bgClass: 'bg-sidebar-ring', textClass: 'text-background' },
   ]

   return (
      <div className="min-h-screen bg-background p-8">
         <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Complete Color Palette</h1>
            <p className="text-muted-foreground mb-12">All {colors.length} color classes from the design system</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
               {colors.map((color) => (
                  <div
                     key={color.name}
                     className={`${color.bgClass} ${color.textClass} rounded-lg p-6 shadow-lg flex flex-col items-center justify-center min-h-[180px] ${color.border ? 'border-2 border-current opacity-80' : ''
                        }`}
                  >
                     <div className="text-center">
                        <p className="text-xs font-semibold opacity-75 mb-1">Class</p>
                        <p className="text-sm font-bold break-words">{color.name}</p>
                        <p className="text-xs opacity-60 mt-2">{color.bgClass}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}
