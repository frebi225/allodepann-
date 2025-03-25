import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Clock, CheckCircle, AlertTriangle, Car, MapPin } from "lucide-react"

// Données fictives pour l'historique
const HISTORY_DATA = [
  {
    id: "int-001",
    date: "2023-12-15",
    time: "14:30",
    problem: "Batterie déchargée",
    client: "Jean Kouassi",
    location: "Cocody, Abidjan",
    status: "completed",
    duration: "45 minutes",
    payment: "Mobile Money",
    amount: "15 000 FCFA",
  },
  {
    id: "int-002",
    date: "2023-12-10",
    time: "09:15",
    problem: "Pneu crevé",
    client: "Marie Konan",
    location: "Plateau, Abidjan",
    status: "completed",
    duration: "30 minutes",
    payment: "Espèces",
    amount: "10 000 FCFA",
  },
  {
    id: "int-003",
    date: "2023-12-05",
    time: "18:45",
    problem: "Panne de carburant",
    client: "Ahmed Diallo",
    location: "Yopougon, Abidjan",
    status: "completed",
    duration: "20 minutes",
    payment: "Mobile Money",
    amount: "8 000 FCFA",
  },
  {
    id: "int-004",
    date: "2023-11-28",
    time: "11:30",
    problem: "Clés enfermées dans la voiture",
    client: "Fatou Bamba",
    location: "Marcory, Abidjan",
    status: "completed",
    duration: "25 minutes",
    payment: "Carte bancaire",
    amount: "12 000 FCFA",
  },
]

export default function HistoryPage() {
  return (
    <DashboardLayout title="Historique des interventions" role="depanneur">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Mes interventions passées</CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10">
                Total: {HISTORY_DATA.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {HISTORY_DATA.length > 0 ? (
              <div className="space-y-4">
                {HISTORY_DATA.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg bg-card">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-medium text-lg">{item.problem}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.date} à {item.time}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Terminée
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="text-muted-foreground mr-2">Client:</span>
                          {item.client}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="text-muted-foreground mr-2">Lieu:</span>
                          {item.location}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="text-muted-foreground mr-2">Durée:</span>
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <span className="text-sm">
                        <span className="text-muted-foreground mr-2">Paiement:</span>
                        {item.payment}
                      </span>
                      <span className="font-medium text-primary">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune intervention</h3>
                <p className="text-muted-foreground">Vous n'avez pas encore effectué d'intervention.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

