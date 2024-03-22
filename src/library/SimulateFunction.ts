import { Vector3 } from 'three';
import { type CelestialBody } from '../CelestialBody';
import { type Force } from '../Force';
import { type SimulateFunction } from '../SimulateFunction';
import { State } from '../State';

// export class VerletSim implements SimulateFunction {
//   forceCalculator: Force;
//   prevDeltaT: number | undefined = undefined;

//   constructor(forceCalculator: Force) {
//     this.forceCalculator = forceCalculator;
//   }

//   private fromOneState(
//     currState: State,
//     deltaT: number,
//     forces: Vector3[]
//   ): State {
//     let updatedBodies: CelestialBody[] = currState.bodies.map((body, index) => {
//       const currAccel = forces[index].divideScalar(body.mass);
//       const newPos = currAccel
//         .clone()
//         .multiplyScalar(deltaT / 2)
//         .add(body.velocity)
//         .multiplyScalar(deltaT)
//         .add(body.position);
//       return body.clone(
//         newPos,
//         this.verletVel(body.position, newPos, deltaT),
//         currAccel
//       );
//     });

//     this.prevDeltaT = deltaT;
//     return new State(updatedBodies);
//   }

//   simulate(deltaT: number, currState: State, prevState?: State): State {
//     if (deltaT <= 0) {
//       return currState.clone();
//     }

//     let forces = this.forceCalculator.getForces(currState.bodies);
//     if (forces.length !== currState.bodies.length) {
//       console.error(`forces length !== number of bodies`);
//       return currState.clone();
//     }

//     if (prevState === undefined) {
//       return this.fromOneState(currState, deltaT, forces);
//     }

//     let updatedBodies: CelestialBody[] = currState.bodies.map((body, index) => {
//       const currAccel = forces[index].divideScalar(body.mass);
//       const newPos = this.verletPos(
//         prevState.bodies[index].position,
//         body.position,
//         currAccel,
//         deltaT
//       );
//       return body.clone(
//         newPos,
//         this.verletVel(body.position, newPos, deltaT),
//         currAccel
//       );
//     });

//     this.prevDeltaT = deltaT;
//     return new State(updatedBodies);
//   }

//   verletPos(
//     oldPos: Vector3,
//     currPos: Vector3,
//     currAccel: Vector3,
//     deltaT: number
//   ): Vector3 {
//     const prevDT = this.prevDeltaT === undefined ? deltaT : this.prevDeltaT;

//     return currAccel
//       .clone()
//       .multiplyScalar((prevDT + deltaT) / 2)
//       .add(currPos.clone().sub(oldPos).divideScalar(prevDT))
//       .multiplyScalar(deltaT)
//       .add(currPos);
//   }

//   verletVel(currPos: Vector3, newPos: Vector3, deltaT: number): Vector3 {
//     return newPos.clone().sub(currPos).divideScalar(deltaT);
//   }
// }

/**
 * Represents a simulation function object that uses the [Velocity Verlet integration method](https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet) to simulate the motion of bodies.
 */
export class VelocityVerletSim implements SimulateFunction {
  forceCalculator: Force;

  /**
   * Create a new VelocityVerletSim with the provided force calculator, which is invoked on every simulation step.
   * @param forceCalculator force calculator.
   */
  constructor(forceCalculator: Force) {
    this.forceCalculator = forceCalculator;
  }

  /**
   * Simulate a step in the Universe by using the previous and/or current state and a time step, using the Velocity Verlet integration method.
   * @param deltaT time step.
   * @param currState current state.
   * @returns new state after the simulation step.
   */
  simulate(deltaT: number, currState: State): State {
    if (deltaT <= 0) {
      return currState.clone();
    }
    // x(t + dt) = x(t) + (v(t) * dt) + (0.5 * a(t) * dt * dt)
    let updatedBodies = currState.bodies.map((v) => {
      let updatedBody = v.clone();
      updatedBody.position = this.calcNewPos(
        updatedBody.position,
        updatedBody.velocity,
        updatedBody.acceleration,
        deltaT,
      );
      return updatedBody;
    });
    // a(t + dt) = accel at x(t + dt)
    let newForces = this.forceCalculator.getForces(updatedBodies);
    return new State(
      updatedBodies.map((b: CelestialBody, i: number) => {
        let newAccel = newForces[i].divideScalar(b.mass);
        // v(t + dt) = v(t) + 0.5 * (a(t) + a(t + dt)) * dt
        b.velocity.add(b.acceleration.add(newAccel)
          .multiplyScalar(deltaT / 2));
        b.acceleration = newAccel;
        return b;
      }),
    );
  }

