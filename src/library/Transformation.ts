import { Vector3 } from 'three';
import { type State } from '../State';
import { type Transformation } from '../Transformation';

/**
 * Frame of reference transformation to the center of body i in the system.
 * @category Transformations
 */
export class BodyCenterTransformation implements Transformation {
  readonly index: number;

  /**
   * Create a new BodyCenterTransformer.
   * @param index index of the body to transform to.
   */
  constructor(index: number = 0) {
    this.index = index;
  }

  /**
   * Transform the frame of reference to the center of the first body in the system.
   * @param state state to transform.
   * @returns transformed state.
   */
  transform(state: State): State {
    const transform = state.bodies[this.index].position.clone();
    state.bodies.forEach((b) => {
      b.position.sub(transform);
    });
    return state;
  }
}

/**
 * Frame of reference transformation to the center of mass of the system.
 * @category Transformations
 */
export class CoMTransformation implements Transformation {
  /**
   * Transform the frame of reference to the center of mass of the system.
   * @param state state to transform.
   * @returns transformed state.
   */
  transform(state: State): State {
    let totalMass = 0;
    let com = new Vector3();
    state.bodies.forEach((b) => {
      totalMass += b.mass;
      com.add(b.position.clone()
        .multiplyScalar(b.mass));
    });
    com.divideScalar(totalMass);
    state.bodies.forEach((b) => {
      b.position.sub(com);
    });
    return state;
  }
}

/**
 * Frame of reference transformation around an axis by an angle. Makes sense to this transformation only during initialization of the universe and not at every time step.
 * @category Transformations
 */
export class RotateTransformation implements Transformation {
  readonly axis: Vector3;
  readonly angle: number;

  /**
   * Create a new RotateTransformer.
   * @param axis axis to rotate around.
   * @param angle angle to rotate by.
   */
  constructor(axis: Vector3, angle: number) {
    this.axis = axis;
    this.angle = angle;
  }

  /**
   * Transform the frame of reference around an axis by an angle.
   * @param state state to transform.
   * @returns transformed state.
   */
  transform(state: State): State {
    state.bodies.forEach((b) => {
      b.position.applyAxisAngle(this.axis, this.angle);
      b.velocity.applyAxisAngle(this.axis, this.angle);
      b.acceleration.applyAxisAngle(this.axis, this.angle);
    });
    return state;
  }
}

/**
 * Frame of reference transformation to a pin body i to the given axis.
 */
export class PinTransformation implements Transformation {
  readonly axis: Vector3;
  readonly index: number;

  /**
   * Create a new PinTransformer.
   * @param axis axis to pin to.
   * @param index index of the body to pin.
   */
  constructor(axis: Vector3, index: number = 0) {
    this.axis = axis;
    this.index = index;
  }

  /**
   * Transform the frame of reference to a pin body i to the given axis.
   * @param state state to transform.
   * @returns transformed state.
   */
  transform(state: State): State {
    const angle = state.bodies[this.index].position.clone()
      .angleTo(this.axis.clone());
    const pivot = state.bodies[this.index].position.clone()
      .cross(this.axis.clone())
      .normalize();
    state.bodies.forEach((b) => {
      b.position.applyAxisAngle(pivot.clone(), angle);
      b.velocity.applyAxisAngle(pivot.clone(), angle);
      b.acceleration.applyAxisAngle(pivot.clone(), angle);
    });
    return state;
  }
}

/**
 * Frame of reference transformation to rotate around an axis by 360 degrees in a given time.
 */
export class TimedRotateTransformation implements Transformation {
  readonly axis: Vector3;
  readonly revolutionTime: number;

  /**
   * Create a new TimedRotateTransformer.
   * @param axis axis to rotate around.
   * @param revolutionTime time in seconds for one full revolution.
   */
  constructor(axis: Vector3, revolutionTime: number) {
    this.axis = axis;
    this.revolutionTime = revolutionTime;
  }

  /**
   * Transform the frame of reference to rotate around an axis by an angle determined by the time elapsed.
   * @param state state to transform.
   * @param deltaT time elapsed.
   * @returns transformed state.
   */
  transform(state: State, deltaT: number): State {
    const angle = -(deltaT / this.revolutionTime) * Math.PI * 2;
    state.bodies.forEach((b) => {
      b.position.applyAxisAngle(this.axis, angle);
      b.velocity.applyAxisAngle(this.axis, angle);
      b.acceleration.applyAxisAngle(this.axis, angle);
    });
    return state;
  }
}
