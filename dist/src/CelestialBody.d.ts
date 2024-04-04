import { type Vector3 } from 'three';
/**
 * Represents a celestial body with all of its kinematic properties.
 * @category Building blocks
 */
export declare class CelestialBody {
    /**
     * Label of the body.
     */
    readonly label: string;
    /**
     * Mean mass of the body.
     */
    readonly mass: number;
    /**
     * Position vector of the body.
     */
    position: Vector3;
    /**
     * Velocity vector of the body.
     */
    velocity: Vector3;
    /**
     * Acceleration vector of the body.
     */
    acceleration: Vector3;
    /**
     * Create a new CelestialBody with the provided information.
     * @param label label of the body.
     * @param mass mass of the body.
     * @param position position of the body.
     * @param velocity velocity of the body.
     * @param acceleration acceleration of the body.
     */
    constructor(label: string, mass: number, position: Vector3, velocity: Vector3, acceleration: Vector3);
    /**
     * Deep copy the current CelestialBody with the updated kinematic properties.
     * @param position new position.
     * @param velocity new velocity.
     * @param acceleration new acceleration.
     * @returns a new CelestialBody instance with the updated properties.
     */
    clone(position?: Vector3, velocity?: Vector3, acceleration?: Vector3): CelestialBody;
}
