const btnSettings = document.querySelector('.settingsbtn');
const modalSettings = document.querySelector('.settings');
const closeModalSettings = document.querySelector('button.settingsClose');
const btnlightMode = document.querySelector('.lightMode');
const btnDarkMode = document.querySelector('.darkMode');

//variables for local storage
let = actualPlaylist = 0;
//Time nodes
const inputPomodoro = document.querySelector('#pomodoroTime');
const inputShortBreak = document.querySelector('#shortBreakTime');
const inputLongBreak = document.querySelector('#longBreakTime');

const btnSaveTime = document.querySelector('.saveTimes');

const messageSucces = document.querySelector('.success');
const messageUnsucces = document.querySelector('.unsuccess');

//PLaylists
const containerPlaylist = document.querySelector('.musicLists');

//Playlist
const playlists = [
    {
        image: "https://i.scdn.co/image/ab67706c0000da84f396bdf13f6473f86bf4e2c0",
        name: "Lofi Girl",
        linkweb: "https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
    },
    {
        image: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_mx_default.jpg",
        name: "Top 50 Mexico",
        linkweb: "https://open.spotify.com/embed/playlist/37i9dQZEVXbO3qyFxbkOE1?utm_source=generator&theme=0"
    },
    {
        image: "https://i.scdn.co/image/ab67706f00000002e4a325110ef153a1e8aef7cb",
        name: "Lecture",
        linkweb: "https://open.spotify.com/embed/playlist/37i9dQZF1DX9MDcH3vBMo0?utm_source=generator&theme=0"
    },
    {
        image: "https://i.scdn.co/image/ab67706c0000da84cee227f257622d54622ba9e1",
        name: "Rock",
        linkweb: "https://open.spotify.com/embed/playlist/5EWhuzXkbTRDcv0ckRosuV?utm_source=generator&theme=0"
    },
    {
        image: "https://i.scdn.co/image/ab67706c0000da84d492f3751e294408c36a8bbc",
        name: "Electro",
        linkweb: "https://open.spotify.com/embed/playlist/2MbkmdADBKOpJOGOMC5CGr?utm_source=generator"
    },
    {
        image: "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_default.jpg",
        name: "Top 50 Global",
        linkweb: "https://open.spotify.com/embed/playlist/37i9dQZEVXbMDoHDwVN2tF?utm_source=generator&theme=0"
    },
    {
        image: "https://i.scdn.co/image/ab67706f00000002ddc9dd3c97091ccc4b3fa7e0",
        name: "Pop",
        linkweb: "https://open.spotify.com/embed/playlist/37i9dQZF1DX1ngEVM0lKrb?utm_source=generator&theme=0"
    },
    {
        image: "https://i.scdn.co/image/ab67706f0000000287bff188c40608c48b82068f",
        name: "Rap (Drake)",
        linkweb: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7QOv5kjbU68?utm_source=generator&theme=0"
    },
];
//load the theme from LocalStorage
changeTheme(data.theme);

btnSettings.addEventListener('click',()=>{
    modalSettings.classList.remove('noDisplay');
    chargeData();
    playListSpotify();
});
closeModalSettings.addEventListener('click',()=>{
    modalSettings.classList.add('noDisplay');
});

btnlightMode.addEventListener('click',function(){
    data.theme = 'light'
    changeTheme(data.theme);
});
btnDarkMode.addEventListener('click',function(){
    data.theme = 'dark'
    changeTheme(data.theme);
});
  //function to change the theme
  function changeTheme(theme){
    //save theme on localStorage
    localStorage.setItem('data',JSON.stringify(data));
    if(theme == 'light'){
        document.documentElement.style.setProperty('--backgoung-color', 'var(--backgoung-color_light)');
        document.documentElement.style.setProperty('--second-color', 'var(--second-color_light)');
        document.documentElement.style.setProperty('--third-color', 'var(--third-color_light)');
        document.documentElement.style.setProperty('--letter-color', 'var(--letter-color_light)');
    }else{
        document.documentElement.style.setProperty('--backgoung-color', 'var(--backgoung-color_dark)');
        document.documentElement.style.setProperty('--second-color', 'var(--second-color_dark)');
        document.documentElement.style.setProperty('--third-color', 'var(--third-color_dark)');
        document.documentElement.style.setProperty('--letter-color', 'var(--letter-color_dark)');
    }
}
function chargeData(){
    inputPomodoro.value = cycle.pomo;
    inputShortBreak.value = cycle.shortBreak;
    inputLongBreak.value = cycle.longBreak;
}

