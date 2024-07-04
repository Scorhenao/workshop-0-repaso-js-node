class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks(); // Carga las tareas desde localStorage
        this.renderTasks(); // Renderiza las tareas
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    editTask(id) {
        const task = this.tasks.find(task => task.id === id);
        const description = prompt('Enter new description', task.description);
        try {
            if (description) {
                task.description = description;
                this.saveTasks();
                this.renderTasks();
            }
        } catch (error) {
            console.warn(error); // Corrige el typo de console.warm a console.warn
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
            this.renderTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Convierte cada tarea en una instancia de Task
        return tasks.map(task => new Task(task.id, task.description, task.completed));
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';

            const changeStatus = document.createElement('button');
            changeStatus.textContent = "Change Status";
            changeStatus.className = "changeStatus";
            changeStatus.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTaskComplete(task.id);
            });

            const showCurrentlyStatus = document.createElement('span');
            showCurrentlyStatus.textContent = "Current Status: " + (task.completed ? "Completed" : "Not Completed");
            showCurrentlyStatus.className = "currentlyStatus";

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editTask(task.id);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTask(task.id);
            });

            item.append(deleteButton, editButton, changeStatus, showCurrentlyStatus);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    document.getElementById('add-task').addEventListener('click', () => {
        const newTask = document.getElementById('new-task').value;
        if (newTask) {
            taskManager.addTask(newTask);
            document.getElementById('new-task').value = '';
        }
    });
});
