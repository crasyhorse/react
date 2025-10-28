export interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
}

export interface ShoppingCartItem {
  id: string;
  name: Product["title"];
  price: Product["price"];
  quantity: number;
}

export interface ShoppingCart {
  items: ShoppingCartItem[];
}

export interface DialogHandle {
    open: () => void;
}