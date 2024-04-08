import { Vector3 } from 'three';
import { type State } from '../State';
import { type Transformation } from '../Transformation';
/**
 * Frame of reference transformation to the center of body i in the system.
 * @category Transformations
 */
export declare class BodyCenterTransformation implements Transformation {
    readonly index: number;
    /**
     * Create a new BodyCenterTransformer.
     * @param index index of the body to transform to.
     */
    constructor(index: number);
    /**
     * Transform the frame of reference to the center of the first body in the system.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state: State): State;
}
/**
 * Frame of reference transformation to the center of mass of the system.
 * @category Transformations
 */
export declare class CoMTransformation implements Transformation {
    /**
     * Transform the frame of reference to the center of mass of the system.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state: State): State;
}
/**
 * Frame of reference transformation around an axis by an angle. Makes sense to this transformation only during initialization of the universe and not at every time step.
 * @category Transformations
 */
export declare class RotateTransformation implements Transformation {
    readonly axis: Vector3;
    readonly angle: number;
    /**
     * Create a new RotateTransformer.
     * @param axis axis to rotate around.
     * @param angle angle to rotate by.
     */
    constructor(axis: Vector3, angle: number);
    /**
     * Transform the frame of reference around an axis by an angle.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state: State): State;
}
/**
 * Frame of reference transformation to a pin body i to the given axis.
 */
export declare class PinTransformation implements Transformation {
    readonly axis: Vector3;
    readonly index: number;
    /**
     * Create a new PinTransformer.
     * @param axis axis to pin to.
     * @param index index of the body to pin.
     */
    constructor(axis: Vector3, index: number);
    /**
     * Transform the frame of reference to a pin body i to the given axis.
     * @param state state to transform.
     * @returns transformed state.
     */
    transform(state: State): State;
}
/**
 * Frame of reference transformation to rotate around an axis by 360 degrees in a given time.
 */
export declare class TimedRotateTransformation implements Transformation {
    readonly axis: Vector3;
    readonly revolutionTime: number;
    /**
     * Create a new TimedRotateTransformer.
     * @param axis axis to rotate around.
     * @param revolutionTime time in seconds for one full revolution.
     */
    constructor(axis: Vector3, revolutionTime: number);
    /**
     * Transform the frame of reference to rotate around an axis by an angle determined by the time elapsed.
     * @param state state to transform.
     * @param deltaT time elapsed.
     * @returns transformed state.
     */
    transform(state: State, deltaT: number): State;
}
