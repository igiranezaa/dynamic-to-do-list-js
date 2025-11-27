// Ensure the code runs only after the HTML is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // addTask function
    function addTask() {
        // Retrieve and trim input
        let taskText = taskInput.value.trim();

        // If empty, alert user
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create the li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";

        // Add class using classList.add (REQUIRED)
        removeBtn.classList.add('remove-btn');

        // Remove action
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to li, then li to ul
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
