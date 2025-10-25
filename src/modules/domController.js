import AppController from "./appController";

export function renderProjectList() {
    const list = document.querySelector("#project-list");
    list.classList.add("projectlist");
    list.innerHTML = "";
    AppController.getProjects().forEach(project => {
        const li = document.createElement("li");
        li.textContent = project.name;
        li.addEventListener("click", () => {
            AppController.setCurrentProject(project.name);
        });
        list.appendChild(li);
    });
}

export function renderTodoList() {
  const project = AppController.getCurrentProject();
  const list = document.querySelector("#todo-list");
  list.classList.add("todolist");
  const title = document.querySelector("#project-title");
  
  title.textContent = project.name;
  list.innerHTML = "";

  project.tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    list.appendChild(li);
  });
}