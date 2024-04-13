import React from "react";
import {
  CelestialBody,
  CoMTransformation,
  Simulation as NbodySimulation,
  PinTransformation,
  RotateTransformation,
  RungeKutta4Sim,
  State,
  Universe,
  Vector3,
} from "../../../../src";

interface HorseshoeOrbitSetup {
  sim?: NbodySimulation;
  helper: (
    divId: string,
    frameOfRef: "sun" | "sun-earth",
    node: HTMLDivElement | null
  ) => void;
}

const yorpState = new State([
  new CelestialBody(
    "Sun",
    1988500e24,
    696340e3,
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Earth",
    5.97219e24,
    // 6371e3,
    5e8,
    new Vector3(
      -2.48109932596539e10,
      1.449948612736719e11,
      -8.215203670851886e6
    ),
    new Vector3(-2.984146365518679e4, -5.126262286859617e3, 1.184224839788195),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "YORP",
    100,
    2e8,
    new Vector3(1.789598196203594e11, 4.67757011067789e10, 5.131735873924753e9),
    new Vector3(-5.641374152889482e3, 2.28178307950743e4, -6.507224186314708e1),
    new Vector3(0, 0, 0)
  ),
]);

const so16State = new State([
  new CelestialBody(
    "Sun",
    1988500e24,
    696340e3,
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Earth",
    5.97219e24,
    // 6371e3,
    4e8,
    new Vector3(
      -2.48109932596539e10,
      1.449948612736719e11,
      -8.215203670851886e6
    ),
    new Vector3(-2.984146365518679e4, -5.126262286859617e3, 1.184224839788195),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "SO16",
    100,
    2e8,
    new Vector3(
      7.731523489671926e10,
      1.272231560560866e11,
      1.214208720801441e10
    ),
    new Vector3(-2.619929938293521e4, 1.26271595046161e4, 6.883036493252469e3),
    new Vector3(0, 0, 0)
  ),
]);

export const yorp: HorseshoeOrbitSetup = {
  helper(divId, frameOfRef, node) {
    if (node === null) {
      this.sim?.stop();
      this.sim = null;
      return;
    }
    const newUniverse = new Universe({
      label: "54509 YORP",
      currState: new RotateTransformation(
        new Vector3(1, 0, 0),
        Math.PI / 2
      ).transform(yorpState.clone()),
      simFunc: new RungeKutta4Sim(),
      color: ["#FDB813", "#287AB8", "#767676"],
      radiusScale: 10,
    });
    if (frameOfRef === "sun-earth") {
      newUniverse.transformations = [
        new CoMTransformation(),
        new PinTransformation(new Vector3(0, 0, 1), 1),
      ];
    } else {
      newUniverse.transformations = [new CoMTransformation()];
    }
    this.sim = new NbodySimulation([newUniverse], {
      visType: "3D",
      controller: "ui",
      showTrails: true,
      maxTrailLength: 2000,
      record: true,
      looped: true,
      // showDebugInfo: true,
    });
    this.sim.start(
      divId,
      800,
      800,
      frameOfRef === "sun-earth" ? 30 : 1,
      false,
      332,
      20000000
    );
  },
};

export const so16: HorseshoeOrbitSetup = {
  helper(divId, frameOfRef, node) {
    if (node === null) {
      this.sim?.stop();
      this.sim = null;
      return;
    }
    const newUniverse = new Universe({
      label: "SO16",
      currState:
        // new RotateTransformation(new Vector3(0, 1, 0), Math.PI / 2).transform(
        new RotateTransformation(new Vector3(1, 0, 0), -Math.PI / 2).transform(
          so16State.clone()
        ),
      simFunc: new RungeKutta4Sim(),
      color: ["#FDB813", "#287AB8", "#767676"],
      radiusScale: 10,
    });
    if (frameOfRef === "sun-earth") {
      newUniverse.transformations = [
        new CoMTransformation(),
        new PinTransformation(new Vector3(0, 0, 1), 1),
      ];
    } else {
      newUniverse.transformations = [new CoMTransformation()];
    }
    this.sim = new NbodySimulation([newUniverse], {
      visType: "3D",
      controller: "ui",
      showTrails: true,
      maxTrailLength: frameOfRef === "sun-earth" ? 2000 : 1000,
      record: true,
      looped: true,
      // showDebugInfo: true,
    });
    this.sim.start(
      divId,
      800,
      800,
      frameOfRef === "sun-earth" ? 30 : 1,
      false,
      810,
      20000000
    );
  },
};

export const HorseshoeOrbit = ({
  obj,
  name,
  frameOfRef,
  ...props
}: {
  obj: HorseshoeOrbitSetup;
  name: string;
  frameOfRef: "sun" | "sun-earth";
}) => {
  const divId = "demo-" + name + "-" + frameOfRef;

  return (
    <div>
      <div
        id={divId}
        style={{
          width: "800px",
          height: "800px",
          position: "relative",
        }}
        ref={(node) => obj.helper(divId, frameOfRef, node)}
      ></div>
    </div>
  );
};
