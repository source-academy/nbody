import { type SimulateFunction } from './SimulateFunction';
import { type State } from './State';
import { type Transformation } from './Transformation';
/**
 * Container for a Universe's configuration.
 */
export type UniverseConfig = {
    prevState: State;
    currState: State;
    color: string | string[];
    label: string;
    simFunc: SimulateFunction;
    transformations: Transformation[];
};
/**
 * A Universe object that contains previous and current state of the universe, a simulation function, frame of reference transformations and other necessary data.
 */
export declare class Universe {
    prevState: State;
    currState: State;
    /**
     * Color of the bodies in the Universe. A single color applied to all bodies or an array of colors applied to each body respectively.
     */
    color: string | string[];
    label: string;
    simFunc: SimulateFunction;
    /**
     * Array of transformations to be applied to the Universe's state after simulation and before visualization.
     */
    transformations: Transformation[];
    /**
     * Create a new Universe with the provided configuration.
     * @param config configuration object.
     */
    constructor(config: Partial<UniverseConfig>);
    /**
     * Simulate a step in the Universe using the SimulateFunction and Transformations.
     * @param deltaT time step to simulate.
     */
    simulateStep(deltaT: number): void;
    /**
     * Deep copy the current Universe.
     * @returns a new Universe instance.
     */
    clone(): Universe;
}
