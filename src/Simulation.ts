/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/check-param-names */
import { type Universe } from './Universe';
import { type Visualizer } from './Visualizer';
import {
  RealTimeVisualizer,
  RealTimeVisualizer3D,
  RecordingVisualizer,
  RecordingVisualizer3D,
} from './library/Visualizer';

/**
 * Visualization type.
 * @category Types
 */
export type VisType = '2D' | '3D';
/**
 * Controller type.
 * - 'ui' for user interface control.
 * - 'code' for manual control via code.
 * - 'none' for no control.
 * @category Types
 */
export type ControllerType = 'ui' | 'code' | 'none';

/**
 * A Simulation object that contains Universes and a Visualizer.
 * @category Building blocks
 */
export class Simulation {
  /**
   * Visualization object used to render the simulation.
   * @hidden
   */
  readonly visualizer: Visualizer;
  /**
   * Array of Universes that make up this simulation. All universes are simulated independently and visualized together.
   * @hidden
   */
  readonly universes: Universe[];
  /**
   * Controller type used to control the simulation.
   * @hidden
   */
  readonly controller: ControllerType;
  /**
   * Maximum frame rate of the visualization.
   * @hidden
   */
  maxFrameRate: number;
  /**
   * Maximum trail length used in the visualization.
   * @hidden
   */
  maxTrailLength: number;
  /**
   * Whether the simulation is looped in case of a recording.
   * @hidden
   */
  looped: boolean;

  /**
   * Controls object used to control the simulation.
   * @hidden
   */
  controls: {
    /**
     * Speed of the simulation as a scale of normal time.
     */
    speed: number;
    /**
     * True if the simulation is paused.
     */
    paused: boolean;
    /**
     * True if trails are shown in the visualization.
     */
    showTrails: boolean;
    /**
     * Object containing whether each universe is shown in the visualization.
     */
    showUniverse: {
      [key: string]: boolean;
    };
  } = {
      speed: 1,
      paused: true,
      showTrails: false,
      showUniverse: {},
    };
  /**
   * True if debug info is shown in the visualization.
   * @hidden
   */
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
  constructor(
    universes: Universe | Universe[],
    {
      visType = '2D',
      record = false,
      looped = true,
      controller = 'none',
      showTrails = false,
      showDebugInfo = false,
      maxFrameRate = -1,
      maxTrailLength = 100,
    }: {
      visType?: VisType;
      record?: boolean;
      looped?: boolean;
      controller?: ControllerType;
      showTrails?: boolean;
      showDebugInfo?: boolean;
      maxFrameRate?: number;
      maxTrailLength?: number;
    },
  ) {
    this.universes = Array.isArray(universes) ? universes : [universes];
    if (this.universes.length > 10) {
      throw new Error('Too many universes');
    }
    const uniqueLabels = new Set(this.universes.map((u) => u.label));
    if (uniqueLabels.size !== this.universes.length) {
      throw new Error('Duplicate label in universes');
    }
    this.controller = controller;
    this.universes.forEach((u) => {
      this.controls.showUniverse[u.label] = true;
    });
    this.controls.showTrails = showTrails;
    this.showDebugInfo = showDebugInfo;
    this.maxFrameRate = maxFrameRate;
    this.maxTrailLength = maxTrailLength;
    this.looped = looped;
    if (record) {
      // if (this.universes.length > 1) {
      //   throw new Error("Cannot record multiple universes");
      // }
      this.maxFrameRate = 60;
      this.visualizer
        = visType === '2D'
          ? new RecordingVisualizer(this)
          : new RecordingVisualizer3D(this);
    } else {
      this.visualizer
        = visType === '2D'
          ? new RealTimeVisualizer(this)
          : new RealTimeVisualizer3D(this);
    }
  }

  /**
   * Get the speed of the simulation.
   * @returns speed of the simulation as a scale of normal time.
   */
  getSpeed(): number {
    return this.controls.speed;
  }

  /**
   * Set the speed of the simulation. Only works if the controller is 'code'.
   * @param speed speed of the simulation as a scale of normal time.
   */
  setSpeed(speed: number) {
    if (this.controller === 'code') {
      this.controls.speed = speed;
    }
  }

  /**
   * Get whether the simulation is playing.
   * @returns true if the simulation is playing.
   */
  isPlaying(): boolean {
    return !this.controls.paused;
  }

  /**
   * Pause the simulation. Only works if the controller is 'code'.
   */
  pause(): void {
    if (this.controller === 'code') {
      this.controls.paused = true;
    }
  }

  /**
   * Resume the simulation. Only works if the controller is 'code'.
   */
  resume(): void {
    if (this.controller === 'code') {
      this.controls.paused = false;
    }
  }

  /**
   * Get whether trails are shown in the visualization.
   * @returns true if trails are shown.
   */
  getShowTrails(): boolean {
    return this.controls.showTrails;
  }

  /**
   * Set whether to show trails in the visualization. Only works if the controller is 'code'.
   * @param showTrails true to show trails.
   */
  setShowTrails(showTrails: boolean): void {
    if (this.controller === 'code') {
      this.controls.showTrails = showTrails;
      if (!showTrails) {
        // TODO
      }
    }
  }

  /**
   * True if the universe with the given label is shown.
   * @param label universe label.
   * @returns whether the universe is shown.
   */
  getShowUniverse(label: string): boolean {
    return this.controls.showUniverse[label];
  }

  /**
   * Set whether to show the universe with the given label. Only works if the controller is 'code'.
   * @param label universe label.
   * @param show true to show the universe.
   */
  setShowUniverse(label: string, show: boolean) {
    if (this.controller === 'code') {
      this.controls.showUniverse[label] = show;
    }
  }

  /**
   * Get the maximum trail length used in the visualization.
   * @returns maximum trail length.
   */
  getMaxTrailLength(): number {
    return this.maxTrailLength;
  }

  /**
   * Set the maximum trail length used in the visualization. Changes only apply on the next Simulation.play() call.
   * @param maxTrailLength maximum trail length.
   */
  setMaxTrailLength(maxTrailLength: number): void {
    if (this.controller === 'code') {
      this.maxTrailLength = maxTrailLength;
    }
  }

  /**
   * Simulates a single step in this simulation.
   * @param deltaT time step to simulate.
   * @hidden
   */
  simulateStep(deltaT: number): void {
    this.universes.forEach((universe) => {
      universe.simulateStep(deltaT);
    });
  }

  /**
   * Insert the simulation visualization in the div with the given id.
   * @param divId div id.
   * @param speed initial time scale.
   * @param paused whether to start the simulation paused.
   * @param recordFor number of seconds to record for, only used if in record mode.
   */
  start(
    divId: string,
    width: number,
    height: number,
    speed: number = 1,
    paused: boolean = false,
    recordFor: number = 0,
  ): void {
    if (recordFor === undefined) {
      throw new Error('recordFor must be defined if record is true');
    }
    this.controls.paused = paused;
    this.controls.speed = speed;
    this.visualizer.start(divId, width, height, recordFor);
  }

  /**
   * Stop and clear the simulation.
   */
  stop(): void {
    this.visualizer.stop();
  }
}
