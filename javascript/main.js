




const app = document.getElementById('root');

// const logo = document.createElement('img');
// logo.setAttribute("src", "images/logo.png")


var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 

document.getElementById("currentDate").innerHTML = date;


const inputTask = document.createElement('input');
inputTask.setAttribute("type", "text");
inputTask.setAttribute("placeholder", "Add new task");

const buttonAddTask = document.createElement('button');
buttonAddTask.setAttribute('class', 'addButton');
buttonAddTask.setAttribute('id', 'addtaskbtn');
buttonAddTask.textContent = `+`;
buttonAddTask.setAttribute('onClick', 'addTask();');

    function addTask() {
      var newTask = document.querySelector("input");
      // var taskTitle = document.createTextNode(newTask.value);
      var taskTitle = newTask.value;

      var saveTask = new XMLHttpRequest();
      saveTask.open('POST', 'https://va2020concept.cf/api/v1/tasks', true);
      saveTask.setRequestHeader("Content-Type", "application/json");
      console.log(taskTitle);
      var data = JSON.stringify({"title": taskTitle});
      saveTask.send(data);
        
      }

const container = document.createElement('div');
container.setAttribute('class', 'container');



app.appendChild(inputTask);
app.appendChild(buttonAddTask);
app.appendChild(container);
// app.appendChild(logo);




var request = new XMLHttpRequest();
request.open('GET', 'https://va2020concept.cf/api/v1/tasks', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(task => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = task.title;

      const h2 = document.createElement('h2');
      h2.setAttribute('class', 'dispalywatch')
      h2.textContent = `00:00:00`;

      const p = document.createElement('p');
      p.textContent = task.time_logged;



      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(h2);
      card.appendChild(p);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Error`;
    app.appendChild(errorMessage);
  }
}

request.send();