btnSaveTime.addEventListener('click',saveChanges);


inputPomodoro.addEventListener("input", function() {
    var inputValue = inputPomodoro.value;
    if (!/^\d+$/.test(inputValue) || inputValue <= 0) {
      inputPomodoro.value = ""; // Borra el contenido si no es un número positivo
    }
  });
  inputShortBreak.addEventListener("input", function() {
    var inputValue = inputShortBreak.value;
    if (!/^\d+$/.test(inputValue) || inputValue <= 0) {
        inputShortBreak.value = ""; // Borra el contenido si no es un número positivo
    }
  });
inputLongBreak.addEventListener("input", function() {
    var inputValue = inputLongBreak.value;
    if (!/^\d+$/.test(inputValue) || inputValue <= 0) {
        inputLongBreak.value = ""; // Borra el contenido si no es un número positivo
    }
  });

function saveChanges(){
    if(!(cycle.pomo == inputPomodoro.value && cycle.shortBreak == inputShortBreak.value && cycle.longBreak ==  inputLongBreak.value)){
        if(inputPomodoro.value > 0 && inputShortBreak.value > 0 && inputLongBreak.value){
            cycle.pomo = inputPomodoro.value;
            cycle.shortBreak =  inputShortBreak.value;
            cycle.longBreak =  inputLongBreak.value;
            
            currentPomo = 0;
            minutes = cycle[pomo_cycle[currentPomo]];
            start(true);
            updateCustomTime(minutes);
        
            messageSucces.classList.remove('noDisplay');
            setTimeout(function(){
                messageSucces.classList.add('noDisplay');
            },1000);
            //Save on local storage
            data.cycle.pomo = inputPomodoro.value;
            data.cycle.shortBreak = inputShortBreak.value;
            data.cycle.longBreak = inputLongBreak.value;
            localStorage.setItem('data',JSON.stringify(data));

        }else{
            alert("Please enter positive numbers only.");
        }
    }
}

// spotify section
function playListSpotify(){
    containerPlaylist.innerHTML="";
    playlists.forEach((playlist, index) => {
        const mainContainer = document.createElement('div');
        mainContainer.classList.add('playlistSpotify');
        const container = document.createElement('div');
        container.classList.add('playlist');
        const image = document.createElement('div');
        image.classList.add('imagenPlaylist');
        image.style.backgroundImage = `url(${playlist.image})`;
        image.style.backgroundPosition = 'center';
        image.style.backgroundRepeat = 'no-repear';
        image.style.backgroundSize = 'contain';
        container.appendChild(image);
        mainContainer.appendChild(container);
        mainContainer.addEventListener('click',function(){
            changePlayList(playlist.linkweb, index);
        });
        containerPlaylist.appendChild(mainContainer);
    });
}

function changePlayList(link, index){
    const main = document.querySelector('.containerPlayer');
    main.innerHTML="";

    var iframeToDelete = document.querySelectorAll('iframe.frame');
    if (iframeToDelete.length>0) {
        iframeToDelete.forEach(player => {
            player.remove();
        });
    }
    // Crea un elemento iframe
    const iframe = document.createElement("iframe");

    // Establece los atributos y estilos del iframe
    iframe.setAttribute("src", link);
    iframe.setAttribute("width", "50%");
    iframe.setAttribute("height", "152");
    iframe.setAttribute("frameBorder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("allow", "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture");
    iframe.setAttribute("loading", "lazy");
    iframe.style.borderRadius = "12px";

    main.appendChild(iframe);
    console.log(index);

}