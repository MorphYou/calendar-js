//zmienne
let tasks = new Array();

let aMonths = new Array('styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień');
let date    = new Date();
let completeTask, editTask, tempPage;
let actualDate = date;



//listeners
document.querySelector('#prev').addEventListener('click',PrevMonth);
document.querySelector('#next').addEventListener('click',NextMonth);

//funkcje
function PrevMonth(){
     date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
     Calendar();
}

function NextMonth(){
     date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
     Calendar();
}

function Calendar(){
     actualDate = new Date();
     const td = document.querySelectorAll('#calendar tbody td');
     const   firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
     const   lastDay  = new Date(date.getFullYear(), date.getMonth() + 1, 0);
     const   day      = firstDay.getDay() ? firstDay.getDay()-1 : 6;

     for (let i = 0; i < td.length; i++) {
          td[i].classList.remove("day-task");
          td[i].classList.remove("day-task-completed");
          td[i].classList.remove("day-task-lost");

     }

     document.querySelector('#calendar_top').innerHTML = aMonths[date.getMonth()] + ' ' + date.getFullYear();

     let dzien = 1;
     let CalTasks;
     for (let i = 0; i < td.length; i++) {
          
          if(i>=day && dzien<=lastDay.getDate()){
               tasks.forEach(el => {
                    CalTasks = new Date(el.date);
                    if(Date.parse(date.getFullYear()+"-"+((parseInt((date.getMonth())+1) < 10) ? '0' : '')+""+parseInt((date.getMonth())+1)+"-"+(dzien < 10 ? '0' : '')+dzien) == Date.parse(CalTasks.getFullYear()+"-"+((parseInt((CalTasks.getMonth())+1) < 10) ? '0' : '')+""+parseInt((CalTasks.getMonth())+1)+"-"+(CalTasks.getDate() < 10 ? '0' : '')+CalTasks.getDate())){
                         // console.log(Date.parse(date.getFullYear()+"-"+((parseInt((date.getMonth())+1) < 10) ? '0' : '')+""+parseInt((date.getMonth())+1)+"-"+(dzien < 10 ? '0' : '')+dzien));
                         // console.log(Date.parse(CalTasks.getFullYear()+"-"+((parseInt((CalTasks.getMonth())+1) < 10) ? '0' : '')+""+parseInt((CalTasks.getMonth())+1)+"-"+(CalTasks.getDate() < 10 ? '0' : '')+CalTasks.getDate()));
                         if(!el.completed && el.date < Date.parse(actualDate)){
                              td[i].classList.add("day-task-lost");
                         }else if(!el.completed && el.date > Date.parse(actualDate)){
                              td[i].classList.add("day-task");
                         }
                         else{
                              
                              td[i].classList.add("day-task-completed");
                         }
                    }else{
                    }
               });
          }
          (i>=day && dzien<=lastDay.getDate()) ? td[i].addEventListener("click", ShowAddPage) : '';
          td[i].innerHTML = (i>=day && dzien<=lastDay.getDate()) ? dzien++ : '';

          //console.log(date.getFullYear()+"-"+((parseInt((date.getMonth())+1) < 10) ? '0' : '')+""+parseInt((date.getMonth())+1)+"-"+(dzien < 10 ? '0' : '')+dzien);
     }

}

