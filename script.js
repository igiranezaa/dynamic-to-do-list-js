// Run all code only after the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // =========================
    // Select DOM Elements
    // =========================
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList  = document.getElementById('task-list');

    // =========================
    // Helper: Create <li> with remove button
    // =========================
    function createTaskElement(taskText) {
        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create "Remove" button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When the remove button is clicked, remove the task from DOM and Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Remove this task from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskText);
            if (index > -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Attach button to list item, then list item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // =========================
    // Add Task Function
    // =========================
    /**
     * addTask
     * @param {string} taskText - Optional text for the task
     * @param {boolean} save - Whether to save to Local Storage (default: true)
     *
     * If taskText is not provided, it will use the value from the input field.
     */
    function addTask(taskText = taskInput.value, save = true) {
        // Get and trim the task text
        let text = taskText.trim();

        // If empty, alert user
        if (text === '') {
            alert('Please enter a task');
            return;
        }

        // Create task element in the DOM
        createTaskElement(text);

        // Save to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
    }

    // =========================
    // Load Tasks From Local Storage
    // =========================
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            // Pass false so we don't save again while loading
            addTask(taskText, false);
        });
    }

    // =========================
    // Attach Event Listeners
    // =========================

    // Click on "Add Task" button
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Press "Enter" key in input field
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // =========================
    // Initial Load on DOMContentLoaded
    // =========================
    loadTasks();
});
