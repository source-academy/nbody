import { Vector3 } from 'three';
import { type CelestialBody } from '../CelestialBody';
import { type Force } from '../Force';
/**
 * Represents a [Newtonian Gravitational force](https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation) object.
 * @category Forces
 */
export declare class Gravity implements Force {
    /**
     * Gravitational constant.
     * @defaultValue 6.674e-11
     */
    readonly G: number;
    /**
     * Create a new Gravity with the provided gravitational constant.
     * @param G gravitational constant.
     */
    constructor(G?: number);
    /**
     * Calculate and return the forces acting on the bodies. arr[i] represents the force acting on the ith body as a result of all other bodies.
     * @param bodies celestial bodies
     * @returns forces
     */
    getForces(bodies: CelestialBody[]): Vector3[];
    /**
     * Calculate the gravitational force acting on body a due to body b.
     * @param a body a.
     * @param b body b.
     * @returns gravitational force of a on b.
     * @hidden
     */
    private calcNewtonian;
}
/**
 * Represents a [Centripetal force](https://en.wikipedia.org/wiki/Centripetal_force) object. To be used to calculate the force required to keep the bodies in circular motion around a given center.
 * @category Forces
 */
export declare class CentripetalForce implements Force {
    /**
     * Center of force.
     */
    readonly center: Vector3;
    /**
     * Create a new CentripetalForce with the provided center of force.
     * @param center center of force.
     */
    constructor(center?: Vector3);
    /**
     * Calculate the force required to keep the bodies in circular motion around the center. arr[i] represents the centripetal force required for the ith body.
     * @param bodies celestial bodies.
     * @returns forces.
     */
    getForces(bodies: CelestialBody[]): Vector3[];
}
/**
 * Represents a combined force object. To be used to additively combine multiple forces acting on a system of bodies.
 * @category Forces
 */
export declare class CombinedForce implements Force {
    forces: Force[];
    /**
     * Create a new CombinedForce with the provided forces.
     * @param forces array of forces.
     */
    constructor(forces: Force[]);
    /**
     * Get the combined forces acting on the bodies. arr[i] represents the combined force acting on the ith body as a result of all force systems.
     * @param bodies celestial bodies.
     * @returns element-wise combined forces.
     */
    getForces(bodies: CelestialBody[]): Vector3[];
}
