import {
  CelestialBody,
  CoMTransformation,
  Gravity,
  PinTransformation,
  RotateTransformation,
  RungeKutta4Sim,
  SemiImplicitEulerSim,
  State,
  Universe,
  Vector3,
} from "../../src";

export const fig8 = new Universe({
  label: "Fig 8 Universe",
  currState: new State([
    new CelestialBody(
      "Body 1",
      1,
      new Vector3(-0.97000436, 0.24308753, 0),
      new Vector3(0.466203685, 0.43236573, 0),
      new Vector3(0, 0, 0)
    ),
    new CelestialBody(
      "Body 2",
      1,
      new Vector3(0.97000436, -0.24308753, 0),
      new Vector3(0.466203685, 0.43236573, 0),
      new Vector3(0, 0, 0)
    ),
    new CelestialBody(
      "Body 3",
      1,
      new Vector3(0, 0, 0),
      new Vector3(-2 * 0.466203685, -2 * 0.43236573, 0),
      new Vector3(0, 0, 0)
    ),
  ]),
  simFunc: new RungeKutta4Sim(new Gravity(1), [1, 2, 2, 1]),
});

export const multiFig8 = [
  fig8,
  new Universe({
    label: "Fig 8 Universe 2",
    currState: new State([
      new CelestialBody(
        "Body 1",
        1,
        new Vector3(-0.97000436, 0.24308753, 0),
        new Vector3(0.466203685, 0.43236573, 0),
        new Vector3(0, 0, 0)
      ),
      new CelestialBody(
        "Body 2",
        1,
        new Vector3(0.97000436, -0.24308753, 0),
        new Vector3(0.466203685, 0.43236573, 0),
        new Vector3(0, 0, 0)
      ),
      new CelestialBody(
        "Body 3",
        1,
        new Vector3(0, 0, 0),
        new Vector3(-2 * 0.466203685, -2 * 0.43236573, 0),
        new Vector3(0, 0, 0)
      ),
    ]),
    simFunc: new SemiImplicitEulerSim(new Gravity(1)),
    color: "red",
  }),
];
