"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, CheckCircle, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MapComponent } from "@/components/map-component"
import { useToast } from "@/hooks/use-toast"

// Mock data for requests
const MOCK_REQUESTS = [
  {
    id: "req-001",
    userId: "user-001",
    userName: "Jean Kouassi",
    description: "Ma voiture ne démarre pas. Je pense que c'est la batterie.",
    latitude: 5.3364,
    longitude: -4.0267,
    status: "pending",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    distance: "2.3 km",
  },
  {
    id: "req-002",
    userId: "user-002",
    userName: "Marie Konan",
    description: "J'ai un pneu crevé et je n'ai pas de roue de secours.",
    latitude: 5.341,
    longitude: -4.03,
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    distance: "1.5 km",
  },
  {
    id: "req-003",
    userId: "user-003",
    userName: "Ahmed Diallo",
    description: "Accident léger. Besoin d'assistance pour remorquage.",
    latitude: 5.329,
    longitude: -4.022,
    status: "pending",
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    distance: "3.7 km",
  },
]

export default function DepanneurDashboard() {
  const { toast } = useToast()
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isSharing, setIsSharing] = useState(false)
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const [selectedRequest, setSelectedRequest] = useState<(typeof MOCK_REQUESTS)[0] | null>(null)
  const [activeIntervention, setActiveIntervention] = useState<(typeof MOCK_REQUESTS)[0] | null>(null)

  // Function to get depanneur's location
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Erreur",
        description: "La géolocalisation n'est pas prise en charge par votre navigateur.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Localisation",
      description: "Récupération de votre position en cours...",
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        setIsSharing(true)

        toast({
          title: "Succès",
          description: "Votre position a été partagée avec succès.",
        })
      },
      (error) => {
        toast({
          title: "Erreur",
          description: `Impossible d'obtenir votre position: ${error.message}`,
          variant: "destructive",
        })
      },
    )
  }

  // Function to accept a request
  const acceptRequest = (request: (typeof MOCK_REQUESTS)[0]) => {
    if (!isSharing) {
      toast({
        title: "Erreur",
        description: "Veuillez partager votre position d'abord.",
        variant: "destructive",
      })
      return
    }

    // Here you would send the acceptance to your API
    // const response = await fetch('/api/requests/accept', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ requestId: request.id }),
    // });

    // Update the UI
    setActiveIntervention(request)
    setRequests((prev) => prev.filter((r) => r.id !== request.id))
    setSelectedRequest(null)

    toast({
      title: "Intervention acceptée",
      description: `Vous avez accepté la demande de ${request.userName}.`,
    })
  }

  // Function to complete an intervention
  const completeIntervention = () => {
    if (!activeIntervention) return

    // Here you would send the completion to your API
    // const response = await fetch('/api/interventions/complete', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ interventionId: activeIntervention.id }),
    // });

    toast({
      title: "Intervention terminée",
      description: `Vous avez terminé l'intervention pour ${activeIntervention.userName}.`,
    })

    setActiveIntervention(null)
  }

  // Prepare map markers
  const getMapMarkers = () => {
    const markers = []

    if (location) {
      markers.push({
        position: location,
        title: "Votre position",
        icon: "depanneur",
      })
    }

    if (selectedRequest) {
      markers.push({
        position: { lat: selectedRequest.latitude, lng: selectedRequest.longitude },
        title: `${selectedRequest.userName} - ${selectedRequest.description.substring(0, 20)}...`,
        icon: "motorist",
      })
    } else if (activeIntervention) {
      markers.push({
        position: { lat: activeIntervention.latitude, lng: activeIntervention.longitude },
        title: `${activeIntervention.userName} - ${activeIntervention.description.substring(0, 20)}...`,
        icon: "motorist",
      })
    }

    return markers
  }

  // Get directions URL
  const getDirectionsUrl = () => {
    if (!location || (!selectedRequest && !activeIntervention)) return ""

    const destination = selectedRequest || activeIntervention
    if (!destination) return ""

    return `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`
  }

  return (
    <DashboardLayout title="Tableau de bord Dépanneur" role="depanneur">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Carte</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              {location ? (
                <MapComponent
                  center={location}
                  markers={getMapMarkers()}
                  directions={
                    activeIntervention
                      ? {
                          origin: location,
                          destination: { lat: activeIntervention.latitude, lng: activeIntervention.longitude },
                        }
                      : undefined
                  }
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Partagez votre position pour voir la carte</p>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedRequest && (
            <Card>
              <CardHeader>
                <CardTitle>Détails de la demande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Client</h3>
                  <p>{selectedRequest.userName}</p>
                </div>

                <div>
                  <h3 className="font-medium">Problème</h3>
                  <p>{selectedRequest.description}</p>
                </div>

                <div>
                  <h3 className="font-medium">Distance</h3>
                  <p>{selectedRequest.distance}</p>
                </div>

                <div>
                  <h3 className="font-medium">Heure de la demande</h3>
                  <p>{new Date(selectedRequest.createdAt).toLocaleTimeString()}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button onClick={() => acceptRequest(selectedRequest)} className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Accepter l'intervention
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(getDirectionsUrl(), "_blank")}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Obtenir l'itinéraire
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeIntervention && (
            <Card>
              <CardHeader>
                <CardTitle>Intervention en cours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Client</h3>
                  <p>{activeIntervention.userName}</p>
                </div>

                <div>
                  <h3 className="font-medium">Problème</h3>
                  <p>{activeIntervention.description}</p>
                </div>

                <div>
                  <h3 className="font-medium">Distance</h3>
                  <p>{activeIntervention.distance}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button onClick={completeIntervention} className="flex-1">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Terminer l'intervention
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.open(getDirectionsUrl(), "_blank")}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Obtenir l'itinéraire
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
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
                  <span className="text-sm font-medium">Intervention</span>
                  <span className={`text-sm ${activeIntervention ? "text-green-500" : "text-muted-foreground"}`}>
                    {activeIntervention ? "En cours" : "Aucune"}
                  </span>
                </div>

                <Button onClick={getLocation} variant={isSharing ? "outline" : "default"} className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  {isSharing ? "Position partagée" : "Partager ma position"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Demandes d'assistance</CardTitle>
              <Badge variant="outline">{requests.length}</Badge>
            </CardHeader>
            <CardContent>
              {requests.length > 0 ? (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className={`p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedRequest?.id === request.id ? "bg-primary/10 border-primary" : "bg-card hover:bg-muted"
                      }`}
                      onClick={() => setSelectedRequest(request)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{request.userName}</h3>
                        <Badge variant="outline">{request.distance}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{request.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{new Date(request.createdAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>Aucune demande d'assistance pour le moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

