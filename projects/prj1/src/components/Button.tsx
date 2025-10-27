import type { ReactNode } from "react";

type PropData = {
  children: ReactNode;
  buttonType?: 'btn-primary' | 'btn-secondary' | 'btn-danger';
  onClick: () => void;
}

const MyButton = ({ children, buttonType = 'btn-primary', onClick }: PropData) => {
  return (
    <button type="button" className={"btn " + buttonType} onClick={onClick}>
      {children}
    </button>
  );
};
export default MyButton;
