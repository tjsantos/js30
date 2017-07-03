"use strict";

const timeLeft = document.querySelector(`.display__time-left`);
const endTime = document.querySelector(`.display__end-time`);

let timeout;
function setTimer(seconds) {
    clearTimeout(timeout);
    const end = new Date(Date.now() + seconds*1000);

    const hours = end.getHours() % 12 || 12;
    let minutes = end.getMinutes();
    if (minutes < 10) minutes = `0` + minutes;  // left-pad `0`
    endTime.textContent = `Be back at ${hours}:${minutes}`;

    // update time left every second
    (function tick() {
        const diff = end.getTime() - Date.now();  // ms until time is up
        if (diff <= 0) {
            timeLeft.textContent = `0:00`;
        } else {
            let seconds = Math.round(diff / 1000);
            let minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            if (seconds < 10) seconds = `0` + seconds;  // left-pad `0`
            timeLeft.textContent = `${minutes}:${seconds}`;
            document.title = timeLeft.textContent;

            timeout = setTimeout(tick, 1000);
        }
    })();
}

// buttons
document.querySelectorAll(`button.timer__button`).forEach((button) => {
    button.addEventListener(`click`, (e) => {
        setTimer(+button.dataset.time);
    });
});

// form
document.querySelector(`#custom`).addEventListener(`submit`, (e) => {
    const form = e.currentTarget;
    const fd = new FormData(form);
    const minutes = +fd.get(`minutes`);
    if (Number.isFinite(minutes) && minutes > 0) {
        setTimer(minutes * 60);
        form.reset();
    }
    e.preventDefault();
});

setTimer(10);