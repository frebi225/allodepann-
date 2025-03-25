import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Clock, CheckCircle, AlertTriangle, Wrench } from "lucide-react"

// Données fictives pour l'historique
const HISTORY_DATA = [
  {
    id: "req-001",
    date: "2023-12-15",
    time: "14:30",
    problem: "Batterie déchargée",
    depanneur: "Amadou Traoré",
    status: "completed",
    duration: "45 minutes",
  },
  {
    id: "req-002",
    date: "2023-11-28",
    time: "09:15",
    problem: "Pneu crevé",
    depanneur: "Ibrahim Coulibaly",
    status: "completed",
    duration: "30 minutes",
  },
  {
    id: "req-003",
    date: "2023-10-05",
    time: "18:45",
    problem: "Panne de carburant",
    depanneur: "Kofi Mensah",
    status: "completed",
    duration: "20 minutes",
  },
]

export default function HistoryPage() {
  return (
    <DashboardLayout title="Historique des interventions" role="motorist">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mes interventions passées</CardTitle>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Wrench className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="text-muted-foreground mr-2">Dépanneur:</span>
                          {item.depanneur}
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
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucune intervention</h3>
                <p className="text-muted-foreground">Vous n'avez pas encore demandé d'intervention.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