function UpdateTaskList(){
     tasks.sort((x, y) => x.date - y.date);
     const tasksSelector = document.querySelector("#tasks");
     let lengTasks = document.querySelector("#tasks h2");
     lengTasks.innerText = "Tasks ("+tasks.length+")";
     let taskManager = document.createElement("div");
     taskManager.setAttribute("id", "task-manager");
     if(document.querySelector("#task-manager")){
          document.querySelector("#task-manager").remove();
     }
     tasksSelector.appendChild(taskManager);
     if(tasks.length > 0){
          tasks.forEach(task => {
               //if(task.date != 0){
               let taskDiv = document.createElement("div")
               taskDiv.classList.add("task");
               taskDiv.classList.add("fade-in-down");
               if(!task.completed && task.date < Date.parse(actualDate)){
                    taskDiv.classList.add("lost");
               }else if(!task.completed && task.date > Date.parse(actualDate)){
                    taskDiv.classList.add("can-do");
               }else if(task.completed){
                    taskDiv.classList.add("completed");
               }
               let divEdit = document.createElement("div");
               divEdit.classList.add("divEdit");
               let divEditLeft = document.createElement("div");
               divEditLeft.classList.add("divEditLeft");
               if(!task.completed){
                    completeTask = document.createElement("i");
                    completeTask.classList.add("fa-solid");
                    completeTask.classList.add("fa-check");
                    completeTask.addEventListener("click", CompleteTask);
               }
               let divEditRight = document.createElement("div");
               divEditRight.classList.add("divEditRight");
               if(!task.completed){
                    editTask = document.createElement("i");
                    editTask.classList.add("fa-solid");
                    editTask.classList.add("fa-pen-to-square");
                    editTask.addEventListener("click", ShowEditPage);
               }
               
               let deleteTask = document.createElement("i");
               deleteTask.classList.add("fa-solid");
               deleteTask.classList.add("fa-trash-can");
               deleteTask.addEventListener("click", DeleteTask);
               let taskData = document.createElement("p");
               let dateTask = new Date(task.date);
               taskData.innerText = ((dateTask.getDate() < 10) ? '0' : '')+""+dateTask.getDate()+"-"+((parseInt((dateTask.getMonth())+1) < 10) ? '0' : '')+""+parseInt((dateTask.getMonth())+1)+"-"+dateTask.getFullYear();
               let taskTitle = document.createElement("h3");
               taskTitle.innerText = task.title;
               let taskText = document.createElement("p");
               taskText.innerText = task.text;
               taskManager.appendChild(taskDiv);
               taskDiv.classList.remove("fade-in-down");
               taskDiv.appendChild(divEdit);
               divEdit.appendChild(divEditLeft);
               if(!task.completed){
                    divEditLeft.appendChild(completeTask);
               }
               divEdit.appendChild(divEditRight);
               if(!task.completed){
                    divEditRight.appendChild(editTask);
               }
               divEditRight.appendChild(deleteTask);
               taskDiv.appendChild(taskData);
               taskDiv.appendChild(taskTitle);
               taskDiv.appendChild(taskText);

               function CompleteTask(){
                    task.completed = true;
                    UpdateTaskList();
                    Calendar();
               }

               function ShowEditPage(){
                    tempPage = "#edit-task-div";

                    const body = document.querySelector("body");
                    let divEditPage = document.createElement("div");
                    divEditPage.setAttribute("id", "edit-task-div");

                    let x = document.createElement("p");
                    x.innerText = "X";
                    x.addEventListener("click", ClosePage);
                    let h3 = document.createElement("h3");
                    h3.innerText = "Edytujesz notatkę na dzien: "+((dateTask.getDate() < 10) ? '0' : '')+""+dateTask.getDate()+"-"+((parseInt((dateTask.getMonth())+1) < 10) ? '0' : '')+""+parseInt((dateTask.getMonth())+1)+"-"+dateTask.getFullYear();
                    let inputTitle = document.createElement("input");
                    inputTitle.setAttribute("type", "text");
                    inputTitle.setAttribute("id", "title");
                    inputTitle.setAttribute("value", task.title);
                    let textareaText = document.createElement("textarea");
                    textareaText.setAttribute("id", "text");
                    textareaText.innerText = task.text;
                    let buttonEditTask = document.createElement("button");
                    buttonEditTask.setAttribute("id", "edit-task-button");
                    buttonEditTask.innerText = "Edytuj notatke";
                    buttonEditTask.addEventListener("click", EditTask);
                    body.appendChild(divEditPage);
                    divEditPage.appendChild(x);
                    divEditPage.appendChild(h3);
                    divEditPage.appendChild(inputTitle);
                    divEditPage.appendChild(textareaText);
                    divEditPage.appendChild(buttonEditTask);

                    ShowBlur();

                    function EditTask(){
                         //WTF!!!!!!
                         task.title = inputTitle.value;
                         task.text = textareaText.innerHTML;
                         console.log(task.title);
                         console.log(task.text);

                         UpdateTaskList();
                         Calendar();
                         ClosePage();
                    }
               }

               function DeleteTask(e){
                    tasks.splice(tasks.findIndex(element => element.date == task.date), 1);
                    e.target.parentElement.parentElement.parentElement.classList.add("fade-out-down");
                    setTimeout(UpdateTaskList, 1000);
                    setTimeout(Calendar, 1000)
               }
          //}
          });
     }

}

