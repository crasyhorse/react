import { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { Place } from "@/types";
import { AVAILABLE_PLACES } from "@/data.ts";

namespace PlacesContext {
  export type Ctx = {
    places: Place[];
    selectPlace: (placeId: Place["id"]) => void;
    removePlace: (placeId: Place["id"]) => void;
  };
}

const defaultPlacesCtx: PlacesContext.Ctx = {
  places: [],
  selectPlace: () => {},
  removePlace: () => {},
};

export const PlacesContext = createContext(defaultPlacesCtx);

namespace PlacesContextProvider {
  export type Props = {
    children: ReactNode;
  };

  export type Payload = {
    placeId: Place["id"];
  };
}

enum PlacesAction {
  select = 1,
  remove = 2,
}

const placesReducer = (
  state: PlacesContext.Ctx,
  action: { type: PlacesAction; payload: PlacesContextProvider.Payload }
) => {
  const updatedItems = [...state.places];
  switch (action.type) {
    case PlacesAction.select:
      if (updatedItems.some((place) => place.id === action.payload.placeId)) {
        return state;
      }
      const place = AVAILABLE_PLACES.find(
        (place) => place.id === action.payload.placeId
      );

      return {
        ...state,
        places: [place!, ...updatedItems],
      };
      
    case PlacesAction.remove:
      updatedItems.filter((place) => place.id !== action.payload.placeId);

      return {
        ...state,
        places: [...updatedItems],
      };
    default:
      break;
  }
  return state;
};

function PlacesContextProvider({ children }: PlacesContextProvider.Props) {
  const [state, dispatch] = useReducer(placesReducer, defaultPlacesCtx);

  function handleSelectPlace(placeId: Place["id"]) {
    dispatch({
      type: PlacesAction.select,
      payload: {
        placeId,
      } as PlacesContextProvider.Payload,
    });
  }

  function handleRemovePlace(placeId: Place["id"]) {
    dispatch({
      type: PlacesAction.remove,
      payload: {
        placeId,
      } as PlacesContextProvider.Payload,
    });
  }

  const placesCtxValue: PlacesContext.Ctx = {
    places: [],
    selectPlace: handleSelectPlace,
    removePlace: handleRemovePlace,
  };
  return <PlacesContext value={placesCtxValue}>{children}</PlacesContext>;
}

export default PlacesContextProvider;
