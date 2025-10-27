import type { InputProps, SharedEqualKeys } from "@/components/Input";
import type { Ref } from "react";

interface PropData extends Pick<InputProps, SharedEqualKeys> {
  label: string;
  isTextArea?: boolean;
  ref: Ref<HTMLInputElement>;
}

const Input = ({ label, isTextArea, ref, ...props }: PropData) => {
  let id = props.id ? props.id : crypto.randomUUID();
  const classes =
    "w-full p-1 border-b-2 rounded-md border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        className="text-sm font-bold uppsercase text-stone-500"
        htmlFor={id}
      >
        {label}
      </label>
      {isTextArea && <textarea ref={ref} className={classes} id={id} {...props} />}
      {!isTextArea && (
        <input ref={ref} className={classes} type="text" id={id} {...props} />
      )}
    </p>
  );
};

export default Input;
