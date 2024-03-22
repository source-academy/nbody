import type { Vector3 } from 'three';
import type { CelestialBody } from './CelestialBody';

/**
 * Represents a force object used to calculate forces acting on the bodies in the Universe.
 */
export interface Force {
  getForces(bodies: CelestialBody[]): Vector3[];
}

/**
 * Function object that uses the user-defined lambda function to calculate the forces acting on the bodies.
 */
export class LambdaForce implements Force {
  readonly fn: (bodies: CelestialBody[]) => Vector3[];

  /**
   * Create a new LambdaForce with the provided lambda function. Lambda function should take in an array of CelestialBodies and return an array of forces acting on the bodies.
   * @param fn lambda function.
   */
  constructor(fn: (bodies: CelestialBody[]) => Vector3[]) {
    this.fn = fn;
  }


  /**
   * Get the forces acting on the bodies.
   * @param bodies array of CelestialBodies.
   * @returns array of forces acting on the bodies.
   */
  getForces(bodies: CelestialBody[]): Vector3[] {
    return this.fn(bodies);
  }
}
