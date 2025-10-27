import TabButton from "@/components/TabButton";
import Section from "@/components/Section";
import Tabs from "@/components/Tabs";
import { useState } from "react";

interface Example {
  title: "components" | "jsx" | "props" | "state";
  description: string;
  code: string;
}

interface Examples {
  [key: string]: Example;
  components: Example;
  jsx: Example;
  props: Example;
  state: Example;
}

const EXAMPLES: Examples = {
  components: {
    title: "components",
    description: "Bla Bla Bla",
    code: `function Welcome(){return <h1>Hello, World!</h1>;}`,
  },
  jsx: {
    title: "jsx",
    description: "Bla Bla Bla",
    code: `<div><h1>Welcome {userName}</div><p>Time to learn REACT!</p>`,
  },
  props: {
    title: "props",
    description: "Bla Bla Bla",
    code: `function Welcome({name}){return <h1>Hello {name}</h1>;}`,
  },
  state: {
    title: "state",
    description: "Bla Bla Bla",
    code: `function setCounter(counter){setCount(counter)}`,
  },
};

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState<string>("components");

  let tabContent = <p>Please select a topic.</p>;
  let menu = [...Object.values(EXAMPLES)].map((item) => {
    return (
      <TabButton
        isActive={selectedTopic === item.title}
        onClick={() => handleSelect(item.title)}
        key={item.title}
      >
        {item.title}
      </TabButton>
    );
  });

  if (selectedTopic) {
    tabContent = (
      <div id="tabContent">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  const handleSelect = (
    selectedButton: "components" | "jsx" | "props" | "state"
  ) => {
    setSelectedTopic(selectedButton);
  };

  return (
    <Section title="Examples" id="Examples">
      <Tabs Container="menu" tabButtons={menu}>
        {tabContent}
      </Tabs>
    </Section>
  );
}

export default Examples;
