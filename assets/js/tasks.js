//Task

//Nodes
const containerTask = document.querySelector('.container_task_items');
const addTaskBtn = document.querySelector('.container_task_add');
const closeModalBtn = document.querySelector('.closeModal');
//Node task
const modalTask = document.querySelector('.modalcontainer');
const addTask = document.querySelector('.addNewTask');
const taskName = document.querySelector('#taskName');
const imputEmpty = document.querySelector('.taskEmpty');

//Node delete all task
const btnCancelDelteTasks = document.querySelector('.cancelTask');
const modalDeleteTasks = document.querySelector('div.modalcontainer.tasks');
const btnClearTasks = document.querySelector('.deleteAllTasks');
const btnDeleteTasks = document.querySelector('.deleteTasks');
const btnTaskReady = document.querySelector('.taskreadyBtn');
//Show modal
addTaskBtn.addEventListener('click',function(){
    modalTask.classList.remove('noDisplay');
    //reset input
    taskName.value='';
});

//Hide modal
closeModalBtn.addEventListener('click',function(){
    modalTask.classList.add('noDisplay');
    //remove the error of empty input
    imputEmpty.classList.add('noDisplay');
});

//Add new task
addTask.addEventListener('click',addNewTask);

function addNewTask(){
    if(!(taskName.value == "")){
        //create task
        const divContainer = document.createElement('div');
        divContainer.classList.add('task');
        const  btnTask = document.createElement('button');
        btnTask.classList.add('buttonStyle','taskreadyBtn');
        const icon = document.createElement('i');
        icon.classList.add("fa","fa-solid","fa-check");
        const iconDeleteTask = document.createElement('i');
        iconDeleteTask.classList.add('fa','fa-solid','fa-trash','trashTask');
        
        
        btnTask.appendChild(icon);
        divContainer.appendChild(btnTask);
        containerTask.appendChild(divContainer);
        //Add funciton to mark as ready
        btnTask.addEventListener('click',function(){
            taskReady(divContainer);
        })
        divContainer.append(taskName.value, iconDeleteTask);

        //Add function to delete a task
        iconDeleteTask.addEventListener('click',function(){
            deleteTasks(divContainer);
        })

        //save on local storage
        data.tasks.push(taskName.value);

        //Close the modal
        modalTask.classList.add('noDisplay');
        //Remove message of taskName empty
        imputEmpty.classList.add('noDisplay');

        }else{
            imputEmpty.classList.remove('noDisplay');
        }
    
}

//Delete all tasks
btnCancelDelteTasks.addEventListener('click',function(){
    modalDeleteTasks.classList.add('noDisplay');
});
btnClearTasks.addEventListener('click',()=>{
    const tasks = document.querySelectorAll('.task')
    if(tasks.length>0){
        modalDeleteTasks.classList.remove('noDisplay'); 
    }
});

btnDeleteTasks.addEventListener('click',()=>{
    containerTask.innerHTML = "";
    modalDeleteTasks.classList.add('noDisplay');
});

//Add listener to keys
document.addEventListener('keydown', (event) => {
    // var name = event.key;
    // var code = event.code;
    if(event.key== "Enter"){
        if(!modalTask.classList.contains("noDisplay")){
            addNewTask();
        }
    }
    if(event.key == "Escape"){
        if(!modalTask.classList.contains('noDisplay')){
            modalTask.classList.add('noDisplay');
        }
    }
  }, false);
//clic on task to mark like ready
  function taskReady(task){
    task.classList.toggle("taskready");
    const btn = task.querySelector('button');
    btn.classList.toggle('taskready');
  }

  //Delete task
function deleteTasks(task){
    task.remove();
}