import Project from "./project";
import Task from "./task";
import { renderProjectList, renderTodoList } from "./domController";

const AppController = (() => {
    const projects = [];
    let currentProject = null;

    function saveToLocalStorage() {
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("currentProject", currentProject ? currentProject.name : null);
    }

    function loadFromLocalStorage() {
        const projectsData = JSON.parse(localStorage.getItem("projects"));
        const currentProjectName = localStorage.getItem("currentProject");

        if (!projectsData) return;

        projectsData.forEach(projectData => {
            const project = new Project(projectData.name);
            projectData.tasks.forEach(taskData => {
                const task = new Task(taskData.title, taskData.description, taskData.dueDate, taskData.priority);
                project.addTask(task)
            });
            projects.push(project);
        });

        if(currentProjectName) {
            currentProject = projects.find(p => p.name === currentProjectName) || projects[0] || null;
        }
        else {
            currentProject = projects[0] || null;
        }

        renderProjectList();
        renderTodoList();
    }

    function addProject(name) {
        const project = new Project(name);
        projects.push(project);
        if (!currentProject) currentProject = project;
        renderProjectList();
        saveToLocalStorage();
    }

    function setCurrentProject(name) {
        currentProject = projects.find(p => p.name === name);
        renderTodoList();
        saveToLocalStorage();
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
        saveToLocalStorage();
    }

    function removeTaskFromCurrentProject(taskIndex) {
        const project = currentProject;
        project.tasks.splice(taskIndex, 1);
        renderTodoList();
        saveToLocalStorage();
    }

    function removeProject(projectIndex) {
        projects.splice(projectIndex, 1);

        if (!projects.includes(currentProject)) {
            currentProject = projects[0] || null;
        }
        renderProjectList();
        renderTodoList();
        saveToLocalStorage();
    }

    return { addProject, setCurrentProject, getCurrentProject, getProjects, addTaskToCurrentProject, removeTaskFromCurrentProject, removeProject, loadFromLocalStorage }
})()

export default AppController;