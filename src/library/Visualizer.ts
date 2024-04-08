/* eslint-disable import/extensions */
import GUI from 'lil-gui';
import Plotly, { type Data, type Layout } from 'plotly.js-dist';
import * as THREE from 'three';
import { OrbitControls, ViewHelper } from 'three/examples/jsm/Addons.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { type Simulation } from '../Simulation';
import { type State } from '../State';
import { type Universe } from '../Universe';
import { type Visualizer } from '../Visualizer';

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
 * Container object for body trails in a 2D universe based in Plotly.
 */
class PlotlyUniverseTrail {
  data: {
    x: (number | null)[];
    y: (number | null)[];
    mode: 'markers';
    marker: {
      size: number;
      color: string;
    };
  } = {
      x: [],
      y: [],
      mode: 'markers',
      marker: {
        size: 1,
        color: 'white',
      },
    };
  trailLength: number;
  maxTrailLength: number;
  trailInd: number;

  /**
   * Constructor for PlotlyUniverseTrail
   * @param maxTrailLength max number of trail points to keep.
   * @param color color of the trail.
   */
  constructor(maxTrailLength: number, color: string) {
    this.data.marker.color = color;
    this.trailLength = 0;
    this.maxTrailLength = maxTrailLength;
    this.trailInd = 0;
  }

  /**
   * Add a trail point to the trail data, or replace an existing trail point if the max trail length has been reached.
   * @param x x position.
   * @param y y position.
   */
  addTrail(x: number, y: number): void {
    if (this.trailLength < this.maxTrailLength) {
      this.data.x.push(x);
      this.data.y.push(y);
      this.trailLength++;
    } else {
      this.data.x[this.trailInd] = x;
      this.data.y[this.trailInd] = y;
      this.trailInd = (this.trailInd + 1) % this.trailLength;
    }
  }

  /**
   * Pop all trail points from the trail data.
   */
  popAllTrails(): void {
    this.data.x = [];
    this.data.y = [];
    this.trailLength = 0;
    this.trailInd = 0;
  }
}

/**
 * 2D real-time visualizer using Plotly.
 * @category Visualizers
 */
export class RealTimeVisualizer implements Visualizer {
  animationId: number | null = null;
  simulation: Simulation;
  divId: string = '';
  universeTrails: PlotlyUniverseTrail[] = [];

  /**
   * Constructor for RealTimeVisualizer
   * @param simulation simulation object
   */
  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  /**
   * Adds default controls using lil-gui to the visualization.
   * @param parentElement parent element to place the controller div in.
   */
  private addControls(parentElement: HTMLElement) {
    const gui = new GUI({
      container: parentElement,
    });
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '0';
    gui.domElement.style.left = '0';
    gui.domElement.style.zIndex = '1000';

    const config = this.simulation.controls;
    gui.add(config, 'speed');
    gui.add(config, 'showTrails')
      .onChange((value: boolean) => {
        if (value === false) {
          this.universeTrails.forEach((ut) => ut.popAllTrails());
        }
        config.showTrails = value;
      });
    const showUniverseFolder = gui.addFolder('Show Universe');
    showUniverseFolder.open(false);
    this.simulation.universes.forEach((u, i) => {
      showUniverseFolder
        .add(config.showUniverse, u.label)
        .onChange((value: boolean) => {
          if (value === false) {
            this.universeTrails[i].popAllTrails();
          }
          config.showUniverse[u.label] = value;
        });
    });
  }

