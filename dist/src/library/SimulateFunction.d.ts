import { type Force } from '../Force';
import { type SimulateFunction } from '../SimulateFunction';
import { State } from '../State';
/**
 * Represents a simulation function object that uses the [Velocity Verlet integration method](https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet) to simulate the motion of bodies.
 * @category SimulateFunctions
 */
export declare class VelocityVerletSim implements SimulateFunction {
    /**
     * Force object to calculate forces on bodies in the Universe.
     */
    forceCalculator: Force;
    /**
     * Create a new VelocityVerletSim with the provided force calculator, which is invoked on every simulation step.
     * @param forceCalculator force calculator.
     */
    constructor(forceCalculator: Force);
    /**
     * Simulate a step in the Universe by using the previous and/or current state and a time step, using the Velocity Verlet integration method.
     * @param deltaT time step.
     * @param currState current state.
     * @returns new state after the simulation step.
     */
    simulate(deltaT: number, currState: State): State;
    /**
     * Calculate the new position of a body in the following way:
     *
     * newPos = currPos + currVel * deltaT + 0.5 * currAccel * deltaT^2.
     * @param currPos current position.
     * @param currVel current velocity.
     * @param currAccel current acceleration.
     * @param deltaT time step.
     * @returns new position.
     * @hidden
     */
    private calcNewPos;
}
/**
 * Represents a simulation function object that uses the [Euler integration method](https://en.wikipedia.org/wiki/Euler_method) to simulate motions of bodies.
 * @category SimulateFunctions
 */
export declare class ExplicitEulerSim implements SimulateFunction {
    /**
     * Force object to calculate forces on bodies in the Universe.
     */
    force: Force;
    /**
     * Create a new ExplicitEulerSim with the provided force calculator, which is invoked on every simulation step.
     * @param force force calculator.
     */
    constructor(force: Force);
    /**
     * Simulate a step in the Universe by using the current state and a time step, using the Euler integration method.
     * @param deltaT time step.
     * @param currState current state.
     * @returns new state after the simulation step.
     */
    simulate(deltaT: number, currState: State): State;
    /**
     * Update a vector quantity using the rate of change and a time step.
     * @param prev previous value.
     * @param rate rate of change.
     * @param deltaT time step.
     * @returns updated value.
     * @hidden
     */
    private rateUpdate;
}
/**
 * Represents a simulation function object that uses the [Semi-Implicit Euler integration method](https://en.wikipedia.org/wiki/Semi-implicit_Euler_method) to simulate the motion of bodies.
 * @category SimulateFunctions
 */
export declare class SemiImplicitEulerSim implements SimulateFunction {
    /**
     * Force object to calculate forces on bodies in the Universe.
     */
    force: Force;
    /**
     * Create a new SemiImplicitEulerSim with the provided force calculator, which is invoked on every simulation step.
     * @param force force calculator.
     */
    constructor(force: Force);
    /**
     * Simulate a step in the Universe by using the current state and a time step, using the Semi-Implicit Euler integration method.
     * @param deltaT time step.
     * @param currState current state.
     * @returns new state after the simulation step.
     */
    simulate(deltaT: number, currState: State): State;
    /**
     * Update a vector quantity using the rate of change and a time step.
     * @param prev previous value.
     * @param rate rate of change.
     * @param deltaT time step.
     * @returns updated value.
     * @hidden
     */
    private rateUpdate;
}
/**
 * Represents a simulation function object that uses the [Runge-Kutta 4 integration method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods) to simulate the motion of bodies.
 * @category SimulateFunctions
 */
export declare class RungeKutta4Sim implements SimulateFunction {
    /**
     * Force object to calculate forces on bodies in the Universe.
     */
    force: Force;
    /**
     * Weights for weighted average.
     */
    weights: number[];
    /**
     * Create a new RungeKutta4Sim with the provided weights for average force calculator, which is invoked on every simulation step.
     * @param force force calculator.
     * @param weights weights for weighted average.
     */
    constructor(force: Force, weights: number[]);
    /**
     * Simulate a step in the Universe by using the current state and a time step, using the Runge-Kutta 4 integration method.
     * @param deltaT time step.
     * @param currState current state.
     * @returns new state after the simulation step.
     */
    simulate(deltaT: number, currState: State): State;
    /**
     * Get intermediate velocity rate values.
     * @param bodies current bodies.
     * @param bodiesK intermediate kinematic rate values for all bodies.
     * @param krInd index of intermediate kinematic rate value to base the new intermediate value on.
     * @param deltaT time step.
     * @returns next intermediate velocity rate values for all bodies.
     * @hidden
     */
    private getInterKV;
    /**
     * Get intermediate position rate values.
     * @param bodies current bodies.
     * @param bodiesK intermediate kinematic rate values for all bodies.
     * @param kInd index of intermediate kinematic rate value to base the new intermediate value on.
     * @param deltaT time step.
     * @returns next intermediate position rate values for all bodies.
     * @hidden
     */
    private getInterKX;
}
