// Keyboard input handling
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

// Camera movement speed
const cameraSpeed = 0.15;

// Update camera function
function updateCamera() {
    // Get camera direction vectors
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    camera.getWorldDirection(forward);
    right.crossVectors(forward, camera.up).normalize();
    forward.normalize();
    
    // WASD movement relative to camera direction
    if (keys['w']) {
        camera.position.addScaledVector(forward, cameraSpeed);
    }
    if (keys['s']) {
        camera.position.addScaledVector(forward, -cameraSpeed);
    }
    if (keys['d']) {
        camera.position.addScaledVector(right, cameraSpeed);
    }
    if (keys['a']) {
        camera.position.addScaledVector(right, -cameraSpeed);
    }
    
    // Space and Shift for up/down
    if (keys[' ']) camera.position.y += cameraSpeed;
    if (keys['shift']) camera.position.y -= cameraSpeed;
    
    // Arrow keys to look around
    const up = new THREE.Vector3(0, 1, 0);
    const lookForward = new THREE.Vector3();
    camera.getWorldDirection(lookForward);
    const lookRight = new THREE.Vector3();
    lookRight.crossVectors(lookForward, up).normalize();
    
    let lookTarget = new THREE.Vector3();
    lookTarget.copy(camera.position);
    lookTarget.addScaledVector(lookForward, 10);
    
    if (keys['arrowup']) lookTarget.addScaledVector(up, 0.2);
    if (keys['arrowdown']) lookTarget.addScaledVector(up, -0.2);
    if (keys['arrowleft']) lookTarget.addScaledVector(lookRight, -0.2);
    if (keys['arrowright']) lookTarget.addScaledVector(lookRight, 0.2);
    
    camera.lookAt(lookTarget);
}

// Slider listeners
document.getElementById('stiffnessSlider').addEventListener('input', (e) => {
    springStiffness = parseFloat(e.target.value);
    document.getElementById('stiffnessValue').textContent = springStiffness;
});

document.getElementById('dampingSlider').addEventListener('input', (e) => {
    springDamping = parseFloat(e.target.value);
    document.getElementById('dampingValue').textContent = springDamping.toFixed(1);
});

document.getElementById('breakingSlider').addEventListener('input', (e) => {
    breakingForce = parseFloat(e.target.value);
    document.getElementById('breakingValue').textContent = breakingForce;
});

document.getElementById('explosionSlider').addEventListener('input', (e) => {
    explosionForce = parseFloat(e.target.value);
    document.getElementById('explosionValue').textContent = explosionForce;
});

document.getElementById('explosionXSlider').addEventListener('input', (e) => {
    explosionX = parseFloat(e.target.value);
    document.getElementById('explosionXValue').textContent = explosionX;
});

document.getElementById('explosionYSlider').addEventListener('input', (e) => {
    explosionY = parseFloat(e.target.value);
    document.getElementById('explosionYValue').textContent = explosionY;
});

document.getElementById('explosionZSlider').addEventListener('input', (e) => {
    explosionZ = parseFloat(e.target.value);
    document.getElementById('explosionZValue').textContent = explosionZ;
});