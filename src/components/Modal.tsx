import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

namespace Modal {
  export type Props = {
    children: ReactNode;
    open: boolean;
  };
}
const Modal = function Modal({ children, open }: Modal.Props) {
  const modalRoot: Element = document.getElementById("modal") as Element;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);
  
  return createPortal(
    <dialog className="modal" ref={dialogRef}>
      {children}
    </dialog>,
    modalRoot
  );
};

export default Modal;
