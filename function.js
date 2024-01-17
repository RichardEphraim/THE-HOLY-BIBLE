const images = [
    'images/1.jpg',
    'images/2.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
];

let currentIndex = 0;

    function changeBackground() {
        const backgroundContainer = document.querySelector('.index-content');
        backgroundContainer.style.backgroundImage = `url('${images[currentIndex]}')`;

        // Increment the index for the next image
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Call the changeBackground function initially
    changeBackground();

    // Set an interval to change the background every 3 seconds (adjust as needed)
    setInterval(() => {
        const backgroundContainer = document.querySelector('.index-content');
        backgroundContainer.style.animation = 'none'; 
        changeBackground();
        backgroundContainer.offsetHeight;
        backgroundContainer.style.animation = null; // Re-enable animation
    }, 20000);





