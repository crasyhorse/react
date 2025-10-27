import Sidebar from "@/components/Sidebar";
import NoProjectSelected from "@/components/NoProjectSelected";
import NewProject from "@/components/NewProject";
import SelectedProject from "@/components/SelectedProject";
import { useState, type ReactEventHandler } from "react";
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

  const handleAddProject: ReactEventHandler = (
    projectData: Project | undefined
  ) => {
    if (projectAction === ProjectActions.nothing) {
      setProjectAction(ProjectActions.adding);
    } else {
      setProjectAction(ProjectActions.nothing);
      if (projectData) {
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
      }
    }
  };

  const handleCancle: ReactEventHandler = () => {
    setProjectAction(ProjectActions.nothing);
    setProjectState((oldProjectState) => {
      return {
        ...oldProjectState,
        selectedProjectId: null,
        projects: [...oldProjectState.projects],
      };
    });
  };

  const handleSelectProject: ReactEventHandler = (id: Project["id"]) => {
    setProjectAction(ProjectActions.selecting);
    setProjectState((oldProjectState) => {
      return {
        ...oldProjectState,
        selectedProjectId: id,
        projects: [...oldProjectState.projects],
      };
    });
  };

  let selectedProject = null;
  if (projectState.projects && projectState.selectedProjectId) {
    selectedProject = projectState.projects.find(
      (project) => project.id === projectState.selectedProjectId
    );
  }
  console.log(projectState);
  console.log(selectedProject);
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
        <NewProject onAddProject={handleAddProject} onCancle={handleCancle} />
      )}
      {projectAction === ProjectActions.selecting && (
        <SelectedProject project={selectedProject} />
      )}
    </main>
  );
}

export default App;
