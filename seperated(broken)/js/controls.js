let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let isLocked = false;

let yawObject, pitchObject;

function initControls(camera, domElement) {
    // Create objects for pitch (vertical) and yaw (horizontal)
    yawObject = new THREE.Object3D();
    pitchObject = new THREE.Object3D();

    yawObject.add(pitchObject);
    pitchObject.add(camera);

    // Pointer lock
    domElement.addEventListener("click", () => {
        domElement.requestPointerLock();
    });

    document.addEventListener("pointerlockchange", () => {
        isLocked = document.pointerLockElement === domElement;
    });

    document.addEventListener("mousemove", (event) => {
        if (!isLocked) return;

        const movementX = event.movementX || 0;
        const movementY = event.movementY || 0;

        yawObject.rotation.y -= movementX * 0.002;
        pitchObject.rotation.x -= movementY * 0.002;

        // Limit vertical look (avoid flipping)
        pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitchObject.rotation.x));
    });

    // Keyboard input
    document.addEventListener("keydown", (e) => {
        switch (e.code) {
        case "KeyW": moveForward = true; break;
        case "KeyS": moveBackward = true; break;
        case "KeyA": moveLeft = true; break;
        case "KeyD": moveRight = true; break;
        }
    });

    document.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "KeyW": moveForward = false; break;
        case "KeyS": moveBackward = false; break;
        case "KeyA": moveLeft = false; break;
        case "KeyD": moveRight = false; break;
    }
    });

  return yawObject; // attach this to the scene
}

function updateControls(delta) {
    if (!isLocked) return;

    const speed = 5.0;

    // Dampen velocity
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    // Movement direction
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize();

    if (moveForward || moveBackward) velocity.z -= direction.z * speed * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * speed * delta;

    // Apply movement relative to camera yaw
    yawObject.translateX(velocity.x * delta);
    yawObject.translateZ(velocity.z * delta);
}
