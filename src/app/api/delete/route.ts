import { NextRequest } from "next/server";
import prisma from "../../../../db/db";

export async function DELETE(req: NextRequest) {
  try {
    const { userId, displayID } = await req.json();

    const response = await prisma.display.delete({
      where: {
        userId,
        id: displayID,
      },
    });

    // Serialize the response array to JSON
    const responseBody = JSON.stringify(response);

    return new Response(responseBody);
  } catch (error) {
    // const errorResponse = { data: error };
    const errorBody = JSON.stringify(error);

    return new Response(errorBody, {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
