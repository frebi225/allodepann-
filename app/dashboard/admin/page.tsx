"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MapComponent } from "@/components/map-component"
import { Car, Wrench, Users, Clock, MapPin } from "lucide-react"

// Mock data for active interventions
const MOCK_INTERVENTIONS = [
  {
    id: "int-001",
    motorist: {
      id: "user-001",
      name: "Jean Kouassi",
      phone: "+225 07 XX XX XX XX",
      location: { lat: 5.3364, lng: -4.0267 },
    },
    depanneur: {
      id: "dep-001",
      name: "Amadou Traoré",
      phone: "+225 05 XX XX XX XX",
      location: { lat: 5.338, lng: -4.029 },
    },
    problem: "Batterie déchargée",
    status: "in_progress",
    startedAt: new Date(Date.now() - 25 * 60000).toISOString(),
    estimatedArrival: "10 minutes",
  },
  {
    id: "int-002",
    motorist: {
      id: "user-002",
      name: "Marie Konan",
      phone: "+225 07 XX XX XX XX",
      location: { lat: 5.341, lng: -4.03 },
    },
    depanneur: {
      id: "dep-002",
      name: "Ibrahim Coulibaly",
      phone: "+225 05 XX XX XX XX",
      location: { lat: 5.339, lng: -4.032 },
    },
    problem: "Pneu crevé",
    status: "in_progress",
    startedAt: new Date(Date.now() - 15 * 60000).toISOString(),
    estimatedArrival: "5 minutes",
  },
]

// Mock data for completed interventions
const MOCK_COMPLETED = [
  {
    id: "int-003",
    motorist: {
      id: "user-003",
      name: "Ahmed Diallo",
      phone: "+225 07 XX XX XX XX",
    },
    depanneur: {
      id: "dep-003",
      name: "Kofi Mensah",
      phone: "+225 05 XX XX XX XX",
    },
    problem: "Remorquage après accident",
    status: "completed",
    startedAt: new Date(Date.now() - 120 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 90 * 60000).toISOString(),
    duration: "30 minutes",
  },
  {
    id: "int-004",
    motorist: {
      id: "user-004",
      name: "Fatou Bamba",
      phone: "+225 07 XX XX XX XX",
    },
    depanneur: {
      id: "dep-001",
      name: "Amadou Traoré",
      phone: "+225 05 XX XX XX XX",
    },
    problem: "Clés enfermées dans la voiture",
    status: "completed",
    startedAt: new Date(Date.now() - 180 * 60000).toISOString(),
    completedAt: new Date(Date.now() - 160 * 60000).toISOString(),
    duration: "20 minutes",
  },
]

// Mock data for users
const MOCK_USERS = {
  motorists: 124,
  depanneurs: 37,
  activeUsers: 42,
  newToday: 5,
}

export default function AdminDashboard() {
  const [selectedIntervention, setSelectedIntervention] = useState<(typeof MOCK_INTERVENTIONS)[0] | null>(null)

  // Prepare map markers for the selected intervention
  const getMapMarkers = () => {
    if (!selectedIntervention) return []

    return [
      {
        position: selectedIntervention.motorist.location,
        title: `${selectedIntervention.motorist.name} (Automobiliste)`,
        icon: "motorist",
      },
      {
        position: selectedIntervention.depanneur.location,
        title: `${selectedIntervention.depanneur.name} (Dépanneur)`,
        icon: "depanneur",
      },
    ]
  }

  return (
    <DashboardLayout title="Tableau de bord Administrateur" role="admin">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Utilisateurs</p>
                <p className="text-2xl font-bold">{MOCK_USERS.motorists + MOCK_USERS.depanneurs}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Automobilistes</p>
                <p className="text-2xl font-bold">{MOCK_USERS.motorists}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Car className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dépanneurs</p>
                <p className="text-2xl font-bold">{MOCK_USERS.depanneurs}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Interventions Actives</p>
                <p className="text-2xl font-bold">{MOCK_INTERVENTIONS.length}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Carte des interventions actives</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px] relative">
              {selectedIntervention ? (
                <MapComponent
                  center={selectedIntervention.motorist.location}
                  markers={getMapMarkers()}
                  directions={{
                    origin: selectedIntervention.depanneur.location,
                    destination: selectedIntervention.motorist.location,
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Sélectionnez une intervention pour voir sur la carte
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedIntervention && (
            <Card>
              <CardHeader>
                <CardTitle>Détails de l'intervention</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Automobiliste</h3>
                    <p className="font-medium">{selectedIntervention.motorist.name}</p>
                    <p className="text-sm">{selectedIntervention.motorist.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Problème</h3>
                    <p>{selectedIntervention.problem}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Heure de début</h3>
                    <p>{new Date(selectedIntervention.startedAt).toLocaleTimeString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Dépanneur</h3>
                    <p className="font-medium">{selectedIntervention.depanneur.name}</p>
                    <p className="text-sm">{selectedIntervention.depanneur.phone}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Statut</h3>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        En cours
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Arrivée estimée</h3>
                    <p>{selectedIntervention.estimatedArrival}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="active">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Actives</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interventions actives</CardTitle>
                </CardHeader>
                <CardContent>
                  {MOCK_INTERVENTIONS.length > 0 ? (
                    <div className="space-y-4">
                      {MOCK_INTERVENTIONS.map((intervention) => (
                        <div
                          key={intervention.id}
                          className={`p-3 rounded-md border cursor-pointer transition-colors ${
                            selectedIntervention?.id === intervention.id
                              ? "bg-primary/10 border-primary"
                              : "bg-card hover:bg-muted"
                          }`}
                          onClick={() => setSelectedIntervention(intervention)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{intervention.motorist.name}</h3>
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              En cours
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{intervention.problem}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Dépanneur: {intervention.depanneur.name}</span>
                            <span className="text-muted-foreground">
                              {new Date(intervention.startedAt).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>Aucune intervention active pour le moment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Interventions terminées</CardTitle>
                </CardHeader>
                <CardContent>
                  {MOCK_COMPLETED.length > 0 ? (
                    <div className="space-y-4">
                      {MOCK_COMPLETED.map((intervention) => (
                        <div key={intervention.id} className="p-3 rounded-md border bg-card">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{intervention.motorist.name}</h3>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Terminée
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{intervention.problem}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Dépanneur: {intervention.depanneur.name}</span>
                            <span className="text-muted-foreground">Durée: {intervention.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>Aucune intervention terminée.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Statistiques utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Utilisateurs actifs aujourd'hui</span>
                  <span className="font-medium">{MOCK_USERS.activeUsers}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Nouveaux utilisateurs aujourd'hui</span>
                  <span className="font-medium">{MOCK_USERS.newToday}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Ratio automobilistes/dépanneurs</span>
                  <span className="font-medium">{(MOCK_USERS.motorists / MOCK_USERS.depanneurs).toFixed(1)}:1</span>
                </div>

                <Button variant="outline" className="w-full">
                  Voir tous les utilisateurs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

