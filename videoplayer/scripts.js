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


// jump forward/back