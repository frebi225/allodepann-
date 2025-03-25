"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Car, Wrench, Home, Menu, LogOut, User, Settings, Bell, LayoutDashboard } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  role: "motorist" | "depanneur" | "admin"
}

export function DashboardLayout({ children, title, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Gestion des erreurs
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Erreur détectée dans le dashboard:", event.error)
      setError("Une erreur est survenue dans l'application. Veuillez rafraîchir la page.")
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // Navigation links based on role
  const getNavLinks = () => {
    const baseLinks = [
      {
        href: "/",
        label: "Accueil",
        icon: Home,
      },
    ]

    const roleLinks = {
      motorist: [
        {
          href: "/dashboard/motorist",
          label: "Tableau de bord",
          icon: LayoutDashboard,
        },
        {
          href: "/dashboard/motorist/history",
          label: "Historique",
          icon: Car,
        },
      ],
      depanneur: [
        {
          href: "/dashboard/depanneur",
          label: "Tableau de bord",
          icon: LayoutDashboard,
        },
        {
          href: "/dashboard/depanneur/history",
          label: "Interventions",
          icon: Wrench,
        },
      ],
      admin: [
        {
          href: "/dashboard/admin",
          label: "Tableau de bord",
          icon: LayoutDashboard,
        },
        {
          href: "/dashboard/admin/users",
          label: "Utilisateurs",
          icon: User,
        },
        {
          href: "/dashboard/admin/settings",
          label: "Paramètres",
          icon: Settings,
        },
      ],
    }

    return [...baseLinks, ...roleLinks[role]]
  }

  const navLinks = getNavLinks()

  const NavLinks = () => (
    <div className="space-y-1">
      {navLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Button key={link.href} variant={isActive ? "secondary" : "ghost"} className="w-full justify-start" asChild>
            <Link href={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        )
      })}
    </div>
  )

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-destructive/10">
        <div className="bg-background p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold text-destructive mb-4">Erreur</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Rafraîchir la page</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex flex-col h-full">
                    <div className="py-4">
                      <h2 className="text-lg font-semibold mb-4">AlloDepann+</h2>
                      <NavLinks />
                    </div>
                    <div className="mt-auto pt-4 border-t">
                      <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
                        <Link href="/login">
                          <LogOut className="mr-2 h-4 w-4" />
                          Déconnexion
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>{role === "motorist" ? "AU" : role === "depanneur" ? "DE" : "AD"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {role === "motorist" ? "Jean Kouassi" : role === "depanneur" ? "Amadou Traoré" : "Admin User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Paramètres</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-red-500">
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar (desktop only) */}
        {!isMobile && (
          <aside className="w-64 border-r bg-muted/40 hidden md:block p-6">
            <div className="flex flex-col h-full">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">AlloDepann+</h2>
                <NavLinks />
              </div>
              <div className="mt-auto pt-4">
                <Button variant="ghost" className="w-full justify-start text-red-500" asChild>
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

