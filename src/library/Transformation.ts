import { Vector3 } from 'three';
import { type State } from '../State';
import { type Transformation } from '../Transformation';

/**
 * Frame of reference transformation to the center of the first body in the system.
 */
export class BodyCenterTransformation implements Transformation {
  /**
   * Transform the frame of reference to the center of the first body in the system.
   * @param state state to transform.
   * @returns transformed state.
   */
  transform(state: State): State {
    const transform = state.bodies[0].position.clone();
    state.bodies.forEach((b) => {
      b.position.sub(transform);
    });
    return state;
  }
}

/**
 * Frame of reference transformation to the center of mass of the system.
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

// export class PinTransformer implements Transformer {
//   readonly axis: Vector3;
//   readonly index: number;

//   constructor(axis: Vector3, index: number) {
//     this.axis = axis;
//     this.index = index
//   }

//   transform(state: State): State {
//     const angle = state.bodies[this.index].position.clone().angleTo(this.axis);
//     const pivot = state.bodies[this.index].position.clone().cross(this.axis.clone()).normalize();
//     state.bodies.forEach((b) => {
//       b.position.applyAxisAngle(pivot.clone(), angle);
//       b.velocity.applyAxisAngle(pivot.clone(), angle);
//       b.acceleration.applyAxisAngle(pivot.clone(), angle);
//     });
//     return state;
//   }
// }
