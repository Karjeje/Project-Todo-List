import AppController from "./appController";

export function renderProjectList() {
    const list = document.querySelector("#project-list");
    list.classList.add("projectlist");
    list.innerHTML = "";
    AppController.getProjects().forEach((project) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const removeBtn = document.createElement("button");
        span.textContent = project.name;
        li.addEventListener("click", () => {
            AppController.setCurrentProject(project.name);
        });
        removeBtn.innerHTML = "X"
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            AppController.removeProject(project.id);
        });
        li.appendChild(span);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });
}

export function renderTodoList() {
  const project = AppController.getCurrentProject();
  const list = document.querySelector("#todo-list");
  list.classList.add("todolist");
  const title = document.querySelector("#project-title");

  if (!project) {
    title.textContent = "No project selected";
    return;
  }

  title.textContent = project.name;
  list.innerHTML = "";

  project.tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.priority === "low") {
        li.classList.add("low");
    }
    else if (task.priority === "normal") {
        li.classList.add("normal");
    }
    else if (task.priority === "high") {
        li.classList.add("high");
    };
    const summary = document.createElement("div");
    summary.classList.add("summary");
    const span = document.createElement("span");
    const removeBtn = document.createElement("button");
    span.textContent = `${task.title}, due ${task.dueDate}`;
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener("click", () => {
        AppController.removeTaskFromCurrentProject(task.id);
    })

    const details = document.createElement("div");
    details.classList.add("details");
    details.style.display = "none";
    details.innerHTML = `
        <div>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
        </div>
        <button class="edit-task">Edit</button>
    `

    summary.addEventListener("click", () => {
        details.style.display = details.style.display === "none" ? "flex" : "none";
    })

    details.querySelector(".edit-task").addEventListener("click", () => {
      const newTitle = prompt("Edit title:", task.title);
      if (newTitle !== null) task.title = newTitle;

      const newDesc = prompt("Edit description:", task.description);
      if (newDesc !== null) task.description = newDesc;

      const newDate = prompt("Edit due date:", task.dueDate);
      if (newDate !== null) task.dueDate = newDate;

      const newPriority = prompt("Edit priority (low, normal, high):", task.priority);
      if (newPriority !== null) task.priority = newPriority;

      const updates = {};
      if (newTitle !== null) updates.title = newTitle;
      if (newDesc !== null) updates.description = newDesc;
      if (newDate !== null) updates.dueDate = newDate;
      if (newPriority !== null) updates.priority = newPriority;

      AppController.updateTask(task.id, updates);
    });

    li.appendChild(summary);
    li.appendChild(details);
    summary.appendChild(span);
    summary.appendChild(removeBtn);
    list.appendChild(li);
  });
}