//first task to catch or bring necessary tag by id or class

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');


let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task')

//define event listeners
form.addEventListener('submit', addTask);

taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('keyup', filterTask);

document.addEventListener('DOMContentLoaded', getTasks)






//define function
//add task
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '') {
        alert('Add a task please')
    } else {
        //create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        link.style.color = 'red';
        li.appendChild(link)
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);


        taskInput.value = '';

    }


}

//remove task
function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let ele = e.target.parentElement;
            ele.remove(); ////problem identified taskLit.removeChild(li)
            removeFromLS(ele)
        }

    }
}

//remove or clear clearAll
function clearAll(e) {
    // taskList.innerHTML = "";

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
    localStorage.clear();
}

///filter task
function filterTask(e) {
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none'
        }
    })

}

//store in local storage

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));


}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        link.style.color = 'red'
        li.appendChild(link)
        taskList.appendChild(li);
    });
}

function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        task = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

}