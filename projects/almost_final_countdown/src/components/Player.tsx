import { useRef, useState } from "react";
import type { MouseEventHandler } from "react";

export default function Player() {
  const [value, setValue] = useState("");
  const playerName = useRef<HTMLInputElement>(null);

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (playerName.current) {
      setValue(playerName.current.value);
      playerName.current.value = "";
    }
  };

  return (
    <section id="player">
      <h2>Welcome {value ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
