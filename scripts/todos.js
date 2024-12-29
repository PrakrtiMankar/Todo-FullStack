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
    let todoObject = {title, deadline, priority, status: false}
    console.log(todoObject);

    // add to server
    console.log(baseUrl)
})