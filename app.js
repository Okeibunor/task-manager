//create variable for button used to create new tasks
let newTaskButton = document.querySelector('#newTaskButton')
//create variable for list group containing all tasks
let listGroup = document.querySelector('ul')

//event listener for click on newTaskButton
newTaskButton.addEventListener('click',addTaskToList);
//event listener for hitting enter on the keyboard
document.querySelector('.form-control').addEventListener("keyup",function(e){
  if (e.keyCode === 13){
    addTaskToList();
  }
  e.preventDefault();
});

//function for creating new tasks from input value and adding it to listgroup
function addTaskToList(){
  if(document.querySelector('.form-control').value != ''){
    let taskInput = document.querySelector('.form-control').value;

    let newTask = document.createElement('li');

    let newCloseButton = document.createElement('a');
    newCloseButton.href = '#';
    newCloseButton.style ='float:right';
    newCloseButton.innerHTML='&times';
    newCloseButton.className='closeButton'

    newTask.className = "list-group-item";

    newTask.appendChild(document.createTextNode(taskInput));

    newTask.appendChild(newCloseButton);

    listGroup.appendChild(newTask);

    document.querySelector('.form-control').value = '';

    //persist tasks to local storage
    
    let tasks;

    if(window.localStorage.getItem('tasks') === null){
      //create new array for tasks
      tasks = [];
    }
    else{
      tasks =  JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taskInput);

    localStorage.setItem('tasks',JSON.stringify(tasks));

  }
  else{
    alert('Enter a new task!');
  }
}
//event listener for deleting a list using event delegation
document.addEventListener('click',function(e){
  if(e.target.className==='closeButton'){
    if(confirm("Are you sure?")){
      
    //deleting task from local storage
    let task = e.target.parentElement.firstChild.textContent;
    let taskArray = JSON.parse(localStorage.getItem('tasks'));
    let position = taskArray.indexOf(task);
    taskArray.splice(position,1);
    localStorage.clear()
    localStorage.setItem('tasks',JSON.stringify(taskArray));
    //remove from list
    e.target.parentElement.remove();
    }
  }
  e.preventDefault();
});

//implementing the clear tasks button
clearButton = document.querySelector("#clearButton");

clearButton.addEventListener('click', clear);

function clear(){
  if(confirm('Are you sure')){
  while(document.querySelector('.list-group').firstChild){
    document.querySelector('.list-group').removeChild(document.querySelector('.list-group').firstChild);
  }
  localStorage.clear();
  }
}
//fetching tasks from local storage
  if (localStorage.getItem('tasks') != null){
   let storedTasks = JSON.parse(localStorage.getItem('tasks'));
   storedTasks.forEach(element => {
    let newTask = document.createElement('li');
    let newCloseButton = document.createElement('a');
    newCloseButton.href = '#';
    newCloseButton.style ='float:right';
    newCloseButton.innerHTML='&times';
    newCloseButton.className='closeButton';

    newTask.className = "list-group-item";

    newTask.appendChild(document.createTextNode(element));

    newTask.appendChild(newCloseButton);

    listGroup.appendChild(newTask);
   });
  }
 /* JSON.parse(localStorage.getItem('tasks')).indexOf();
  (document.querySelector('.list-group-item').firstChild.textContent) == (JSON.parse(localStorage.getItem('tasks')))[0]
*/