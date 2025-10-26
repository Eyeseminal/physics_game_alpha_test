// FPS counter
let lastTime = performance.now();
let frames = 0;

// Spawn initial structure
spawnVoxelStructure();

// Fixed timestep for deterministic physics
const FPS=60;
const FIXED_TIMESTEP = 1/FPS;
let accumulator = 0;
let lastFrameTime = performance.now();

function animate() {
    requestAnimationFrame(animate);
    
    world.step(FIXED_TIMESTEP);
    
    // Update voxels
    voxels.forEach(v => v.update());
    
    // Update springs
    for (let i = springs.length - 1; i >= 0; i--) {
        springs[i].update();
        if (springs[i].broken) {
            springs.splice(i, 1);
        }
    }
    
    // Remove fallen voxels
    for (let i = voxels.length - 1; i >= 0; i--) {
        if (voxels[i].body.position.y < -50) {
            voxels[i].remove();
            voxels.splice(i, 1);
        }
    }
    
    // Update camera and render (outside physics loop)
    updateCamera();
    explosionIndicator.position.set(explosionX, explosionY, explosionZ);
    renderer.render(scene, camera);
    
    // Update UI (move this outside the while loop)
    frames++;
    const now = performance.now();
    if (now >= lastFrameTime + 1000) {
        document.getElementById('fps').textContent = frames;
        document.getElementById('bodies').textContent = world.bodies.length;
        document.getElementById('springs').textContent = springs.length;
        frames = 0;
        lastFrameTime = now;
    }
}