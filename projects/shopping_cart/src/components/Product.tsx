import { useContext } from "react";
import type { Product } from "@/types";
import { CartContext } from "@/store/shopping-cart-context";

namespace ProductComponent {
  export type Props = {
    product: Product;
  };
}

function ProductComponent({ product }: ProductComponent.Props) {
  const { addItemToCart } = useContext(CartContext);

  return (
    <article className="product">
      <img src={product.image} alt={product.title} />
      <div className="product-content">
        <div>
          <h3>{product.title}</h3>
          <p className="product-price">${product.price}</p>
          <p>{product.description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addItemToCart(product.id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}

export default ProductComponent;
