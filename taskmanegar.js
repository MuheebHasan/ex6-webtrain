class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleStatus() {
        this.completed = !this.completed;
    }

    toString() {
        const status = this.completed ? "Completed" : "Pending";
        return `ID: ${this.id} | Description: ${this.description} | Status: ${status}`;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(description) {
        const id = this.tasks.length + 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        console.log("Task added successfully!");
        this.viewTasks();
    }

    viewTasks() {
        console.clear(); // Clear the console for better readability
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
        } else {
            console.log("Current Tasks:");
            this.tasks.forEach(task => {
                console.log(task.toString());
            });
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleStatus();
            console.log(`Task ID ${id} status updated.`);
            this.viewTasks();
        } else {
            console.log(`Task ID ${id} not found.`);
        }
    }

    removeTask(id) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== id);
        if (this.tasks.length < initialLength) {
            console.log(`Task ID ${id} removed successfully.`);
            this.viewTasks();
        } else {
            console.log(`Task ID ${id} not found.`);
        }
    }

    updateTask(id, newDescription) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.description = newDescription;
            console.log(`Task ID ${id} updated successfully.`);
            this.viewTasks();
        } else {
            console.log(`Task ID ${id} not found.`);
        }
    }

    searchTask(searchTerm) {
        const results = this.tasks.filter(task => 
            task.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (results.length > 0) {
            console.log("Search Results:");
            results.forEach(task => {
                console.log(task.toString());
            });
        } else {
            console.log("No matching tasks found.");
        }
    }
}

const manager = new TaskManager();

// Function to start the task manager
function startTaskManager() {
    const options = `
Choose an option:
1. Add Task
2. View Tasks
3. Toggle Task Status
4. Remove Task
5. Update Task
6. Search Tasks
7. Exit
`;
    let choice;
    do {
        choice = window.prompt(options);
        handleChoice(choice);
    } while (choice !== "7");
    console.log("Exiting Task Manager...");
}

function handleChoice(choice) {
    switch (choice) {
        case "1":
            const description = window.prompt("Enter task description: ");
            if (description) {
                manager.addTask(description);
            } else {
                console.log("Description cannot be empty.");
            }
            break;
        case "2":
            manager.viewTasks();
            break;
        case "3":
            const toggleId = parseInt(window.prompt("Enter task ID to toggle: "));
            if (!isNaN(toggleId)) {
                manager.toggleTask(toggleId);
            } else {
                console.log("Invalid ID.");
            }
            break;
        case "4":
            const removeId = parseInt(window.prompt("Enter task ID to remove: "));
            if (!isNaN(removeId)) {
                manager.removeTask(removeId);
            } else {
                console.log("Invalid ID.");
            }
            break;
        case "5":
            const updateId = parseInt(window.prompt("Enter task ID to update: "));
            const newDescription = window.prompt("Enter new description: ");
            if (!isNaN(updateId) && newDescription) {
                manager.updateTask(updateId, newDescription);
            } else {
                console.log("Invalid ID or empty description.");
            }
            break;
        case "6":
            const searchTerm = window.prompt("Enter search term: ");
            manager.searchTask(searchTerm);
            break;
        case "7":
            console.log("Exiting...");
            break;
        default:
            console.log("Invalid option. Please try again.");
    }
}

// Start the task manager when the script is loaded
startTaskManager();
