import {baseUrl} from "./baseUrl.js";

document.getElementById("logout").addEventListener("click", function(){
    localStorage.removeItem("loginData");
    alert('Redirecting to HomePage...');
    window.location.href = "index.html";
})


let loginData = localStorage.getItem("loginData");
loginData = JSON.parse(loginData);
if(loginData==null){
    alert("Please Login...");
    window.location.href = "login.html";
}
//console.log(loginData);

document.getElementById("user-name").textContent = `Welcome, ${loginData.name} . .  !`;

let form = document.getElementById("form");
form.addEventListener("submit", function(){
    event.preventDefault();
    let title = form.title.value;
    let deadline = form.deadline.value;
    let priority = form.priority.value;
    let todoObject = {title, deadline, priority, status: false, userId: loginData.id}
    //console.log(todoObject);

    // add to server
    //console.log(baseUrl)
    fetch(`${baseUrl}/todoOfTodoSpace`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(todoObject)
    })
    .then(() => {
        alert("Todo added..!");
        loadData();
        form.reset();
    })
    .catch((err) => {
        alert("somthing went wrong...");
        console.log(err);
    })
})

//get todos

loadData();

async function getTodos() {
    try{
        let res = await fetch(`${baseUrl}/todoOfTodoSpace`);
        let data = await res.json();
        return data
    }
    catch(err){
        console.log(err);
        alert("Something went wrong in getting todo..!")
    }
}

async function loadData() {
    let arr = await getTodos()
    displayTodos(arr);
}

//display todos
function displayTodos(arr) {
    let box = document.getElementById('todo-box');
    box.innerHTML = "";

    arr.map((item, index) => {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let title = document.createElement("h5");
        title.textContent = `Title: ${item.title}`;

        let deadline = document.createElement('h5');
        deadline.textContent = `Deadline: ${item.deadline}`;

        let d = new Date(item.deadline);

        console.log(item.deadline, Date.now() > d)
        if(d < Date.now()){
            card.classList.add("pending")
        }
        let priority = document.createElement('h5');
        priority.textContent = `Priority: ${item.priority}`;

        let status = document.createElement('h5');
        status.textContent = item.status == true ? "Status: Complete" : "Status: Pending";

        let updateStatusBtn = document.createElement('button');
        updateStatusBtn.textContent = `Toggle Status`;
        updateStatusBtn.style.width = '12rem';
        updateStatusBtn.addEventListener('click', () => {
            updateStatusFunc(item, index);
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = `Delete Todo`;
        deleteBtn.style.width = '12rem';
        deleteBtn.style.marginTop = '-2rem';
        deleteBtn.addEventListener('click', () => {
            deleteTodo(item, index);
        })

        card.append(title, priority, deadline, status, updateStatusBtn, deleteBtn);
        box.append(card);
    })
}

function updateStatusFunc(item,index) {
    let updatedTodo = {...item, status: !item.status}
    console.log(updatedTodo, "UPTODO")

    let todoId = item.id;
    
    fetch(`${baseUrl}/todoOfTodoSpace/${todoId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
    })
    .then(() => {
        alert("Todo Updated..!");
        loadData()
    })
    .catch((err) => console.log("Something went wrong in application"))
}

function deleteTodo (item, index) {
    let todoId = item.id;
    
    fetch(`${baseUrl}/todoOfTodoSpace/${todoId}`, {
        method: "DELETE"
    })
    .then(() => {
        if(confirm("Do you want to delete the todo?")){
            loadData();
            alert("Todo Deleted..!");
        }
    })
    .catch((err) => console.log("Something went wrong in application"))
}
