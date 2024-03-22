import { type Data, type Layout } from 'plotly.js-dist';
// import { type ReplResult } from '../../typings/type_helpers';
import { type Simulation } from './Simulation';

export interface ReplResult {
  toReplString: () => string;
}

/**
 * Represents plots with a draw method attached
 */
export class DrawnPlot implements ReplResult {
  drawFn: any;
  data: ListOfPairs;
  /**
   * Create a new DrawnPlot with the provided draw function and data.
   * @param drawFn draw function.
   * @param data data to draw.
   */
  constructor(drawFn: any, data: ListOfPairs) {
    this.drawFn = drawFn;
    this.data = data;
  }

  /**
   * Returns a string representation of the object.
   * @returns string representation of the object.
   */
  public toReplString = () => '<Plot>';

  /**
   * Draw the plot in the provided div.
   * @param divId div id.
   */
  public draw = (divId: string) => {
    this.drawFn(this.data, divId);
  };
}


/**
 * Represents a curve plot.
 */
export class CurvePlot implements ReplResult {
  plotlyDrawFn: any;
  data: Data;
  layout: Partial<Layout>;
  /**
   * Create a new CurvePlot with the provided draw function, data, and layout.
   * @param plotlyDrawFn draw function.
   * @param data data to draw.
   * @param layout layout of the plot.
   */
  constructor(plotlyDrawFn: any, data: Data, layout: Partial<Layout>) {
    this.plotlyDrawFn = plotlyDrawFn;
    this.data = data;
    this.layout = layout;
  }
  /**
   * Returns a string representation of the object.
   * @returns string representation of the object.
   */
  public toReplString = () => '<CurvePlot>';

  /**
   * Draw the plot in the provided div.
   * @param divId div id.
   */
  public draw = (divId: string) => {
    this.plotlyDrawFn(divId, this.data, this.layout);
  };
}

export type ListOfPairs = (ListOfPairs | any)[] | null;
export type Data2d = number[];
export type Color = { r: number, g: number, b: number };

export type DataTransformer = (c: Data2d[]) => Data2d[];
export type CurvePlotFunction = ((func: Curve) => CurvePlot);

export type Curve = ((n: number) => Point);
export type CurveTransformer = (c: Curve) => Curve;


/** Encapsulates 3D point with RGB values. */
export class Point implements ReplResult {
  /**
   * Create a new Point with the provided x, y, z, and color.
   * @param x x-coordinate.
   * @param y y-coordinate.
   * @param z z-coordinate.
   * @param color color.
   */
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number,
    public readonly color: Color,
  ) {}

  /**
   * Returns a string representation of the object.
   * @returns string representation of the object.
   */
  public toReplString = () => `(${this.x}, ${this.y}, ${this.z}, Color: ${this.color})`;
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
