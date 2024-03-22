import GUI from 'lil-gui';
import Plotly, {
  type Data,
  type Layout,
  type PlotType,
  type SliderStep,
} from 'plotly.js-dist';
import * as THREE from 'three';
import { OrbitControls, ViewHelper } from 'three/examples/jsm/Addons';
import Stats from 'three/examples/jsm/libs/stats.module';
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer';
import { type Simulation } from '../Simulation';
import { type State } from '../State';
import { type Universe } from '../Universe';
import { type Visualizer } from '../Visualizer';

let animationId: number | null = null;

/**
 * Clips a number to a minimum and maximum value.
 * @param x number to clip.
 * @param min minimum value.
 * @param max maximum value.
 * @returns clipped value.
 */
function clipMinMax(x: number, min: number, max: number): number {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}

/**
 * 2D real-time visualizer using Plotly.
 */
export class RealTimeVisualizer implements Visualizer {
  simulation: Simulation;
  divId: string = '';
  type: PlotType = 'scatter';
  readonly speeds = [0, 0.5, 1, 2, 4, 10, 20, 100, 1000, 10000, 1e5, 1e6, 1e7];
  playing: boolean = false;

  /**
   * Constructor for RealTimeVisualizer
   * @param simulation simulation object
   */
  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  /**
   * Simulate and play the visualization
   * @param divId div id to render the visualization in
   * @param timeScale initial time scale
   */
  play(divId: string, timeScale: number) {
    this.divId = divId;
    this.playing = true;
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }

    const steps: Partial<SliderStep>[] = this.speeds.map(
      (speed: number): Partial<SliderStep> => ({
        label: speed.toString(),
        method: 'skip',
      }),
    );
    const init_data: Data[] = this.simulation.universes.map(
      (uni: Universe): Data => ({
        x: uni.currState.bodies.map((body) => body.position.x),
        y: uni.currState.bodies.map((body) => body.position.y),
        z: uni.currState.bodies.map((body) => body.position.z),
        type: this.type as PlotType,
        mode: 'markers',
        marker: {
          color: uni.color,
          sizemin: 6,
          size: uni.currState.bodies.map((body) => Math.min(10, body.mass)),
        },
      }),
    );

    const width = element.clientWidth;
    const height = element.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    this.simulation.universes.forEach((u) => u.currState.bodies.forEach((b) => {
      maxWidth = Math.max(maxWidth, Math.abs(b.position.x));
      maxHeight = Math.max(maxHeight, Math.abs(b.position.y));
    }));
    const scale = 0.5 * Math.min(height / maxHeight, width / maxWidth);

    const layout: Partial<Layout> = {
      paper_bgcolor: '#000000',
      plot_bgcolor: '#000000',
      font: {
        color: '#bfbfbf',
      },
      xaxis: {
        autorange: false,
        range: [-(width / 2) / scale, width / 2 / scale],
      },
      yaxis: {
        autorange: false,
        range: [-(height / 2) / scale, height / 2 / scale],
      },
      uirevision: 'true',
      sliders: [
        {
          steps,
          active: 0,
        },
      ],
    };

    Plotly.newPlot(divId, init_data, layout);

    const framesPerSecond = 30;
    const timePerFrameMs = 1000 / framesPerSecond;
    if (animationId != null) return;
    let lastPaintTimestampMs = 0;
    let speed = timeScale;

    /**
     * Simulate a step in the simulation
     */
    const step = () => {
      // if (!this.playing) {
      //   clearInterval(stepIntervalID);
      //   return;
      // }

      // const currSimTimestampMs = performance.now();
      if (speed !== 0) {
        // lastSimTimestampsMs = currSimTimestampMs;

        // const duration = currSimTimestampMs - lastSimTimestampsMs;
        this.simulation.simulateStep(0.016 * speed);
        // lastSimTimestampsMs = currSimTimestampMs;
        // console.log(`stepping ${Math.floor(performance.now() / 1000)}`);
      }
    };

