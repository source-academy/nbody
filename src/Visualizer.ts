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
   * @param recordSpeed speed to record the visualization at.
   */
  start(divId: string, width: number, height: number, recordFor: number, recordSpeed: number): void;

  /**
   * Clear all trails in the visualization.
   * @param i index of the universe to clear trails for. If not provided, clears trails for all universes.
   */
  clearTrails(i?: number): void;

  /**
   * Stop and clear the visualization.
   */
  stop(): void;
}
