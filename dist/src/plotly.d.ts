import { type Data, type Layout } from 'plotly.js-dist';
import { type Simulation } from './Simulation';
export interface ReplResult {
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
