//Ravi for Music


document.addEventListener('DOMContentLoaded', function () {
    const playPauseButton = document.getElementById('play-pause');
    const audio = document.getElementById('audio');

    playPauseButton.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            playPauseButton.classList.remove('play');
            playPauseButton.classList.add('pause');
        } else {
            audio.pause();
            playPauseButton.classList.remove('pause');
            playPauseButton.classList.add('play');
        }
    });

});



