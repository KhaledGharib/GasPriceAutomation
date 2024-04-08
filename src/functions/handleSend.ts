export const handleSend = async (userId: string, displayId: string) => {
  try {
    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        displayId,
      }),
    });

    const data = await response.json();

    console.log(data);
    if (response.ok) {
      const espResponse = await fetch("/api/aws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: data.displayId,
          fuel91: data.Gasoline91,
          fuel95: data.Gasoline95,
          fuelDI: data.Diesel,
        }),
      });
      const res = await espResponse.json();
      if (espResponse.ok) {
        console.log(res.message);
      } else {
        console.error("Failed to send data to ESP");
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
