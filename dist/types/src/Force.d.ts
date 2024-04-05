import type { Vector3 } from 'three';
import type { CelestialBody } from './CelestialBody';
/**
 * Represents a force object used to calculate forces acting on the bodies in the Universe.
 * @category Forces
 * @category Interfaces
 */
export interface Force {
    getForces(bodies: CelestialBody[]): Vector3[];
}
/**
 * Function object that uses the user-defined lambda function to calculate the forces acting on the bodies.
 * @category Forces
 */
export declare class LambdaForce implements Force {
    /**
     * Lambda function to calculate forces, provided by the user.
     */
    readonly fn: (bodies: CelestialBody[]) => Vector3[];
    /**
     * Create a new LambdaForce with the provided lambda function.
     * - Lambda function should take in an array of CelestialBodies and return an array of forces acting on the bodies.
     * - arr[i] should represent the force acting on the ith body.
     * - Length of the returned array should be equal to the length of the input array of CelestialBodies.
     * @param fn lambda function.
     */
    constructor(fn: (bodies: CelestialBody[]) => Vector3[]);
    /**
     * Get the forces acting on the bodies.
     * @param bodies array of CelestialBodies.
     * @returns array of forces acting on the bodies.
     */
    getForces(bodies: CelestialBody[]): Vector3[];
}