  /**
   * Simulate and play the visualization.
   * @param divId div id to render the visualization in.
   * @param width width of the visualization.
   * @param height height of the visualization.
   */
  start(divId: string, width: number, height: number): void {
    if (this.divId !== '') {
      console.error(divId, 'Simulation already playing. Stop the current playtime before initiating a new one.');
      return;
    }
    this.divId = divId;
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }
    // const width = element.clientWidth;
    // const height = element.clientHeight;
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
      // uirevision: 'true',
      showlegend: false,
      width,
      height,
    };

    if (this.simulation.controller === 'ui') {
      this.addControls(element);
    }

    let stats: Stats | undefined;
    if (this.simulation.showDebugInfo) {
      stats = new Stats();
      stats.dom.style.position = 'absolute';
      stats.dom.style.bottom = '0px';
      stats.dom.style.removeProperty('top');
      element.appendChild(stats.dom);
    }

    const init_data: Data[] = this.simulation.universes.flatMap(
      (uni: Universe): Data[] => {
        const currTrail = new PlotlyUniverseTrail(
          this.simulation.getMaxTrailLength(),
          typeof uni.color === 'string' ? uni.color : uni.color[0],
        );
        this.universeTrails.push(currTrail);
        const currData: Data = {
          x: uni.currState.bodies.map((body) => body.position.x),
          y: uni.currState.bodies.map((body) => body.position.y),
          type: 'scatter',
          mode: 'markers',
          marker: {
            color: uni.color,
            sizemin: 6,
            size: uni.currState.bodies.map((body) => Math.min(10, body.mass)),
          },
        };
        if (this.simulation.getShowTrails()) {
          uni.currState.bodies.forEach((b) => {
            currTrail.addTrail(b.position.x, b.position.y);
          });
          return [currData, currTrail.data];
        }
        return [
          currData,
          {
            x: [],
            y: [],
          },
        ];
      },
    );

    Plotly.newPlot(divId, init_data, layout, {
      scrollZoom: true,
      modeBarButtonsToRemove: [
        'lasso2d',
        'select2d',
        'toImage',
        'resetScale2d',
      ],
    });

    const timePerFrame = 1000 / this.simulation.maxFrameRate;
    let lastPaintTimestampMs = 0;
    let lastSimTimestampMs = 0;

    /**
     * Simulate a step in the simulation
     * @param timestampMs current timestamp in milliseconds, sourced from requestAnimationFrame
     */
    const step = (timestampMs: number): void => {
      this.simulation.simulateStep(
        (this.simulation.controls.speed
          * Math.min(timestampMs - lastSimTimestampMs, 33.33))
          / 1000,
      );
      lastSimTimestampMs = timestampMs;
    };

    /**
     * Paint the visualization
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame
     */
    const paint = (timestampMs: number) => {
      if (
        this.simulation.controls.speed === 0
        || this.simulation.controls.paused
      ) {
        this.animationId = requestAnimationFrame(paint);
        return;
      }
      step(timestampMs);

      if (
        timePerFrame > 0
        && timestampMs - lastPaintTimestampMs < timePerFrame
      ) {
        this.animationId = requestAnimationFrame(paint);
        return;
      }
      lastPaintTimestampMs = timestampMs;

      const new_data = this.simulation.universes.flatMap(
        (uni: Universe, i: number): Data[] => {
          if (!this.simulation.getShowUniverse(uni.label)) {
            return [
              {
                x: [],
                y: [],
              },
              {},
            ];
          }
          const currData: Data = {
            x: uni.currState.bodies.map((body) => body.position.x),
            y: uni.currState.bodies.map((body) => body.position.y),
            hovertext: uni.currState.bodies.map((body) => body.label),
            marker: {
              size: uni.currState.bodies.map((body) => Math.min(10, body.mass)),
              color: uni.color,
              sizemin: 6,
            },
            mode: 'markers',
          };

          let trailData: Data = {};
          if (this.simulation.getShowTrails()) {
            const currTrail = this.universeTrails[i];
            uni.currState.bodies.forEach((b) => {
              currTrail.addTrail(b.position.x, b.position.y);
            });
            trailData = currTrail.data;
          }
          return [currData, trailData];
        },
      );

      Plotly.react(divId, new_data, layout);
      if (this.simulation.showDebugInfo && stats) {
        stats.update();
      }
      this.animationId = requestAnimationFrame(paint);
    };

    this.animationId = requestAnimationFrame(paint);
  }

  /**
   * Stop the simulation and visualization.
   */
  stop(): void {
    if (this.animationId === null) {
      return;
    }
    cancelAnimationFrame(this.animationId);
    this.divId = '';
    this.universeTrails.forEach((ut) => {
      ut.popAllTrails();
    });
    this.universeTrails = [];
    try {
      Plotly.purge(this.divId);
    } catch (_) {
    }
  }
}

/**
 * Container object for body trails in a 3D universe based in Three.js.
 */
