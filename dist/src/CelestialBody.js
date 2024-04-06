/**
 * Represents a celestial body with all of its kinematic properties.
 * @category Building blocks
 */
export class CelestialBody {
    /**
     * Create a new CelestialBody with the provided information.
     * @param label label of the body.
     * @param mass mass of the body.
     * @param position position of the body.
     * @param velocity velocity of the body.
     * @param acceleration acceleration of the body.
     */
    constructor(label, mass, position, velocity, acceleration) {
        this.label = label;
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.acceleration = acceleration;
    }
    /**
     * Deep copy the current CelestialBody with the updated kinematic properties.
     * @param position new position.
     * @param velocity new velocity.
     * @param acceleration new acceleration.
     * @returns a new CelestialBody instance with the updated properties.
     */
    clone(position, velocity, acceleration) {
        return new CelestialBody(this.label, this.mass, position === undefined ? this.position.clone() : position, velocity === undefined ? this.velocity.clone() : velocity, acceleration === undefined ? this.acceleration.clone() : acceleration);
    }
}
