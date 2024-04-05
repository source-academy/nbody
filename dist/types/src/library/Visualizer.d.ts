import * as THREE from 'three';
import { type Simulation } from '../Simulation';
import { type Visualizer } from '../Visualizer';
/**
 * Container object for body trails in a 2D universe based in Plotly.
 */
declare class PlotlyUniverseTrail {
    data: {
        x: (number | null)[];
        y: (number | null)[];
        mode: 'markers';
        marker: {
            size: number;
            color: string;
        };
    };
    trailLength: number;
    maxTrailLength: number;
    trailInd: number;
    /**
     * Constructor for PlotlyUniverseTrail
     * @param maxTrailLength max number of trail points to keep.
     * @param color color of the trail.
     */
    constructor(maxTrailLength: number, color: string);
    /**
     * Add a trail point to the trail data, or replace an existing trail point if the max trail length has been reached.
     * @param x x position.
     * @param y y position.
     */
    addTrail(x: number, y: number): void;
    /**
     * Pop all trail points from the trail data.
     */
    popAllTrails(): void;
}
/**
 * 2D real-time visualizer using Plotly.
 * @category Visualizers
 */
export declare class RealTimeVisualizer implements Visualizer {
    simulation: Simulation;
    divId: string;
    universeTrails: PlotlyUniverseTrail[];
    /**
     * Constructor for RealTimeVisualizer
     * @param simulation simulation object
     */
    constructor(simulation: Simulation);
    /**
     * Adds default controls using lil-gui to the visualization.
     * @param parentElement parent element to place the controller div in.
     */
    private addControls;
    /**
     * Simulate and play the visualization.
     * @param divId div id to render the visualization in.
     * @param width width of the visualization.
     * @param height height of the visualization.
     */
    start(divId: string, width: number, height: number): void;
    /**
     * Stop the simulation and visualization.
     */
    stop(): void;
}
/**
 * Container object for body trails in a 3D universe based in Three.js.
 */
declare class ThreeUniverseTrail {
    /**
     * Singular Points object containing all trail points.
     */
    trails: THREE.Points;
    trailInd: number;
    trailLength: number;
    maxTrailLength: number;
    /**
     * Constructor for ThreeUniverseTrail.
     * @param maxTrailLength max number of trail points to keep.
     * @param color color of the trace points.
     * @param scene scene to add trail points object to.
     * @param scale scale of the visualizationl, used to set the size of the trail point.
     */
    constructor(maxTrailLength: number, color: string, scene: THREE.Scene, scale: number);
    /**
     * Add a trail point at the given position to the scene. Replace an existing trail point if the max trail length has been reached.
     * @param pos position to add trace point at.
     */
    addTrail(pos: THREE.Vector3): void;
    /**
     * Pop all trail points.
     */
    popAllTrails(): void;
}
/**
 * 3D real-time visualizer using Three.js.
 * @category Visualizers
 */
export declare class RealTimeVisualizer3D implements Visualizer {
    simulation: Simulation;
    scene?: THREE.Scene;
    universeTrails: ThreeUniverseTrail[];
    /**
     * Constructor for RealTimeVisualizer3D.
     * @param simulation simulation object.
     */
    constructor(simulation: Simulation);
    /**
     * Adds default controls to the visualization.
     * @param parentElement parent element to place the controller div in.
     */
    private addControls;
    /**
     * Simulate and play the visualization
     * @param divId div id to render the visualization in
     * @param width width of the visualization.
     * @param height height of the visualization.
     */
    start(divId: string, width: number, height: number): void;
    /**
     * Stop the simulation and visualization.
     */
    stop(): void;
}
/**
 * 2D recording visualizer using Plotly.
 * @category Visualizers
 */
export declare class RecordingVisualizer implements Visualizer {
    simulation: Simulation;
    divId: string;
    universeTrails: PlotlyUniverseTrail[];
    /**
     * Constructor for RealTimeVisualizer
     * @param simulation simulation object
     */
    constructor(simulation: Simulation);
    /**
     * Adds default controls using lil-gui to the visualization.
     * @param parentElement parent element to place the controller div in.
     */
    private addControls;
    /**
     * Simulate and play the visualization.
     * @param divId div id to render the visualization in.
     * @param width width of the visualization.
     * @param height height of the visualization.
     * @param recordFor number of seconds to record for..
     */
    start(divId: string, width: number, height: number, recordFor: number): void;
    /**
     * Stop the simulation and visualization.
     */
    stop(): void;
}
/**
 * 3D recording visualizer using Three.js.
 * @category Visualizers
 */
export declare class RecordingVisualizer3D implements Visualizer {
    simulation: Simulation;
    scene?: THREE.Scene;
    universeTrails: ThreeUniverseTrail[];
    /**
     * Constructor for RealTimeVisualizer3D.
     * @param simulation simulation object.
     */
    constructor(simulation: Simulation);
    /**
     * Adds default controls to the visualization.
     * @param parentElement parent element to place the controller div in.
     */
    private addControls;
    /**
     * Simulate and play the visualization
     * @param divId div id to render the visualization in.
     * @param width width of the visualization.
     * @param height height of the visualization.
     * @param recordFor number of seconds to record for.
     */
    start(divId: string, width: number, height: number, recordFor: number): void;
    /**
     * Stop the simulation and visualization.
     */
    stop(): void;
}
export {};