class ThreeUniverseTrail {
  /**
   * Singular Points object containing all trail points.
   */
  trails: THREE.Points;
  trailInd: number;
  trailLength: number;
  maxTrailLength: number;

  /**
   * Constructor for ThreeUniverseTrail.
   * @param maxTrailLength max number of trail points to keep.
   * @param color color of the trace points.
   * @param scene scene to add trail points object to.
   * @param scale scale of the visualizationl, used to set the size of the trail point.
   */
  constructor(
    maxTrailLength: number,
    color: string,
    scene: THREE.Scene,
    scale: number,
  ) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(0), 3),
    );
    this.trails = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color,
        size: 0.005 * scale,
      }),
    );
    scene.add(this.trails);
    this.trailInd = 0;
    this.trailLength = 0;
    this.maxTrailLength = maxTrailLength;
  }

  /**
   * Add a trail point at the given position to the scene. Replace an existing trail point if the max trail length has been reached.
   * @param pos position to add trace point at.
   */
  addTrail(pos: THREE.Vector3) {
    if (this.trailLength < this.maxTrailLength) {
      this.trails.visible = true;
      this.trailLength++;
      const posArray = new Float32Array(this.trailLength * 3);
      posArray.set(this.trails.geometry.attributes.position.array);
      posArray.set(pos.toArray(), this.trailLength * 3 - 3);
      this.trails.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3),
      );
      this.trails.geometry.attributes.position.needsUpdate = true;
    } else {
      this.trails.geometry.attributes.position.array.set(
        pos.toArray(),
        this.trailInd * 3,
      );
      this.trailInd = (this.trailInd + 1) % this.maxTrailLength;
      this.trails.geometry.attributes.position.needsUpdate = true;
    }
  }

  /**
   * Pop all trail points.
   */
  popAllTrails(): void {
    this.trails.visible = false;
    this.trails.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(0), 3),
    );
    this.trailInd = 0;
    this.trailLength = 0;
  }
}

/**
 * 3D real-time visualizer using Three.js.
 * @category Visualizers
 */
export class RealTimeVisualizer3D implements Visualizer {
  animationId: number | null = null;
  /**
   * Clear the visualization.
   */
  clear: () => void = () => { };
  simulation: Simulation;
  scene?: THREE.Scene;
  universeTrails: ThreeUniverseTrail[] = [];

  /**
   * Constructor for RealTimeVisualizer3D.
   * @param simulation simulation object.
   */
  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  /**
   * Adds default controls to the visualization.
   * @param parentElement parent element to place the controller div in.
   */
  private addControls(parentElement: HTMLElement) {
    const gui = new GUI({
      container: parentElement,
    });
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '0';
    gui.domElement.style.left = '0';
    gui.domElement.style.zIndex = '1000';

    const config = this.simulation.controls;
    gui.add(config, 'speed');
    gui.add(config, 'showTrails')
      .onChange((value: boolean) => {
        if (value === false) {
          this.universeTrails.forEach((ut) => {
            ut.popAllTrails();
          });
        }
        config.showTrails = value;
      });
    const showUniverseFolder = gui.addFolder('Show Universe');
    showUniverseFolder.open(false);
    this.simulation.universes.forEach((u, i) => {
      showUniverseFolder
        .add(config.showUniverse, u.label)
        .onChange((value: boolean) => {
          if (value === false) {
            this.universeTrails[i].popAllTrails();
          }
          config.showUniverse[u.label] = value;
        });
    });
  }

