import { type Data, type Layout } from 'plotly.js-dist';
import { type Simulation } from './Simulation';

export interface ReplResult {
  toReplString: () => string;
}

/**
 *
 */
export class SimulationPlot implements ReplResult {
  plotlyDrawFn: any;
  data: Data;
  sim: Simulation;
  layout: Partial<Layout>;
  /**
   * Create a new SimulationPlot with the provided draw function, data, simulation, and layout.
   * @param plotlyDrawFn draw function.
   * @param data data to draw.
   * @param sim simulation.
   * @param layout layout of the plot.
   */
  constructor(
    plotlyDrawFn: any,
    data: Data,
    sim: Simulation,
    layout: Partial<Layout>,
  ) {
    this.plotlyDrawFn = plotlyDrawFn;
    this.data = data;
    this.sim = sim;
    this.layout = layout;
  }
  /**
   * Returns a string representation of the object.
   * @returns string representation of the object.
   */
  public toReplString = () => '<SimulationPlot>';

  /**
   * Draw the plot in the provided div.
   * @param divId div id.
   */
  public draw = (divId: string) => {
    this.plotlyDrawFn(
      divId,
      this.data,
      this.sim,
      this.layout,
    );
  };
}
