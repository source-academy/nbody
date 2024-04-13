import React from "react";
import {
  CelestialBody,
  CoMTransformation,
  Simulation as NbodySimulation,
  RotateTransformation,
  RungeKutta4Sim,
  State,
  Universe,
  Vector3,
} from "../../../../src";

interface SolarSystemSetup {
  sim?: NbodySimulation;
  helper: (
    divId: string,
    node: HTMLDivElement | null
  ) => void;
}

const solarSystemState = new State([
  new CelestialBody(
    "Sun",
    1988500e24,
    696340e3,
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Mercury",
    3.302e23,
    // 2439.7e3,
    1e8,
new Vector3(-4.108411877039495e10, 2.997375954154480e10 , 6.217890408222714e9),
 new Vector3(-3.865743010383652e4, -3.733889075044869e4, 4.944436024774976e2),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Venus",
    4.8685e24,
    // 6051.8e3,
    1e8,
    new Vector3(-1.069987422398024e11, -1.145572515113905e10, 6.016588327139664e9),
    new Vector3(3.513460276994624e3, -3.497755629371660e4, -6.830913209445484e2),
    new Vector3(0, 0, 0)),
  new CelestialBody(
    "Earth",
    5.97219e24,
    // 6371e3,
    1e8,
    new Vector3(
      -2.48109932596539e10,
      1.449948612736719e11,
      -8.215203670851886e6
    ),
    new Vector3(-2.984146365518679e4, -5.126262286859617e3, 1.184224839788195),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Mars",
    6.4171e23,
    // 3389.5e3,
    1e8,
new Vector3(-4.388577457378983e10,-2.170849264747524e11, -3.473007284583151e9),
 new Vector3(2.466191455128526e4, -2.722160161977370e3, -6.619819103693254e2),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Jupiter",
    189818722e19,
    // 69911e3,
    6e8,
 new Vector3(5.225708576244547e11, 5.318268827721269e11, -1.390073285881653e10),
 new Vector3(-9.481190567392032e3, 9.781942400350085e3, 1.714274561397779e2),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Saturn",
    5.6834e26,
    // 58232e3,
    5e8,
new Vector3(1.345793242617223e12, -5.559294178115252e11, -4.389262609579784e10),
 new Vector3(3.146297313479314e3, 8.917916155362638e3, -2.799382290475703e2),
    new Vector3(0, 0, 0)),
  new CelestialBody(
    "Uranus",
    8.6813e25,
    // 25362e3,
    5e8,
 new Vector3(1.835714294722568e12, 2.288891426259816e12, -1.529865738122165e10),
 new Vector3(-5.371828306112230e3, 3.954368764227032e3, 8.423549070186587e1),
    new Vector3(0, 0, 0)),
  new CelestialBody(
    "Neptune",
    1.02409e26,
    // 24622e3,
    5e8,
 new Vector3(4.464446647141849e12, -2.679158335073845e11, -9.736583677508335e10),
 new Vector3(2.818440617089212e2, 5.469942022851473e3, -1.190017755456774e2),
    new Vector3(0, 0, 0)
  ),
  new CelestialBody(
    "Pluto",
    1.307e22,
    2.5e8,
 new Vector3(2.574575382744127e12, -4.538596532403562e12, -2.587050606457522e11),
 new Vector3(4.844463314470517e3, 1.482549367525443e3, -1.568756846977261e3),
    new Vector3(0, 0, 0)
  ),
]);

export const solarRecorded: SolarSystemSetup = {
  helper(divId, node) {
    if (node === null) {
      this.sim?.stop();
      this.sim = null;
      return;
    }
    const newUniverse = new Universe({
      label: "Solar Sytem",
      currState: new RotateTransformation(
        new Vector3(1, 0, 0),
        Math.PI / 2
      ).transform(solarSystemState.clone()),
      simFunc: new RungeKutta4Sim(),
      color: ["#FDB813", "#B7B8B9", "#c18f17", "#287AB8", "#c1440e", "#d8ca9d", "#ceb8b8", "#ACE5EE", "#5b5ddf"],
      transformations: [new CoMTransformation()],
      radiusScale: 20,
    });
    this.sim = new NbodySimulation([newUniverse], {
      visType: "3D",
      controller: "ui",
      showTrails: true,
      maxTrailLength: 2000,
      record: true,
      looped: true,
      showDebugInfo: true,
    });
    this.sim.start(divId, 800, 800, 2, false, 780, 10000000);
    // this.sim.start(divId, 800, 800, 2, false, 10, 10000000);
  },
};

export const solarSimulate: SolarSystemSetup = {
  helper(divId, node) {
    if (node === null) {
      this.sim?.stop();
      this.sim = null;
      return;
    }
    const newUniverse = new Universe({
      label: "Solar Sytem",
      currState: new RotateTransformation(
        new Vector3(1, 0, 0),
        Math.PI / 2
      ).transform(solarSystemState.clone()),
      simFunc: new RungeKutta4Sim(),
      color: ["#FDB813", "#B7B8B9", "#c18f17", "#287AB8", "#c1440e", "#d8ca9d", "#ceb8b8", "#ACE5EE", "#5b5ddf"],
      transformations: [new CoMTransformation()],
      radiusScale: 20,
    });
    this.sim = new NbodySimulation([newUniverse], {
      visType: "3D",
      controller: "ui",
      showTrails: true,
      maxTrailLength: 2000,
      showDebugInfo: true,
    });
    this.sim.start(divId, 800, 800, 10000000);
  },
};

export const SolarSystem = ({
  obj,
  name,
  ...props
}: {
  obj: SolarSystemSetup;
  name: string;
}) => {
  const divId = "demo-" + name;

  return (
    <div>
      <div
        id={divId}
        style={{
          width: "800px",
          height: "800px",
          position: "relative",
        }}
        ref={(node) => obj.helper(divId, node)}
      ></div>
    </div>
  );
};