    let count = 0;
    /**
     * Paint the visualization
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame
     */
    const paint = (timestampMs: number) => {
      speed
        = this.speeds[
          parseInt(
            // @ts-ignore
            document.getElementById(divId)?.layout?.sliders[0].active,
          )
        ];

      if (
        speed === 0
        || !this.playing
        // || timestampMs - lastPaintTimestampMs < timePerFrameMs
      ) {
        animationId = requestAnimationFrame(paint);
        return;
      }
      lastPaintTimestampMs = timestampMs;
      step();

      const new_data = this.simulation.universes.map((uni: Universe) => ({
        x: uni.currState.bodies.map((body) => body.position.x),
        y: uni.currState.bodies.map((body) => body.position.y),
        z: uni.currState.bodies.map((body) => body.position.z),
        hovertext: uni.currState.bodies.map((body) => body.label),
        color: uni.color,
        marker: {
          size: uni.currState.bodies.map((body) => Math.min(10, body.mass)),
        },
      }));

      // @ts-ignore
      Plotly.animate(
        divId,
        {
          data: new_data,
        },
        {
          transition: {
            duration: 0,
          },
          frame: {
            duration: 0,
            redraw: false,
          },
        },
      );

      animationId = requestAnimationFrame(paint);
    };

    // let lastSimTimestampsMs = performance.now();

    // let isTabActive;
    // window.onfocus = function () {
    //   isTabActive = true;
    // };
    // window.onblur = function () {
    //   isTabActive = false;
    // };

    // let stepIntervalID: number = -1;

    requestAnimationFrame(paint);
    // stepIntervalID = window.setInterval(step, 10);
  }

  /**
   * Pause the simulation and visualization.
   */
  pause(): void {
    this.playing = false;
  }

  /**
   * Resume the simulation and visualization.
   */
  resume(): void {
    this.playing = true;
  }

  /**
   * Stop the simulation and visualization.
   */
  stop(): void {
    this.playing = false;
    Plotly.purge(this.divId);
    this.divId = '';
  }
}

/**
 * Container object for tracer points in a universe.
 */
class UniverseTracer {
  traced: (THREE.Points | undefined)[];
  traceInd: number;
  maxTraceLength: number;

  /**
   * Constructor for UniverseTracer
   * @param maxTraceLength max number of trace points to keep
   */
  constructor(maxTraceLength: number) {
    this.traced = [];
    this.traceInd = 0;
    this.maxTraceLength = maxTraceLength;
  }

  /**
   * Add a trace point at the given position to the scene, scaled appropriately. Remove an existing trace point if the max trace length has been reached.
   * @param pos position to add trace point at
   * @param scene scene to add trace point to
   * @param scale scale to apply to position
   */
  addTrace(pos: THREE.Vector3, scene: THREE.Scene, scale: number) {
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(pos.toArray()), 3),
    );
    const dotMaterial = new THREE.PointsMaterial({
      size: 0.005 * scale,
      color: 0xffffff,
    });
    const dot = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dot);

    if (this.traced.length < this.maxTraceLength) {
      this.traced.push(dot);
      this.traceInd = this.traced.length - 1;
    } else {
      this.traceInd = (this.traceInd + 1) % this.maxTraceLength;
      if (this.traced[this.traceInd] !== undefined) {
        scene.remove(this.traced[this.traceInd]!);
      }
      this.traced[this.traceInd] = dot;
    }
  }

  /**
   * Pop the last trace point from the scene.
   * @param scene scene to remove trace point from.
   * @returns true if a trace point was removed, false otherwise.
   */
  popTrace(scene: THREE.Scene): boolean {
    if (this.traced[this.traceInd] === undefined) {
      return false;
    }
    scene.remove(this.traced[this.traceInd]!);
    this.traced[this.traceInd] = undefined;
    this.traceInd
        = this.traceInd === 0 ? this.traced.length - 1 : this.traceInd - 1;
    return true;
  }

  /**
   * Pop all trace points from the scene.
   * @param scene scene to remove trace points from.
   */
  popAllTraces(scene: THREE.Scene) {
    while (this.popTrace(scene)) {
      // intentionally empty
    }
  }
}

/**
 * 3D real-time visualizer using Three.js.
 */
export class RealTimeVisualizer3D implements Visualizer {
  simulation: Simulation;
  divId: string = '';
  readonly speeds = [0, 0.5, 1, 2, 4, 10, 100, 1000, 10000];
  playing: boolean = false;
  universeTracers: UniverseTracer[] = [];
  maxTraceLength = 200;

