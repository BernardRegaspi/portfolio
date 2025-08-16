import React from 'react'
import PageTransition from '@/components/PageTransition'

const GraphicDesign = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <PageTransition />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Graphic Design</h1>
        <div className="bg-card p-6 rounded-lg border border-border">
          <p className="text-muted-foreground text-lg">
            Welcome to the Graphic Design section. Here you'll find information about my graphic design services and portfolio.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GraphicDesign
