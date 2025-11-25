import { useRef, useEffect, type ComponentProps } from "react";
import { createPortal } from "react-dom";

namespace Modal {
  export type Props = ComponentProps<"dialog"> & {
    open: boolean;
  };
}
function Modal({ open, children, onClose }: Modal.Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal") as HTMLDialogElement
  );
}

export default Modal;
