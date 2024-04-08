import useDisplaysStore, { DisplayInfo } from "@/middleware/displayStore";

export const handleUpdate = async (values: DisplayInfo) => {
  try {
    const response = await fetch("/api/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ownerId: values.userId,
        displayID: values.id,
        displayName: values.displayName,
        Gasoline91: values.Gasoline91,
        Gasoline95: values.Gasoline95,
        Diesel: values.Diesel,
      }),
    });

    if (response.ok) {
      const updatedDisplay = await response.json();
      useDisplaysStore.getState().updateDisplay(updatedDisplay.data);
      const espData: DisplayInfo = updatedDisplay.data;
      console.log(espData);

      try {
        const espResponse = await fetch("/api/aws", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: espData.displayId,
            fuel91: espData.Gasoline91,
            fuel95: espData.Gasoline95,
            fuelDI: espData.Diesel,
          }),
        });
        const res = await espResponse.json();
        console.log(res);
      } catch (error) {
        console.error("Failed to send data to ESP");
      }
    } else {
      const errorData = await response.json();
      console.error("Error updating display:", errorData.error);
    }
  } catch (error) {
    console.error("Error updating display:", error);
  }
};