  /**
   * Simulate and play the visualization
   * @param divId div id to render the visualization in
   * @param width width of the visualization.
   * @param height height of the visualization.
   */
  start(divId: string, width: number, height: number): void {
    if (this.scene !== undefined) {
      console.error(divId, 'Simulation already playing. Stop the current playtime before initiating a new one.');
      return;
    }
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }
    element.style.position = 'relative';
    // const width = element.clientWidth;
    // const height = element.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    this.simulation.universes.forEach((u) => u.currState.bodies.forEach((b) => {
      maxWidth = Math.max(maxWidth, Math.abs(b.position.x));
      maxHeight = Math.max(maxHeight, Math.abs(b.position.y));
    }));
    const scale = 0.5 * Math.min(height / maxHeight, width / maxWidth);

    this.scene = new THREE.Scene();

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
    renderer.setSize(width, height);
    renderer.autoClear = false;
    element.appendChild(renderer.domElement);

    let stats: Stats | undefined;
    if (this.simulation.showDebugInfo) {
      stats = new Stats();
      stats.dom.style.position = 'absolute';
      stats.dom.style.right = '0px';
      stats.dom.style.removeProperty('left');
      element.appendChild(stats.dom);
    }

    if (this.simulation.controller === 'ui') {
      this.addControls(element);
    }

    // const earthDiv = document.createElement('div');
    // earthDiv.className = 'label';
    // earthDiv.textContent = 'Earthhgkjfdghkjfgh';
    // earthDiv.style.backgroundColor = 'transparent';
    // earthDiv.style.color = 'white';
    // earthDiv.style.fontFamily = 'sans-serif';
    // earthDiv.style.background = 'rgba(0, 0, 0, 0.6)';

    // const earthLabel = new CSS2DObject(earthDiv);
    // earthLabel.position.set(0, 0, 0);
    // earthLabel.center.set(0, 1);
    // // arr[0].add(earthLabel);
    // earthLabel.layers.set(0);
    // const labelRenderer = new CSS2DRenderer();
    // labelRenderer.setSize(width, height);
    // labelRenderer.domElement.style.position = 'absolute';
    // labelRenderer.domElement.style.top = '0px';
    // element.appendChild(labelRenderer.domElement);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents(window);
    orbitControls.update();

    const axesHelper = new THREE.AxesHelper(width);
    this.scene.add(axesHelper);
    const viewHelper = new ViewHelper(camera, renderer.domElement);

    // var m: Map<string, THREE.LineSegments> = new Map();
    let arr: THREE.LineSegments[] = [];

    this.simulation.universes.forEach((u) => {
      this.universeTrails.push(
        new ThreeUniverseTrail(
          this.simulation.maxTrailLength,
          typeof u.color === 'string' ? u.color : u.color[0],
          this.scene!,
          scale,
        ),
      );
      u.currState.bodies.forEach((b, i) => {
        const sph = new THREE.SphereGeometry(
          clipMinMax(Math.log2(b.mass) - 70, 10, 40),
          8,
          8,
        );
        const curr = new THREE.WireframeGeometry(sph);
        const line = new THREE.LineSegments(
          curr,
          new THREE.LineBasicMaterial({
            color: new THREE.Color(
              typeof u.color === 'string' ? u.color : u.color[i],
            ),
          }),
        );
        this.scene!.add(line);
        line.position.copy(b.position.clone()
          .multiplyScalar(scale));
        // m.set(u.label + " " + b.label, line);
        arr.push(line);
      });
    });
    // arr[0].add(earthLabel)

    const timePerFrame = 1000 / this.simulation.maxFrameRate;
    let lastSimTimestampMs = performance.now();
    let lastPaint = performance.now();

    /**
     * Simulate a step in the simulation
     * @param timestampMs current timestamp in milliseconds, sourced from requestAnimationFrame
     */
    const step = (timestampMs: number) => {
      this.simulation.simulateStep(
        (this.simulation.controls.speed
          * Math.min(timestampMs - lastSimTimestampMs, 16.67))
          / 1000,
      );
      lastSimTimestampMs = timestampMs;
    };

    /**
     * Paint the visualization
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame
     */
    const paint = (timestampMs: number) => {
      if (
        this.simulation.controls.speed === 0
        || this.simulation.controls.paused
      ) {
        this.animationId = requestAnimationFrame(paint);
        renderer.clear();
        renderer.render(this.scene!, camera);
        viewHelper.render(renderer);
        // labelRenderer.render(scene, camera);
        orbitControls.update();
        return;
      }
      step(timestampMs);

      if (timePerFrame > 0 && timestampMs - lastPaint < timePerFrame) {
        this.animationId = requestAnimationFrame(paint);
        renderer.clear();
        renderer.render(this.scene!, camera);
        viewHelper.render(renderer);
        // labelRenderer.render(scene, camera);
        orbitControls.update();
        return;
      }

      lastPaint = timestampMs;
      if (this.simulation.showDebugInfo && stats) {
        stats.update();
      }

      let ind = 0;
      this.simulation.universes.forEach((u, i) => {
        if (this.simulation.controls.showUniverse[u.label]) {
          u.currState.bodies.forEach((b) => {
            arr[ind].visible = true;
            arr[ind].position.copy(b.position.clone()
              .multiplyScalar(scale));
            if (this.simulation.controls.showTrails) {
              this.universeTrails[i].addTrail(arr[ind].position);
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
      this.animationId = requestAnimationFrame(paint);
      renderer.clear();
      renderer.render(this.scene!, camera);
      viewHelper.render(renderer);
      // labelRenderer.render(scene, camera);
      orbitControls.update();
    };

    /**
     * Clear the objects and renderer.
     */
    this.clear = () => {
      renderer.clear();
      renderer.dispose();
      arr.forEach((a) => {
        if (Array.isArray(a.material)) {
          a.material.forEach((m) => {
            m.dispose();
          });
        } else {
          a.material.dispose();
        }
        a.geometry.dispose();
      });
    };

    this.animationId = requestAnimationFrame(paint);
  }

  /**
   * Stop the simulation and visualization.
   */
  stop(): void {
    if (this.animationId === null) {
      return;
    }
    cancelAnimationFrame(this.animationId);
    this.scene?.clear();
    this.scene = undefined;
    this.clear();
    /**
     * Replace back the empty function.
     */
    this.clear = () => { };
    this.universeTrails.forEach((ut) => {
      ut.popAllTrails();
    });
    this.universeTrails = [];
  }
}

/**
 * 2D recording visualizer using Plotly.
 * @category Visualizers
 */
export class RecordingVisualizer implements Visualizer {
  animationId: number | null = null;
  simulation: Simulation;
  divId: string = '';
  universeTrails: PlotlyUniverseTrail[] = [];

  /**
   * Constructor for RealTimeVisualizer
   * @param simulation simulation object
   */
  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  /**
   * Adds default controls using lil-gui to the visualization.
   * @param parentElement parent element to place the controller div in.
   */
  private addControls(parentElement: HTMLElement): void {
    const gui = new GUI({
      container: parentElement,
    });
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '0';
    gui.domElement.style.left = '0';
    gui.domElement.style.zIndex = '1000';

    const config = this.simulation.controls;
    gui.add(config, 'speed');
    gui.add(config, 'showTrails')
      .onChange((value: boolean) => {
        if (value === false) {
          this.universeTrails.forEach((ut) => ut.popAllTrails());
        }
        config.showTrails = value;
      });
    const showUniverseFolder = gui.addFolder('Show Universe');
    showUniverseFolder.open(false);
    this.simulation.universes.forEach((u, i) => {
      showUniverseFolder
        .add(config.showUniverse, u.label)
        .onChange((value: boolean) => {
          if (value === false) {
            this.universeTrails[i].popAllTrails();
          }
          config.showUniverse[u.label] = value;
        });
    });
  }

  /**
   * Simulate and play the visualization.
   * @param divId div id to render the visualization in.
   * @param width width of the visualization.
   * @param height height of the visualization.
   * @param recordFor number of seconds to record for..
   */
  start(divId: string, width: number, height: number, recordFor: number): void {
    if (this.divId !== '') {
      console.error('Simulation already playing. Stop the current playtime before initiating a new one.');
      return;
    }
    this.divId = divId;
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }
    // const width = element.clientWidth;
    // const height = element.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    this.simulation.universes.forEach((u) => u.currState.bodies.forEach((b) => {
      maxWidth = Math.max(maxWidth, Math.abs(b.position.x));
      maxHeight = Math.max(maxHeight, Math.abs(b.position.y));
    }));
    const scale = 0.5 * Math.min(height / maxHeight, width / maxWidth);

    const recordedFrames: State[][] = [];
    const totalFrames = this.simulation.maxFrameRate * recordFor;
    let playInd = 1;
    this.simulation.universes.forEach((u) => {
      recordedFrames.push([u.currState.clone()]);
    });
    for (let i = 0; i < totalFrames; i++) {
      this.simulation.simulateStep(1 / this.simulation.maxFrameRate);
      this.simulation.universes.forEach((u, j) => {
        recordedFrames[j].push(u.currState.clone());
      });
    }

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
      // uirevision: 'true',
      showlegend: false,
      width,
      height,
    };

    if (this.simulation.controller === 'ui') {
      this.addControls(element);
    }

    let stats: Stats | undefined;
    if (this.simulation.showDebugInfo) {
      stats = new Stats();
      stats.dom.style.position = 'absolute';
      stats.dom.style.bottom = '0px';
      stats.dom.style.removeProperty('top');
      element.appendChild(stats.dom);
    }

    const init_data: Data[] = this.simulation.universes.flatMap(
      (uni: Universe): Data[] => {
        const currTrail = new PlotlyUniverseTrail(
          this.simulation.getMaxTrailLength(),
          typeof uni.color === 'string' ? uni.color : uni.color[0],
        );
        this.universeTrails.push(currTrail);
        const currData: Data = {
          x: uni.currState.bodies.map((body) => body.position.x),
          y: uni.currState.bodies.map((body) => body.position.y),
          type: 'scatter',
          mode: 'markers',
          marker: {
            color: uni.color,
            sizemin: 6,
            size: uni.currState.bodies.map((body) => Math.min(10, body.mass)),
          },
        };
        if (this.simulation.getShowTrails()) {
          uni.currState.bodies.forEach((b) => {
            currTrail.addTrail(b.position.x, b.position.y);
          });
          return [currData, currTrail.data];
        }
        return [
          currData,
          {
            x: [],
            y: [],
          },
        ];
      },
    );

    Plotly.newPlot(divId, init_data, layout, {
      scrollZoom: true,
      modeBarButtonsToRemove: [
        'zoom2d',
        'lasso2d',
        'select2d',
        'toImage',
        'resetScale2d',
      ],
    });

    /**
     * Paint the visualization
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame
     */
    const paint = (timestampMs: number) => {
      if (
        this.simulation.controls.speed === 0
        || this.simulation.controls.paused
      ) {
        this.animationId = requestAnimationFrame(paint);
        return;
      }

      const currPlayInd = Math.round(playInd);
      const new_data = this.simulation.universes.flatMap(
        (uni: Universe, i: number): Data[] => {
          if (!this.simulation.getShowUniverse(uni.label)) {
            return [
              {
                x: [],
                y: [],
              },
              {},
            ];
          }
          const currState = recordedFrames[i][currPlayInd];
          const currData: Data = {
            x: currState.bodies.map((body) => body.position.x),
            y: currState.bodies.map((body) => body.position.y),
            hovertext: currState.bodies.map((body) => body.label),
            marker: {
              size: currState.bodies.map((body) => Math.min(10, body.mass)),
              color: uni.color,
              sizemin: 6,
            },
            mode: 'markers',
          };

          let trailData: Data = {};
          if (this.simulation.getShowTrails()) {
            const currTrail = this.universeTrails[i];
            currState.bodies.forEach((b): void => {
              currTrail.addTrail(b.position.x, b.position.y);
            });
            trailData = currTrail.data;
          }
          return [currData, trailData];
        },
      );
      Plotly.react(divId, new_data, layout);

      if (this.simulation.showDebugInfo && stats) {
        stats.update();
      }

      playInd = Math.round(playInd + this.simulation.controls.speed);
      if (playInd < 0) {
        if (this.simulation.looped) {
          playInd = ((playInd % totalFrames) + totalFrames) % totalFrames;
        } else {
          playInd = 0;
        }
      } else if (playInd >= totalFrames) {
        if (this.simulation.looped) {
          playInd %= totalFrames;
        } else {
          playInd = totalFrames - 1;
        }
      }
      this.animationId = requestAnimationFrame(paint);
    };

    this.animationId = requestAnimationFrame(paint);
  }

  /**
   * Stop the simulation and visualization.
   */
  stop(): void {
    if (this.animationId === null) {
      return;
    }
    cancelAnimationFrame(this.animationId);
    this.divId = '';
    this.universeTrails = [];
    try {
      Plotly.purge(this.divId);
    } catch (_) {
    }
  }
}

