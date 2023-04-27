const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const prevBtn = document.querySelector(".play-back");
const nextBtn = document.querySelector(".play-forward");
const timeStart = document.querySelector(".timestart");
const timeEnd = document.querySelector(".timeend");
const rangeBar = document.querySelector(".range");
let isPlaying = true;
let indexSong = 0;
displayTimer();
let timer;
const musics = ["LaAnh.mp3", "NeuLucDo.mp3", "YeuNguoiCoUocMo.mp3"];
song.setAttribute("src", `./assets/mp3/${musics[indexSong]}`);

prevBtn.addEventListener("click", function () {
    changeSong(-1);
});
nextBtn.addEventListener("click", function () {
    changeSong(1);
});
song.addEventListener("ended",handleEndedSong);
function handleEndedSong(){
    changeSong(1);
}
function changeSong(dir) {
    if (dir === 1) {
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    }
    else if (dir === -1) {
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    song.setAttribute("src", `./assets/mp3/${musics[indexSong]}`);
    playPause();
}

playBtn.addEventListener("click", playPause);
function playPause() {
    if (isPlaying) {
        song.play();
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
        isPlaying = false;
        setInterval(displayTimer, 500)
    }
    else {
        song.pause();
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
        isPlaying = true;
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max=duration;
    rangeBar.value=currentTime;
    timeEnd.textContent=formatTimer(currentTime);
    if (!duration) {
        timeStart.textContent = "00:00";
    }
    else {
        timeStart.textContent = formatTimer(duration);
    }
}
function formatTimer(number) {
    const min = Math.floor(number / 60);
    const sec = Math.floor(number - min * 60);
    return `${min<10?'0'+min:min}:${sec<10?'0'+sec:sec}`;
}
rangeBar.addEventListener("change",handleChangeBar);
function handleChangeBar(){
    song.currentTime=rangeBar.value;
}