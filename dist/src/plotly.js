/**
 *
 */
export class SimulationPlot {
    /**
     * Create a new SimulationPlot with the provided draw function, data, simulation, and layout.
     * @param plotlyDrawFn draw function.
     * @param data data to draw.
     * @param sim simulation.
     * @param layout layout of the plot.
     */
    constructor(plotlyDrawFn, data, sim, layout) {
        /**
         * Returns a string representation of the object.
         * @returns string representation of the object.
         */
        this.toReplString = () => '<SimulationPlot>';
        /**
         * Draw the plot in the provided div.
         * @param divId div id.
         */
        this.draw = (divId) => {
            this.plotlyDrawFn(divId, this.data, this.sim, this.layout);
        };
        this.plotlyDrawFn = plotlyDrawFn;
        this.data = data;
        this.sim = sim;
        this.layout = layout;
    }
}
