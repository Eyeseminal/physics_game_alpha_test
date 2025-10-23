// Seeded random number generator (Mulberry32 algorithm)
class SeededRNG {
    constructor(seed) {
        this.seed = seed;
    }
    
    next() {
        let t = this.seed += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
    
    // Convenience methods
    range(min, max) {
        return min + this.next() * (max - min);
    }
    
    int(min, max) {
        return Math.floor(this.range(min, max + 1));
    }
    
    color() {
        return this.int(0, 0xffffff);
    }
}

// Global RNG instance
let rng = new SeededRNG(12345); // Default seed

function setSeed(seed) {
    rng = new SeededRNG(seed);
}