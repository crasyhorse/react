import { useState } from "react";

import { log } from "@/log";

namespace HistoryItem {
  export type Props = {
    count: number;
  };
}
function HistoryItem({ count }: HistoryItem.Props) {
  log("<HistoryItem /> rendered", 3);

  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected((prevSelected) => !prevSelected);
  }

  return (
    <li onClick={handleClick} className={selected ? "selected" : undefined}>
      {count}
    </li>
  );
}

namespace CounterHistory {
  type History = {
    value: number;
    id: ReturnType<typeof crypto.randomUUID>;
  };

  export type Props = {
    history: History[];
  };
}

export default function CounterHistory({ history }: CounterHistory.Props) {
  log("<CounterHistory /> rendered", 2);

  return (
    <ol>
      {history.map((count) => (
        <HistoryItem key={count.id} count={count.value} />
      ))}
    </ol>
  );
}