/**
 * 3D recording visualizer using Three.js.
 * @category Visualizers
 */
export class RecordingVisualizer3D implements Visualizer {
  animationId: number | null = null;
  /**
   * Clear the visualization.
   */
  clear: () => void = () => { };
  simulation: Simulation;
  scene?: THREE.Scene;
  universeTrails: ThreeUniverseTrail[] = [];

  /**
   * Constructor for RealTimeVisualizer3D.
   * @param simulation simulation object.
   */
  constructor(simulation: Simulation) {
    this.simulation = simulation;
  }

  /**
   * Adds default controls to the visualization.
   * @param parentElement parent element to place the controller div in.
   */
  private addControls(parentElement: HTMLElement) {
    const gui = new GUI({
      container: parentElement,
    });
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '0';
    gui.domElement.style.left = '0';
    gui.domElement.style.zIndex = '1000';

    const config = this.simulation.controls;
    gui.add(config, 'speed');
    gui.add(config, 'showTrails')
      .onChange((value: boolean) => {
        if (value === false) {
          this.universeTrails.forEach((ut) => {
            ut.popAllTrails();
          });
        }
        config.showTrails = value;
      });
    const showUniverseFolder = gui.addFolder('Show Universe');
    showUniverseFolder.open(false);
    this.simulation.universes.forEach((u, i) => {
      showUniverseFolder
        .add(config.showUniverse, u.label)
        .onChange((value: boolean) => {
          if (value === false) {
            this.universeTrails[i].popAllTrails();
          }
          config.showUniverse[u.label] = value;
        });
    });
  }

