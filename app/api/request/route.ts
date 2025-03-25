import { NextResponse } from "next/server"

// In a real application, you would connect to a database
// This is a simplified example

export async function POST(request: Request) {
  try {
    const { userId, description, latitude, longitude } = await request.json()

    // Validate the request
    if (!userId || !description || latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would save this to a database
    // For example:
    // await db.requests.create({
    //   data: {
    //     userId,
    //     description,
    //     latitude,
    //     longitude,
    //     status: "pending",
    //     createdAt: new Date(),
    //   },
    // });

    console.log(`Request created for user ${userId}: ${description} at ${latitude}, ${longitude}`)

    return NextResponse.json(
      {
        success: true,
        message: "Request created successfully",
        requestId: `req-${Date.now()}`, // In a real app, this would be the ID from the database
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating request:", error)
    return NextResponse.json({ error: "Failed to create request" }, { status: 500 })
  }
}

