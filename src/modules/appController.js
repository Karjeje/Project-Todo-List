import Project from "./project";
import Task from "./task";
import { renderProjectList, renderTodoList } from "./domController";

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

    function addTaskToCurrentProject({ title, description, dueDate, priority}) {
        const task = new Task(title, description, dueDate, priority);
        currentProject.addTask(task);
        renderTodoList();
    }

    return { addProject, setCurrentProject, getCurrentProject, getProjects, addTaskToCurrentProject }
})()

export default AppController;