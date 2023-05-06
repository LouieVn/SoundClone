const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const prevBtn = document.querySelector(".play-back");
const nextBtn = document.querySelector(".play-forward");
const randomBtn = document.querySelector(".play-random");
const replayBtn = document.querySelector(".replay");
const timeStart = document.querySelector(".timestart");
const timeEnd = document.querySelector(".timeend");
const rangeBar = document.querySelector(".range");
const rangeVol =document.querySelector(".rangevol");
let isPlaying = true;
let indexSong = 0;
displayTimer();
let timer;
const musics =["11-11.mp3","Bật tình yêu lên.mp3","Chuyện đôi ta.mp3","Cô gái này là của ai.mp3","Em là.mp3",
"Ghệ iu dấu của em","Gió.mp3","Hãy trao cho anh.mp3","LaAnh.mp3","NeuLucDo.mp3","Rồi ta sẽ ngắm pháo hoa cùng nhau.mp3",
"Vài câu nói khiến người thay đổi.mp3","Waiting foryou.mp3","YeuNguoiCoUocMo.mp3"];
song.setAttribute("src", `./assets/mp3/${musics[indexSong]}`);

prevBtn.addEventListener("click", function () {
    changeSong(-1);
});
nextBtn.addEventListener("click", function () {
    changeSong(1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
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

randomBtn.addEventListener("click", playRandom);
function playRandom() {
    let randomIndex = (Math.floor(Math.random() * 101)) % (musics.length - 1);
    song.setAttribute("src", `./assets/mp3/${musics[randomIndex]}`);
    playPause();
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    timeEnd.textContent = formatTimer(currentTime);
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
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}
// rangeVol.addEventListener("click",handleChangeVol);
// function handleChangeVol() {
//     song.volume = rangeVol.value;
// }