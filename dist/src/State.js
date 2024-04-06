/**
 * Represents a Universe's state snapshot.
 * @category Building blocks
 */
export class State {
    /**
     * Create a new State with the given celestial bodies.
     * @param bodies array of celestial bodies.
     */
    constructor(bodies) {
        this.bodies = bodies;
    }
    /**
     * Deep copy this state
     * @returns a new State instance.
     */
    clone() {
        return new State(this.bodies.map((body) => body.clone()));
    }
}
