import { type Data, type Layout } from 'plotly.js-dist';
import { type Simulation } from './Simulation';
export interface ReplResult {
    toReplString: () => string;
}
/**
 * Represents plots with a draw method attached
 */
export declare class DrawnPlot implements ReplResult {
    drawFn: any;
    data: ListOfPairs;
    /**
     * Create a new DrawnPlot with the provided draw function and data.
     * @param drawFn draw function.
     * @param data data to draw.
     */
    constructor(drawFn: any, data: ListOfPairs);
    /**
     * Returns a string representation of the object.
     * @returns string representation of the object.
     */
    toReplString: () => string;
    /**
     * Draw the plot in the provided div.
     * @param divId div id.
     */
    draw: (divId: string) => void;
}
/**
 * Represents a curve plot.
 */
export declare class CurvePlot implements ReplResult {
    plotlyDrawFn: any;
    data: Data;
    layout: Partial<Layout>;
    /**
     * Create a new CurvePlot with the provided draw function, data, and layout.
     * @param plotlyDrawFn draw function.
     * @param data data to draw.
     * @param layout layout of the plot.
     */
    constructor(plotlyDrawFn: any, data: Data, layout: Partial<Layout>);
    /**
     * Returns a string representation of the object.
     * @returns string representation of the object.
     */
    toReplString: () => string;
    /**
     * Draw the plot in the provided div.
     * @param divId div id.
     */
    draw: (divId: string) => void;
}
export type ListOfPairs = (ListOfPairs | any)[] | null;
export type Data2d = number[];
export type Color = {
    r: number;
    g: number;
    b: number;
};
export type DataTransformer = (c: Data2d[]) => Data2d[];
export type CurvePlotFunction = ((func: Curve) => CurvePlot);
export type Curve = ((n: number) => Point);
export type CurveTransformer = (c: Curve) => Curve;
/** Encapsulates 3D point with RGB values. */
export declare class Point implements ReplResult {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    readonly color: Color;
    /**
     * Create a new Point with the provided x, y, z, and color.
     * @param x x-coordinate.
     * @param y y-coordinate.
     * @param z z-coordinate.
     * @param color color.
     */
    constructor(x: number, y: number, z: number, color: Color);
    /**
     * Returns a string representation of the object.
     * @returns string representation of the object.
     */
    toReplString: () => string;
}
/**
 *
 */
export declare class SimulationPlot implements ReplResult {
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
    constructor(plotlyDrawFn: any, data: Data, sim: Simulation, layout: Partial<Layout>);
    /**
     * Returns a string representation of the object.
     * @returns string representation of the object.
     */
    toReplString: () => string;
    /**
     * Draw the plot in the provided div.
     * @param divId div id.
     */
    draw: (divId: string) => void;
}
