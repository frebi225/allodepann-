import { NextResponse } from "next/server"

// In a real application, you would connect to a database
// This is a simplified example

// Mock data for demonstration
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

export async function GET(request: Request) {
  try {
    // In a real application, you would fetch from a database
    // For example:
    // const requests = await db.requests.findMany({
    //   where: { status: "pending" },
    //   include: { user: true },
    //   orderBy: { createdAt: "desc" },
    // });

    // Calculate distance based on depanneur's location
    // This would be done in the database or with a geospatial library

    return NextResponse.json(MOCK_REQUESTS, { status: 200 })
  } catch (error) {
    console.error("Error fetching requests:", error)
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 })
  }
}

