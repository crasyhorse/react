import type { Place } from "@/types";

const BASE_URL = "http://localhost:3000";

export const useHttp = () => {
  const fetchAvailablePlaces = async () => {
    const response = await fetch(`${BASE_URL}/places`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch places!");
    }

    return data.places;
  };

    const fetchUserPlaces = async () => {
    const response = await fetch(`${BASE_URL}/user-places`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch user's places!");
    }

    return data.places;
  };

  const updateUserPlaces = async (places: Place[]) => {
    const response = await fetch(`${BASE_URL}/user-places`, {
      method: "PUT",
      body: JSON.stringify({ places }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to update the user's places!");
    }

    return data.message;
  };

  return { fetchAvailablePlaces, fetchUserPlaces, updateUserPlaces };
};
