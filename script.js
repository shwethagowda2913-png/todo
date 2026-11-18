

// SELECT HTML ELEMENTS
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

const totalCount = document.querySelector("#totalCount");
const completedCount = document.querySelector("#completedCount");
//STORE TASKS
let tasks = [];

//ADD TASK (CREATE)

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

//Create task object
    const newTask = {
        text: taskText,
        completed: false
    };

// Add task to array
    tasks.push(newTask);

// Display updated tasks
    displayTasks();

// Clear input field
    taskInput.value = "";
}

//  DISPLAY TASKS (READ)


function displayTasks() {

    // Clear previous list
    taskList.innerHTML = "";

    // Loop through all tasks
    tasks.forEach(function(task, index) {

        // Create list item
        const li = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");

        if (task.completed) {
            taskText.classList.add("completed");
        }

        // Checkbox event
        checkbox.addEventListener("change", function() {
            tasks[index].completed = checkbox.checked;
            displayTasks();
        });

        // Create Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", function() {
            editTask(index);
        });

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {
            deleteTask(index);
        });

        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        // Add list item to webpage
        taskList.appendChild(li);

    });

    // Update task counters
    updateCounters();
}

//EDIT TASK (UPDATE)


function editTask(index) {

    const updatedTask = prompt(
        "Edit your task:",
        tasks[index].text
    );

    if (updatedTask === null) {
        return;
    }
    if (updatedTask.trim() === "") {
        alert("Task cannot be empty.");
        return;
    }

    // Update task
    tasks[index].text = updatedTask.trim();

    // Refresh task list
    displayTasks();
}

// DELETE TASK (DELETE)
function deleteTask(index) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
        // Remove task from array
        tasks.splice(index, 1);
        // Refresh task list
        displayTasks();
    }
}

//UPDATE TASK COUNTERS

function updateCounters() {
    // Total number of tasks
    totalCount.textContent = tasks.length;

    // Count completed tasks
    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;
    completedCount.textContent = completed;
}

//ADD BUTTON EVENT

addBtn.addEventListener("click", addTask);