  /**
   * Constructor for RealTimeVisualizer3D
   * @param simulation simulation object
   */
  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  /**
   * Simulate and play the visualization
   * @param divId div id to render the visualization in
   * @param timeScale initial time scale
   */
  play(divId: string, timeScale: number) {
    this.divId = divId;
    this.playing = true;
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }
    const width = element.clientWidth;
    const height = element.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    this.simulation.universes.forEach((u) => u.currState.bodies.forEach((b) => {
      maxWidth = Math.max(maxWidth, Math.abs(b.position.x));
      maxHeight = Math.max(maxHeight, Math.abs(b.position.y));
    }));
    const scale = 0.5 * Math.min(height / maxHeight, width / maxWidth);

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0,
      10000000000,
    );
    camera.position.set(0, 0, Math.max(width, height));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    element.appendChild(renderer.domElement);
    const stats = new Stats();
    element.parentNode?.appendChild(stats.dom);

    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = 'Earthhgkjfdghkjfgh';
    earthDiv.style.backgroundColor = 'transparent';
    earthDiv.style.color = 'white';
    earthDiv.style.fontFamily = 'sans-serif';
    earthDiv.style.background = 'rgba(0, 0, 0, 0.6)';

    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(0, 0, 0);
    earthLabel.center.set(0, 1);
    // arr[0].add(earthLabel);
    earthLabel.layers.set(0);
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    element.appendChild(labelRenderer.domElement);

    const orbitControls = new OrbitControls(camera, labelRenderer.domElement);
    orbitControls.listenToKeyEvents(window);
    orbitControls.update();

    const axesHelper = new THREE.AxesHelper(width);
    scene.add(axesHelper);
    // const gridHelper = new THREE.GridHelper(
    //   width,
    //   20,
    //   new THREE.Color('hsl(0, 0%, 70%)'),
    //   new THREE.Color('hsl(0, 0%, 40%)'),
    // );
    // scene.add(gridHelper);
    const viewHelper = new ViewHelper(camera, labelRenderer.domElement);

    // var m: Map<string, THREE.LineSegments> = new Map();
    let arr: THREE.LineSegments[] = [];

    this.simulation.universes.forEach((u) => {
      this.universeTracers.push(new UniverseTracer(this.maxTraceLength));
      u.currState.bodies.forEach((b) => {
        const sph = new THREE.SphereGeometry(
          clipMinMax(Math.log2(b.mass) - 70, 10, 40),
          8,
          8,
        );
        const curr = new THREE.WireframeGeometry(sph);
        const line = new THREE.LineSegments(
          curr,
          new THREE.LineBasicMaterial({
            // @ts-ignore
            color: new THREE.Color(u.color),
          }),
        );
        scene.add(line);
        line.position.copy(b.position.clone()
          .multiplyScalar(scale));
        // m.set(u.label + " " + b.label, line);
        arr.push(line);
      });
    });
    // arr[0].add(earthLabel)

    const fps = 30;
    let lastSimTimestampMs = performance.now();

    const gui = new GUI();
    let config: {
      'Time Scale': number;
      showTracers: boolean;
      showUniverse: { [key: string]: boolean };
    } = {
      'Time Scale': timeScale,
      'showTracers': true,
      'showUniverse': {},
    };

    gui.add(config, 'Time Scale');
    gui.add(config, 'showTracers')
      .onChange((value: boolean) => {
        if (value === false) {
          this.universeTracers.forEach((ut) => {
            ut.popAllTraces(scene);
          });
        }
        config.showTracers = value;
      });
    const showUniverseFolder = gui.addFolder('Show Universe');
    showUniverseFolder.open(false);
    this.simulation.universes.forEach((u, i) => {
      config.showUniverse[u.label] = true;
      showUniverseFolder
        .add(config.showUniverse, u.label)
        .onChange((value: boolean) => {
          if (value === false) {
            this.universeTracers[i].popAllTraces(scene);
          }
          config.showUniverse[u.label] = value;
        });
    });

    /**
     * Simulate a step in the simulation
     * @param timestampMs current timestamp in milliseconds, sourced from requestAnimationFrame
     */
    const step = (timestampMs: number) => {
      this.simulation.simulateStep(
        (config['Time Scale']
          * Math.min(timestampMs - lastSimTimestampMs, 10))
          / 1000,
      );
      lastSimTimestampMs = timestampMs;
    };

    let lastPaint = performance.now();

    /**
     * Paint the visualization
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame
     */
    const paint = (timestampMs: number) => {
      if (config['Time Scale'] === 0 || !this.playing) {
        requestAnimationFrame(paint);
        return;
      }
      step(timestampMs);

      // if (timestampMs - lastPaint < 1000 / fps) {
      //   requestAnimationFrame(paint);
      //   return;
      // }
      lastPaint = timestampMs;
      stats.update();

      let ind = 0;
      this.simulation.universes.forEach((u, i) => {
        if (config.showUniverse[u.label]) {
          u.currState.bodies.forEach((b) => {
            arr[ind].visible = true;
            arr[ind].position.copy(b.position.clone()
              .multiplyScalar(scale));
            if (config.showTracers) {
              this.universeTracers[i].addTrace(arr[ind].position, scene, scale);
            }
            ind++;
          });
        } else {
          u.currState.bodies.forEach((b) => {
            arr[ind].visible = false;
            ind++;
          });
        }
      });
      requestAnimationFrame(paint);
      renderer.clear();
      renderer.render(scene, camera);
      viewHelper.render(renderer);
      // labelRenderer.render(scene, camera);
      orbitControls.update();
    };

    requestAnimationFrame(paint);
  }

  /**
   * Pause the simulation and visualization.
   */
  pause(): void {
    this.playing = false;
  }

  /**
   * Resume the simulation and visualization.
   */
  resume(): void {
    this.playing = true;
  }


  /**
   * Stop the simulation and visualization.
   */
  stop(): void {
    this.playing = false;
    this.divId = '';
  }
}

