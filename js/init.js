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
world.gracity.set(0,-9.82,0);
world.broadphase=new CANNON.SAPBroadphase(world);
world.allowSleep=true;

//TODO:Add contact+material storage
let materials={}

//Floor
for (let i=-20;i<=20;i++){
    for (let j=-20;j<=20;j++){
        let grounmaterial=new CANNON.Material("groundMaterial");
        let contactGroudVoxel=new CANNON.ContactMaterial(grounmaterial)
        tmpvoxel=new Voxel(i,0,j,0,);
    }
}