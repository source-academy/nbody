import { RealTimeVisualizer, RealTimeVisualizer3D, RecordingVisualizer, RecordingVisualizer3D, } from './library/Visualizer';
/**
 * A Simulation object that contains Universes and a Visualizer.
 * @category Building blocks
 */
export class Simulation {
    /**
     * Create a new Simulation object with the provided Universes and visualization config.
     * @param universes array of Universes.
     * @param visType visualization type.
     * @param record whether to record the simulation.
     * @param looped whether to loop the recorded simulation.
     * @param controller controller type.
     * @param showTrails whether to show trails in the visualization.
     * @param showDebugInfo whether to show debug info in the visualization.
     * @param maxFrameRate maximum frame rate of the visualization.
     * @param maxTrailLength maximum trail for each universe.
     */
    constructor(universes, { visType = '2D', record = false, looped = true, controller = 'none', showTrails = false, showDebugInfo = false, maxFrameRate = -1, maxTrailLength = 100, }) {
        /**
         * Controls object used to control the simulation.
         * @hidden
         */
        this.controls = {
            speed: 1,
            paused: false,
            showTrails: false,
            showUniverse: {},
        };
        this.universes = Array.isArray(universes) ? universes : [universes];
        if (this.universes.length > 10) {
            throw new Error('Too many universes');
        }
        const uniqueLabels = new Set(this.universes.map((u) => u.label));
        if (uniqueLabels.size !== this.universes.length) {
            throw new Error('Duplicate label in universes');
        }
        this.controller = controller;
        this.universes.forEach((u) => {
            this.controls.showUniverse[u.label] = true;
        });
        this.controls.showTrails = showTrails;
        this.showDebugInfo = showDebugInfo;
        this.maxFrameRate = maxFrameRate;
        this.maxTrailLength = maxTrailLength;
        this.looped = looped;
        if (record) {
            // if (this.universes.length > 1) {
            //   throw new Error("Cannot record multiple universes");
            // }
            this.maxFrameRate = 60;
            this.visualizer
                = visType === '2D'
                    ? new RecordingVisualizer(this)
                    : new RecordingVisualizer3D(this);
        }
        else {
            this.visualizer
                = visType === '2D'
                    ? new RealTimeVisualizer(this)
                    : new RealTimeVisualizer3D(this);
        }
    }
    /**
     * Get the speed of the simulation.
     * @returns speed of the simulation as a scale of normal time.
     */
    getSpeed() {
        return this.controls.speed;
    }
    /**
     * Set the speed of the simulation. Only works if the controller is 'code'.
     * @param speed speed of the simulation as a scale of normal time.
     */
    setSpeed(speed) {
        if (this.controller === 'code') {
            this.controls.speed = speed;
        }
    }
    /**
     * Get whether the simulation is playing.
     * @returns true if the simulation is playing.
     */
    isPlaying() {
        return !this.controls.paused;
    }
    /**
     * Pause the simulation. Only works if the controller is 'code'.
     */
    pause() {
        if (this.controller === 'code') {
            this.controls.paused = true;
        }
    }
    /**
     * Resume the simulation. Only works if the controller is 'code'.
     */
    resume() {
        if (this.controller === 'code') {
            this.controls.paused = false;
        }
    }
    /**
     * Get whether trails are shown in the visualization.
     * @returns true if trails are shown.
     */
    getShowTrails() {
        return this.controls.showTrails;
    }
    /**
     * Set whether to show trails in the visualization. Only works if the controller is 'code'.
     * @param showTrails true to show trails.
     */
    setShowTrails(showTrails) {
        if (this.controller === 'code') {
            this.controls.showTrails = showTrails;
            if (!showTrails) {
                // TODO
            }
        }
    }
    /**
     * True if the universe with the given label is shown.
     * @param label universe label.
     * @returns whether the universe is shown.
     */
    getShowUniverse(label) {
        return this.controls.showUniverse[label];
    }
    /**
     * Set whether to show the universe with the given label. Only works if the controller is 'code'.
     * @param label universe label.
     * @param show true to show the universe.
     */
    setShowUniverse(label, show) {
        if (this.controller === 'code') {
            this.controls.showUniverse[label] = show;
        }
    }
    /**
     * Get the maximum trail length used in the visualization.
     * @returns maximum trail length.
     */
    getMaxTrailLength() {
        return this.maxTrailLength;
    }
    /**
     * Set the maximum trail length used in the visualization. Changes only apply on the next Simulation.play() call.
     * @param maxTrailLength maximum trail length.
     */
    setMaxTrailLength(maxTrailLength) {
        if (this.controller === 'code') {
            this.maxTrailLength = maxTrailLength;
        }
    }
    /**
     * Simulates a single step in this simulation.
     * @param deltaT time step to simulate.
     * @hidden
     */
    simulateStep(deltaT) {
        this.universes.forEach((universe) => {
            universe.simulateStep(deltaT);
        });
    }
    /**
     * Insert the simulation visualization in the div with the given id.
     * @param divId div id.
     * @param width width of the visualization.
     * @param height height of the visualization.
     * @param playSpeed initial time scale.
     * @param startPaused whether to start the simulation paused.
     * @param recordFor number of seconds to record for, only used if in record mode.
     * @param recordSpeed speed of the recording, only used if in record mode.
     */
    start(divId, width, height, playSpeed = 1, startPaused = false, recordFor = 1, recordSpeed = 1) {
        if (recordFor === undefined) {
            throw new Error('recordFor must be defined if record is true');
        }
        this.controls.paused = startPaused;
        this.controls.speed = playSpeed;
        this.visualizer.start(divId, width, height, recordFor, recordSpeed);
    }
    /**
     * Stop and clear the simulation.
     */
    stop() {
        this.visualizer.stop();
    }
}
