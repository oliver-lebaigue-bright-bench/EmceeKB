console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/Blue Bombers.mp3');
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songName: "Blue Bombers", filePath: "songs/Blue Bombers.mp3", coverPath: "covers/1.jpg" },
    { songName: "Doing Better", filePath: "songs/Doing Better.mp3", coverPath: "covers/1.jpg" },
    { songName: "Great Escape", filePath: "songs/Great Escape.mp3", coverPath: "covers/1.jpg" },
    { songName: "Night Sweats", filePath: "songs/Night Sweats.mp3", coverPath: "covers/1.jpg" },
    { songName: "Proud", filePath: "songs/Proud.mp3", coverPath: "covers/1.jpg" },
    { songName: "Slow Song Freestyle", filePath: "songs/Slow Song Freestyle.mp3", coverPath: "covers/1.jpg" },
    { songName: "Wake Me Up", filePath: "songs/Wake Me Up.mp3", coverPath: "covers/1.jpg" },
    { songName: "forever", filePath: "songs/forever.mp3", coverPath: "covers/1.jpg" },
    { songName: "lights on", filePath: "songs/lights on.mp3", coverPath: "covers/1.jpg" },
    { songName: "60 Minutes", filePath: "songs/60 Minutes.mp3", coverPath: "covers/1.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    ProgressBar.value = progress;
})

ProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        // Use currentTarget so clicks on inner SVGs or children still reference the icon element
        songIndex = parseInt(e.currentTarget.id);
        e.currentTarget.classList.remove('fa-play-circle');
        e.currentTarget.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})