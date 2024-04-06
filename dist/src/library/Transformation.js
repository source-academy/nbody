import { Vector3 } from 'three';
/**
 * Frame of reference transformation to the center of the first body in the system.
 * @category Transformations
 */
export class BodyCenterTransformation {
    /**
     * Transform the frame of reference to the center of the first body in the system.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state) {
        const transform = state.bodies[0].position.clone();
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
export class CoMTransformation {
    /**
     * Transform the frame of reference to the center of mass of the system.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state) {
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
export class RotateTransformation {
    /**
     * Create a new RotateTransformer.
     * @param axis axis to rotate around.
     * @param angle angle to rotate by.
     */
    constructor(axis, angle) {
        this.axis = axis;
        this.angle = angle;
    }
    /**
     * Transform the frame of reference around an axis by an angle.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state) {
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
