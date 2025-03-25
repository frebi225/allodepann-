import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <DashboardLayout title="Paramètres" role="admin">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'application</CardTitle>
                <CardDescription>Configurez les paramètres généraux de l'application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Nom de l'application</Label>
                  <Input id="app-name" defaultValue="AlloDepann+" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email de contact</Label>
                  <Input id="contact-email" defaultValue="contact@allodepann.ci" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Téléphone de contact</Label>
                  <Input id="contact-phone" defaultValue="+225 07 XX XX XX XX" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app-description">Description de l'application</Label>
                  <Textarea
                    id="app-description"
                    rows={4}
                    defaultValue="Votre solution de mise en relation rapide et sécurisée entre automobilistes, dépanneurs et garages à Abidjan."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Enregistrer les modifications</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres de localisation</CardTitle>
                <CardDescription>Configurez les paramètres de localisation et de carte.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-location">Localisation par défaut</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="default-lat" className="text-xs">
                        Latitude
                      </Label>
                      <Input id="default-lat" defaultValue="5.3599" />
                    </div>
                    <div>
                      <Label htmlFor="default-lng" className="text-xs">
                        Longitude
                      </Label>
                      <Input id="default-lng" defaultValue="-4.0083" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="map-provider">Fournisseur de carte</Label>
                  <Select defaultValue="google">
                    <SelectTrigger id="map-provider">
                      <SelectValue placeholder="Sélectionner un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Maps</SelectItem>
                      <SelectItem value="leaflet">Leaflet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">Clé API Google Maps</Label>
                  <Input id="api-key" type="password" defaultValue="••••••••••••••••••••••••••••••" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="enable-directions" defaultChecked />
                  <Label htmlFor="enable-directions">Activer les directions</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Enregistrer les modifications</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>Configurez les notifications envoyées aux utilisateurs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notifications par email</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-new-request">Nouvelle demande d'assistance</Label>
                  <Switch id="email-new-request" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-request-accepted">Demande acceptée</Label>
                  <Switch id="email-request-accepted" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-intervention-completed">Intervention terminée</Label>
                  <Switch id="email-intervention-completed" defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Notifications push</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-new-request">Nouvelle demande d'assistance</Label>
                  <Switch id="push-new-request" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-request-accepted">Demande acceptée</Label>
                  <Switch id="push-request-accepted" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-depanneur-arrival">Arrivée du dépanneur</Label>
                  <Switch id="push-depanneur-arrival" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-intervention-completed">Intervention terminée</Label>
                  <Switch id="push-intervention-completed" defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Notifications SMS</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-request-accepted">Demande acceptée</Label>
                  <Switch id="sms-request-accepted" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-depanneur-arrival">Arrivée du dépanneur</Label>
                  <Switch id="sms-depanneur-arrival" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de sécurité</CardTitle>
              <CardDescription>Configurez les paramètres de sécurité de l'application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Authentification</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="session-timeout">Expiration de session (minutes)</Label>
                  <Input id="session-timeout" className="w-20" defaultValue="60" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Politique de mot de passe</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="min-length">Longueur minimale</Label>
                  <Input id="min-length" className="w-20" defaultValue="8" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-uppercase">Exiger des majuscules</Label>
                  <Switch id="require-uppercase" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-number">Exiger des chiffres</Label>
                  <Switch id="require-number" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="require-special">Exiger des caractères spéciaux</Label>
                  <Switch id="require-special" defaultChecked />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium">Vérification des utilisateurs</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verify-email">Vérification d'email obligatoire</Label>
                  <Switch id="verify-email" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verify-phone">Vérification de téléphone obligatoire</Label>
                  <Switch id="verify-phone" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="verify-id">Vérification d'identité pour les dépanneurs</Label>
                  <Switch id="verify-id" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

