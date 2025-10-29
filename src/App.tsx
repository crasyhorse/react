import { useRef, useState, useEffect, useReducer, useCallback } from "react";

import Places from "@/components/Places";
import { AVAILABLE_PLACES } from "./data.ts";
import Modal from "@/components/Modal";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import logoImg from "./assets/logo.png";
import type { Place, State } from "@/types/index";
import { sortPlacesByDistance } from "@/loc.ts";

enum Action {
  select = 1,
  remove = 2,
}

const PICKED_PLACES_STORE = "pickedPlaces";

namespace App {
  export type ReducerAction = {
    type: Action;
    payload: {
      placeId: Place["id"];
    };
  };
}
const placeReducer = (state: State, action: App.ReducerAction) => {
  function selectPlace(id: Place["id"]) {
    function storePlaces(id: Place["id"]) {
      const placesToParse = localStorage.getItem(PICKED_PLACES_STORE) || "[]";
      const storedPlaces = JSON.parse(placesToParse);

      if (storedPlaces.indexOf(id) === -1) {
        localStorage.setItem(
          PICKED_PLACES_STORE,
          JSON.stringify([id, ...storedPlaces])
        );
      }
    }

    if (state.some((place: Place) => place.id === (id as Place["id"]))) {
      return state;
    }

    const place = AVAILABLE_PLACES.find(
      (place) => place.id === (id as Place["id"])
    );

    storePlaces(id);

    if (place) {
      return [place, ...state];
    }

    return [...state];
  }

  function removePlace(id: Place["id"]) {
    const updatedPlaces = state.filter(
      (place: Place) => place.id !== (id as Place["id"])
    );

    localStorage.setItem(
      PICKED_PLACES_STORE,
      JSON.stringify(updatedPlaces.map((place) => place.id))
    );

    return [...updatedPlaces];
  }

  const id = action.payload.placeId;
  let updatedState: State;
  switch (action.type) {
    case Action.select:
      updatedState = selectPlace(id);
      return updatedState;
    case Action.remove:
      updatedState = removePlace(id);
      return updatedState;
    default:
      return state;
  }
};

const loadPickedPlaces = (): State => {
  const placesToParse = localStorage.getItem("pickedPlaces") || "[]";
  const storedPlaceIds = JSON.parse(placesToParse);
  return storedPlaceIds.map((placeId: Place["id"]) =>
    AVAILABLE_PLACES.find((place: Place) => place.id === placeId)
  );
};

function App() {
  const selectedPlace = useRef<Place["id"] | null>(null);

  const storedPlaces = loadPickedPlaces();
  const [pickedPlaces, dispatch] = useReducer(placeReducer, storedPlaces);

  const [availablePlaces, setAvailablePlaces] = useState<State>([]);
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id: Place["id"]) {
    setModalState(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalState(false);
  }

  function handleSelectPlace(id: Place["id"]) {
    dispatch({
      type: Action.select,
      payload: {
        placeId: id,
      },
    });
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    dispatch({
      type: Action.remove,
      payload: {
        placeId: selectedPlace.current as Place["id"],
      },
    });

    setModalState(false);
  }, []);

  return (
    <>
      <Modal open={modalState}>
        {modalState && (
          <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onConfirm={handleRemovePlace}
          />
        )}
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
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
