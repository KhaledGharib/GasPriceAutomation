import { NextRequest } from "next/server";
import prisma from "../../../../db/db";

// Update Information
export async function PUT(req: NextRequest) {
  try {
    const { userId, displayID, Gasoline91, Gasoline95, Diesel, displayName } =
      await req.json();

    const response = await prisma.display.update({
      where: {
        userId,
        id: displayID,
      },
      data: {
        Gasoline91,
        Gasoline95,
        Diesel,
        displayName,
      },
    });

    return new Response(JSON.stringify({ message: "Updated", data: response }));
  } catch (error) {
    const errorResponse = { data: error };
    const errorBody = JSON.stringify(errorResponse);

    return new Response(errorBody, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
