const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

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
    ctx.drawImage(video, 0, 0);
    requestAnimationFrame(computeFrame);
}