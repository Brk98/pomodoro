// pomodoro
const pomo_cycle = ['pomo', 'shortBreak','pomo', 'shortBreak','pomo', 'shortBreak','pomo', 'longBreak'];

const cycle = {
   pomo: 25,
   shortBreak: 5,
   longBreak: 15,
}
// pomo current time
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

// sound
const pomoEndSound = new Audio();
pomoEndSound.src = './assets/sounds/pomo-end.mp3';
pomoEndSound.duration = 3;

btn_start.addEventListener('click',start);

let currentPomo = 0;
let timerInterval;
let minutes = cycle[pomo_cycle[currentPomo]];
//User click on especific timecycle
btnsPomo.shortBreak.addEventListener('click',shortBreakClick);
btnsPomo.longBreak.addEventListener('click',longBreakClick);
btnsPomo.pomo.addEventListener('click',pomoClick);

//update custom time

updateCustomTime(minutes);

let time = calculateTime(minutes);

function start() {
  updateTime();
  currentTimeStyle(btnsPomo[pomo_cycle[currentPomo]])
  if (btn_start.innerHTML === 'Start') {
    timerInterval = setInterval(updateCountDown, 1000);
      btn_start.innerHTML = 'Pause';
    } else {
      clearInterval(timerInterval);
      btn_start.innerHTML = 'Start';
    }
  }
  
  function updateCountDown(){
    if(!time==0){
        time--;
        updateTimeStyle();
    }else{
      clearInterval(timerInterval);
      pomoEndSound.play();
      currentPomo == 7 ? currentPomo=0 : currentPomo++;
      btn_start.innerHTML = 'Start';
      updateTime();
      currentTimeStyle(btnsPomo[pomo_cycle[currentPomo]])
      updateCustomTime(minutes);
    }
  }

  function calculateTime(minutes){
    let time = minutes * 60;
    return time;
}

function currentTimeStyle(btn){
  pomo.classList.remove('time-selected');
  brkShort.classList.remove('time-selected');
  brkLong.classList.remove('time-selected');
  btn.classList.add('time-selected');
}

function updateCustomTime(minutes){
  minutes < 10 ? '0' + minutes : minutes;
  timer.innerHTML = `${minutes}:00`; 
}

function updateTime(){
  if(time == 0){
    minutes = cycle[pomo_cycle[currentPomo]];
    time = calculateTime(minutes);
  }
}

function updateTimeonClick(){
  minutes = cycle[pomo_cycle[currentPomo]];
  time = calculateTime(minutes);
}

function shortBreakClick(){
  if(!(pomo_cycle[currentPomo] == 'shortBreak')){
    if(pomo_cycle[currentPomo] == 'longBreak'){
      currentPomo = 0;
    }
    currentPomo++;
    currentTimeStyle(btnsPomo.shortBreak);
    updateTimeonClick();
    calculateTime();
    updateTimeStyle();
  }
}

function longBreakClick(){
  if(!(pomo_cycle[currentPomo] == 'longBreak')){
    currentPomo=7;
    currentTimeStyle(btnsPomo.longBreak);
    updateTimeonClick();
    calculateTime();
    updateTimeStyle();
  }
}

function pomoClick(){
  if(!(pomo_cycle[currentPomo] == 'pomo')){
    if(pomo_cycle[currentPomo]=='longBreak'){
      currentPomo=0;
    }
    if(pomo_cycle[currentPomo]== 'shortBreak'){
      currentPomo++;
    }
    updateTimeonClick();
    calculateTime();
    updateTimeStyle();
  }
  currentTimeStyle(btnsPomo.pomo);
}

function updateTimeStyle(){
  let minutes = Math.floor(time/60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  timer.innerHTML = `${minutes}:${seconds}`;
}