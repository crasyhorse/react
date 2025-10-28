import { createContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { ShoppingCart, Product, ShoppingCartItem } from "@/types";
import { DUMMY_PRODUCTS } from "@/dummy-products";

namespace CartContext {
  export type Ctx = ShoppingCart & {
    addItemToCart: (id: Product["id"]) => void;
    updateCartItemQuantity: (id: ShoppingCartItem["id"], index: number) => void;
  };
}

const defaultCartCtx: CartContext.Ctx = {
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
};

export const CartContext = createContext(defaultCartCtx);

namespace CartContextProvider {
  export type Props = {
    children: ReactNode;
  };

  export type Payload = {
    productId: string;
    amount?: number;
  };
}

enum Actions {
  addItem = 1,
  updateItem = 2,
}

const shoppingCartReducer = (
  state: ShoppingCart,
  action: { type: Actions; payload: CartContextProvider.Payload }
) => {
  const updatedItems = [...state.items];

  switch (action.type) {
    case Actions.addItem:
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload.productId
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload.productId
        );
        if (product) {
          updatedItems.push({
            id: action.payload.productId,
            name: product.title,
            price: product.price,
            quantity: 1,
          } as ShoppingCartItem);
        }
      }

      return {
        ...state,
        items: updatedItems,
      };
    case Actions.updateItem:
      if (action.payload.productId && action.payload.amount) {
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.productId
        );

        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
          ...state,
          items: updatedItems,
        };
      }
  }
  return state;
};

function CartContextProvider({ children }: CartContextProvider.Props) {
  const [state, dispatch] = useReducer(shoppingCartReducer, defaultCartCtx);

  function handleAddItemToCart(id: Product["id"]) {
    dispatch({
      type: Actions.addItem,
      payload: {
        productId: id,
      } as CartContextProvider.Payload,
    });
  }

  function handleUpdateCartItemQuantity(
    productId: Product["id"],
    amount: number
  ) {
    dispatch({
      type: Actions.updateItem,
      payload: {
        productId,
        amount,
      } as CartContextProvider.Payload,
    });
  }

  const cartCtxValue = {
    items: state.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext value={cartCtxValue}>{children}</CartContext>;
}

export default CartContextProvider;
