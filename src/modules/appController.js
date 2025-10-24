const AppController = (() => {
    const projects = [];
    let currentProject = null;

    function addProject(name) {
        const project = new Project(name);
        projects.push(project);
        if (!currentProject) currentProject = project;
        renderProjectList();
    }

    function setCurrentProject(name) {
        currentProject = projects.find(p => p.name === name);
        renderTodoList();
    }

    function getCurrentProject() {
        return currentProject;
    }

    function getProjects() {
    return projects;
  }

    return {addProject, setCurrentProject, getCurrentProject, getProjects}
})()

export default AppController;