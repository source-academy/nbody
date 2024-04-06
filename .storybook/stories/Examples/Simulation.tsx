import React from 'react';
import { CelestialBody, ControllerType, Gravity, Simulation as NbodySimulation, RungeKutta4Sim, State, Universe, Vector3, VisType } from "../../../src/index";

interface SimulationProps {
  storyName: string;
  visType?: VisType;
  record?: boolean;
  looped?: boolean;
  controller?: ControllerType;
  showTrails?: boolean;
  showDebugInfo?: boolean;
  maxFrameRate?: number;
  maxTrailLength?: number;
}

/**
 * Primary UI component for user interaction
 */
export const Simulation = ({
  storyName = 'default',
  visType = '2D',
  record = false,
  looped = true,
  controller = 'ui',
  showTrails = false,
  showDebugInfo = true,
  maxFrameRate = -1,
  maxTrailLength = 100,
  ...props
}: SimulationProps) => {
  const divId = 'demo-' + storyName;
  const force = new Gravity(1);
  const a = new CelestialBody(
    "a",
    1,
    new Vector3(-0.97000436, 0.24308753, 0),
    new Vector3(0.466203685, 0.43236573, 0),
    new Vector3(0, 0, 0)
  );
  const b = new CelestialBody(
    "b",
    1,
    new Vector3(0.97000436, -0.24308753, 0),
    new Vector3(0.466203685, 0.43236573, 0),
    new Vector3(0, 0, 0)
  );
  const c = new CelestialBody(
    "c",
    1,
    new Vector3(0, 0, 0),
    new Vector3(-2 * 0.466203685, -2 * 0.43236573, 0),
    new Vector3(0, 0, 0)
  );
  const universe: Universe = new Universe({
    label: "a",
    currState: new State([a, b, c]),
    color: "rgba(254, 209, 106, 1)",
    simFunc: new RungeKutta4Sim(force, [1, 2, 2, 1]),
  }
  );

  const simulation = new NbodySimulation([universe], {
    visType,
    record,
    looped,
    controller,
    showTrails,
    showDebugInfo,
    maxFrameRate,
    maxTrailLength,
  });

  return (
    <div
      id={divId}
      style={{width: 600, height: 600, position: 'relative'}}
      ref={() => simulation.start(divId, 600, 600)}>
    </div>
  );
};
