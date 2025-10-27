import type { InputProps, TextareaProps } from "@/components/Input";
import type { ComponentPropsWithRef } from "react";
import { useId } from "react";

type PropData = InputProps | TextareaProps;

const Input = ({ label, isTextArea, ...props }: PropData) => {
  const id = props.id ?? useId();
  const classes =
    "w-full p-1 border-b-2 rounded-md border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  const sharedLabel = (
    <label className="text-sm font-bold uppercase text-stone-500" htmlFor={id}>
      {label}
    </label>
  );

  if (isTextArea) {
    const typedProps = props as ComponentPropsWithRef<"textarea">;
    return (
      <p className="flex flex-col gap-1 my-4">
        {sharedLabel}
        <textarea {...typedProps} className={classes} id={id} />
      </p>
    );
  } else {
    const typedProps = props as ComponentPropsWithRef<"input">;
    return (
      <p className="flex flex-col gap-1 my-4">
        {sharedLabel}
        <input
          {...typedProps}
          className={classes}
          type={typedProps.type ?? "text"}
          id={id}
        />
      </p>
    );
  }
};

export default Input;
