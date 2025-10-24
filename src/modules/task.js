export default class Task {
    constructor(title, description, dueDate, priority = "normal") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
}