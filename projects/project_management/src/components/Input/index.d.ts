import type { ComponentPropsWithRef } from "react";

type BaseProps = { label: string };

export type InputProps =
  BaseProps &
  Omit<ComponentPropsWithRef<"input">, "className"> & {
    isTextArea?: false;
  };

export type TextareaProps =
  BaseProps &
  Omit<ComponentPropsWithRef<"textarea">, "className"> & {
    isTextArea: true;
  };

