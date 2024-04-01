import { type Universe } from './Universe';
import { type Visualizer } from './Visualizer';
export type VisType = '2D' | '3D';
export type ControllerType = 'default' | 'manual' | 'none';
/**
 * A Simulation object that contains Universes and a Visualizer.
 */
export declare class Simulation {
    readonly visualizer: Visualizer;
    /**
     * Array of Universes that make up this simulation. All universes are simulated independently and visualized together.
     */
    readonly universes: Universe[];
    readonly controller: ControllerType;
    maxFrameRate: number;
    maxTrailLength: number;
    looped: boolean;
    controls: {
        speed: number;
        paused: boolean;
        showTrails: boolean;
        showUniverse: {
            [key: string]: boolean;
        };
    };
    showDebugInfo: boolean;
    /**
     * Create a new Simulation object with the provided Universes and visualization config.
     * @param universes array of Universes.
     * @param visType visualization type.
     * @param record whether to record the simulation.
     * @param looped whether to loop the recorded simulation.
     * @param controller controller type.
     * @param showTrails whether to show trails in the visualization.
     * @param showDebugInfo whether to show debug info in the visualization.
     * @param maxFrameRate maximum frame rate of the visualization.
     * @param maxTrailLength maximum trail for each universe.
     */
    constructor(universes: Universe | Universe[], { visType, record, looped, controller, showTrails, showDebugInfo, maxFrameRate, maxTrailLength, }: {
        visType?: VisType;
        record?: boolean;
        looped?: boolean;
        controller?: ControllerType;
        showTrails?: boolean;
        showDebugInfo?: boolean;
        maxFrameRate?: number;
        maxTrailLength?: number;
    });
    /**
     * Get the speed of the simulation.
     * @returns speed of the simulation as a scale of normal time.
     */
    getSpeed(): number;
    /**
     * Set the speed of the simulation. Only works if the controller is 'manual'.
     * @param speed speed of the simulation as a scale of normal time.
     */
    setSpeed(speed: number): void;
    /**
     * Get whether the simulation is playing.
     * @returns true if the simulation is playing.
     */
    isPlaying(): boolean;
    /**
     * Pause the simulation. Only works if the controller is 'manual'.
     */
    pause(): void;
    /**
     * Resume the simulation. Only works if the controller is 'manual'.
     */
    resume(): void;
    /**
     * Get whether trails are shown in the visualization.
     * @returns true if trails are shown.
     */
    getShowTrails(): boolean;
    /**
     * Set whether to show trails in the visualization. Only works if the controller is 'manual'.
     * @param showTrails true to show trails.
     */
    setShowTrails(showTrails: boolean): void;
    /**
     * True if the universe with the given label is shown.
     * @param label universe label.
     * @returns whether the universe is shown.
     */
    getShowUniverse(label: string): boolean;
    /**
     * Set whether to show the universe with the given label. Only works if the controller is 'manual'.
     * @param label universe label.
     * @param show true to show the universe.
     */
    setShowUniverse(label: string, show: boolean): void;
    /**
     * Get the maximum trail length used in the visualization.
     * @returns maximum trail length.
     */
    getMaxTrailLength(): number;
    /**
     * Set the maximum trail length used in the visualization. Changes only apply on the next Simulation.play() call.
     * @param maxTrailLength maximum trail length.
     */
    setMaxTrailLength(maxTrailLength: number): void;
    /**
     * Simulates a single step in this simulation.
     * @param deltaT time step to simulate.
     */
    simulateStep(deltaT: number): void;
    /**
     * Insert the simulation visualization in the div with the given id.
     * @param divId div id.
     * @param speed initial time scale.
     * @param paused whether to start the simulation paused.
     * @param recordFor number of seconds to record for, only used if in record mode.
     */
    start(divId: string, width: number, height: number, speed?: number, paused?: boolean, recordFor?: number): void;
    /**
     * Stop the simulation.
     */
    stop(): void;
}
