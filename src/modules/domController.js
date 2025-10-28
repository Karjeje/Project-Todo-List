import AppController from "./appController";
import { format, parseISO, isPast, differenceInDays } from "date-fns";

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
    title.textContent = "No project selected.";
    return;
  }

  title.textContent = project.name;
  list.innerHTML = "";

  project.tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.priority.toLowerCase() === "low") {
        li.classList.add("low");
    }
    else if (task.priority.toLowerCase() === "normal") {
        li.classList.add("normal");
    }
    else if (task.priority.toLowerCase() === "high") {
        li.classList.add("high");
    };
    const summary = document.createElement("div");
    summary.classList.add("summary");
    const span = document.createElement("span");
    const removeBtn = document.createElement("button");
    const formattedDate = format(parseISO(task.dueDate), "EEE, MMM d yyyy, HH:mm");
    if (isPast(parseISO(task.dueDate))) {
        li.classList.add("overdue")
    };
    span.textContent = `${task.title} (due ${formattedDate})`;
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

    details.querySelector(".edit-task").addEventListener("click", () => openTaskModal(task));

    li.appendChild(summary);
    li.appendChild(details);
    summary.appendChild(span);
    summary.appendChild(removeBtn);
    list.appendChild(li);
  });
}

const modal = document.querySelector("#task-modal");
const form = document.querySelector("#task-form");
const cancelBtn = document.querySelector("#cancel-btn");

function openTaskModal(task = null) {
    modal.classList.remove("hidden");

    if (task) {
        form.dataset.taskId = task.id;
        form.querySelector("#task-title").value = task.title;
        form.querySelector("#task-desc").value = task.description;
        form.querySelector("#task-date").value = task.dueDate;
        form.querySelector("#task-priority").value = task.priority;
    }
    else {
        form.reset();
        delete form.dataset.taskId;
    }

    form.querySelector("#task-title").focus();
}

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.querySelector("#task-title").value;
    const description = form.querySelector("#task-desc").value;
    const dueDate = form.querySelector("#task-date").value;
    const priority = form.querySelector("#task-priority").value;

    if (form.dataset.taskId) {
        AppController.updateTask(form.dataset.taskId, { title, description, dueDate, priority });
    }
    else {
        AppController.addTaskToCurrentProject({ title, description, dueDate, priority })
    }

    modal.classList.add("hidden");
    form.reset();
})

export {openTaskModal};