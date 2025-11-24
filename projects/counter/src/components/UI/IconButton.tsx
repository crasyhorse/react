import type { ComponentPropsWithoutRef } from "react";
import type { IconType } from "@/components/UI/Icons/index";
import { memo } from "react";
import { log } from "@/log";

namespace IconButton {
  export type Props = ComponentPropsWithoutRef<"button"> & {
    Icon: IconType;
  };
}
const IconButton = memo(({ children, Icon, ...props }: IconButton.Props) => {
  log("<IconButton /> rendered", 2);

  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;
