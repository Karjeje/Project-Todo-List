import "./styles.css";
import AppController from "./modules/appController";

document.addEventListener("DOMContentLoaded", () => {
  AppController.addProject("Daily");

  const addProjectBtn = document.querySelector("#add-project-btn");

  function addProjectWithBtn() {
      console.log("abo")
      const projectName = prompt("Project Name:");
      AppController.addProject(projectName);
  }

  addProjectBtn.addEventListener("click", addProjectWithBtn);
});



AppController.addProject("Work");
AppController.addProject("Gym");
