

const app = document.getElementById('root');


var today = new Date();
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
var date = today.getDate()+' / '+(today.getMonth()+1)+' / '+today.getFullYear(); 


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
  var payload = 'title=' + newTask.value;
  var saveTask = new XMLHttpRequest();
  saveTask.open('POST', 'https://va2020concept.cf/api/v1/tasks', true);
  saveTask.setRequestHeader("Content-Type", "application/json");
  console.log(payload);
  saveTask.send(payload);
  // reload page after adding a new task to show all available tasks
  saveTask.onload = function () {
    window.location.reload(true);
  }
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
      h2.textContent = new Date(task.time_logged * 1000).toISOString().substr(11, 8);
      
      // const stopWatch = document.getElementById('timerContainer');

      const buttonStart = document.createElement('button');
      buttonStart.setAttribute('class', 'startButton');
      buttonStart.setAttribute('id', 'addtaskbtn');
      buttonStart.textContent = `START`;

      const buttonStop = document.createElement('button');
      buttonStop.setAttribute('class', 'stopButton');
      buttonStop.setAttribute('id', 'addtaskbtn');
      buttonStop.textContent = `STOP`;

      const buttonComplete = document.createElement('button');
      buttonComplete.setAttribute('class', 'completeButton');
      buttonComplete.setAttribute('id', 'addtaskbtn');
      buttonComplete.textContent = `COMPLETE`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(h2);
      // card.appendChild(stopWatch);
      card.appendChild(buttonStart);
      card.appendChild(buttonStop);
      card.appendChild(buttonComplete);
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Error`;
    app.appendChild(errorMessage);
  }
}

request.send();