/**
 * 2D recording visualizer using Plotly.
 */
export class RecordingVisualizer implements Visualizer {
  simulation: Simulation;
  divId: string = '';
  type: PlotType = 'scatter';
  readonly speeds = [0, 0.5, 1, 2, 4, 10, 20, 100, 1000, 10000, 1e5, 1e6, 1e7];
  playing: boolean = false;

  /**
   * Constructor for RecordingVisualizer
   * @param simulation simulation object
   * @param recordFor duration to record for
   */
  constructor(simulation: Simulation, recordFor: number) {
    this.simulation = simulation;
  }

  /**
   * Simulate, record and play the visualization on loop.
   * @param divId div id to render the visualization in
   * @param timeScale initial time scale
   */
  play(divId: string, timeScale: number) {
    this.divId = divId;
    this.playing = true;
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }

    const steps: Partial<SliderStep>[] = this.speeds.map(
      (speed: number): Partial<SliderStep> => ({
        label: speed.toString(),
        method: 'skip',
      }),
    );
    const init_data: Data[] = this.simulation.universes.map(
      (uni: Universe): Data => ({
        x: uni.currState.bodies.map((body) => body.position.x),
        y: uni.currState.bodies.map((body) => body.position.y),
        z: uni.currState.bodies.map((body) => body.position.z),
        type: this.type as PlotType,
        mode: 'markers',
        marker: {
          color: uni.color,
          sizemin: 6,
          size: uni.currState.bodies.map((body) => Math.min(10, body.mass)),
        },
      }),
    );

    const width = element.clientWidth;
    const height = element.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    this.simulation.universes.forEach((u) => u.currState.bodies.forEach((b) => {
      maxWidth = Math.max(maxWidth, Math.abs(b.position.x));
      maxHeight = Math.max(maxHeight, Math.abs(b.position.y));
    }));
    const scale = 0.5 * Math.min(height / maxHeight, width / maxWidth);

    const layout: Partial<Layout> = {
      paper_bgcolor: '#000000',
      plot_bgcolor: '#000000',
      font: {
        color: '#bfbfbf',
      },
      xaxis: {
        autorange: false,
        range: [-(width / 2) / scale, width / 2 / scale],
      },
      yaxis: {
        autorange: false,
        range: [-(height / 2) / scale, height / 2 / scale],
      },
      uirevision: 'true',
      sliders: [
        {
          steps,
          active: 0,
        },
      ],
    };

    Plotly.newPlot(divId, init_data, layout);

    const framesPerSecond = 30;
    const timePerFrameMs = 1000 / framesPerSecond;
    if (animationId != null) return;
    let lastPaintTimestampMs = 0;
    let speed = timeScale;

