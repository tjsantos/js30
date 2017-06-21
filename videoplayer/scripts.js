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
const progress = controls.querySelector(`.progress`);
progress.addEventListener(`click`, (e) => {
   const rect = e.currentTarget.getBoundingClientRect();
   const percentage = (e.clientX - rect.left) / rect.width;
   video.currentTime = percentage * video.duration;
});

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