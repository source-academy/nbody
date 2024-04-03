import { type State } from './State';

/**
 * Represents a Frame of Reference transformation.
 * @category Interfaces
 * @category Transformations
 */
export interface Transformation {
  /**
   * Transform the state to a new frame of reference.
   * @param state state to transform.
   * @param deltaT time step taken to get to this state. Only applicable for time-dependent transformations.
   * @returns transformed state.
   */
  transform(state: State, deltaT: number): State;
}

/**
 * A Frame of Reference transformation that uses the user-defined lambda function.
 * @category Transformations
 */
export class LambdaTransformation implements Transformation {
  readonly fn: (state: State, deltaT: number) => State;

  /**
   * Create a new LambdaTransformer with the provided lambda function.
   * - Lambda function should take in the current state and the time step and return the transformed state.
   * - The time step is only applicable for time-dependent transformations.
   * - Transformed state should contain the same number of bodies as the input state, and the order should be preserved.
   * @param fn lambda function.
   */
  constructor(fn: (state: State, deltaT: number) => State) {
    this.fn = fn;
  }

  /**
   * Transform the state's frame of reference using the lambda function.
   * @param state state to transform.
   * @param deltaT time step taken to get to this state. Only applicable for time-dependent transformations.
   * @returns transformed state.
   */
  transform(state: State, deltaT: number): State {
    return this.fn(state, deltaT);
  }
}