function ShowBlur(){
     const body = document.querySelector("body");
     let blur = document.createElement("div");
     blur.setAttribute("id", "blur");
     blur.addEventListener("click", ClosePage);
     body.appendChild(blur);
}

function ShowAddPage(e){
     tempPage = "#add-task-div";

     const body = document.querySelector("body");
     let divAddPage = document.createElement("div");
     divAddPage.setAttribute("id", "add-task-div");
     let x = document.createElement("p");
     x.innerText = "X";
     x.addEventListener("click", ClosePage);
     let h3 = document.createElement("h3");
     h3.innerText = "Dodajesz notatkę na dzien: "+((e.target.innerText < 10) ? '0' : '')+""+e.target.innerText+"-"+(((date.getMonth() < 10) ? '0' : '')+""+parseInt(date.getMonth()+1))+"-"+date.getFullYear();
     let inputTitle = document.createElement("input");
     inputTitle.setAttribute("type", "text");
     inputTitle.setAttribute("id", "title");
     inputTitle.setAttribute("placeholder", "Tytul");
     let textareaText = document.createElement("textarea");
     textareaText.setAttribute("id", "text");
     textareaText.setAttribute("placeholder", "Tresc");
     let buttonAddTask = document.createElement("button");
     buttonAddTask.setAttribute("id", "add-task-button");
     buttonAddTask.innerText = "Dodaj notatke";
     buttonAddTask.addEventListener("click", AddTask);
     
     body.appendChild(divAddPage);
     divAddPage.appendChild(x);
     divAddPage.appendChild(h3);
     divAddPage.appendChild(inputTitle);
     divAddPage.appendChild(textareaText);
     divAddPage.appendChild(buttonAddTask);

     ShowBlur();

     function AddTask(){
          //console.log(date.getFullYear()+"-"+((date.getMonth() < 10) ? '0' : '')+""+date.getMonth()+"-"+((e.target.innerText < 10) ? '0' : '')+""+e.target.innerText);
          tasks[tasks.length] = new Task(Date.parse(date.getFullYear()+"-"+((date.getMonth() < 10) ? '0' : '')+""+(parseInt(date.getMonth())+1)+"-"+((e.target.innerText < 10) ? '0' : '')+""+e.target.innerText), document.querySelector("#title").value, document.querySelector("#text").value);
               console.log("Dodano: "+Date.parse(date.getFullYear()+"-"+((date.getMonth() < 10) ? '0' : '')+""+(parseInt(date.getMonth())+1)+"-"+((e.target.innerText < 10) ? '0' : '')+""+e.target.innerText));
          UpdateTaskList();
          Calendar();
          ClosePage();
     }
}

function ClosePage(){
     document.querySelector("#blur").remove();
     document.querySelector(tempPage).remove();
}

function AddTaskMultipler(){
     for (let index = 10; index > 0; index--) {
          tasks[tasks.length] = new Task(Date.parse("2024-09-"+index), "test"+index, "test");
     }

}

function watch(){
     actualDate = new Date();
     document.querySelector("#watch-date").innerHTML = actualDate.getDate()+' '+aMonths[actualDate.getMonth()]+ ' ' +actualDate.getFullYear();
     document.querySelector("#watch-time").innerHTML = ((actualDate.getHours() < 10) ? '0' : '')+''+actualDate.getHours()+':'+((actualDate.getMinutes() < 10) ? '0' : '')+''+actualDate.getMinutes()+ ':' +((actualDate.getSeconds() < 10) ? '0' : '')+''+actualDate.getSeconds();
     setTimeout(watch, 1000);
}

//Klasy
class Task{
     constructor(date, title, text){
          this.date = date;
          this.title = title;
          this.text = text;
          this.completed = false;
     }
}


UpdateTaskList();
Calendar();
watch();