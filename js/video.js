document.addEventListener('DOMContentLoaded', () => {
    // Array to store all video elements
    const videos = Array.from(document.querySelectorAll('video'));

    videos.forEach((video, index) => {
        const playPauseButton = document.getElementById(`play-pause-${index + 1}`);
        const volumeSlider = document.getElementById(`volume-${index + 1}`);
        const progressBarContainer = document.getElementById(`progress-bar-${index + 1}`).parentElement;
        const progressBar = document.getElementById(`progress-bar-${index + 1}`);
        const fullscreenButton = document.getElementById(`fullscreen-${index + 1}`);
        const currentTimeDisplay = document.getElementById(`current-time-${index + 1}`);
        const durationDisplay = document.getElementById(`duration-${index + 1}`);

        // Play/Pause Video
        playPauseButton.addEventListener('click', () => {
            if (video.paused) {
                pauseAllVideos();
                video.play();
                playPauseButton.textContent = '⏸️';
            } else {
                video.pause();
                playPauseButton.textContent = '▶️';
            }
        });

        // Update Progress Bar as video plays
        video.addEventListener('timeupdate', () => {
            const progressPercentage = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progressPercentage}%`;

            // Update time display
            currentTimeDisplay.textContent = formatTime(video.currentTime);
        });

        // Seek through video
        progressBarContainer.addEventListener('click', (e) => {
            const rect = progressBarContainer.getBoundingClientRect();
            const position = (e.clientX - rect.left) / rect.width;
            video.currentTime = position * video.duration;
        });

        // Volume Control
        volumeSlider.addEventListener('input', (e) => {
            video.volume = e.target.value;
        });

        // Fullscreen Toggle
        fullscreenButton.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                video.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        // Update duration display
        video.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(video.duration);
        });

        // Pause all other videos when one is playing
        function pauseAllVideos() {
            videos.forEach(v => {
                if (v !== video) {
                    v.pause();
                    document.getElementById(`play-pause-${videos.indexOf(v) + 1}`).textContent = '▶️';
                }
            });
        }

        // Helper function to format time in mm:ss
        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    });
});
