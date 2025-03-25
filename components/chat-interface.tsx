"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Predefined bot responses
const BOT_RESPONSES: Record<string, string[]> = {
  default: [
    "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    "Je suis l'assistant virtuel d'AlloDepann+. Que puis-je faire pour vous ?",
  ],
  help: [
    "Pour demander de l'aide, veuillez partager votre position et décrire votre problème dans le formulaire.",
    "Un dépanneur sera envoyé à votre position dès que possible après votre demande.",
  ],
  location: [
    "Vous pouvez partager votre position en cliquant sur le bouton 'Partager ma position'.",
    "Assurez-vous d'autoriser l'accès à votre position pour que nous puissions vous localiser.",
  ],
  time: [
    "Le temps d'arrivée dépend de la disponibilité des dépanneurs et de votre localisation.",
    "En général, un dépanneur arrive dans les 15 à 30 minutes après l'acceptation de votre demande.",
  ],
  payment: [
    "Vous pouvez payer par carte bancaire, mobile money ou en espèces directement au dépanneur.",
    "Les tarifs dépendent du type de service requis. Vous recevrez une estimation avant l'intervention.",
  ],
  contact: [
    "Vous pouvez nous contacter au +225 07 XX XX XX XX ou par email à contact@allodepann.ci.",
    "Notre service client est disponible 24h/24 et 7j/7 pour vous assister.",
  ],
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("aide") || input.includes("assistance") || input.includes("secours")) {
      return getRandomResponse("help")
    } else if (input.includes("position") || input.includes("localisation") || input.includes("où")) {
      return getRandomResponse("location")
    } else if (
      input.includes("temps") ||
      input.includes("durée") ||
      input.includes("attente") ||
      input.includes("quand")
    ) {
      return getRandomResponse("time")
    } else if (
      input.includes("paiement") ||
      input.includes("payer") ||
      input.includes("tarif") ||
      input.includes("prix")
    ) {
      return getRandomResponse("payment")
    } else if (
      input.includes("contact") ||
      input.includes("téléphone") ||
      input.includes("email") ||
      input.includes("appeler")
    ) {
      return getRandomResponse("contact")
    } else {
      return getRandomResponse("default")
    }
  }

  const getRandomResponse = (category: string): string => {
    const responses = BOT_RESPONSES[category] || BOT_RESPONSES.default
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[300px]">
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {message.sender === "bot" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`rounded-lg px-3 py-2 text-sm ${
                  message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-2 flex gap-2">
        <Input
          placeholder="Tapez votre message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button size="icon" onClick={handleSend}>
          <Send className="h-4 w-4" />
          <span className="sr-only">Envoyer</span>
        </Button>
      </div>
    </div>
  )
}

