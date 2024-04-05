import type { State } from './State';
/**
 * Represents a function object used for simulating the Universe. Should encapsulate the numerical integration method and other necessary simulation logic. Can use an external force calculation function object - see {@link Force}.
 * @category Interfaces
 * @category SimulateFunctions
 */
export interface SimulateFunction {
    /**
     * Simulate a step in the Universe by using the previous and/or current state and a time step.
     * @param deltaT time step.
     * @param currState current state of the Universe.
     * @param prevState previous state of the Universe.
     * @returns the next state of the Universe.
     */
    simulate(deltaT: number, currState: State, prevState: State): State;
}
/**
 * Function object that uses the user-defined lambda function to simulate the Universe.
 * @category SimulateFunctions
 */
export declare class LambdaSim implements SimulateFunction {
    readonly fn: (deltaT: number, currState: State, prevState: State) => State;
    /**
     * Create a new LambdaSim with the provided lambda function.
     * - The lambda function should take in the time step, the current state of the Universe, and the previous state of the Universe, and return the next state of the Universe.
     * - The lambda function should call or calculate the forces action on the bodies by itself.
     * @param fn lambda function.
     */
    constructor(fn: (deltaT: number, currState: State, prevState: State) => State);
    /**
     * Simulate the Universe using the lambda function.
     * @param deltaT time step.
     * @param currState current state of the Universe.
     * @param prevState previous state of the Universe.
     * @returns the next state of the Universe.
     */
    simulate(deltaT: number, currState: State, prevState: State): State;
}
