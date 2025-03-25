import { NextResponse } from "next/server"

// In a real application, you would connect to a database
// This is a simplified example

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("API Position: Données reçues", body)

    const { userId, latitude, longitude } = body

    // Validate the request
    if (!userId || latitude === undefined || longitude === undefined) {
      console.error("API Position: Données manquantes", { userId, latitude, longitude })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would save this to a database
    // For example:
    // await db.locations.upsert({
    //   where: { userId },
    //   update: { latitude, longitude, updatedAt: new Date() },
    //   create: { userId, latitude, longitude, updatedAt: new Date() },
    // });

    console.log(`Position updated for user ${userId}: ${latitude}, ${longitude}`)

    return NextResponse.json({ success: true, message: "Position updated successfully" }, { status: 200 })
  } catch (error) {
    console.error("API Position: Erreur lors du traitement", error)
    return NextResponse.json(
      { error: "Failed to update position", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

