import { Vector3 } from 'three';
import { type State } from '../State';
import { type Transformation } from '../Transformation';
/**
 * Frame of reference transformation to the center of the first body in the system.
 * @category Transformations
 */
export declare class BodyCenterTransformation implements Transformation {
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
