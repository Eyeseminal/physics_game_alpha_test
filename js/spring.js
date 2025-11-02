class Spring {
    constructor(voxel1, voxel2, stiffness = 100, damping = 1, render=false) {
        this.voxel1 = voxel1;
        this.voxel2 = voxel2;
        this.restLength = voxel1.body.position.distanceTo(voxel2.body.position);
        this.stiffness = stiffness;
        this.damping = damping;
        this.broken = false;
        //Visual Line
        // const material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
        // const geometry = new THREE.BufferGeometry();
        // this.line = new THREE.Line(geometry, material);
        // scene.add(this.line);
    }
    
    update() {
        if (this.broken) return;
        
        // Calculate spring force
        const distance = this.voxel1.body.position.distanceTo(this.voxel2.body.position);
        const direction = new CANNON.Vec3();
        this.voxel2.body.position.vsub(this.voxel1.body.position, direction);
        direction.normalize();
        
        const springForce = this.stiffness * (distance - this.restLength);
        
        // Apply damping
        const relativeVelocity = new CANNON.Vec3();
        this.voxel2.body.velocity.vsub(this.voxel1.body.velocity, relativeVelocity);
        const dampingForce = this.damping * relativeVelocity.dot(direction);
        
        const totalForce = springForce + dampingForce;
        const force = direction.scale(totalForce);
        
        // Check if force exceeds breaking threshold
        if (Math.abs(totalForce) > breakingForce) {
            this.break();
            return;
        }
        
        // Apply forces
        this.voxel1.body.applyForce(force, this.voxel1.body.position);
        this.voxel2.body.applyForce(force.negate(), this.voxel2.body.position);
    }

    // renderLine(){
    //     if (this.render && !this.rendered) this.rendered=true;
    //     if (this.line == null) return;
    //     if (!this.render && this.rendered) scene.remove(this.line);
    //     // Update visual line
    //     const positions = new Float32Array([
    //         this.voxel1.body.position.x, this.voxel1.body.position.y, this.voxel1.body.position.z,
    //         this.voxel2.body.position.x, this.voxel2.body.position.y, this.voxel2.body.position.z
    //     ]);
    //     this.line.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    // }
    
    break() {
        this.broken = true;
        // if (this.rendered){
        //     scene.remove(this.line);
        // }
        
        // Remove from neighbors
        const idx1 = this.voxel1.neighbors.indexOf(this.voxel2);
        if (idx1 > -1) this.voxel1.neighbors.splice(idx1, 1);
        
        const idx2 = this.voxel2.neighbors.indexOf(this.voxel1);
        if (idx2 > -1) this.voxel2.neighbors.splice(idx2, 1);
    }
}