  /**
   * Calculate the new position of a body in the following way:
   *
   * newPos = currPos + currVel * deltaT + 0.5 * currAccel * deltaT^2.
   * @param currPos current position.
   * @param currVel current velocity.
   * @param currAccel current acceleration.
   * @param deltaT time step.
   * @returns new position.
   */
  calcNewPos(
    currPos: Vector3,
    currVel: Vector3,
    currAccel: Vector3,
    deltaT: number,
  ): Vector3 {
    return currPos
      .clone()
      .add(currVel.clone()
        .multiplyScalar(deltaT))
      .add(currAccel.clone()
        .multiplyScalar(deltaT * deltaT * 0.5));
  }
}

/**
 * Represents a simulation function object that uses the [Euler integration method](https://en.wikipedia.org/wiki/Euler_method) to simulate motions of bodies.
 */
export class ExplicitEulerSim implements SimulateFunction {
  force: Force;

  /**
   * Create a new ExplicitEulerSim with the provided force calculator, which is invoked on every simulation step.
   * @param force force calculator.
   */
  constructor(force: Force) {
    this.force = force;
  }

  /**
   * Simulate a step in the Universe by using the current state and a time step, using the Euler integration method.
   * @param deltaT time step.
   * @param currState current state.
   * @returns new state after the simulation step.
   */
  simulate(
    deltaT: number,
    currState: State,
  ): State {
    const updatedBodies = currState.bodies.map((b) => b.clone(
      // x(t + dt) = x(t) + v(t) * dt
      this.rateUpdate(b.position, b.velocity, deltaT),
      // v(t + dt) = v(t) + a(t) * dt
      this.rateUpdate(b.velocity, b.acceleration, deltaT),
    ));
    const updatedForces = this.force.getForces(updatedBodies);
    updatedBodies.forEach((b, i) => {
      // a(t + dt) = accel at x(t + dt)
      b.acceleration = updatedForces[i].divideScalar(b.mass);
    });
    return new State(updatedBodies);
  }

  /**
   * Update a vector quantity using the rate of change and a time step.
   * @param prev previous value.
   * @param rate rate of change.
   * @param deltaT time step.
   * @returns updated value.
   */
  private rateUpdate(prev: Vector3, rate: Vector3, deltaT: number) {
    return rate.clone()
      .multiplyScalar(deltaT)
      .add(prev);
  }
}

/**
 * Represents a simulation function object that uses the [Semi-Implicit Euler integration method](https://en.wikipedia.org/wiki/Semi-implicit_Euler_method) to simulate the motion of bodies.
 */
export class SemiImplicitEulerSim implements SimulateFunction {
  force: Force;

  /**
   * Create a new SemiImplicitEulerSim with the provided force calculator, which is invoked on every simulation step.
   * @param force force calculator.
   */
  constructor(force: Force) {
    this.force = force;
  }

  /**
   * Simulate a step in the Universe by using the current state and a time step, using the Semi-Implicit Euler integration method.
   * @param deltaT time step.
   * @param currState current state.
   * @returns new state after the simulation step.
   */
  simulate(
    deltaT: number,
    currState: State,
  ): State {
    const updatedBodies = currState.bodies.map((b) => {
      // v(t + dt) = v(t) + a(t) * dt
      const updatedVel = this.rateUpdate(b.velocity, b.acceleration, deltaT);
      return b.clone(
        // x(t + dt) = x(t) + v(t + dt) * dt
        this.rateUpdate(b.position, updatedVel, deltaT),
        updatedVel,
      );
    });
    const updatedForces = this.force.getForces(updatedBodies);
    updatedBodies.forEach((b, i) => {
      // a(t + dt) = accel at x(t + dt)
      b.acceleration = updatedForces[i].divideScalar(b.mass);
    });
    return new State(updatedBodies);
  }

  /**
   * Update a vector quantity using the rate of change and a time step.
   * @param prev previous value.
   * @param rate rate of change.
   * @param deltaT time step.
   * @returns updated value.
   */
  private rateUpdate(prev: Vector3, rate: Vector3, deltaT: number) {
    return rate.clone()
      .multiplyScalar(deltaT)
      .add(prev);
  }
}

/**
 * Container for intermediate kinematic rate values in the Runge-Kutta 4 integration method.
 */
type RungeKuttaSteps = {
  /**
   * Intermediate velocity rate values.
   */
  kv: Vector3[];
  /**
   * Intermediate position rate values.
   */
  kx: Vector3[];
};

/**
 * Represents a simulation function object that uses the [Runge-Kutta 4 integration method](https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods) to simulate the motion of bodies.
 */
export class RungeKutta4Sim implements SimulateFunction {
  force: Force;
  weights: number[];

