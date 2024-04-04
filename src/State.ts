import type { CelestialBody } from './CelestialBody';

/**
 * Represents a Universe's state snapshot.
 * @category Building blocks
 */
export class State {
  /**
   * Array of celestial bodies that make up this state of the Universe.
   */
  readonly bodies: CelestialBody[];

  /**
   * Create a new State with the given celestial bodies.
   * @param bodies array of celestial bodies.
   */
  constructor(bodies: CelestialBody[]) {
    this.bodies = bodies;
  }

  /**
   * Deep copy this state
   * @returns a new State instance.
   */
  clone(): State {
    return new State(this.bodies.map((body) => body.clone()));
  }
}
