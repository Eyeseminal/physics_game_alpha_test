bodyA.addEventListener('collide', (event) => {
    // The event object gives you access to the bodies involved
    const collidingBody = event.body; // The body that emitted the event (bodyA)
    const contactWith = event.contact.bi === collidingBody ? event.contact.bj : event.contact.bi; // The body it collided with (bodyB)

    // Get the materials from the bodies
    const material1 = collidingBody.material;
    const material2 = contactWith.material;

    console.log('Collision detected!');
    console.log('Colliding body material:', material1.name);
    console.log('Collided with material:', material2.name);
});