    let count = 0;
    /**
     * Paint the visualization.
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame.
     */
    const paint = (timestampMs: number) => {
      speed
        = this.speeds[
          parseInt(
            // @ts-ignore
            document.getElementById(divId)?.layout?.sliders[0].active,
          )
        ];

      if (
        speed === 0
        || !this.playing
        // || timestampMs - lastPaintTimestampMs < timePerFrameMs
      ) {
        animationId = requestAnimationFrame(paint);
        return;
      }
      lastPaintTimestampMs = timestampMs;
      step();

      const new_data = this.simulation.universes.map((uni: Universe) => ({
        x: uni.currState.bodies.map((body) => body.position.x),
        y: uni.currState.bodies.map((body) => body.position.y),
        z: uni.currState.bodies.map((body) => body.position.z),
        hovertext: uni.currState.bodies.map((body) => body.label),
        color: uni.color,
        marker: {
          size: uni.currState.bodies.map((body) => Math.min(10, body.mass)),
        },
      }));

      // @ts-ignore
      Plotly.animate(
        divId,
        {
          data: new_data,
        },
        {
          transition: {
            duration: 0,
          },
          frame: {
            duration: 0,
            redraw: false,
          },
        },
      );

      animationId = requestAnimationFrame(paint);
    };

    // let lastSimTimestampsMs = performance.now();

    // let isTabActive;
    // window.onfocus = function () {
    //   isTabActive = true;
    // };
    // window.onblur = function () {
    //   isTabActive = false;
    // };

    // let stepIntervalID: number = -1;

    /**
     * Simulate a step in the simulation.
     */
    const step = () => {
      // if (!this.playing) {
      //   clearInterval(stepIntervalID);
      //   return;
      // }

      // const currSimTimestampMs = performance.now();
      if (speed !== 0) {
        // lastSimTimestampsMs = currSimTimestampMs;

        // const duration = currSimTimestampMs - lastSimTimestampsMs;
        this.simulation.simulateStep(0.016 * speed);
        // lastSimTimestampsMs = currSimTimestampMs;
        // console.log(`stepping ${Math.floor(performance.now() / 1000)}`);
      }
    };

    requestAnimationFrame(paint);
    // stepIntervalID = window.setInterval(step, 10);
  }

  /**
   * Pause the visualization.
   */
  pause(): void {
    this.playing = false;
  }

  /**
   * Resume the visualization.
   */
  resume(): void {
    this.playing = true;
  }

  /**
   * Stop the visualization.
   */
  stop(): void {
    this.playing = false;
    Plotly.purge(this.divId);
    this.divId = '';
  }
}
/**
 * 3D recording visualizer using Three.js.
 */
export class RecordingVisualizer3D implements Visualizer {
  simulation: Simulation;
  divId: string = '';
  readonly speeds = [0, 0.5, 1, 2, 4, 10, 100, 1000, 10000];
  playing: boolean = false;
  universeTracers: UniverseTracer[] = [];
  maxTraceLength = 200;
  recordFor: number;
  recordedFrames: State[] = [];
  playInd: number = 0;

  /**
   * Constructor for RecordingVisualizer3D.
   * @param simulation simulation object.
   * @param recordFor duration to record for.
   */
  constructor(simulation: Simulation, recordFor: number) {
    this.simulation = simulation;
    this.recordFor = recordFor;
  }

  /**
   * Simulate, record and play the visualization on loop.
   * @param divId div id to render the visualization in.
   * @param timeScale initial time scale.
   */
  play(divId: string, timeScale: number) {
    this.divId = divId;
    this.playing = true;
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }
    const width = element.clientWidth;
    const height = element.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    this.simulation.universes.forEach((u) => u.currState.bodies.forEach((b) => {
      maxWidth = Math.max(maxWidth, Math.abs(b.position.x));
      maxHeight = Math.max(maxHeight, Math.abs(b.position.y));
    }));
    const scale = 0.5 * Math.min(height / maxHeight, width / maxWidth);
    const framesPerSecond = 60;

