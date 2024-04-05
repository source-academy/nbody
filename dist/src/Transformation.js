/**
 * A Frame of Reference transformation that uses the user-defined lambda function.
 * @category Transformations
 */
export class LambdaTransformation {
    /**
     * Create a new LambdaTransformer with the provided lambda function.
     * - Lambda function should take in the current state and the time step and return the transformed state.
     * - The time step is only applicable for time-dependent transformations.
     * - Transformed state should contain the same number of bodies as the input state, and the order should be preserved.
     * @param fn lambda function.
     */
    constructor(fn) {
        this.fn = fn;
    }
    /**
     * Transform the state's frame of reference using the lambda function.
     * @param state state to transform.
     * @param deltaT time step taken to get to this state. Only applicable for time-dependent transformations.
     * @returns transformed state.
     */
    transform(state, deltaT) {
        return this.fn(state, deltaT);
    }
}
//# sourceMappingURL=Transformation.js.map