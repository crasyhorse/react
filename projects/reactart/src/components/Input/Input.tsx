import classes from "@/components/Input/Input.module.css";
import type { ComponentProps } from "react";

type PropData = {
  label: string;
  invalid: boolean;
  props: ComponentProps<"input">;
}
const Input = ({ label, invalid, ...props }: PropData) => {
  return (
    <p>
      <label className={classes.label}>{label}</label>
      <input
        className={`${classes.input} ${invalid ? classes.invalid : undefined}`}
        type="email"
        {...props}
      />
    </p>
  );
};

export default Input;
