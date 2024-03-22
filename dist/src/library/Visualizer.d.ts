import { type PlotType } from 'plotly.js-dist';
import * as THREE from 'three';
import { type Simulation } from '../Simulation';
import { type State } from '../State';
import { type Visualizer } from '../Visualizer';
/**
 * 2D real-time visualizer using Plotly.
 */
export declare class RealTimeVisualizer implements Visualizer {
    simulation: Simulation;
    divId: string;
    type: PlotType;
    readonly speeds: number[];
    playing: boolean;
    /**
     * Constructor for RealTimeVisualizer
     * @param simulation simulation object
     */
    constructor(simulation: Simulation);
    /**
     * Simulate and play the visualization
     * @param divId div id to render the visualization in
     * @param timeScale initial time scale
     */
    play(divId: string, timeScale: number): void;
    /**
     * Pause the simulation and visualization.
     */
    pause(): void;
    /**
     * Resume the simulation and visualization.
     */
    resume(): void;
    /**
     * Stop the simulation and visualization.
     */
    stop(): void;
}
/**
 * Container object for tracer points in a universe.
 */
declare class UniverseTracer {
    traced: (THREE.Points | undefined)[];
    traceInd: number;
    maxTraceLength: number;
    /**
     * Constructor for UniverseTracer
     * @param maxTraceLength max number of trace points to keep
     */
    constructor(maxTraceLength: number);
    /**
     * Add a trace point at the given position to the scene, scaled appropriately. Remove an existing trace point if the max trace length has been reached.
     * @param pos position to add trace point at
     * @param scene scene to add trace point to
     * @param scale scale to apply to position
     */
    addTrace(pos: THREE.Vector3, scene: THREE.Scene, scale: number): void;
    /**
     * Pop the last trace point from the scene.
     * @param scene scene to remove trace point from.
     * @returns true if a trace point was removed, false otherwise.
     */
    popTrace(scene: THREE.Scene): boolean;
    /**
     * Pop all trace points from the scene.
     * @param scene scene to remove trace points from.
     */
    popAllTraces(scene: THREE.Scene): void;
}
/**
 * 3D real-time visualizer using Three.js.
 */
export declare class RealTimeVisualizer3D implements Visualizer {
    simulation: Simulation;
    divId: string;
    readonly speeds: number[];
    playing: boolean;
    universeTracers: UniverseTracer[];
    maxTraceLength: number;
    /**
     * Constructor for RealTimeVisualizer3D
     * @param simulation simulation object
     */
    constructor(simulation: Simulation);
    /**
     * Simulate and play the visualization
     * @param divId div id to render the visualization in
     * @param timeScale initial time scale
     */
    play(divId: string, timeScale: number): void;
    /**
     * Pause the simulation and visualization.
     */
    pause(): void;
    /**
     * Resume the simulation and visualization.
     */
    resume(): void;
    /**
     * Stop the simulation and visualization.
     */
    stop(): void;
}
/**
 * 2D recording visualizer using Plotly.
 */
export declare class RecordingVisualizer implements Visualizer {
    simulation: Simulation;
    divId: string;
    type: PlotType;
    readonly speeds: number[];
    playing: boolean;
    /**
     * Constructor for RecordingVisualizer
     * @param simulation simulation object
     * @param recordFor duration to record for
     */
    constructor(simulation: Simulation, recordFor: number);
    /**
     * Simulate, record and play the visualization on loop.
     * @param divId div id to render the visualization in
     * @param timeScale initial time scale
     */
    play(divId: string, timeScale: number): void;
    /**
     * Pause the visualization.
     */
    pause(): void;
    /**
     * Resume the visualization.
     */
    resume(): void;
    /**
     * Stop the visualization.
     */
    stop(): void;
}
/**
 * 3D recording visualizer using Three.js.
 */
export declare class RecordingVisualizer3D implements Visualizer {
    simulation: Simulation;
    divId: string;
    readonly speeds: number[];
    playing: boolean;
    universeTracers: UniverseTracer[];
    maxTraceLength: number;
    recordFor: number;
    recordedFrames: State[];
    playInd: number;
    /**
     * Constructor for RecordingVisualizer3D.
     * @param simulation simulation object.
     * @param recordFor duration to record for.
     */
    constructor(simulation: Simulation, recordFor: number);
    /**
     * Simulate, record and play the visualization on loop.
     * @param divId div id to render the visualization in.
     * @param timeScale initial time scale.
     */
    play(divId: string, timeScale: number): void;
    /**
     * Pause the visualization.
     */
    pause(): void;
    /**
     * Resume the visualization.
     */
    resume(): void;
    /**
     * Stop the visualization.
     */
    stop(): void;
}
export {};
