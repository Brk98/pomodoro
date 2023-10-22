const cycle = {
    pomo: 25,
    shortBreak: 5,
    longBreak: 15,
 }

const data = {
    cycle: cycle,
    playlist: '',
    tasks: [],
    theme: '',
}
//Get data from localStorage if exist
if(localStorage.getItem('data')){
    const dataLocal = JSON.parse(localStorage.getItem('data'));
    cycle.pomo = dataLocal.cycle.pomo;
    cycle.shortBreak = dataLocal.cycle.shortBreak;
    cycle.longBreak = dataLocal.cycle.longBreak;
    //Get theme
    data.theme = dataLocal.theme;
  }
