/**
 * Function object that uses the user-defined lambda function to calculate the forces acting on the bodies.
 * @category Forces
 */
export class LambdaForce {
    /**
     * Create a new LambdaForce with the provided lambda function.
     * - Lambda function should take in an array of CelestialBodies and return an array of forces acting on the bodies.
     * - arr[i] should represent the force acting on the ith body.
     * - Length of the returned array should be equal to the length of the input array of CelestialBodies.
     * @param fn lambda function.
     */
    constructor(fn) {
        this.fn = fn;
    }
    /**
     * Get the forces acting on the bodies.
     * @param bodies array of CelestialBodies.
     * @returns array of forces acting on the bodies.
     */
    getForces(bodies) {
        return this.fn(bodies);
    }
}
//# sourceMappingURL=Force.js.map