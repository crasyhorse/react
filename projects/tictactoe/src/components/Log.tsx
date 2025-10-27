import type { LogData } from "@/types";

type PropData = {
  turns: LogData[];
}

const Log = ({ turns }: PropData) => {
  const log = turns.map((turn) => {
    return (
      <li key={`${turn.square.rowIndex}/${turn.square.colIndex}`}>
        {turn.player} selected {turn.square.rowIndex}/{turn.square.colIndex}
      </li>
    );
  });
  return <ol id="log">{log}</ol>;
};

export default Log;
