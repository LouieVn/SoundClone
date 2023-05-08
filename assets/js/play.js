const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const prevBtn = document.querySelector(".play-back");
const nextBtn = document.querySelector(".play-forward");
const randomBtn = document.querySelector(".play-random");
const replayBtn = document.querySelector(".replay");
const timeStart = document.querySelector(".timestart");
const timeEnd = document.querySelector(".timeend");
const rangeBar = document.querySelector(".range");
const rangeVol = document.querySelector(".rangevol");
const musicImage = document.querySelector(".footer__image");
const musicArtist = document.querySelector(".footer__name-artist");
const musicName = document.querySelector(".footer__name-song");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
let timer;

const musics = [
    {
        id: 1,
        title: "11-11",
        artist: "miina",
        file: "11-11.mp3",
        image: "https://i.pinimg.com/564x/6f/ca/77/6fca77fe2e433f024c397584edbe654b.jpg"
    },
    {
        id: 2,
        title: "Bật tình yêu lên",
        artist: "Hoà minzy",
        file: "Bật tình yêu lên.mp3",
        image: "https://i.pinimg.com/564x/ee/b5/31/eeb531375aa9876d556db07a09bfe775.jpg"
    },
    {
        id: 3,
        title: "Chuyện đôi ta",
        artist: "Emcee L",
        file: "Chuyện đôi ta.mp3",
        image: "https://i.pinimg.com/564x/24/cd/15/24cd15620d683190f51f4210ad4b12e7.jpg"
    },
    {
        id: 4,
        title: "Cô gái này là của ai",
        artist: "Krix",
        file: "Cô gái này là của ai.mp3",
        image: "https://i.pinimg.com/564x/81/05/6c/81056c25c3890c12256e912d625f195a.jpg"
    },
    {
        id: 5,
        title: "Em là",
        artist: "Mono",
        file: "Em là.mp3",
        image: "https://i.pinimg.com/564x/7a/b5/3e/7ab53e28574da53dcca9da61d6e25145.jpg"
    },
    {
        id: 6,
        title: "Ghệ iu dấu của em ơi",
        artist: "Tlinh",
        file: "Ghệ iu dấu của em ơi.mp3",
        image: "https://i.pinimg.com/564x/b9/f8/f9/b9f8f94c5e7dd0d744e872dda1e873ad.jpg"
    },
    {
        id: 7,
        title: "Gió",
        artist: "Jank",
        file: "Gió.mp3",
        image: "https://i.pinimg.com/736x/b9/57/7f/b9577f6c8c18386e835b46452bda2287.jpg"
    },
    {
        id: 8,
        title: "Hãy trao cho anh",
        artist: "Sơn Tùng MTP",
        file: "Hãy trao cho anh.mp3",
        image: "https://i.pinimg.com/736x/14/f2/bc/14f2bcf28af02dacb44e18e1f939d339.jpg"
    },
    {
        id: 9,
        title: "Hoa nở không màu",
        artist: "Hoài Lâm",
        file: "Hoa nở không màu.mp3",
        image: "https://i.pinimg.com/564x/0b/85/2f/0b852f04876e2b9ade11a868ea2c23ab.jpg"
    },
    {
        id: 10,
        title: "Là Anh",
        artist: "Phạm Lịch",
        file: "LaAnh.mp3",
        image: "https://i.pinimg.com/564x/35/b6/2a/35b62a6a12b395cd0993e38563b4207a.jpg"
    },
    {
        id: 11,
        title: "Nếu Lúc Đó",
        artist: "Tlinh",
        file: "NeuLucDo.mp3",
        image: "https://i.pinimg.com/564x/35/d9/ad/35d9adb47c1740dd700a1db4808603c6.jpg"
    },
    {
        id: 12,
        title: "Rồi ta sẽ ngắm pháo hoa cùng nhau",
        artist: "Olew",
        file: "Rồi ta sẽ ngắm pháo hoa cùng nhau.mp3",
        image: "https://i.pinimg.com/564x/3a/77/44/3a7744f5f2cb9b5656df92b7f39d4063.jpg"
    },
    {
        id: 13,
        title: "Vài câu nói khiến người thay đổi",
        artist: "GreyD",
        file: "Vài câu nói khiến người thay đổi.mp3",
        image: "https://i.pinimg.com/736x/e4/92/00/e49200b89a05870776b3e33c250e903a.jpg"
    },
    {
        id: 14,
        title: "Waiting for you",
        artist: "Mono",
        file: "Waiting for you.mp3",
        image: "https://i.pinimg.com/736x/19/b4/6c/19b46c9e852ebf193ca0cec69aa0838b.jpg"
    },
    {
        id: 15,
        title: "Yeu Nguoi Co Uoc Mo",
        artist: "BuiTruongLinh",
        file: "YeuNguoiCoUocMo.mp3",
        image: "https://i.pinimg.com/736x/7a/cb/71/7acb714918e1416154722a4005df6b5f.jpg"
    }
]

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const mainModule = document.querySelector(".main__module");
const htmls = musics.map(function (music) {
    // shuffle(musics);
    return `
        <li class="main__module-playlist">
            <div class="main__playlist-gallery">
                <div class="main__playlist-disk">
                    <img src="${music.image}" alt="" class="main__disk">
                </div>
                <div class="main__gallery-details">
                    <a href="" class="main__details-song">
                        ${music.title}
                    </a>
                    <a href="" class="main__details-singer">
                        ${music.artist}
                    </a>
                </div>
            </div>
        </li>
    `
})
mainModule.innerHTML = htmls.join("");

