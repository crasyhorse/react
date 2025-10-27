import {
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type Ref,
} from "react";
import { createPortal } from "react-dom";
import type { Container } from "react-dom/client";
import type { DialogHandle } from "@/types";
import Button from "@/components/Button";

interface PropData extends ComponentPropsWithoutRef<"dialog"> {
  children: ReactNode;
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
      ref={dialogRef}
      {...props}
      className="backdrop:bg-stone-900/90 p4 rounded-md shadow-md"
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
