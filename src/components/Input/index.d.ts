import type { ComponentPropsWithRef } from "react";

export type InputProps = ComponentPropsWithRef<"input">;
export type TextareaProps = ComponentPropsWithRef<"textarea">;

type Common = keyof InputProps & keyof TextareaProps;
type IsEqual<I, T> = (<P>() => P extends I ? 1 : 2) extends <P>() => P extends T
  ? 1
  : 2
  ? true
  : false;

export type SharedEqualKeys = {
  [K in Common]: IsEqual<InputProps[K], TextareaProps[K]> extends true
    ? K
    : never;
}[Common];
