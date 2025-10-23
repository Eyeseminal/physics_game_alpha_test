document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('startScreen');
    const startButton = document.getElementById('startButton');
    const gameCanvas = document.getElementById('gameCanvas');
    const ctx = gameCanvas.getContext('2d');

    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameCanvas.style.display = 'block';
        
        // Initialize and start the game here
        // For demonstration, a simple message on the canvas
        gameCanvas.width = 800;
        gameCanvas.height = 600;
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Started!', 300, 300);
        
        // In a real game, you would call your game initialization function here
        // e.g., startGameLoop();
    });
});