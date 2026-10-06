let tasks = []

const taskTitle = document.getElementById("taskTitle")
const taskDescription = document.getElementById("taskDescription")
const taskForm = document.getElementById("taskForm")
const editStatus = document.getElementById("editStatus")
const tableBody = document.getElementById("tableBody")

if (sessionStorage.getItem("tasks")) {
    tasks = JSON.parse(sessionStorage.getItem("tasks"))
    displayTaskList()
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const titleInput = taskTitle.value
    const descInput = taskDescription.value

    if (titleInput && descInput) {
        const editIndex = editStatus.value

        if (editIndex == "") {
            tasks.push({
                title: titleInput,
                description: descInput,
                status: "Pending"
            })
        } else {
            tasks[editIndex].title = titleInput
            tasks[editIndex].description = descInput
        }

        sessionStorage.setItem("tasks", JSON.stringify(tasks))
        taskForm.reset()
        editStatus.value = ""
        displayTaskList()

    } else {
        alert("Please fill the form completely")
    }
})

function displayTaskList() {
    tableBody.innerHTML = ""
    tasks.forEach((item, index) => {
        tableBody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.title}</td>
            <td>${item.description}</td>
            <td>
                <button onclick="toggleStatus(${index})" class="btn ${item.status == 'Completed' ? 'btn-success' : 'btn-secondary'} btn-sm">
                    ${item.status}
                </button>
            </td>
            <td>
                <button onclick="editTask(${index})" class="btn btn-warning">Edit</button>
                <button onclick="deleteTask(${index})" class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    })
}

function editTask(taskIndex) {
    const taskDetails = tasks[taskIndex]

    taskTitle.value = taskDetails.title
    taskDescription.value = taskDetails.description
    editStatus.value = taskIndex
}

function deleteTask(taskIndex) {
    if (confirm("Are you sure, you want to delete the data")) {
        tasks.splice(taskIndex, 1)
        sessionStorage.setItem("tasks", JSON.stringify(tasks))
        displayTaskList()
    }
}

function toggleStatus(taskIndex) {
    if (tasks[taskIndex].status == "Pending") {
        tasks[taskIndex].status = "Completed"
    } else {
        tasks[taskIndex].status = "Pending"
    }
    sessionStorage.setItem("tasks", JSON.stringify(tasks))
    displayTaskList()
}