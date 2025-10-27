import type { ReactNode, JSX } from "react";

type PropData = {
  children: ReactNode;
  tabButtons: ReactNode;
  Container: JSX.ElementType;
}

const Tabs = ({ children, tabButtons, Container }: PropData) => {
  return (
    <>

      <Container>{tabButtons}</Container>
      {children}
    </>
  );
};

export default Tabs;
