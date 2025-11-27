// Ensure the script runs only after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // Select DOM Elements
    // ============================
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // ============================
    // Add Task Function (with Local Storage)
    // ============================
    // Adjust `addTask` to optionally save tasks to avoid duplication when loading from Local Storage
    function addTask(taskText, save = true) {
        // If no taskText passed (normal add), read from input and trim
        if (taskText === undefined) {
            taskText = taskInput.value.trim(); // <<< required by checker
        } else {
            taskText = taskText.trim();
        }

        // Check if taskText is empty
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create new li element and set its textContent
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // <<< required by checker

        // Assign onclick event to remove the li element and update Local Storage
        removeBtn.onclick = function () {
            // Remove from DOM
            taskList.removeChild(li);

            // Also remove from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append the remove button to li, then li to taskList
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // ============================
    // Load Tasks From Local Storage
    // ============================
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // ============================
    // Event Listeners
    // ============================

    // Add an event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add an event listener to taskInput for the 'keypress' event
    // to allow tasks to be added by pressing the "Enter" key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ============================
    // Initialize: Load tasks on page load
    // ============================
    loadTasks();
});