  /**
   * Create a new RungeKutta4Sim with the provided weights for average force calculator, which is invoked on every simulation step.
   * @param force force calculator.
   * @param weights weights for weighted average.
   */
  constructor(force: Force, weights: number[]) {
    this.force = force;
    this.weights = weights;
  }

  /**
   * Simulate a step in the Universe by using the current state and a time step, using the Runge-Kutta 4 integration method.
   * @param deltaT time step.
   * @param currState current state.
   * @returns new state after the simulation step.
   */
  simulate(
    deltaT: number,
    currState: State,
  ): State {
    let bodiesK: RungeKuttaSteps[] = currState.bodies.map((v) => ({
      // k1v = a(x(t))
      kv: [v.acceleration.clone()],
      // k1r = v(t)
      kx: [v.velocity.clone()],
    }));
    // k2v = a(x(t) + k1x * dt / 2)
    const k2v = this.getInterKV(currState.bodies, bodiesK, 0, deltaT / 2);
    // k2x = v(t) + k1v * dt / 2
    const k2x = this.getInterKX(currState.bodies, bodiesK, 0, deltaT / 2);
    bodiesK.forEach((v, i) => {
      v.kv.push(k2v[i]);
      v.kx.push(k2x[i]);
    });
    // k3v = a(x(t) + k2x * dt / 2)
    const k3v = this.getInterKV(currState.bodies, bodiesK, 1, deltaT / 2);
    // k3x = v(t) + k2v * dt / 2
    const k3x = this.getInterKX(currState.bodies, bodiesK, 1, deltaT / 2);
    bodiesK.forEach((v, i) => {
      v.kv.push(k3v[i]);
      v.kx.push(k3x[i]);
    });
    // k3v = a(x(t) + k3x * dt)
    const k4v = this.getInterKV(currState.bodies, bodiesK, 2, deltaT);
    // k4x = v(t) + k3v * dt
    const k4x = this.getInterKX(currState.bodies, bodiesK, 2, deltaT);
    bodiesK.forEach((v, i) => {
      v.kv.push(k4v[i]);
      v.kx.push(k4x[i]);
    });
    const updatedBodies = currState.bodies.map((b, i) => {
      const weightedXRate = new Vector3();
      const weightedVRate = new Vector3();
      bodiesK[i].kx.forEach((v, j) => {
        weightedXRate.add(v.multiplyScalar(this.weights[j]));
      });
      bodiesK[i].kv.forEach((v, j) => {
        weightedVRate.add(v.multiplyScalar(this.weights[j]));
      });
      return b.clone(
        weightedXRate.multiplyScalar(deltaT / 6)
          .add(b.position),
        weightedVRate.multiplyScalar(deltaT / 6)
          .add(b.velocity),
      );
    });
    const updatedForces = this.force.getForces(updatedBodies);
    updatedBodies.forEach((v, i) => {
      v.acceleration = updatedForces[i].divideScalar(v.mass);
    });
    return new State(updatedBodies);
  }

  /**
   * Get intermediate velocity rate values.
   * @param bodies current bodies.
   * @param bodiesK intermediate kinematic rate values for all bodies.
   * @param krInd index of intermediate kinematic rate value to base the new intermediate value on.
   * @param deltaT time step.
   * @returns next intermediate velocity rate values for all bodies.
   */
  getInterKV(
    bodies: CelestialBody[],
    bodiesK: RungeKuttaSteps[],
    krInd: number,
    deltaT: number,
  ): Vector3[] {
    // newX = x(t) + k(kInd)x * delta
    let newBodies = bodies.map((v, i) => {
      let newBody = v.clone();
      newBody.position.add(bodiesK[i].kx[krInd].clone()
        .multiplyScalar(deltaT));
      return newBody;
    });
    // accel at newX
    return this.force.getForces(newBodies)
      .map((v, i) => v.divideScalar(bodies[i].mass));
  }

  /**
   * Get intermediate position rate values.
   * @param bodies current bodies.
   * @param bodiesK intermediate kinematic rate values for all bodies.
   * @param kInd index of intermediate kinematic rate value to base the new intermediate value on.
   * @param deltaT time step.
   * @returns next intermediate position rate values for all bodies.
   */
  getInterKX(
    bodies: CelestialBody[],
    bodiesK: RungeKuttaSteps[],
    kInd: number,
    deltaT: number,
  ): Vector3[] {
    // v(t) + k(kInd)v * deltaT
    return bodies.map((v, i) => v.velocity.clone()
      .add(bodiesK[i].kv[kInd].clone()
        .multiplyScalar(deltaT)));
  }
}
