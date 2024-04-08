import { NextRequest } from "next/server";
import prisma from "../../../../db/db";

export async function POST(req: NextRequest) {
  try {
    const { displayId, Gasoline91, Gasoline95, Diesel, displayName, userId } =
      await req.json();
    const priceData = {
      displayId,
      Gasoline91,
      Gasoline95,
      Diesel,
      displayName,
      user: { connect: { externalId: userId } },
    };

    const createdPrice = await prisma.display.create({ data: priceData });
    return new Response(
      JSON.stringify({ message: "Created", data: createdPrice })
    );
  } catch (error) {
    console.error("error in post", error);
    return new Response(JSON.stringify({ message: error, data: error }));
  }
}
