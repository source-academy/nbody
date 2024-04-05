/**
 * Interface for visualizers to implement.
 * @category Visualizers
 * @category Interfaces
 */
export interface Visualizer {
    /**
     * Start the visualization.
     * @param divId id of the div to render the visualizer in.
     * @param width width of the visualizer.
     * @param height height of the visualizer.
     * @param recordFor time to record the visualization for.
     */
    start(divId: string, width: number, height: number, recordFor: number): void;
    /**
     * Stop and clear the visualization.
     */
    stop(): void;
}
