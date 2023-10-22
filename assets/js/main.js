// pomodoro
//Cycle of pomo this is what I denied
const pomo_cycle = ['pomo', 'shortBreak','pomo', 'shortBreak','pomo', 'shortBreak','pomo', 'longBreak'];
//I get the buttoms related with the tuimer
const pomo = document.querySelector('.time_specific_pomodoro');
const brkShort = document.querySelector('.time_specific_break');
const brkLong = document.querySelector('.time_specific_long_break');

const btnsPomo = {
  pomo: document.querySelector('.time_specific_pomodoro'),
  shortBreak : document.querySelector('.time_specific_break'),
  longBreak : document.querySelector('.time_specific_long_break'),
}
// timer
const timer = document.querySelector('.time_current');
const btn_start = document.querySelector('.time_button_start');

//Sound this work when the counter is equal 0
const pomoEndSound = new Audio();
pomoEndSound.src = './assets/sounds/pomo-end.mp3';
pomoEndSound.duration = 3;


btn_start.addEventListener('click',start);

//I use currentPomo to identify where I am in the cycle that I defined in the start
let currentPomo = 0;

//I use timerInterval to manege the interval as a Gobal Variable
let timerInterval;

//Get the minutes of the first pomo
let minutes = cycle[pomo_cycle[currentPomo]];

//User click on especific timecycle
btnsPomo.shortBreak.addEventListener('click',shortBreakClick);
btnsPomo.longBreak.addEventListener('click',longBreakClick);
btnsPomo.pomo.addEventListener('click',pomoClick);

//update custom time this is for change the time visual
updateCustomTime(minutes);

//I manage all the time in seconds
let time = calculateTime(minutes);

//this fucntion start the timer
// the change State is for the manual change cycle
function start(changeState = false) {

  //This is only when the user do a click on a different cycle of pomo stop the counter and chnage the value in te buttom if that is working
  if(changeState == true){
    clearInterval(timerInterval);
    btn_start.innerHTML = 'Start';
    btn_start.value = 'Start';
  }else{
    //this is for change the cycle of pomo if the time is equal 0
    updateTime();
    //change the time visually
    currentTimeStyle(btnsPomo[pomo_cycle[currentPomo]])

    //I used the value in the buttom sart for manage the counter if the buttom is with value start it begins the counter with interval
    //if the buttom value is Pause the counter stop and change the buttom visually
    if (btn_start.value == 'Start') {
      timerInterval = setInterval(updateCountDown, 1000);
        btn_start.innerHTML = 'Pause';
        btn_start.value = 'Pause';
      } else {
        clearInterval(timerInterval);
        btn_start.innerHTML = 'Start';
        btn_start.value = 'Start';
      }
  }
  }
  
  //Here I finish the counter if its equal to 0 and play the sound chnage the cycle of pomo or change the second down
  function updateCountDown(){
      if(!time==0){
          time--;
          updateTimeStyle();
      }else{
        clearInterval(timerInterval);
        pomoEndSound.play();
        //This part is important if we are in the end of the cycle starts new one changing the currentPomo to 0 or just add 1 to currentPomo
        currentPomo == 7 ? currentPomo=0 : currentPomo++;
        //change this two variables to reset the start buttom
        btn_start.innerHTML = 'Start';
        btn_start.value = 'Start';

        updateTime();
        currentTimeStyle(btnsPomo[pomo_cycle[currentPomo]])
        updateCustomTime(minutes);
      }
    }

  //Calculate seconds 
  function calculateTime(minutes){
    let time = minutes * 60;
    return time;
}

//Change the style of what is the cycle of pomo
function currentTimeStyle(btn){
  pomo.classList.remove('time-selected');
  brkShort.classList.remove('time-selected');
  brkLong.classList.remove('time-selected');
  btn.classList.add('time-selected');
}

//I manage the seconds to show in minutes
function updateCustomTime(minutes){
  minutes < 10 ? '0' + minutes : minutes;
  timer.innerHTML = `${minutes}:00`; 
}

//Here I change the cycle
function updateTime(){
  if(time == 0){
    minutes = cycle[pomo_cycle[currentPomo]];
    time = calculateTime(minutes);
  }
}

function updateTimeonClick(){
  minutes = cycle[pomo_cycle[currentPomo]];
  time = calculateTime(minutes);
  //Call the function that update time to stop the counter
  changeState = true;
  start(changeState);
}
//Here execute when user do a click on the short time and compute where is the current pomo to continue the cycle is just like a jump in the cycle
function shortBreakClick(){
  if(!(pomo_cycle[currentPomo] == 'shortBreak')){
    if(pomo_cycle[currentPomo] == 'longBreak'){
      currentPomo = 0;
    }
    currentPomo++;
    //This if is when te cycle pomo is in the last cycle
    currentPomo == 7 ? currentPomo = 1 : currentPomo;
    btn_start.innerHTML = 'Start';
    currentTimeStyle(btnsPomo.shortBreak);
    updateTimeonClick();
    calculateTime();
    updateTimeStyle();
  }
}

//Here execute when user do a click on the long time and compute where is the current pomo to continue the cycle is just like a jump in the cycle
function longBreakClick(){
  if(!(pomo_cycle[currentPomo] == 'longBreak')){
    currentPomo=7;
    btn_start.innerHTML = 'Start';
    currentTimeStyle(btnsPomo.longBreak);
    updateTimeonClick();
    calculateTime();
    updateTimeStyle();
  }
}

//Here execute when user do a click on the pomo time and compute where is the current pomo to continue the cycle is just like a jump in the cycle
function pomoClick(){
  if(!(pomo_cycle[currentPomo] == 'pomo')){
    if(pomo_cycle[currentPomo]=='longBreak'){
      currentPomo=0;
    }
    if(pomo_cycle[currentPomo]== 'shortBreak'){
      currentPomo++;
    }
    btn_start.innerHTML = 'Start';
    updateTimeonClick();
    calculateTime();
    updateTimeStyle();
  }
  currentTimeStyle(btnsPomo.pomo);
}

//This function updates the time visually
function updateTimeStyle(){
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timer.innerHTML = `${minutes}:${seconds}`;
}