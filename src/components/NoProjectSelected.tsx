import noProjectSelectedImage from "@/assets/no-projects.png";
import Button from "@/components/Button";
import type { MouseEventHandler } from "react";

type PropData = {
  onAddProject: MouseEventHandler<HTMLButtonElement>;
}

const NoProjectSelected = ({ onAddProject }: PropData) => {
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        className="w-16 h-16 object-contain mx-auto"
        src={noProjectSelectedImage}
        alt="An empty task list"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">
        No project selected
      </h2>
      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onAddProject={onAddProject}>Create new project</Button>
      </p>
    </div>
  );
};

export default NoProjectSelected;
