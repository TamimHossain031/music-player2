const button = document.querySelector('.btn-control'),
    playBtn = document.querySelector('#playBtn'),
    file = document.querySelector('.file'),
    track = document.querySelector('.track'),
    title = document.querySelector('.title'),
    cover = document.querySelector('.audio-cover img'),
    bar = document.querySelector('.bar'),
    durationBar = document.querySelector('.duration-bar'),
    currentDuration = document.querySelector('.currentTime'),
    totalDuration = document.querySelector('.totalDuration')
const audio = new Audio();
const song = [
    {
        path:'./assets/audio/song1.mp3',
        title:'Interstellar: pushing the boundaries of space and design',
        file:'Web3',
        track:'S1: E1',
        cover:'./assets/image/image.png'
    }
]

let musicIndex = 0;
let isPlaying = false;

let togglePlay = () =>{
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

let playMusic = () =>{
    isPlaying = true;
    playBtn.classList.replace('fa-redo','fa-pause');
    playBtn.classList.replace('fa-play','fa-pause');
    audio.play();

    playBtn.setAttribute('title','pause');

}
let pauseMusic = () =>{
    isPlaying = false;

    playBtn.classList.replace('fa-pause','fa-play');
    audio.pause();

    playBtn.setAttribute('title','play');

}

let load = (song) => {
    console.log(song);
    audio.src = song.path;
    file.textContent = song.file;
    track.textContent = song.track;
    title.textContent = song.title;
    cover.src = song.cover;
   
}
let changeMusic = (direction)=>{
    musicIndex = (musicIndex + direction + song.length) % song.length;
    load(song[musicIndex]);
    playMusic();
}
let updateProgressBar = () =>{
    const {duration, currentTime} = audio;
    const progressPercent = (currentTime / duration) * 100;
    durationBar.style.width = `${progressPercent}%`;
    currentDuration.textContent = `${formatTime(currentTime / 60)} : ${formatTime(currentTime % 60)}`;
    totalDuration.textContent = `${formatTime(duration / 60)} : ${formatTime(duration % 60)}`;
}

let setProgressBar = (e) =>{
    const width = bar.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

let formatTime = (time) => {
    return String(Math.floor(time)).padStart(2,'0');
}
let again = () => {
    playBtn.classList.replace('fa-pause','fa-redo');
    durationBar.style.width = '0'

}
button.addEventListener('click',togglePlay);
audio.addEventListener('ended',again);
audio.addEventListener('timeupdate',updateProgressBar);
bar.addEventListener('click',setProgressBar);

load(song[musicIndex]);