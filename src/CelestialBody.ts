import { type Vector3 } from 'three';

/**
 * Represents a celestial body with all of its kinematic properties.
 * @category Building blocks
 */
export class CelestialBody {
  /**
   * Label of the body.
   */
  readonly label: string;
  /**
   * Mean mass of the body.
   */
  readonly mass: number; // mean mass
  /**
   * Mean mass of the body.
   */
  readonly radius: number; // mean radius
  /**
   * Position vector of the body.
   */
  position: Vector3;
  /**
   * Velocity vector of the body.
   */
  velocity: Vector3;
  /**
   * Acceleration vector of the body.
   */
  acceleration: Vector3;

  /**
   * Create a new CelestialBody with the provided information.
   * @param label label of the body.
   * @param mass mass of the body.
   * @param radius radius of the body.
   * @param position position of the body.
   * @param velocity velocity of the body.
   * @param acceleration acceleration of the body.
   */
  constructor(
    label: string,
    mass: number,
    radius: number,
    position: Vector3,
    velocity: Vector3,
    acceleration: Vector3,
  ) {
    this.label = label;
    this.mass = mass;
    this.radius = radius;
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
      this.radius,
      position === undefined ? this.position.clone() : position,
      velocity === undefined ? this.velocity.clone() : velocity,
      acceleration === undefined ? this.acceleration.clone() : acceleration,
    );
  }
}
