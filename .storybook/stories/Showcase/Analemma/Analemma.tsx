import React from "react";
import {
  BodyCenterTransformation,
  CelestialBody,
  Simulation as NbodySimulation,
  RotateTransformation,
  RungeKutta4Sim,
  State,
  TimedRotateTransformation,
  Universe,
  Vector3,
} from "../../../../src";

const SUN = new CelestialBody(
  "Sun",
  1.989e30,
  696340e3,
  new Vector3(0, 0, 0),
  new Vector3(0, 0, 0),
  new Vector3(0, 0, 0)
);

const EARTH = new CelestialBody(
  "Earth",
  5.97219e24,
  6371e3,
  //   new Vector3(-2.48109932596539e10, 1.449948612736719e11, -8.215203670851886e6),
  //   new Vector3(-2.984146365518679e4, -5.126262286859617e3, 1.184224839788195),
  //   new Vector3(0, 0, 0)
  // );
  new Vector3(152.1e9, 0, 0),
  new Vector3(0, 0, -29290),
  new Vector3(0, 0, 0)
);

const MARS = new CelestialBody(
  "Mars",
  6.41e23,
  3389.5e3,
  // new Vector3(
  //   -4.388577457378983e10,
  //   -2.170849264747524e11,
  //   -3.473007284583151e9
  // ),
  // new Vector3(2.466191455128526e4, -2.72216016197737e3, -6.619819103693254e2),
  // new Vector3(0, 0, 0)
  // );
  new Vector3(249.2e9, 0, 0),
  new Vector3(0, 0, -22000),
  new Vector3(0, 0, 0)
);

const alignTilt = new RotateTransformation(
  new Vector3(0, 1, 0),
  -(Math.PI / 2)
);
const bodyTranslate = new BodyCenterTransformation(1);

interface AnalemmaSetup {
  actualAxialTilt: number;
  sim?: NbodySimulation;
  helper: (
    divId: string,
    axialTilt: number,
    node: HTMLDivElement | null
  ) => void;
}

export const sunEarth: AnalemmaSetup = {
  actualAxialTilt: 23.4,
  helper(divId, axialTilt, node) {
    if (node === null) {
      this.sim?.stop();
      this.sim = null;
      return;
    }
    const newUniverse = new Universe({
      label: "Sun-Earth System",
      currState: alignTilt.transform(
        bodyTranslate.transform(new State([SUN.clone(), EARTH.clone()]))
      ),
      color: ["#FDB813", "#287AB8"],
      simFunc: new RungeKutta4Sim(),
      transformations: [
        bodyTranslate,
        new TimedRotateTransformation(
          new Vector3(0, 1, 0),
          366.24 * 86164.0905
        ),
      ],
    });
    newUniverse.currState = new RotateTransformation(
      new Vector3(1, 0, 0),
      (axialTilt / 180) * Math.PI
    ).transform(newUniverse.currState);
    this.sim = new NbodySimulation([newUniverse], {
      visType: "3D",
      controller: "ui",
      showTrails: true,
      showDebugInfo: true,
      maxTrailLength: 750,
    });
    this.sim.start(divId, 800, 800, 5000000);
  },
};

export const sunMars: AnalemmaSetup = {
  actualAxialTilt: 24.9,
  helper(divId, axialTilt, node) {
    if (node === null) {
      this.sim?.stop();
      this.sim = null;
      return;
    }
    const newUniverse = new Universe({
      label: "Sun-Mars System",
      currState: alignTilt.transform(
        bodyTranslate.transform(new State([SUN.clone(), MARS.clone()]))
      ),
      color: ["#FDB813", "#c1440e"],
      simFunc: new RungeKutta4Sim(),
      transformations: [
        bodyTranslate,
        new TimedRotateTransformation(
          new Vector3(0, 1, 0),
          668.5991 * 88775.244
        ),
      ],
    });
    newUniverse.currState = new RotateTransformation(
      new Vector3(1, 0, 0),
      (axialTilt / 180) * Math.PI
    ).transform(newUniverse.currState);
    this.sim = new NbodySimulation([newUniverse], {
      visType: "3D",
      controller: "ui",
      showTrails: true,
      showDebugInfo: true,
      maxTrailLength: 1350,
    });
    this.sim.start(divId, 800, 800, 5000000);
  },
};

export const Analemma = ({
  obj,
  name,
  axialTilt,
  ...props
}: {
  obj: AnalemmaSetup;
  name: string;
  axialTilt: number;
}) => {
  const divId = "demo-" + name + "-" + axialTilt;

  return (
    <div>
      <div
        id={divId}
        style={{
          width: "800px",
          height: "800px",
          position: "relative",
        }}
        ref={(node) => obj.helper(divId, axialTilt, node)}
      ></div>
    </div>
  );
};
