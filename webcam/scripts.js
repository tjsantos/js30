"use strict";

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

let frameId;
const options = {
    mirrored: false,
};

navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(stream => {
        video.srcObject = stream;
        video.play();
        video.addEventListener(`loadedmetadata`, () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            requestAnimationFrame(computeFrame);
        });
    })
    .catch(err => {
        console.log("An error occured! " + err);
    });

function computeFrame(timestamp) {
    ctx.drawImage(video, 0, 0);  // intermediate data to manipulate
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    manipulateImage(frame);
    ctx.putImageData(frame, 0, 0);

    requestAnimationFrame(computeFrame);
}

function manipulateImage(frame) {
    const {data, width, height} = frame;
    if (options.mirrored) {
        // mirror the image
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width/2; i++) {
                const left = 4 * (j*width + i);
                const right = 4 * (j*width + (width - 1 - i));

                const tempr = data[left + 0];
                const tempg = data[left + 1];
                const tempb = data[left + 2];
                const tempa = data[left + 3];
                data[left + 0] = data[right + 0];
                data[left + 1] = data[right + 1];
                data[left + 2] = data[right + 2];
                data[left + 3] = data[right + 3];
                data[right + 0] = tempr;
                data[right + 1] = tempg;
                data[right + 2] = tempb;
                data[right + 3] = tempa;
            }
        }
    }
}

function takePhoto() {
    let img = document.createElement(`img`);
    img.src = canvas.toDataURL(`image/jpeg`);
    img.alt = `webcam capture at ` + new Date().toLocaleString();
    strip.appendChild(img);
}

document.querySelector(`input[name="mirrored"]`).addEventListener(`change`, (e) => {
    options.mirrored = e.currentTarget.checked;
});