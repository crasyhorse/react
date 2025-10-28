import Header from "@/components/Header";
import Shop from "@/components/Shop";
import ProductComponent from "@/components/Product";
import CartContextProvider from "@/store/shopping-cart-context";

import { DUMMY_PRODUCTS } from "@/dummy-products.ts";

function App() {
  return (
    <>
      <CartContextProvider>
        <Header />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <ProductComponent product={product} />
            </li>
          ))}
        </Shop>
      </CartContextProvider>
    </>
  );
}

export default App;
