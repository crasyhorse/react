import type { ReactNode } from "react";

namespace Shop {
  export type Props = {
    children: ReactNode;
  };
}

function Shop({ children }: Shop.Props) {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">{children}</ul>
    </section>
  );
}

export default Shop;
