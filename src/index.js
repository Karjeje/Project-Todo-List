import "./styles.css";
import AppController from "./modules/appController";
import {openTaskModal} from "./modules/domController";

document.addEventListener("DOMContentLoaded", () => {
  AppController.loadFromLocalStorage();
  
  if(AppController.getProjects().length === 0) {
    AppController.addProject("Daily");
  }

  const addProjectBtn = document.querySelector("#add-project-btn");
  addProjectBtn.classList.add("addprojectbtn");
  const addTaskBtn = document.querySelector("#add-task-btn");
  addTaskBtn.classList.add("addtaskbtn");

  function addProjectWithBtn() {
      const projectName = prompt("Project Name:");
      AppController.addProject(projectName);
  }

  addProjectBtn.addEventListener("click", addProjectWithBtn);
  
  addTaskBtn.addEventListener("click", () => openTaskModal());

});