    for (let i = 0; i < framesPerSecond * this.recordFor; i++) {
      this.recordedFrames.push(this.simulation.universes[0].currState.clone());
      this.simulation.simulateStep(1 / framesPerSecond);
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0,
      10000000000,
    );
    camera.position.set(0, 0, Math.max(width, height));

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    element.appendChild(renderer.domElement);
    const stats = new Stats();
    element.parentNode?.appendChild(stats.dom);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents(window);
    orbitControls.update();

    const axesHelper = new THREE.AxesHelper(width);
    scene.add(axesHelper);
    const viewHelper = new ViewHelper(camera, renderer.domElement);

    // var m: Map<string, THREE.LineSegments> = new Map();
    let arr: THREE.LineSegments[] = [];

    this.simulation.universes.forEach((u, i) => {
      if (i > 0) {
        return;
      }
      this.universeTracers.push(new UniverseTracer(this.maxTraceLength));
      u.currState.bodies.forEach((b) => {
        const sph = new THREE.SphereGeometry(
          clipMinMax(Math.log2(b.mass) - 70, 10, 40),
          8,
          8,
        );
        const curr = new THREE.WireframeGeometry(sph);
        const line = new THREE.LineSegments(
          curr,
          new THREE.LineBasicMaterial({
            // @ts-ignore
            color: new THREE.Color(u.color),
          }),
        );
        scene.add(line);
        line.position.copy(b.position.clone()
          .multiplyScalar(scale));
        arr.push(line);
      });
    });

    const gui = new GUI();
    let config: {
      'Time Scale': number;
    //   showTracers: boolean;
    //   showUniverse: { [key: string]: boolean };
    } = {
      'Time Scale': timeScale,
    //   showTracers: true,
    //   showUniverse: {},
    };

    gui.add(config, 'Time Scale');
    // gui.add(config, "showTracers").onChange((value: boolean) => {
    //   if (value === false) {
    //     this.universeTracers.forEach((ut) => {
    //       ut.popAllTraces(scene);
    //     });
    //   }
    //   config.showTracers = value;
    // });
    // const showUniverseFolder = gui.addFolder("Show Universe");
    // showUniverseFolder.open(false);
    // this.simulation.universes.forEach((u, i) => {
    //   config.showUniverse[u.label] = true;
    //   showUniverseFolder
    //     .add(config.showUniverse, u.label)
    //     .onChange((value: boolean) => {
    //       if (value === false) {
    //         this.universeTracers[i].popAllTraces(scene);
    //       }
    //       config.showUniverse[u.label] = value;
    //     });
    // });

    // const step = () => {
    //   var currTimestampMs = performance.now();
    //   this.simulation.simulateStep(
    //     (config["Time Scale"] *
    //       Math.min(currTimestampMs - lastSimTimestampMs, 10)) /
    //       1000
    //   );
    //   lastSimTimestampMs = currTimestampMs;
    // };

    // var lastPaint = performance.now();

    /**
     * Paint the visualization.
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame.
     */
    const paint = (timestampMs: number) => {
      // if (config["Time Scale"] === 0 || !this.playing) {
      //   requestAnimationFrame(paint);
      //   return;
      // }
      // step();

      // if (timestampMs - lastPaint < 1000 / fps) {
      //   requestAnimationFrame(paint);
      //   return;
      // }
      // lastPaint = timestampMs;
      stats.update();

      let ind = 0;
      if (this.recordedFrames[this.playInd] === undefined) {
        throw new Error('undefined frame');
      }
      this.recordedFrames[this.playInd].bodies.forEach((b) => {
        arr[ind].visible = true;
        arr[ind].position.copy(b.position.clone()
          .multiplyScalar(scale));
        ind++;
      });
      this.playInd = (this.playInd + Math.floor(config['Time Scale']) + this.recordedFrames.length) % this.recordedFrames.length;

      requestAnimationFrame(paint);
      renderer.clear();
      renderer.render(scene, camera);
      viewHelper.render(renderer);
      // labelRenderer.render(scene, camera);
      orbitControls.update();
    };

    requestAnimationFrame(paint);
  }

  /**
   * Pause the visualization.
   */
  pause(): void {
    this.playing = false;
  }

  /**
   * Resume the visualization.
   */
  resume(): void {
    this.playing = true;
  }

  /**
   * Stop the visualization.
   */
  stop(): void {
    this.playing = false;
    this.divId = '';
  }
}
