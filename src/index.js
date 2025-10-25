import "./styles.css";
import AppController from "./modules/appController";

document.addEventListener("DOMContentLoaded", () => {
  AppController.addProject("Daily");

  const addProjectBtn = document.querySelector("#add-project-btn");
  addProjectBtn.classList.add("addprojectbtn");
  const addTaskBtn = document.querySelector("#add-task-btn");
  addTaskBtn.classList.add("addtaskbtn");

  function addProjectWithBtn() {
      const projectName = prompt("Project Name:");
      AppController.addProject(projectName);
  }

  function addTaskWithBtn() {
    const title = prompt("Task Name:");
    if (title === null) return;
    const description = prompt("Description:");
    if (description === null) return;
    const dueDate = prompt("Due Date (YYYY-MM-DD):");
    if (dueDate === null) return;
    const priority = prompt("Priority (low, normal, high):");
    if (priority === null) return;
    AppController.addTaskToCurrentProject({ title, description, dueDate, priority });
  }

  addProjectBtn.addEventListener("click", addProjectWithBtn);
  addTaskBtn.addEventListener("click", addTaskWithBtn);

});



AppController.addProject("Work");
AppController.addProject("Gym");
