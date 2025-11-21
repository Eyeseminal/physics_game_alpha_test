function startGameLoop() {
    let previousTime = performance.now();

    function animate() {
        requestAnimationFrame(animate);

        const currentTime = performance.now();
        const delta = (currentTime - previousTime) / 1000;
        previousTime = currentTime;

        updateControls(delta);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate();
}
