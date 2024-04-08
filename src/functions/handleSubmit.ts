import useDisplaysStore, { DisplayInfo } from "@/middleware/displayStore";
import { handleSend } from "./handleSend";

export const handleSubmit = async (
  userId: string,
  values: DisplayInfo,
  setOpen: (boolean: boolean) => void,
  setValues: (data: DisplayInfo) => void
) => {
  const response = await fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      displayId: values.displayId,
      displayName: values.displayName,
      Gasoline91: values.Gasoline91,
      Gasoline95: values.Gasoline95,
      Diesel: values.Diesel,
    }),
  });

  const newDisplay = await response.json();
  if (response.ok && newDisplay.message === "Created") {
    useDisplaysStore.getState().addDisplay(newDisplay.data);
    handleSend(userId, values.displayId);
    setOpen(false);
    setValues({
      id: 0,
      userId: "",
      Gasoline91: "",
      Gasoline95: "",
      Diesel: "",
      displayName: "",
      displayId: "",
    });
  } else {
    console.error("Error creating display:", newDisplay.message);
  }
};
