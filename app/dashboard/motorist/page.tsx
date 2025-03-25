"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, MessageSquare, AlertTriangle } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MapComponent } from "@/components/map-component"
import { ChatInterface } from "@/components/chat-interface"
import { useToast } from "@/hooks/use-toast"

export default function MotoristDashboard() {
  const { toast } = useToast()
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [problem, setProblem] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [isLocating, setIsLocating] = useState(false)

  // Function to get user's location
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Erreur",
        description: "La géolocalisation n'est pas prise en charge par votre navigateur.",
        variant: "destructive",
      })
      return
    }

    setIsLocating(true)
    toast({
      title: "Localisation",
      description: "Récupération de votre position en cours...",
    })

    // Pour cette démo, utilisons une position fixe à Abidjan
    // Dans une application réelle, nous utiliserions navigator.geolocation.getCurrentPosition
    setTimeout(() => {
      // Coordonnées approximatives d'Abidjan
      const abidjanLat = 5.3599
      const abidjanLng = -4.0083

      // Ajouter une légère variation pour simuler une position précise
      const latitude = abidjanLat + (Math.random() - 0.5) * 0.01
      const longitude = abidjanLng + (Math.random() - 0.5) * 0.01

      console.log("Position simulée:", latitude, longitude)
      setLocation({ lat: latitude, lng: longitude })
      setIsSharing(true)
      setIsLocating(false)

      toast({
        title: "Succès",
        description: "Votre position a été partagée avec succès.",
      })
    }, 2000)
  }

  // Function to send help request
  const sendRequest = async () => {
    if (!location) {
      toast({
        title: "Erreur",
        description: "Veuillez partager votre position d'abord.",
        variant: "destructive",
      })
      return
    }

    if (!problem.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez décrire votre problème.",
        variant: "destructive",
      })
      return
    }

    try {
      // Here you would send the request to your API
      // const response = await fetch('/api/request', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ location, problem }),
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRequestSent(true)
      toast({
        title: "Demande envoyée",
        description: "Votre demande d'assistance a été envoyée avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      })
    }
  }

  // Simulate real-time location updates
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isSharing && location) {
      interval = setInterval(() => {
        // Simulate small location changes
        setLocation((prev) => {
          if (!prev) return prev
          return {
            lat: prev.lat + (Math.random() - 0.5) * 0.0005,
            lng: prev.lng + (Math.random() - 0.5) * 0.0005,
          }
        })
      }, 10000) // Update every 10 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSharing, location])

  return (
    <DashboardLayout title="Tableau de bord Automobiliste" role="motorist">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Carte</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              {location ? (
                <MapComponent center={location} markers={[{ position: location, title: "Votre position" }]} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Partagez votre position pour voir la carte</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Demande d'assistance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="problem" className="text-sm font-medium">
                  Décrivez votre problème
                </label>
                <Textarea
                  id="problem"
                  placeholder="Ex: Ma voiture ne démarre pas, j'ai un pneu crevé..."
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  disabled={requestSent}
                  rows={4}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={getLocation}
                  variant={isSharing ? "outline" : "default"}
                  className="flex-1"
                  disabled={requestSent || isLocating}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {isLocating ? "Localisation en cours..." : isSharing ? "Position partagée" : "Partager ma position"}
                </Button>

                <Button
                  onClick={sendRequest}
                  className="flex-1"
                  disabled={!isSharing || !problem.trim() || requestSent}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  {requestSent ? "Demande envoyée" : "Demander de l'aide"}
                </Button>
              </div>

              {requestSent && (
                <div className="bg-muted p-4 rounded-md mt-4">
                  <p className="text-sm font-medium">
                    Votre demande a été envoyée. Un dépanneur vous contactera bientôt.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statut</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Position</span>
                  <span className={`text-sm ${isSharing ? "text-green-500" : "text-muted-foreground"}`}>
                    {isSharing ? "Partagée" : "Non partagée"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Demande</span>
                  <span className={`text-sm ${requestSent ? "text-green-500" : "text-muted-foreground"}`}>
                    {requestSent ? "Envoyée" : "Non envoyée"}
                  </span>
                </div>

                {requestSent && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dépanneur</span>
                    <span className="text-sm text-yellow-500">En recherche</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assistance</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowChat(!showChat)} className="w-full" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Discuter avec un assistant
              </Button>
            </CardContent>
          </Card>

          {showChat && (
            <Card>
              <CardHeader>
                <CardTitle>Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterface />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

