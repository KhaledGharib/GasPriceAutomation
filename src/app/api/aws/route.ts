import AWS from "aws-sdk";

import { NextRequest } from "next/server";

const iotEndpoint = process.env.NEXT_PUBLIC_AWS_ENDPOINT;
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

// Configure AWS SDK
AWS.config.update({ region, accessKeyId, secretAccessKey });

export async function POST(req: NextRequest) {
  const { topic, fuel91, fuel95, fuelDI } = await req.json();

  // Create AWS IoT Data client
  const iotData = new AWS.IotData({ endpoint: iotEndpoint });

  // Publish message to AWS IoT topic
  const params = {
    topic,
    payload: JSON.stringify({ fuel91, fuel95, fuelDI }),
    qos: 0,
  };

  try {
    await iotData.publish(params).promise();

    return new Response(JSON.stringify({ message: "sent to AWS" }));
  } catch (error) {
    console.error("Error publishing message to AWS IoT:", error);
  }
}
