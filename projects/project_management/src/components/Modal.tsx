import {
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import type { Container } from "react-dom/client";
import type { DialogHandle } from "@/types";
import Button from "@/components/Button";

type PropData = ComponentPropsWithoutRef<"dialog"> & {
  ref: Ref<DialogHandle>;
  buttonCaption: string;
}

const Modal = ({ children, ref, buttonCaption, ...props }: PropData) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalRoot: Container = document.getElementById(
    "modal-root"
  ) as Container;

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current?.showModal();
      },
    };
  });
  return createPortal(
    <dialog
    {...props}
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button onAddProject={() => null}>
          {buttonCaption ? buttonCaption : "Close"}
        </Button>
      </form>
    </dialog>,
    modalRoot
  );
};

export default Modal;
