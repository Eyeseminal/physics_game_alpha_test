// Spawn functions
function spawnVoxel() {
    const x = rng.range(-2, 2);
    const y = rng.range(10, 15);
    const z = rng.range(-2, 2);
    const color = rng.color();
    
    const voxel = new Voxel(x, y, z, color);
    voxels.push(voxel);
}

function spawnVoxelStructure() {
    const baseX = rng.range(-2, 2);
    const baseY = 10;
    const baseZ = rng.range(-2, 2);
    const color = rng.color();
    
    // Create a 3x3x3 cube structure
    const structure = [];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const voxel = new Voxel(
                    baseX + x * voxelSize,
                    baseY + y * voxelSize,
                    baseZ + z * voxelSize,
                    color
                );
                voxels.push(voxel);
                structure.push(voxel);
            }
        }
    }
    
    // Connect adjacent voxels with springs
    for (let i = 0; i < structure.length; i++) {
        for (let j = i + 1; j < structure.length; j++) {
            const dist = structure[i].body.position.distanceTo(structure[j].body.position);
            if (dist < voxelSize * 1.1) {
                const spring = new Spring(structure[i], structure[j], springStiffness, springDamping);
                springs.push(spring);
                structure[i].neighbors.push(structure[j]);
                structure[j].neighbors.push(structure[i]);
            }
        }
    }
}

function toggleGravity() {
    if (customGravityEnabled) {
        world.gravity.set(0, -9.82, 0);
        customGravityEnabled = false;
    } else {
        world.gravity.set(0, 0, 0);
        customGravityEnabled = true;
    }
}

function applyExplosion() {
    const explosionCenter = new CANNON.Vec3(explosionX, explosionY, explosionZ);
    
    voxels.forEach(voxel => {
        const direction = new CANNON.Vec3();
        voxel.body.position.vsub(explosionCenter, direction);
        const distance = direction.length();
        const forcedegredationspeed = 10;
        
        if (distance < explosionForce / forcedegredationspeed) {
            direction.normalize();
            const force = direction.scale(explosionForce / (distance + 1));
            voxel.body.wakeUp();
            voxel.body.applyImpulse(force, voxel.body.position);
        }
    });
}

function clearAll() {
    // Remove all voxels
    for (let i = voxels.length - 1; i >= 0; i--) {
        voxels[i].remove();
    }
    voxels.length = 0;
    
    // Remove all springs
    for (let spring of springs) {
        scene.remove(spring.line);
    }
    springs.length = 0;
}