const moduleList = document.querySelector(".module-list");
const htmlx = musics.map(function (music) {
    let randomIndex = (Math.floor(Math.random() * 101));
    return `
        <li>
            <div class="main__gallery-details">
                ${music.id} . ${music.title} - ${music.artist}
            </div>
            <div class="main__gallery-action">
                <i class="fa fa-play"></i>
                ${randomIndex}
            </div>
        </li>
    `
})
moduleList.innerHTML = htmlx.join("");

const sidebarContent = document.querySelector(".sidebar__content-suggestNav");
const htmlv = musics.map(function (music) {
    let randomIndex1 = (Math.floor(Math.random() * 101));
    let randomIndex2 = (Math.floor(Math.random() * 101));
    return `
        <li>
            <div class="sidebar__suggestNav-avatar">
                <div class="sidebar__avatar-round">
                    <img src="${music.image}" alt="" class="sidebar__avatar">
                </div>
            </div>
            <div class="sidebar__suggestNav-title">
                <div class="sidebar__title-song">
                                    <a href="" class="sidebar__song-disk">
                                        ${music.title}
                                    </a>
                                </div>
                            <div class="sidebar__title-stats">
                            <a class="sidebar__stats-items">
                                <i class="fa-solid fa-users"></i>
                                ${randomIndex1}
                            </a>
                            <a class="sidebar__stats-items">
                                <i class="fa-solid fa-guitar"></i>
                                ${randomIndex2}
                            </a>
                        </div>
                    </div>
                <div class="sidebar__suggestNav-action">
                <button class="siderbar__action">
                    <i class="fa-solid fa-user-plus"></i>
                    Follow
                </button>
            </div>
        </li>
    `
})
sidebarContent.innerHTML = htmlv.join("");

prevBtn.addEventListener("click", function () {
    changeSong(-1);
});
nextBtn.addEventListener("click", function () {
    changeSong(1);
});
song.addEventListener("ended", handleEndedSong);
function handleEndedSong() {
    if (!isRepeat) {
        changeSong(1);
    }
    else {
        changeSong(0);
        isRepeat = false;
    }
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
    else if (dir === 0) {
        isPlaying = true;
    }
    song.setAttribute("src", `./assets/mp3/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
    musicArtist.textContent = musics[indexSong].artist;
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
    song.setAttribute("src", `./assets/mp3/${musics[randomIndex].file}`);
    musicImage.setAttribute("src", musics[randomIndex].image);
    musicName.textContent = musics[randomIndex].title;
    musicArtist.textContent = musics[randomIndex].artist;
    playPause();
}

replayBtn.addEventListener("click", playRepeat);
function playRepeat() {
    if (!isRepeat)
        isRepeat = true;
    else
        isRepeat = false;
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
function init() {
    displayTimer;
    song.setAttribute("src", `./assets/mp3/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
    musicArtist.textContent = musics[indexSong].artist;
}
init();
// rangeVol.addEventListener("click",handleChangeVol);
// function handleChangeVol() {
//     song.volume = rangeVol.value;
// }