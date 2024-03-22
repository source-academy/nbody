import { Vector3 } from 'three';
import { type CelestialBody } from '../CelestialBody';
import { type Force } from '../Force';

/**
 * Represents a gravitational force object.
 */
export class Gravity implements Force {
  readonly G: number;

  /**
   * Create a new Gravity with the provided gravitational constant.
   * @param G gravitational constant.
   */
  constructor(G: number = 6.674e-11) {
    this.G = G;
  }

  /**
   * Get the forces acting on the bodies.
   * @param bodies celestial bodies
   * @returns forces
   */
  getForces(bodies: CelestialBody[]): Vector3[] {
    let n = bodies.length;
    let ans: Vector3[] = [];
    for (let i = 0; i < n; i++) {
      ans.push(new Vector3(0, 0, 0));
    }
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        let currForce = this.calcNewtonian(bodies[i], bodies[j]);
        ans[i].add(currForce);
        ans[j].sub(currForce);
      }
    }
    return ans;
  }

  /**
   * Calculate the gravitational force between two bodies.
   * @param a body a.
   * @param b body b.
   * @returns gravitational force of a on b.
   */
  calcNewtonian(a: CelestialBody, b: CelestialBody): Vector3 {
    let distSq = a.position.distanceToSquared(b.position);
    let forceVal = (this.G * a.mass * b.mass) / distSq;
    return b.position
      .clone()
      .sub(a.position)
      .normalize()
      .multiplyScalar(forceVal);
  }
}

/**
 * Represents a centripetal force object.
 */
export class CentripetalForce implements Force {
  center: Vector3;

  /**
   * Create a new CentripetalForce with the provided center of force.
   * @param center center of force.
   */
  constructor(center: Vector3 = new Vector3(0, 0, 0)) {
    this.center = center;
  }

  /**
   * Get the forces acting on the bodies.
   * @param bodies celestial bodies.
   * @returns forces.
   */
  getForces(bodies: CelestialBody[]): Vector3[] {
    // TODO: mv^2/r sin or cos thetha?
    return bodies.map((body) => {
      const directionVector = this.center.clone()
        .sub(body.position);
      return directionVector.setLength(
        (body.mass * body.velocity.lengthSq()) / directionVector.length(),
      );
    });
  }
}

/**
 * Represents a combined force object. To be used to additively combined multiple acting forces of a system of bodies.
 */
export class CombinedForce implements Force {
  forces: Force[];

  /**
   * Create a new CombinedForce with the provided forces.
   * @param forces array of forces.
   */
  constructor(forces: Force[]) {
    this.forces = forces;
  }

  /**
   * Get the combined forces acting on the bodies.
   * @param bodies celestial bodies.
   * @returns element-wise combined forces.
   */
  getForces(bodies: CelestialBody[]): Vector3[] {
    const forceVal: Vector3[] = bodies.map(() => new Vector3(0, 0, 0));
    this.forces.forEach((force) => {
      force.getForces(bodies)
        .forEach((val, index) => {
          forceVal[index].add(val);
        });
    });
    return forceVal;
  }
}
