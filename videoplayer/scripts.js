"use strict";

const player = document.querySelector(`.player`);
const video = player.querySelector(`.player__video`);
const controls = player.querySelector(`.player__controls`);


// pause/play
function togglePlay() {
    video.paused ? video.play() : video.pause();
}
controls.querySelector(`.toggle`).addEventListener(`click`, togglePlay);
video.addEventListener(`click`, togglePlay);

// render pause/play button
function renderPlayButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    controls.querySelector(`.toggle`).textContent = icon;
}
video.addEventListener(`pause`, renderPlayButton);
video.addEventListener(`play`, renderPlayButton);

// volume
controls.querySelector(`input[name="volume"]`)
    .addEventListener(`input`, (e) => {
        video.volume = +e.currentTarget.value;
        //console.log(`volume changed to ${video.volume}`);
    });

// speed
controls.querySelector(`input[name="playbackRate"]`)
    .addEventListener(`input`, (e) => {
        video.playbackRate = +e.currentTarget.value;
    });

// clickable progress slider
function track(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    video.currentTime = percentage * video.duration;
}

let mousedown = false;
const progress = controls.querySelector(`.progress`);
window.addEventListener(`mousedown`, () => mousedown = true);
window.addEventListener(`mouseup`, () => mousedown = false);
progress.addEventListener(`mousemove`, (e) => mousedown && track(e));
progress.addEventListener(`click`, track);

// render progress bar
const progressFilled = controls.querySelector(`.progress__filled`);
video.addEventListener(`timeupdate`, (e) => {
    progressFilled.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
});

// jump forward/back
controls.querySelectorAll(`button[data-skip]`)
    .forEach(button => button.addEventListener(`click`, (e) => {
        video.currentTime += (+button.dataset.skip);
    }));