//Three.js scene setup
const scene=new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);//0x87ceed => sky blue

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//Lighting
//Ambient lighting to all objects
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

//Directinal light to cast shadows and simulate sun
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 5);
dirLight.castShadow = true;
dirLight.shadow.camera.left = -20;
dirLight.shadow.camera.right = 20;
dirLight.shadow.camera.top = 20;
dirLight.shadow.camera.bottom = -20;
scene.add(dirLight);

//Physics world
const world=new CANNON.World();
world.gravity.set(0,-9.82,0);
world.broadphase=new CANNON.SAPBroadphase(world);
world.allowSleep=true;

//TODO:Add contact+material storage
let materials={}


// Simple default contact material set up (reused)
const defaultMaterial = new CANNON.Material("defaultMaterial");
const defaultContact = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.3,
        restitution: 0.0
    }
);
world.defaultContactMaterial = defaultContact;
world.addContactMaterial(defaultContact);

// Create a global voxel container so Voxel.applyCustomGravity can iterate
const voxels = [];

// Floor generation parameters
const floorRadius = 20;     // same as your -20..20 loops
const voxelSize = 1;        // choose an appropriate size for GPU/physics cost
const floorY = 0;           // y position for floor voxels
const groundMaterial = defaultMaterial; // reuse the default material

for (let i = -floorRadius; i <= floorRadius; i++) {
    for (let j = -floorRadius; j <= floorRadius; j++) {
        // create the Voxel and push to global list
        const vx = i * voxelSize;
        const vz = j * voxelSize;
        const v = new Voxel(vx, floorY, vz, /*vMass=*/0, groundMaterial, voxelSize, /*color=*/0x8B8B8B);
        // Mark static bodies so physics can optimize them
        v.body.type = CANNON.Body.STATIC;
        voxels.push(v);
    }
}