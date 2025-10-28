import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "@/components/Cart";
import type { ComponentPropsWithoutRef, ReactNode, Ref } from "react";
import type { DialogHandle } from "@/types";

namespace CartModal {
  export type Props = ComponentPropsWithoutRef<"dialog"> & {
    ref: Ref<DialogHandle>;
    title: string;
    actions: ReactNode;
  };
}

const CartModal = function Modal({
  title,
  actions,
  ref,
  ...props
}: CartModal.Props) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
    };
  });

  const modalRoot: Element = document.getElementById("modal") as Element;
  return createPortal(
    <dialog {...props} id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    modalRoot
  );
};

export default CartModal;
