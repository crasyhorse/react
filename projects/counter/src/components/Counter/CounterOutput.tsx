import { log } from "@/log";

namespace CounterOutput {
  export type Props = {
    value: number;
  };
}
export default function CounterOutput({ value }: CounterOutput.Props) {
  log("<CounterOutput /> rendered", 2);

  const cssClass = value >= 0 ? "counter-output" : "counter-output negative";
  return <span className={cssClass}>{value}</span>;
}
