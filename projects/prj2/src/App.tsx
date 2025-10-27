import Header from "@/components/Header";
import "@/App.css";
import Examples from '@/components/Examples';
import CoreConcepts from '@/components/CoreConcepts';
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const frameworks = ["React", "VueJS", "Angular"];
  const getFramework = () => {
    return frameworks[Math.floor(Math.random() * 3)];
  };
  const framework = getFramework();

  return (
    <>
      <h1>Vite + React</h1>
      <Header />
      <main className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <CoreConcepts />
        <Examples />
      </main>
      <p className="read-the-docs">
        Click on the Vite and {framework} logos to learn more
      </p>
    </>
  );
}

export default App;
