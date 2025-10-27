import Button from "@/components/Button";
import { ProjectActions } from "@/types/ProjectActions";
import type { MouseEventHandler } from "react";
import type { Project } from "@/types";

interface PropData {
  onAddProject: MouseEventHandler<HTMLButtonElement>;
  onSelectProject: (id: Project["id"]) => void;
  action: ProjectActions;
  projects: Project[];
  selectedProject: Project | null;
}
const Sidebar = ({
  onAddProject,
  onSelectProject,
  action,
  projects,
  selectedProject,
}: PropData) => {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your projects
      </h2>
      <div>
        <Button
          disabled={action === ProjectActions.adding}
          onAddProject={onAddProject}
        >
          + Add project
        </Button>
      </div>
      <ul className="mt-8">
        {projects.map((project) => {
          let CssClasses =
            "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

          if (project.id === selectedProject?.id) {
            CssClasses += " bg-stone-800 text-stone-200";
          } else {
            CssClasses += " text-stone-400";
          }
          return (
            <li key={project.id}>
              <button
                onClick={() => onSelectProject(project.id)}
                className={CssClasses}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
