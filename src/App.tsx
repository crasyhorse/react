import { useRef, useContext } from "react";

import Places from "@/components/Places";
import Modal from "@/components/Modal";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import PlacesContextProvider from "@/store/places-context";
import { PlacesContext } from "@/store/places-context";
import logoImg from "@/assets/logo.png";

function App() {
  const modal = useRef(null);
  const selectedPlace = useRef(null);

  const { removePlace } = useContext(PlacesContext);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  return (
    <>
      <PlacesContextProvider>
        <Modal ref={modal}>
          <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onConfirm={() => {
              removePlace(selectedPlace.current);
              handleStopRemovePlace();
            }}
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
          <Places
            title="I'd like to visit ..."
            fallbackText={"Select the places you would like to visit below."}
            onSelectPlace={handleStartRemovePlace}
          />
          <Places title="Available Places" onSelectPlace={handleSelectPlace} />
        </main>
      </PlacesContextProvider>
    </>
  );
}

export default App;
