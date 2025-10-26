class Voxel {
    constructor(x, y, z, color = 0x00ff00) {
        // Physics body
        const shape = new CANNON.Box(new CANNON.Vec3(voxelSize/2, voxelSize/2, voxelSize/2));
        this.body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(x, y, z),
            material: voxelMaterial
        });
        this.body.addShape(shape);
        world.addBody(this.body);
        
        // Visual mesh
        const geometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
        const material = new THREE.MeshStandardMaterial({ color: color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        scene.add(this.mesh);
        
        this.neighbors = [];
    }
    
    update() {
        // Update visual mesh
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
        
        // Custom gravity (optional)
        if (customGravityEnabled) {
            this.applyCustomGravity();
        }
    }
    
    applyCustomGravity() {
        // Apply gravitational attraction to nearby voxels
        for (let other of voxels) {
            if (other === this) continue;
            
            const dx = other.body.position.x - this.body.position.x;
            const dy = other.body.position.y - this.body.position.y;
            const dz = other.body.position.z - this.body.position.z;
            const distSq = dx*dx + dy*dy + dz*dz;
            const dist = Math.sqrt(distSq);
            
            if (dist < 10 && dist > 0.1) {
                const G = 5;
                const force = G * this.body.mass * other.body.mass / distSq;
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                const fz = (dz / dist) * force;
                
                this.body.applyForce(new CANNON.Vec3(fx, fy, fz), this.body.position);
            }
        }
    }
    
    remove() {
        world.removeBody(this.body);
        scene.remove(this.mesh);
    }
}