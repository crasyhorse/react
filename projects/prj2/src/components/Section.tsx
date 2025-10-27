import type { ComponentProps, ReactNode } from "react";

type PropData = {
  title: string;
  children: ReactNode;
  props: ComponentProps<"section">
}

const Section = ({ title, children, ...props }: PropData) => {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