  /**
   * Simulate and play the visualization
   * @param divId div id to render the visualization in.
   * @param width width of the visualization.
   * @param height height of the visualization.
   * @param recordFor number of seconds to record for.
   */
  start(divId: string, width: number, height: number, recordFor: number): void {
    if (this.scene !== undefined) {
      console.error('Simulation already playing. Stop the current playtime before initiating a new one.');
      return;
    }
    let element = document.getElementById(divId);
    if (element === null) {
      return;
    }
    // const width = element.clientWidth;
    // const height = element.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;
    this.simulation.universes.forEach((u) => u.currState.bodies.forEach((b) => {
      maxWidth = Math.max(maxWidth, Math.abs(b.position.x));
      maxHeight = Math.max(maxHeight, Math.abs(b.position.y));
    }));
    const scale = 0.5 * Math.min(height / maxHeight, width / maxWidth);

    this.scene = new THREE.Scene();

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
    renderer.setSize(width, height);
    renderer.autoClear = false;
    element.appendChild(renderer.domElement);

    let stats: Stats | undefined;
    if (this.simulation.showDebugInfo) {
      stats = new Stats();
      stats.dom.style.position = 'absolute';
      stats.dom.style.right = '0px';
      stats.dom.style.removeProperty('left');
      element.appendChild(stats.dom);
    }

    if (this.simulation.controller === 'ui') {
      this.addControls(element);
    }

    // const earthDiv = document.createElement('div');
    // earthDiv.className = 'label';
    // earthDiv.textContent = 'Earthhgkjfdghkjfgh';
    // earthDiv.style.backgroundColor = 'transparent';
    // earthDiv.style.color = 'white';
    // earthDiv.style.fontFamily = 'sans-serif';
    // earthDiv.style.background = 'rgba(0, 0, 0, 0.6)';

    // const earthLabel = new CSS2DObject(earthDiv);
    // earthLabel.position.set(0, 0, 0);
    // earthLabel.center.set(0, 1);
    // // arr[0].add(earthLabel);
    // earthLabel.layers.set(0);
    // const labelRenderer = new CSS2DRenderer();
    // labelRenderer.setSize(width, height);
    // labelRenderer.domElement.style.position = 'absolute';
    // labelRenderer.domElement.style.top = '0px';
    // element.appendChild(labelRenderer.domElement);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.listenToKeyEvents(window);
    orbitControls.update();

    const axesHelper = new THREE.AxesHelper(width);
    this.scene.add(axesHelper);
    const viewHelper = new ViewHelper(camera, renderer.domElement);

    // var m: Map<string, THREE.LineSegments> = new Map();
    let arr: THREE.LineSegments[] = [];

    this.simulation.universes.forEach((u) => {
      this.universeTrails.push(
        new ThreeUniverseTrail(
          this.simulation.maxTrailLength,
          typeof u.color === 'string' ? u.color : u.color[0],
          this.scene!,
          scale,
        ),
      );
      u.currState.bodies.forEach((b, i) => {
        const sph = new THREE.SphereGeometry(
          clipMinMax(Math.log2(b.mass) - 70, 10, 40),
          8,
          8,
        );
        const curr = new THREE.WireframeGeometry(sph);
        const line = new THREE.LineSegments(
          curr,
          new THREE.LineBasicMaterial({
            color: new THREE.Color(
              typeof u.color === 'string' ? u.color : u.color[i],
            ),
          }),
        );
        this.scene!.add(line);
        line.position.copy(b.position.clone()
          .multiplyScalar(scale));
        // m.set(u.label + " " + b.label, line);
        arr.push(line);
      });
    });
    // arr[0].add(earthLabel)

    const recordedFrames: State[][] = [];
    const totalFrames = this.simulation.maxFrameRate * recordFor;
    let playInd = 1;
    this.simulation.universes.forEach((u) => {
      recordedFrames.push([u.currState.clone()]);
    });
    for (let i = 0; i < totalFrames; i++) {
      this.simulation.simulateStep(1 / this.simulation.maxFrameRate);
      this.simulation.universes.forEach((u, j) => {
        recordedFrames[j].push(u.currState.clone());
      });
    }

    /**
     * Paint the visualization
     * @param timestampMs current timestamp in milliseconds, provided by requestAnimationFrame
     */
    const paint = (timestampMs: number) => {
      if (
        this.simulation.controls.speed === 0
        || this.simulation.controls.paused
      ) {
        this.animationId = requestAnimationFrame(paint);
        renderer.clear();
        renderer.render(this.scene!, camera);
        viewHelper.render(renderer);
        // labelRenderer.render(scene, camera);
        orbitControls.update();
        return;
      }

      let ind = 0;
      this.simulation.universes.forEach((u, i) => {
        if (this.simulation.controls.showUniverse[u.label]) {
          const currState = recordedFrames[i][playInd];
          currState.bodies.forEach((b) => {
            arr[ind].visible = true;
            arr[ind].position.copy(b.position.clone()
              .multiplyScalar(scale));
            if (this.simulation.controls.showTrails) {
              this.universeTrails[i].addTrail(arr[ind].position);
            }
            ind++;
          });
        } else {
          u.currState.bodies.forEach(() => {
            arr[ind].visible = false;
            ind++;
          });
        }
      });

      if (this.simulation.showDebugInfo && stats) {
        stats.update();
      }

      playInd = Math.round(playInd + this.simulation.controls.speed);
      if (playInd < 0) {
        if (this.simulation.looped) {
          playInd = ((playInd % totalFrames) + totalFrames) % totalFrames;
        } else {
          playInd = 0;
        }
      } else if (playInd >= totalFrames) {
        if (this.simulation.looped) {
          playInd %= totalFrames;
        } else {
          playInd = totalFrames - 1;
        }
      }

      this.animationId = requestAnimationFrame(paint);
      renderer.clear();
      renderer.render(this.scene!, camera);
      viewHelper.render(renderer);
      // labelRenderer.render(scene, camera);
      orbitControls.update();
    };

    /**
     * Clear the objects and renderer.
     */
    this.clear = () => {
      renderer.clear();
      renderer.dispose();
      arr.forEach((a) => {
        if (Array.isArray(a.material)) {
          a.material.forEach((m) => {
            m.dispose();
          });
        } else {
          a.material.dispose();
        }
        a.geometry.dispose();
      });
    };
    this.animationId = requestAnimationFrame(paint);
  }

  /**
   * Stop the simulation and visualization.
   */
  stop(): void {
    if (this.animationId === null) {
      return;
    }
    cancelAnimationFrame(this.animationId);
    this.scene?.clear();
    this.scene = undefined;
    this.clear();
    /**
     * Replace back the empty function.
     */
    this.clear = () => { };
    this.universeTrails.forEach((ut) => {
      ut.popAllTrails();
    });
    this.universeTrails = [];
  }
}
