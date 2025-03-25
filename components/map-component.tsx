"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "lucide-react"

interface MapMarker {
  position: { lat: number; lng: number }
  title: string
  icon?: "motorist" | "depanneur"
}

interface DirectionsProps {
  origin: { lat: number; lng: number }
  destination: { lat: number; lng: number }
}

interface MapComponentProps {
  center: { lat: number; lng: number }
  markers?: MapMarker[]
  directions?: DirectionsProps
}

export function MapComponent({ center, markers = [], directions }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  // This would be replaced with actual Google Maps integration
  // For this demo, we'll create a simplified map visualization
  useEffect(() => {
    if (!mapRef.current) return

    console.log("MapComponent: Initialisation avec centre", center)
    console.log("MapComponent: Marqueurs", markers)

    // Simulate map loading
    setLoading(true)

    const timer = setTimeout(() => {
      try {
        setLoading(false)
        setMapLoaded(true)

        // Draw the map (in a real app, this would be Google Maps API)
        const mapElement = mapRef.current
        if (!mapElement) {
          console.error("MapComponent: Élément de carte non trouvé")
          return
        }

        const ctx = document.createElement("canvas")
        ctx.width = mapElement.clientWidth || 300
        ctx.height = mapElement.clientHeight || 300
        ctx.style.width = "100%"
        ctx.style.height = "100%"
        ctx.style.position = "absolute"
        ctx.style.top = "0"
        ctx.style.left = "0"

        // Clear previous content
        while (mapElement.firstChild) {
          mapElement.removeChild(mapElement.firstChild)
        }
        mapElement.appendChild(ctx)

        const context = ctx.getContext("2d")
        if (!context) {
          console.error("MapComponent: Impossible d'obtenir le contexte 2D")
          return
        }

        // Draw a simple map background
        context.fillStyle = "#e8e8e8"
        context.fillRect(0, 0, ctx.width, ctx.height)

        // Draw some "roads"
        context.strokeStyle = "#ffffff"
        context.lineWidth = 6

        // Horizontal roads
        for (let i = 0; i < 5; i++) {
          const y = (ctx.height * (i + 1)) / 6
          context.beginPath()
          context.moveTo(0, y)
          context.lineTo(ctx.width, y)
          context.stroke()
        }

        // Vertical roads
        for (let i = 0; i < 5; i++) {
          const x = (ctx.width * (i + 1)) / 6
          context.beginPath()
          context.moveTo(x, 0)
          context.lineTo(x, ctx.height)
          context.stroke()
        }

        // Draw markers
        if (markers && markers.length > 0) {
          console.log("MapComponent: Dessin des marqueurs", markers)
          markers.forEach((marker, index) => {
            // Convert geo coordinates to pixel coordinates (simplified)
            // In a real app, you would use the Google Maps API for this
            const x = ctx.width / 2 + (marker.position.lng - center.lng) * 10000
            const y = ctx.height / 2 - (marker.position.lat - center.lat) * 10000

            // Draw marker
            context.beginPath()
            context.arc(x, y, 10, 0, 2 * Math.PI)
            context.fillStyle = marker.icon === "motorist" ? "#ef4444" : "#3b82f6"
            context.fill()
            context.strokeStyle = "#ffffff"
            context.lineWidth = 2
            context.stroke()

            // Draw label
            context.fillStyle = "#000000"
            context.font = "12px Arial"
            context.fillText(marker.title || "Marqueur", x + 15, y + 5)
          })
        } else {
          console.log("MapComponent: Aucun marqueur à dessiner")
        }

        // Draw directions if provided
        if (directions) {
          console.log("MapComponent: Dessin des directions", directions)
          const originX = ctx.width / 2 + (directions.origin.lng - center.lng) * 10000
          const originY = ctx.height / 2 - (directions.origin.lat - center.lat) * 10000
          const destX = ctx.width / 2 + (directions.destination.lng - center.lng) * 10000
          const destY = ctx.height / 2 - (directions.destination.lat - center.lat) * 10000

          // Draw route
          context.beginPath()
          context.moveTo(originX, originY)
          context.lineTo(destX, destY)
          context.strokeStyle = "#4ade80"
          context.lineWidth = 3
          context.stroke()

          // Draw distance
          const midX = (originX + destX) / 2
          const midY = (originY + destY) / 2
          context.fillStyle = "#000000"
          context.font = "12px Arial"
          context.fillText("2.3 km", midX, midY - 10)
        }
      } catch (error) {
        console.error("MapComponent: Erreur lors du rendu de la carte", error)
        setLoading(false)
        setMapLoaded(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [center, markers, directions])

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Chargement de la carte...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full bg-muted relative">
        {!mapLoaded && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Carte non disponible. Veuillez réessayer.</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-2 right-2 bg-background/80 text-xs p-1 rounded">
        Simulation de carte - Dans une application réelle, utilisez Google Maps ou Leaflet
      </div>
    </div>
  )
}

