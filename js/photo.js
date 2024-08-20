document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.getElementById('slideshow-container');
    const playPauseButton = document.getElementById('play-pausephoto');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const imageCount = 10000;
    let currentIndex = 0;
    let isPlaying = true;
    let slideInterval;

    // Generate image elements dynamically using local image paths
    for (let i = 1; i <= imageCount; i++) {
        const img = document.createElement('img');
        img.src = `img/photo/${i}.jpg`; // Use your local image path
        if (i === 1) img.classList.add('active'); // Make the first image active
        slideshowContainer.appendChild(img);
    }

    const images = document.querySelectorAll('.slideshow-container img');

    function changeSlide(direction) {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + direction + imageCount) % imageCount;
        images[currentIndex].classList.add('active');
    }

    function startSlideShow() {
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 3000); // Change slide every 3 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    prevButton.addEventListener('click', () => {
        changeSlide(-1);
    });

    nextButton.addEventListener('click', () => {
        changeSlide(1);
    });

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            stopSlideShow();
            playPauseButton.textContent = '▶️'; // Change to play icon
        } else {
            startSlideShow();
            playPauseButton.textContent = '⏸️'; // Change to pause icon
        }
        isPlaying = !isPlaying;
    });

    slideshowContainer.addEventListener('mouseenter', () => {
        stopSlideShow();
    });

    slideshowContainer.addEventListener('mouseleave', () => {
        if (isPlaying) startSlideShow();
    });

    // Start the slideshow on load
    startSlideShow();
});
