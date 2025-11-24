import { useState, useEffect } from "react";
import type { Place } from "@/types";
import Places from "@/components/Places";
import ErrorPage from "@/components/Error";
import { sortPlacesByDistance } from "@/loc";
import { useHttp } from "@/hooks/http";

namespace AvailablePlaces {
  export type Props = {
    onSelectPlace: (place: Place) => void;
  };
}

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlaces.Props) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [error, setError] = useState<Error>();

  const { fetchAvailablePlaces } = useHttp();

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        const sortedPlaces = sortPlacesByDistance(places, 50.993199, 8.238595);
        setAvailablePlaces(sortedPlaces);
        setIsFetching(false);
      } catch (error) {
        setError(error as Error);
      }
    })();
  }, []);

  if (error) {
    const fallbackErrorMessage =
      "Could not fetch places, please try again later.";
    return (
      <ErrorPage
        title="An error occured!"
        message={error.message || fallbackErrorMessage}
      />
    );
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      isLoading={isFetching}
      loadingText="Fetching places data..."
      onSelectPlace={onSelectPlace}
    />
  );
}
