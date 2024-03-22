import { type Universe } from './Universe';
import { type Visualizer } from './Visualizer';
import {
  RealTimeVisualizer,
  RealTimeVisualizer3D,
  RecordingVisualizer,
  RecordingVisualizer3D,
} from './library/Visualizer';

export type VisType = '2D' | '3D';

/**
 * A Simulation object that contains Universes and a Visualizer.
 */
export class Simulation {
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
  constructor(
    universes: Universe | Universe[],
    visType: VisType,
    record?: boolean,
    recordFor?: number,
  ) {
    this.universes = Array.isArray(universes) ? universes : [universes];
    if (this.universes.length > 10) {
      throw new Error('Too many universes');
    }
    const uniqueLabels = new Set(this.universes.map((u) => u.label));
    if (uniqueLabels.size !== this.universes.length) {
      throw new Error('Duplicate label in universes');
    }
    if (record) {
      if (recordFor === undefined) {
        throw new Error('recordFor must be defined if record is true');
      }
      if (this.universes.length > 1) {
        throw new Error('Cannot record multiple universes');
      }
      this.visualizer
        = visType === '2D'
          ? new RecordingVisualizer(this, recordFor)
          : new RecordingVisualizer3D(this, recordFor);
    } else {
      this.visualizer
        = visType === '2D'
          ? new RealTimeVisualizer(this)
          : new RealTimeVisualizer3D(this);
    }
  }

  /**
   * Simulates a single step in this simulation.
   * @param deltaT time step to simulate.
   */
  simulateStep(deltaT: number) {
    this.universes.forEach((universe) => {
      universe.simulateStep(deltaT);
    });
  }

  /**
   *
   */
  getVisState() {}

  /**
   * Insert the simulation visualization in the div with the given id.
   * @param divId div id.
   * @param timeScale initial time scale.
   */
  play(divId: string, timeScale: number = 1) {
    this.visualizer.play(divId, timeScale);
  }

  /**
   * Pause the simulation.
   */
  pause(): void {
    this.visualizer.pause();
  }

  /**
   * Resume the simulation.
   */
  resume(): void {
    this.visualizer.resume();
  }

  /**
   * Stop the simulation.
   */
  stop(): void {
    this.visualizer.stop();
  }
}
