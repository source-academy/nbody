import { BodyCenterTransformation, CelestialBody, CoMTransformation, RotateTransformation, RungeKutta4Sim, State, TimedRotateTransformation, Universe, Vector3 } from "../../../../src";

const SUN = new CelestialBody(
    "Sun",
    1.989e30,
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0)
  );

const EARTH = new CelestialBody(
    "Earth",
    5.972e24,
    new Vector3(152.1e9, 0, 0),
    new Vector3(0, 0, -29290),
    new Vector3(0, 0, 0)
  );


const axialTilt = new RotateTransformation(
    new Vector3(0, 0, 1),
    -(23.4 / 180) * Math.PI
  );
const alignTilt = new RotateTransformation(new Vector3(0, 1, 0), -(Math.PI / 2));
const bodyTranslate = new BodyCenterTransformation(1);

export const sunEarth: Universe = new Universe({
    label: "Sun-Earth System",
    currState: alignTilt.transform(
      axialTilt.transform(bodyTranslate.transform(new State([SUN.clone(), EARTH.clone()])))
    ),
    color: ["#FDB813", "#287AB8"],
    simFunc: new RungeKutta4Sim(),
    transformations: [
      bodyTranslate,
      new TimedRotateTransformation(new Vector3(0, 1, 0), 365.25 * 24 * 60 * 60),
    ],
  });