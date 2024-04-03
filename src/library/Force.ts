import { Vector3 } from 'three';
import { type CelestialBody } from '../CelestialBody';
import { type Force } from '../Force';

/**
 * Represents a [Newtonian Gravitational force](https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation) object.
 * @category Forces
 */
export class Gravity implements Force {
  /**
   * Gravitational constant.
   * @defaultValue 6.674e-11
   */
  readonly G: number;

  /**
   * Create a new Gravity with the provided gravitational constant.
   * @param G gravitational constant.
   */
  constructor(G: number = 6.674e-11) {
    this.G = G;
  }

  /**
   * Calculate and return the forces acting on the bodies. arr[i] represents the force acting on the ith body as a result of all other bodies.
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
   * Calculate the gravitational force acting on body a due to body b.
   * @param a body a.
   * @param b body b.
   * @returns gravitational force of a on b.
   * @hidden
   */
  private calcNewtonian(a: CelestialBody, b: CelestialBody): Vector3 {
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
 * Represents a [Centripetal force](https://en.wikipedia.org/wiki/Centripetal_force) object. To be used to calculate the force required to keep the bodies in circular motion around a given center.
 * @category Forces
 */
export class CentripetalForce implements Force {
  /**
   * Center of force.
   */
  readonly center: Vector3;

  /**
   * Create a new CentripetalForce with the provided center of force.
   * @param center center of force.
   */
  constructor(center: Vector3 = new Vector3(0, 0, 0)) {
    this.center = center;
  }

  /**
   * Calculate the force required to keep the bodies in circular motion around the center. arr[i] represents the centripetal force required for the ith body.
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
 * Represents a combined force object. To be used to additively combine multiple forces acting on a system of bodies.
 * @category Forces
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
   * Get the combined forces acting on the bodies. arr[i] represents the combined force acting on the ith body as a result of all force systems.
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
