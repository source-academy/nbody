import{j as n}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as i}from"./index-z5U8iC57.js";import{M as o}from"./index-Bd-WH8Nz.js";import"./index-BBkUAzwr.js";import"./iframe-CQxbU3Lp.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function t(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Getting Started/Integration"}),`
`,n.jsx(r.h1,{id:"integration",children:"Integration"}),`
`,n.jsxs(r.p,{children:["Once installed into your ",n.jsx(r.code,{children:"node_modules"}),", you can use ",n.jsx(r.strong,{children:"nbody"})," in your choice of your frontend framework just like you would any other client side library."]}),`
`,n.jsx(r.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,n.jsxs(r.ul,{children:[`
`,n.jsx(r.li,{children:n.jsx(r.a,{href:"#compatible-frameworks",children:"Compatible Frameworks"})}),`
`,n.jsx(r.li,{children:n.jsx(r.a,{href:"#react",children:"React"})}),`
`,n.jsx(r.li,{children:n.jsx(r.a,{href:"#typescript",children:"Typescript"})}),`
`]}),`
`,n.jsx(r.h2,{id:"compatible-frameworks",children:"Compatible Frameworks"}),`
`,n.jsxs(r.p,{children:["Following combinations of Frontend frameworks + build tools + dev tools have been tested to be compatible with nbody. Consider raising a ",n.jsx(r.a,{href:"https://github.com/source-academy/nbody/issues",rel:"nofollow",children:"request"})," if any frameworks are missing. Additionally do consider contributing to the project directly."]}),`
`,n.jsxs(r.ul,{children:[`
`,n.jsx(r.li,{children:"React + Vite"}),`
`,n.jsx(r.li,{children:"React + Vite + TS"}),`
`,n.jsx(r.li,{children:"React + Webpack"}),`
`,n.jsx(r.li,{children:"React + Webpack + TS"}),`
`]}),`
`,n.jsx(r.h2,{id:"react",children:"React"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-javascript",children:`import {\r
  CelestialBody, Gravity, VelocityVerletSim, State, Universe, Simulation, RungeKutta4Sim, ExplicitEulerSim, SemiImplicitEulerSim, CoMTransformation, Vector3\r
} from "nbody";\r
\r
function run(divId, width, height) {\r
  let g = 1;\r
\r
  let force = new Gravity(g);\r
  let sim = new VelocityVerletSim(force);\r
\r
  let a = new CelestialBody(\r
    "a",\r
    1,\r
    new Vector3(-0.97000436, 0.24308753, 0),\r
    new Vector3(0.466203685, 0.43236573, 0),\r
    new Vector3(0, 0, 0)\r
  );\r
\r
  let b = new CelestialBody(\r
    "b",\r
    1,\r
    new Vector3(0.97000436, -0.24308753, 0),\r
    new Vector3(0.466203685, 0.43236573, 0),\r
    new Vector3(0, 0, 0)\r
  );\r
\r
  let c = new CelestialBody(\r
    "c",\r
    1,\r
    new Vector3(0, 0, 0),\r
    new Vector3(-2 * 0.466203685, -2 * 0.43236573, 0),\r
    new Vector3(0, 0, 0)\r
  );\r
\r
  let state = new State([a, b, c]);\r
\r
  let universe = new Universe({\r
    label: "1",\r
    currState: state.clone(),\r
    color: "rgba(112, 185, 177, 1)",\r
    simFunc: sim,\r
  });\r
\r
  let simulation = new Simulation(universe, {\r
    visType: "3D",\r
    showTrails: true,\r
    controller: "ui",\r
  });\r
\r
  simulation.start(divId, 800, 800, width, height);\r
}\r
\r
function App() {\r
  return (\r
    <div\r
      id="demo-canvas"\r
      style={{\r
        overflow: "hidden",\r
        width: "800px",\r
        height: "800px",\r
        position: "relative",\r
      }}\r
      ref={() => run("demo-canvas", 800, 800)}\r
    ></div>\r
  );\r
}\r
\r
export default App;
`})}),`
`,n.jsx(r.h2,{id:"typescript",children:"Typescript"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-typescript",children:`class TranslateZTransformation implements Transformation {\r
  transform(state: State, deltaT: number): State {\r
    const newState = state.clone();\r
    newState.bodies.forEach((body) => {\r
      body.position.z += 1;\r
    });\r
    return newState;\r
  }\r
}\r
\r
function run(divId: string) {\r
  ...\r
\r
  let universe: Universe = new Universe({\r
    label: "Translated Universe",\r
    currState: new State([a, b, c]),\r
    color: "rgba(254, 209, 106, 1)",\r
    simFunc: new VelocityVerletSim(new Gravity(1)),\r
    transformations: [new TranslateZTransformation()]\r
    }\r
  );\r
\r
  ...\r
}
`})})]})}function w(e={}){const{wrapper:r}={...i(),...e.components};return r?n.jsx(r,{...e,children:n.jsx(t,{...e})}):t(e)}export{w as default};
