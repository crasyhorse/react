import type { MouseEventHandler } from "react";
import type { ComponentPropsWithoutRef } from "react";

type PropData = Omit<ComponentPropsWithoutRef<"button">, "onClick" | "className"> & {
  onAddProject: MouseEventHandler<HTMLButtonElement>;
};
const Button = ({ children, onAddProject, ...props }: PropData) => {
  return (
    <button
      {...props}
      className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-700"
      onClick={onAddProject}
    >
      {children}
    </button>
  );
};

export default Button;
