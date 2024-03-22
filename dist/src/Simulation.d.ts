import { type Universe } from './Universe';
import { type Visualizer } from './Visualizer';
export type VisType = '2D' | '3D';
/**
 * A Simulation object that contains Universes and a Visualizer.
 */
export declare class Simulation {
    visualizer: Visualizer;
    /**
     * Array of Universes that make up this simulation. All universes are simulated independently and visualized together.
     */
    universes: Universe[];
    /**
     * Create a new Simulation object with the provided Universes and visualization config.
     * @param universes array of Universes.
     * @param visType type of visualization.
     * @param record whether to record the simulation.
     * @param recordFor how long to record the simulation for.
     */
    constructor(universes: Universe | Universe[], visType: VisType, record?: boolean, recordFor?: number);
    /**
     * Simulates a single step in this simulation.
     * @param deltaT time step to simulate.
     */
    simulateStep(deltaT: number): void;
    /**
     *
     */
    getVisState(): void;
    /**
     * Insert the simulation visualization in the div with the given id.
     * @param divId div id.
     * @param timeScale initial time scale.
     */
    play(divId: string, timeScale?: number): void;
    /**
     * Pause the simulation.
     */
    pause(): void;
    /**
     * Resume the simulation.
     */
    resume(): void;
    /**
     * Stop the simulation.
     */
    stop(): void;
}
