let songs = [
  {
    name: 'Untuk Perempuan yang Sedang dalam Pelukan',
    path: 'musik/Payung Teduh - Untuk Perempuan Yang Sedang Di Pelukan.mp3',
    artis: 'Payung Teduh',
    cover: 'gambar/cover1.jpeg',
  },
  {
    name: 'Angin Pujaan Hujan',
    path: 'musik/Payung Teduh - Angin Pujaan Hujan.mp3',
    artis: 'Payung Teduh',
    cover: 'gambar/cover2.jpeg',
  },
  {
    name: 'Akad',
    path: 'musik/Payung Teduh - Akad.mp3',
    artis: 'Payung Teduh',
    cover: 'gambar/cover3.jpeg',
  },
  {
    name: 'Ruang Tunggu',
    path: 'musik/Pusakata - Ruang Tunggu.mp3',
    artis: 'Pusakata',
    cover: 'gambar/cover4.jpeg',
  },
];

let currentMusic = 0;

const music = document.querySelector("#audio");
const seek = document.querySelector(".seek-bar");
const namaLagu = document.querySelector(".lagu");
const namaArtis = document.querySelector(".artis");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const durasiLagu = document.querySelector(".durasi");
const playBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".btn-next");
const backBtn = document.querySelector(".btn-back");

playBtn.addEventListener("click", () => {
  if (playBtn.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle("pause");
  disk.classList.toggle("play");
});
const setMusik = (i) => {
  seek.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;

  namaLagu.innerHTML = song.name;
  namaArtis.innerHTML = song.artis;
  disk.style.backgroundImage = `url('${song.cover}')`;

  currentTime.innerHTML = '00:00';
  setTimeout(() => {
    seek.max = music.duration;
    durasiLagu.innerHTML = formatTime(music.duration);
  }, 300);
};
setMusik(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

setInterval(() => {
  seek.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seek.max)) {
    nextBtn.click();
  }
}, 500);

seek.addEventListener("change", () => {
  music.currentTime = seek.value;
});

const playMusik = () => {
  music.play();
  playBtn.classList.remove("pause");
  disk.classList.add("play");
};

nextBtn.addEventListener("click", () => {
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusik(currentMusic);
  playMusik();
});

backBtn.addEventListener("click", () => {
  if (currentMusic <= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic--;
  }
  setMusik(currentMusic);
  playMusik();
});