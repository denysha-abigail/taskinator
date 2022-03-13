var taskIdCounter = 0;

// DOM object reference
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

// Create a task function
var taskFormHandler = function(event){
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

// Check if input values are empty strings
if(!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
}

formEl.reset();

// Package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

// Send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

// Create new task HTML element
var createTaskEl = function(taskDataObj) {
// Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

// Add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

// Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
// Give it a class name
    taskInfoEl.className = "task-info";
// Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

// Add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

// Increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

// Create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

// Create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

// Create dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

// Add option elements
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        // Create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // Append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
}

// Event listener function
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    // Get target element from even
    var targetEl = event.target;

    // Edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    if (event.target.matches(".delete-btn")) {
        // Get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {
    console.log("editing task #" + taskId);

    // Get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // Get content form task name and type
    // taskSelected.querySelector only searches within the taskSelected element; this will help to narrow search
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // Make task name and type to appear in the form inputs
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // Update text of submit button to say "Save Task"
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
    
}

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);


