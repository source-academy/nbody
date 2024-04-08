import React, { useEffect } from 'react';
import { ControllerType, Simulation as NbodySimulation, Universe, VisType } from "../../src/index";

interface SimulationProps {
  storyName: string;
  universe: Universe[];
  visType?: VisType;
  record?: boolean;
  looped?: boolean;
  controller?: ControllerType;
  showTrails?: boolean;
  showDebugInfo?: boolean;
  maxFrameRate?: number;
  maxTrailLength?: number;
  width?: number;
  callback?: (simulation: NbodySimulation) => () => void;
  speed?: number,
  paused?: boolean ,
  recordFor?: number,
}

/**
 * Primary UI component for user interaction
 */
export const Simulation = ({
  storyName = 'default',
  universe = [],
  visType = '2D',
  record = false,
  looped = true,
  controller = 'none',
  showTrails = false,
  showDebugInfo = false,
  maxFrameRate = -1,
  maxTrailLength = 100,
  width = 400,
  callback = (sim) =>  () => { },
      speed  = 1,
    paused = false,
    recordFor = 5,
  ...props
}: SimulationProps) => {
  const divId = "demo-" + storyName;
  const [simulation, setSimulation] = React.useState<NbodySimulation | null>(null);
  if (simulation === null) {
    setSimulation(new NbodySimulation(universe.map(u => u.clone()), {
      visType,
      record,
      looped,
      controller,
      showTrails,
      showDebugInfo,
      maxFrameRate,
      maxTrailLength,
    }));
  }

  useEffect(() => {
    simulation?.start(divId, width, width, speed, paused, recordFor);
    let callbackClear = () => {};
    if (simulation) {
      callbackClear = callback(simulation);
    }
    return () => {
      callbackClear();
      simulation?.stop();
    };
  }, []);
  return (
    <div
      id={divId}
      style={{width: width, height: width, position: 'relative'}}>
    </div>
  );
};