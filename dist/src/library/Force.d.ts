import { Vector3 } from 'three';
import { type CelestialBody } from '../CelestialBody';
import { type Force } from '../Force';
/**
 * Represents a gravitational force object.
 */
export declare class Gravity implements Force {
    readonly G: number;
    /**
     * Create a new Gravity with the provided gravitational constant.
     * @param G gravitational constant.
     */
    constructor(G?: number);
    /**
     * Get the forces acting on the bodies.
     * @param bodies celestial bodies
     * @returns forces
     */
    getForces(bodies: CelestialBody[]): Vector3[];
    /**
     * Calculate the gravitational force between two bodies.
     * @param a body a.
     * @param b body b.
     * @returns gravitational force of a on b.
     */
    calcNewtonian(a: CelestialBody, b: CelestialBody): Vector3;
}
/**
 * Represents a centripetal force object.
 */
export declare class CentripetalForce implements Force {
    center: Vector3;
    /**
     * Create a new CentripetalForce with the provided center of force.
     * @param center center of force.
     */
    constructor(center?: Vector3);
    /**
     * Get the forces acting on the bodies.
     * @param bodies celestial bodies.
     * @returns forces.
     */
    getForces(bodies: CelestialBody[]): Vector3[];
}
/**
 * Represents a combined force object. To be used to additively combined multiple acting forces of a system of bodies.
 */
export declare class CombinedForce implements Force {
    forces: Force[];
    /**
     * Create a new CombinedForce with the provided forces.
     * @param forces array of forces.
     */
    constructor(forces: Force[]);
    /**
     * Get the combined forces acting on the bodies.
     * @param bodies celestial bodies.
     * @returns element-wise combined forces.
     */
    getForces(bodies: CelestialBody[]): Vector3[];
}
