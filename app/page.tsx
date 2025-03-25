import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { PhoneCall, Mail, MapPin, Clock, Car } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">AlloDepann+</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Connexion</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Inscription</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background py-12 md:py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Votre solution de dépannage automobile à Abidjan
            </h2>
            <p className="text-lg text-muted-foreground">
              Mise en relation rapide et sécurisée entre automobilistes, dépanneurs et garages à Abidjan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="/register?role=motorist">Je suis un automobiliste</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/register?role=depanneur">Je suis un dépanneur</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Dépannage automobile"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Comment ça fonctionne</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Partagez votre position</h3>
                <p className="text-muted-foreground">
                  Partagez votre géolocalisation en temps réel pour une assistance rapide.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Car className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Décrivez votre problème</h3>
                <p className="text-muted-foreground">
                  Expliquez votre panne pour que les dépanneurs puissent se préparer.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Assistance rapide</h3>
                <p className="text-muted-foreground">
                  Un dépanneur proche de vous viendra vous aider dans les plus brefs délais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Prêt à rejoindre AlloDepann+ ?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Inscrivez-vous dès maintenant pour bénéficier de notre service de dépannage ou pour proposer vos services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">S'inscrire maintenant</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AlloDepann+</h3>
              <p className="text-muted-foreground">
                Votre solution de mise en relation rapide et sécurisée entre automobilistes, dépanneurs et garages à
                Abidjan.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  <span>+225 07 XX XX XX XX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@allodepann.ci</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Abidjan, Côte d'Ivoire</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="hover:underline">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Conditions d'utilisation
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AlloDepann+. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}

