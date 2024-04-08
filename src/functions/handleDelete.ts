import useDisplaysStore from "@/middleware/displayStore";

export async function handleDelete(displayID: number, userId: string) {
  const response = await fetch("/api/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, displayID }),
  });

  if (response.ok) {
    useDisplaysStore.getState().removeDisplay(displayID.toString());
  } else {
    const errorData = await response.json();
    console.error("Error deleting display:", errorData.error);
  }
}
