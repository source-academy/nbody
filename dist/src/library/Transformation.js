import { Vector3 } from 'three';
/**
 * Frame of reference transformation to the center of body i in the system.
 * @category Transformations
 */
export class BodyCenterTransformation {
    /**
     * Create a new BodyCenterTransformer.
     * @param index index of the body to transform to.
     */
    constructor(index) {
        this.index = index;
    }
    /**
     * Transform the frame of reference to the center of the first body in the system.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state) {
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
/**
 * Frame of reference transformation to a pin body i to the given axis.
 */
export class PinTransformation {
    /**
     * Create a new PinTransformer.
     * @param axis axis to pin to.
     * @param index index of the body to pin.
     */
    constructor(axis, index) {
        this.axis = axis;
        this.index = index;
    }
    /**
     * Transform the frame of reference to a pin body i to the given axis.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state) {
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
export class TimedRotateTransformation {
    /**
     * Create a new TimedRotateTransformer.
     * @param axis axis to rotate around.
     * @param revolutionTime time in seconds for one full revolution.
     */
    constructor(axis, revolutionTime) {
        this.axis = axis;
        this.revolutionTime = revolutionTime;
    }
    /**
     * Transform the frame of reference to rotate around an axis by an angle determined by the time elapsed.
     * @param state state to transform.
     * @param deltaT time elapsed.
     * @returns transformed state.
     */
    transform(state, deltaT) {
        const angle = -(deltaT / this.revolutionTime) * Math.PI * 2;
        state.bodies.forEach((b) => {
            b.position.applyAxisAngle(this.axis, angle);
            b.velocity.applyAxisAngle(this.axis, angle);
            b.acceleration.applyAxisAngle(this.axis, angle);
        });
        return state;
    }
}
