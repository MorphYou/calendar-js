let aMonths = new Array('styczeĹ','luty','marzec','kwiecieĹ','maj','czerwiec','lipiec','sierpieĹ','wrzesieĹ','paĹşdziernik','listopad','grudzieĹ');
let date    = new Date();

Calendar();

document.querySelector('#prev').addEventListener('click',PrevMonth);
document.querySelector('#next').addEventListener('click',NextMonth);

function PrevMonth(){
date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
Calendar();
}

function NextMonth(){
date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
Calendar();
}

function Calendar(){

const   td       = document.querySelectorAll('#calendar tbody td');
const   firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
const   lastDay  = new Date(date.getFullYear(), date.getMonth() + 1, 0);
const   day      = firstDay.getDay() ? firstDay.getDay()-1 : 6;

document.querySelector('#calendar_top').innerHTML = aMonths[date.getMonth()] + ' ' + date.getFullYear();

let dzien = 1;
for (let i = 0; i < td.length; i++) {
     td[i].innerHTML = (i>=day && dzien<=lastDay.getDate()) ? dzien++ : '';
     if (i>=35) td[i].style.display =  (day+dzien-1<36) ?  'none' : '';   // chowanie ostatniego wiersza
     }

}
