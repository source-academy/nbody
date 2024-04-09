import { type SimulateFunction } from './SimulateFunction';
import { type State } from './State';
import { type Transformation } from './Transformation';

/**
 * Container for a Universe's configuration.
 * @category Types
 */
export type UniverseConfig = {
  /**
   * Previous state of the Universe.
   */
  prevState: State;
  /**
   * Current state of the Universe.
   */
  currState: State;
  /**
   * Color of the bodies in the Universe. A single color applied to all bodies or an array of colors applied to each body respectively. Length of the array should match the number of bodies in the state.
   */
  color: string | string[];
  /**
   * Label of the Universe.
   */
  label: string;
  /**
   * Simulation function used to simulate the Universe.
   */
  simFunc: SimulateFunction;
  /**
   * Array of transformations to be applied to the Universe's state after simulation and before visualization.
   */
  transformations: Transformation[];
};

/**
 * A Universe object that contains previous and current state of the universe, a simulation function, frame of reference transformations and other necessary data.
 * @category Building blocks
 */
export class Universe {
  prevState: State;
  currState: State;
  /**
   * Color of the bodies in the Universe. A single color applied to all bodies or an array of colors applied to each body respectively. Incase of array, length should match the number of bodies in the state.
   */
  color: string | string[];
  /**
   * Label of the Universe.
   */
  label: string;
  /**
   * Simulation function used to simulate the Universe.
   */
  simFunc: SimulateFunction;
  /**
   * Array of transformations to be applied to the Universe's state after simulation and before visualization.
   */
  transformations: Transformation[];

  /**
   * Create a new Universe with the provided configuration.
   * @param config configuration object.
   */
  constructor(config: Partial<UniverseConfig>) {
    if (config.currState === undefined) throw new Error('Missing Current State in Universe');
    if (config.simFunc === undefined) throw new Error('Missing Simulation Function in Universe');
    this.label = config.label === undefined ? 'Universe' : config.label;
    this.prevState
      = config.prevState === undefined ? config.currState : config.prevState;
    this.currState = config.currState;
    this.color
      = config.color === undefined ? 'rgba(255, 255, 255, 1)' : config.color;
    this.simFunc = config.simFunc;
    this.transformations
      = config.transformations === undefined
        ? []
        : config.transformations;
  }

  /**
   * Simulate a step in the Universe using the SimulateFunction and Transformations.
   * @param deltaT time step to simulate.
   * @hidden
   */
  simulateStep(deltaT: number) {
    let newState = this.simFunc.simulate(
      deltaT,
      this.currState,
      this.prevState,
    );
    this.prevState = this.currState;
    this.transformations.forEach((t) => {
      newState = t.transform(newState, deltaT);
    });
    this.currState = newState;
  }

  /**
   * Deep copy the current Universe.
   * @returns a new Universe instance.
   */
  clone(): Universe {
    return new Universe({
      prevState: this.prevState.clone(),
      currState: this.currState.clone(),
      color: this.color,
      label: this.label,
      simFunc: this.simFunc,
      transformations: this.transformations,
    });
  }
}
