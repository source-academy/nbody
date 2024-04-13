/**
 * A Universe object that contains previous and current state of the universe, a simulation function, frame of reference transformations and other necessary data.
 * @category Building blocks
 */
export class Universe {
    /**
     * Create a new Universe with the provided configuration.
     * @param config configuration object.
     */
    constructor(config) {
        if (config.currState === undefined)
            throw new Error('Missing Current State in Universe');
        if (config.simFunc === undefined)
            throw new Error('Missing Simulation Function in Universe');
        this.label = config.label === undefined ? 'Universe' : config.label;
        this.prevState
            = config.prevState === undefined ? config.currState : config.prevState;
        this.currState = config.currState;
        this.color
            = config.color === undefined ? 'rgba(255, 255, 255, 1)' : config.color;
        this.simFunc = config.simFunc;
        this.transformations
            = config.transformations === undefined
                ? []
                : config.transformations;
        this.radiusScale = config.radiusScale === undefined ? 1 : config.radiusScale;
    }
    /**
     * Simulate a step in the Universe using the SimulateFunction and Transformations.
     * @param deltaT time step to simulate.
     * @hidden
     */
    simulateStep(deltaT) {
        let newState = this.simFunc.simulate(deltaT, this.currState, this.prevState);
        this.prevState = this.currState;
        this.transformations.forEach((t) => {
            newState = t.transform(newState, deltaT);
        });
        this.currState = newState;
    }
    /**
     * Deep copy the current Universe.
     * @returns a new Universe instance.
     */
    clone() {
        return new Universe({
            prevState: this.prevState.clone(),
            currState: this.currState.clone(),
            color: this.color,
            radiusScale: this.radiusScale,
            label: this.label,
            simFunc: this.simFunc,
            transformations: this.transformations,
        });
    }
}
