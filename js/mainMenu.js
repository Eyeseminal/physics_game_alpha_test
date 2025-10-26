document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameCanvas.style.display = 'block';
        
        // Initialize and start the game
        init_world();
        animate();
    });
});