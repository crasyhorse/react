import Sidebar from "@/components/Sidebar";
import NoProjectSelected from "@/components/NoProjectSelected";
import NewProject from "@/components/NewProject";
import SelectedProject from "@/components/SelectedProject";
import { useState, type MouseEventHandler } from "react";
import { ProjectActions } from "@/types/ProjectActions";
import type { Project } from "@/types/";

interface ProjectState {
  selectedProjectId: Project["id"] | null;
  projects: Project[];
}
function App() {
  const [projectAction, setProjectAction] = useState(ProjectActions.nothing);
  const [projectState, setProjectState] = useState({
    selectedProjectId: null,
    projects: [],
  } as ProjectState);

  const handleAddProject: MouseEventHandler<HTMLButtonElement> = () => {
    setProjectAction(ProjectActions.adding);
  };

  const handleDeleteProject = () => {
    setProjectAction(ProjectActions.selecting);
    setProjectState((oldProjectState) => {
      return {
        ...oldProjectState,
        selectedProjectId: null,
        projects: oldProjectState.projects.filter(
          (project) => project.id !== oldProjectState.selectedProjectId
        ),
      };
    });
  };

  const handleSaveProject = (projectData: Omit<Project, "id">) => {
    setProjectAction(ProjectActions.nothing);
    setProjectState((oldProjectState) => {
      const newProject: Project = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...oldProjectState,
        projects: [...oldProjectState.projects, newProject],
      };
    });
  };

  const handleCancel = () => {
    setProjectAction(ProjectActions.nothing);
    setProjectState((oldProjectState) => {
      return {
        ...oldProjectState,
        selectedProjectId: null,
      };
    });
  };

  const handleSelectProject = (id: Project["id"]) => {
    setProjectAction(ProjectActions.selecting);
    setProjectState((oldProjectState) => {
      return {
        ...oldProjectState,
        selectedProjectId: id,
      };
    });
  };

  const selectedProject: Project | null =
    projectState.selectedProjectId !== null
      ? projectState.projects.find(
          (project) => project.id === projectState.selectedProjectId
        ) ?? null
      : null;

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onAddProject={handleAddProject}
        action={projectAction}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProject={selectedProject}
      />
      {projectAction === ProjectActions.nothing && (
        <NoProjectSelected onAddProject={handleAddProject} />
      )}
      {projectAction === ProjectActions.adding && (
        <NewProject onAddProject={handleSaveProject} onCancel={handleCancel} />
      )}
      {projectAction === ProjectActions.selecting &&
        selectedProject !== null && (
          <SelectedProject
            project={selectedProject}
            onDelete={handleDeleteProject}
          />
        )}
    </main>
  );
}

export default App;
