import { useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";

import Places from "@/components/Places";
import Modal from "@/components/Modal";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import logoImg from "@/assets/logo.png";
import AvailablePlaces from "@/components/AvailablePlaces";
import ErrorPage from "@/components/Error";
import type { Place } from "@/types";
import { useHttp } from "@/hooks/http";
import { useFetch } from "@/hooks/useFetch";
import { sortPlacesByDistance } from "@/loc";

function App() {
  const selectedPlace = useRef<Place | null>(null);

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<{
    message: string;
  } | null>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { updateUserPlaces, fetchUserPlaces } = useHttp();

  const {
    isFetching,
    error,
    data: userPlaces,
    setData: setUserPlaces,
  } = useFetch(fetchUserPlaces, []);

  const handleError = () => {
    setErrorUpdatingPlaces(null);
  };
  function handleStartRemovePlace(place: Place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  const handleSelectPlace = async (selectedPlace: Place) => {
    setUserPlaces((prevPickedPlaces: Place[]) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (
        prevPickedPlaces.some((place: Place) => place.id === selectedPlace.id)
      ) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      // await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      let message: string = "";
      if (error instanceof Error) {
        message = error.message;
      }
      setErrorUpdatingPlaces({
        message: message || "Failed to update places!",
      });
    }
  };

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces: Place[]) =>
        prevPickedPlaces.filter(
          (place: Place) => place.id !== selectedPlace.current!.id
        )
      );

      const selected = selectedPlace.current;
      if (!selected) {
        throw new Error(
          "There is a problem in the app. No place currently selected!"
        );
      }

      try {
        await updateUserPlaces(
          userPlaces.filter((place: Place) => place.id !== selected.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces);
        let message: string = "";
        if (error instanceof Error) {
          message = error.message;
        }
        setErrorUpdatingPlaces({
          message: message || "Failed to update places!",
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces, setUserPlaces]
  );

  let errorPage: ReactNode;
  if (error) {
    const fallbackErrorMessage =
      "Could not fetch places, please try again later.";
    errorPage = (
      <ErrorPage
        title="An error occured!"
        message={error.message || fallbackErrorMessage}
      />
    );
  }
  return (
    <>
      <Modal open={Boolean(errorUpdatingPlaces)} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title="An error occured"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && errorPage}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces as Place[]}
            isLoading={isFetching}
            loadingText="Loading user places..."
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
