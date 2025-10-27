import viteLogo from "/vite.svg";
import CoreConcept from "@/components/CoreConcept";
import Section from "@/components/Section";

function CoreConcepts() {
  return (
    <Section title="Core Concepts" id="core-concepts">
      <ul>
        <CoreConcept
          image={viteLogo}
          title="Components"
          description="The core UI building block."
        />
      </ul>
    </Section>
  );
}

export default CoreConcepts;
