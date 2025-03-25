"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Car, Wrench, User, CheckCircle, XCircle } from "lucide-react"

// Données fictives pour les utilisateurs
const USERS_DATA = [
  {
    id: "user-001",
    name: "Jean Kouassi",
    email: "jean.kouassi@example.com",
    phone: "+225 07 XX XX XX XX",
    role: "motorist",
    status: "active",
    registeredAt: "2023-10-15",
  },
  {
    id: "user-002",
    name: "Marie Konan",
    email: "marie.konan@example.com",
    phone: "+225 07 XX XX XX XX",
    role: "motorist",
    status: "active",
    registeredAt: "2023-11-02",
  },
  {
    id: "user-003",
    name: "Ahmed Diallo",
    email: "ahmed.diallo@example.com",
    phone: "+225 07 XX XX XX XX",
    role: "motorist",
    status: "inactive",
    registeredAt: "2023-09-20",
  },
  {
    id: "dep-001",
    name: "Amadou Traoré",
    email: "amadou.traore@example.com",
    phone: "+225 05 XX XX XX XX",
    role: "depanneur",
    status: "active",
    registeredAt: "2023-08-10",
  },
  {
    id: "dep-002",
    name: "Ibrahim Coulibaly",
    email: "ibrahim.coulibaly@example.com",
    phone: "+225 05 XX XX XX XX",
    role: "depanneur",
    status: "active",
    registeredAt: "2023-09-05",
  },
  {
    id: "dep-003",
    name: "Kofi Mensah",
    email: "kofi.mensah@example.com",
    phone: "+225 05 XX XX XX XX",
    role: "depanneur",
    status: "inactive",
    registeredAt: "2023-07-15",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = USERS_DATA.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm),
  )

  // Compter les utilisateurs par rôle
  const motoristCount = USERS_DATA.filter((user) => user.role === "motorist").length
  const depanneurCount = USERS_DATA.filter((user) => user.role === "depanneur").length

  return (
    <DashboardLayout title="Gestion des utilisateurs" role="admin">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Utilisateurs</p>
                  <p className="text-2xl font-bold">{USERS_DATA.length}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Automobilistes</p>
                  <p className="text-2xl font-bold">{motoristCount}</p>
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
                  <p className="text-2xl font-bold">{depanneurCount}</p>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Liste des utilisateurs</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        {user.role === "motorist" ? (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <Car className="mr-1 h-3 w-3" />
                            Automobiliste
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            <Wrench className="mr-1 h-3 w-3" />
                            Dépanneur
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Actif
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            <XCircle className="mr-1 h-3 w-3" />
                            Inactif
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                            {user.status === "active" ? (
                              <DropdownMenuItem className="text-red-500">Désactiver</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-500">Activer</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

