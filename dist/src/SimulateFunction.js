/**
 * Function object that uses the user-defined lambda function to simulate the Universe.
 * @category SimulateFunctions
 */
export class LambdaSim {
    /**
     * Create a new LambdaSim with the provided lambda function.
     * - The lambda function should take in the time step, the current state of the Universe, and the previous state of the Universe, and return the next state of the Universe.
     * - The lambda function should call or calculate the forces action on the bodies by itself.
     * @param fn lambda function.
     */
    constructor(fn) {
        this.fn = fn;
    }
    /**
     * Simulate the Universe using the lambda function.
     * @param deltaT time step.
     * @param currState current state of the Universe.
     * @param prevState previous state of the Universe.
     * @returns the next state of the Universe.
     */
    simulate(deltaT, currState, prevState) {
        return this.fn(deltaT, currState, prevState);
    }
}
