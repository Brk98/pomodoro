const btnSettings = document.querySelector('.settingsbtn');
const modalSettings = document.querySelector('.settings');
const closeModalSettings = document.querySelector('button.settingsClose');
const btnlightMode = document.querySelector('.lightMode');
const btnDarkMode = document.querySelector('.darkMode');


btnSettings.addEventListener('click',()=>{
    modalSettings.classList.remove('noDisplay');
});
closeModalSettings.addEventListener('click',()=>{
    modalSettings.classList.add('noDisplay');
});

btnlightMode.addEventListener('click',function(){
    document.documentElement.style.setProperty('--backgoung-color', 'var(--backgoung-color_light)');
    document.documentElement.style.setProperty('--second-color', 'var(--second-color_light)');
    document.documentElement.style.setProperty('--third-color', 'var(--third-color_light)');
    document.documentElement.style.setProperty('--letter-color', 'var(--letter-color_light)');
});
btnDarkMode.addEventListener('click',function(){
    document.documentElement.style.setProperty('--backgoung-color', 'var(--backgoung-color_dark)');
    document.documentElement.style.setProperty('--second-color', 'var(--second-color_dark)');
    document.documentElement.style.setProperty('--third-color', 'var(--third-color_dark)');
    document.documentElement.style.setProperty('--letter-color', 'var(--letter-color_dark)');
});
