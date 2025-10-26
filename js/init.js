function init_world() {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    dirLight.shadow.camera.left = -20;
    dirLight.shadow.camera.right = 20;
    dirLight.shadow.camera.top = 20;
    dirLight.shadow.camera.bottom = -20;
    scene.add(dirLight);

    // Physics world
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;

    // Ground plane
    const groundShape = new CANNON.Box(new CANNON.Vec3(25, 0.5, 25));
    const groundBody = new CANNON.Body({ mass: 0, position: new CANNON.Vec3(0, -0.5, 0) });
    groundBody.addShape(groundShape);
    world.addBody(groundBody);

    const groundGeo = new THREE.PlaneGeometry(50, 50);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Voxel management
    const voxels = [];
    const springs = [];
    const voxelSize = 1;
    let breakingForce = 100;
    let customGravityEnabled = false;

    // Voxel material
    const voxelMaterial = new CANNON.Material('voxel');
    const contactMaterial = new CANNON.ContactMaterial(voxelMaterial, voxelMaterial, {
        friction: 0.3,
        restitution: 0.3
    });
    world.addContactMaterial(contactMaterial);

    // Global parameters
    let springStiffness = 200;
    let springDamping = 1;
    let explosionForce = 2000;
    let explosionX = 0;
    let explosionY = 5;
    let explosionZ = 0;

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}