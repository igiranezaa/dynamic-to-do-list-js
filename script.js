// Ensure the script runs only after the entire page has fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // Select DOM Elements
    // ============================
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // ============================
    // addTask Function
    // ============================
    function addTask() {
        // Retrieve and trim text
        let taskText = taskInput.value.trim();

        // Check if empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove button action
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button then append li to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // ============================
    // EVENT LISTENERS
    // ============================

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
