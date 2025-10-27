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

        if (!name || name.trim() === "") {
            alert("Project names cannot be empty.")
            return;
        }

        const existing = projects.find (p => p.name.toLowerCase() === name.toLowerCase());
        if (existing) {
            alert("Project name already exists.");
            return;
        }

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

        if (!currentProject) {
            alert("Select a project.");
            return;
        }

        if (!title || title.trim() === "") {
            alert("Task names cannot be empty.");
            return;
        }

        if (!dueDate || isNaN(Date.parse(dueDate))) {
            alert("Invalid date format. Use YYYY-MM-DD.");
            return;
        }

        const allowedPriorities = ["low", "normal", "high"];
        if (!allowedPriorities.includes(priority.toLowerCase()))  {
            alert("Priority must be: low, normal, or high.");
            return;
        }

        const task = new Task(title, description, dueDate, priority);
        currentProject.addTask(task);
        renderTodoList();
        saveToLocalStorage();
    }

    function removeTaskFromCurrentProject(taskId) {
        if (!currentProject) return;
        const idx = currentProject.tasks.findIndex(t => t.id === taskId);
        if (idx === -1) return;
        currentProject.tasks.splice(idx, 1);
        renderTodoList();
        saveToLocalStorage();
    }

    function updateTask(taskId, updates) {
        if (!currentProject) return;
        const task = currentProject.tasks.find(t => t.id === taskId);
        if (!task) return;
        Object.assign(task, updates)
        renderTodoList();
        saveToLocalStorage();
    }

    function removeProject(projectId) {
        const idx = projects.findIndex(p => p.id === projectId);
        if (idx === -1) return;
        projects.splice(idx, 1);

        if (!projects.includes(currentProject)) {
            currentProject = projects[0] || null;
        }
        renderProjectList();
        renderTodoList();
        saveToLocalStorage();
    }

    return { addProject, setCurrentProject, getCurrentProject, getProjects, addTaskToCurrentProject, removeTaskFromCurrentProject, removeProject, loadFromLocalStorage, updateTask }
})()

export default AppController;