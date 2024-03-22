import { type Vector3 } from 'three';

/**
 * Represents a celestial body with all of its kinematic properties.
 */
export class CelestialBody {
  readonly label: string;
  readonly mass: number; // mean mass
  position: Vector3; // ICRF
  velocity: Vector3; // ICRF
  acceleration: Vector3; // ICRF

  /**
   * Create a new CelestialBody with the provided information.
   * @param label label of the body.
   * @param mass mass of the body.
   * @param position position of the body.
   * @param velocity velocity of the body.
   * @param acceleration acceleration of the body.
   */
  constructor(
    label: string,
    mass: number,
    position: Vector3,
    velocity: Vector3,
    acceleration: Vector3,
  ) {
    this.label = label;
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
  }

  /**
   * Deep copy the current CelestialBody with the updated kinematic properties.
   * @param position new position.
   * @param velocity new velocity.
   * @param acceleration new acceleration.
   * @returns a new CelestialBody instance with the updated properties.
   */
  clone(position?: Vector3,
    velocity?: Vector3,
    acceleration?: Vector3): CelestialBody {
    return new CelestialBody(
      this.label,
      this.mass,
      position === undefined ? this.position.clone() : position,
      velocity === undefined ? this.velocity.clone() : velocity,
      acceleration === undefined ? this.acceleration.clone() : acceleration,
    );
  }
}
