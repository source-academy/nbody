import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as t}from"./index-z5U8iC57.js";import{M as s,d as o}from"./index-BLJ7OnYF.js";import{TwoD as a}from"./Dimension.stories-DZuxSGLH.js";import"./index-BBkUAzwr.js";import"./iframe-5rd2FdmP.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./Simulation-ChslY3aX.js";import"./Universe-PJ2jYdc8.js";import"./Universe-BHXwzv85.js";function r(i){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Quick Start"}),`
`,e.jsx(n.h1,{id:"quick-start",children:"Quick Start"}),`
`,e.jsx(n.p,{children:"A quick start guide to configuring, simulating and visualizing a simple nbody simulation."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#creating-vectors",children:"Creating vectors"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#creating-bodies",children:"Creating bodies"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#define-a-force",children:"Define a force"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#define-a-simulate-function",children:"Define a simulate function"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#creating-a-state",children:"Creating a state"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#creating-an-universe",children:"Creating an universe"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#put-it-all-together",children:"Put it all together"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#next-steps",children:"Next Steps"})}),`
`]}),`
`,e.jsx(n.h2,{id:"creating-vectors",children:"Creating vectors"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.code,{children:"Vector3"})," is a 3D vector with ",e.jsx(n.code,{children:"x"}),", ",e.jsx(n.code,{children:"y"}),", and ",e.jsx(n.code,{children:"z"})," components. It is used to represent kinematic properties such as ",e.jsx(n.em,{children:"position"}),", ",e.jsx(n.em,{children:"velocity"}),", and ",e.jsx(n.em,{children:"acceleration"}),"."]}),`
`,e.jsxs(n.p,{children:["Create a vector object using the ",e.jsx(n.code,{children:"Vector3"})," class. Inherited from ",e.jsx(n.strong,{children:"three.js"})," Vector3, full documentation can be found ",e.jsx(n.a,{href:"https://threejs.org/docs/#api/en/math/Vector3",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`let testVector = new Vector3(1, 2, 3);
`})}),`
`,e.jsx(n.h2,{id:"creating-bodies",children:"Creating bodies"}),`
`,e.jsxs(n.p,{children:["A ",e.jsx(n.code,{children:"CelestialBody"})," is a celestial object with a ",e.jsx(n.em,{children:"mass"})," and kinematic properties such as ",e.jsx(n.em,{children:"position"}),", ",e.jsx(n.em,{children:"velocity"}),", and ",e.jsx(n.em,{children:"acceleration"}),". It also has a unique ",e.jsx(n.em,{children:"label"})," for identification purposes."]}),`
`,e.jsxs(n.p,{children:["Create celestial bodies using the ",e.jsx(n.code,{children:"CelestialBody"})," class. Full API reference can be found ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/classes/CelestialBody.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`let body1 = new CelestialBody(\r
  "Body 1", // label\r
  1, // mass\r
  new Vector3(-0.97000436, 0.24308753, 0), // position\r
  new Vector3(0.466203685, 0.43236573, 0), // velocity\r
  new Vector3(0, 0, 0) // acceleration\r
);\r
\r
let body2 = new CelestialBody(\r
  "Body 2",\r
  1,\r
  new Vector3(0.97000436, -0.24308753, 0),\r
  new Vector3(0.466203685, 0.43236573, 0),\r
  new Vector3(0, 0, 0)\r
);\r
\r
let body3 = new CelestialBody(\r
  "Body 3",\r
  1,\r
  new Vector3(0, 0, 0),\r
  new Vector3(-2 * 0.466203685, -2 * 0.43236573, 0),\r
  new Vector3(0, 0, 0)\r
);
`})}),`
`,e.jsx(n.h2,{id:"define-a-force",children:"Define a force"}),`
`,e.jsx(n.p,{children:"A force object encapsulates logic for calculating forces acting on celestial bodies due to other objects or environment."}),`
`,e.jsxs(n.p,{children:["Create a force object using the ",e.jsx(n.code,{children:"Force"})," interface or use one of the predefined forces. Full API reference can be found ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/interfaces/Force.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// define a gravitational force with a strength of 1\r
const customForce = new Gravity(1);
`})}),`
`,e.jsx(n.h2,{id:"define-a-simulate-function",children:"Define a simulate function"}),`
`,e.jsx(n.p,{children:"A simulate function object encapsulates logic for advancing the state of the universe over time using numerical integration."}),`
`,e.jsxs(n.p,{children:["Create a simulate function (or ",e.jsx(n.a,{href:"https://en.wikipedia.org/wiki/Numerical_integration",rel:"nofollow",children:"numerical integrator"}),") object using the ",e.jsx(n.code,{children:"SimulateFunction"})," interface or use one of the predefined simulate functions. Full API reference can be found ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/interfaces/SimulateFunction.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// define an explicit Euler integrator with the custom force\r
const customSimFunc = new ExplicitEulerSim(customForce);
`})}),`
`,e.jsx(n.h2,{id:"creating-a-state",children:"Creating a state"}),`
`,e.jsx(n.p,{children:"A State is a snapshot of the universe at a given time. It contains an array of celestial bodies."}),`
`,e.jsxs(n.p,{children:["Create a state object using the ",e.jsx(n.code,{children:"State"})," class. Full API reference can be found ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/classes/State.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// create a State object with the array of celestial bodies\r
let customState = new State([body1, body2]);
`})}),`
`,e.jsx(n.h2,{id:"creating-an-universe",children:"Creating an universe"}),`
`,e.jsx(n.p,{children:"A Universe is a container for the current state and previous states of the universe and the simulation function. It also has a unique label for identification purposes."}),`
`,e.jsxs(n.p,{children:["Create a universe object using the ",e.jsx(n.code,{children:"Universe"})," class. Full API reference can be found ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/classes/Universe.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`let universe = new Universe({\r
  label: "Universe 1",\r
  currState: customState,\r
  simFunc: customSimFunc,\r
});
`})}),`
`,e.jsx(n.h2,{id:"put-it-all-together",children:"Put it all together"}),`
`,e.jsx(n.p,{children:"A Simulation object controls the universe(s), simulation loop and rendering of the simulation."}),`
`,e.jsxs(n.p,{children:["Create a simulation object using the ",e.jsx(n.code,{children:"Simulation"})," class. Full API reference can be found ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/classes/Simulation.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`let simulation = new Simulation(universe, {});\r
simulation.start(<div-id>, 800, 800);
`})}),`
`,e.jsx("center",{children:e.jsx(o,{of:a})}),`
`,e.jsxs(n.p,{children:["You've done it! You just simulated a special configuration of the ",e.jsx(n.a,{href:"https://en.wikipedia.org/wiki/Three-body_problem",rel:"nofollow",children:"three-body"})," system using the ",e.jsx(n.em,{children:"nbody"})," library. Feel free to experiment with different configurations to see how systems evolve over time with various forces, integrators and transformations (read on to find out what those are)."]}),`
`,e.jsx(n.h2,{id:"next-steps",children:"Next Steps"}),`
`,e.jsxs(n.p,{children:["Checkout the ",e.jsx(n.a,{href:"?path=/docs/configuration-configuration--docs",children:"Configuration"})," section to learn how to configure a simulation with greater detail and customization."]})]})}function w(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{w as default};
