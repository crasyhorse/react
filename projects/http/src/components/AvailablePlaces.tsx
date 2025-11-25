import { useState, useEffect } from "react";
import type { Place } from "@/types";
import Places from "@/components/Places";
import ErrorPage from "@/components/Error";
import { sortPlacesByDistance } from "@/loc";
import { useHttp } from "@/hooks/http";
import { useFetch } from "@/hooks/useFetch";

namespace AvailablePlaces {
  export type Props = {
    onSelectPlace: (place: Place) => void;
  };
}

const { fetchAvailablePlaces } = useHttp();
const getSortedPlaces = async (): Promise<Place[]> => {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    const sortedPlaces = sortPlacesByDistance(places, 50.993199, 8.238595);
    resolve(sortedPlaces);
  });
};

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlaces.Props) {
  const {
    isFetching,
    error,
    data: availablePlaces,
    setData: setAvailablePlaces,
  } = useFetch(getSortedPlaces, []);

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
