// Handles showing/hiding the main menu
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";

    initScene(); // from init.js
    startGameLoop(); // from main.js
});
