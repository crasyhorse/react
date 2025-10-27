import type { ReactEventHandler, ReactNode } from "react";
import type { ComponentPropsWithoutRef } from "react";

interface PropData extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  onAddProject: ReactEventHandler;
}

const Button = ({ children, onAddProject, ...props }: PropData) => {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-700"
      onClick={onAddProject}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
