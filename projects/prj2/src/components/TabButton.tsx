import type { ReactNode } from "react";

type PropData = {
  children: ReactNode;
  isActive: boolean;
}

function TabButton({ children, isActive, ...props }: PropData) {
  return (
    <li>
      <button className={isActive ? 'active' : undefined} {...props}>{children}</button>
    </li>
  );
}

export default TabButton;
