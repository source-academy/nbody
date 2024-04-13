import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as t}from"./index-z5U8iC57.js";import{M as o,d as s}from"./index-DVskBQuG.js";import{SingleUniverse as l,Multiverse as a,Multiverse3D as u}from"./Multiverse.stories-Dk5x9o7J.js";import"./index-BBkUAzwr.js";import"./iframe-Dx-CAhZM.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./Universe-DLuwJnRa.js";import"./Universe-PvbTHax1.js";function r(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Visualize/Multiverse"}),`
`,e.jsx(n.h1,{id:"multiverse",children:"Multiverse"}),`
`,e.jsxs(n.p,{children:["You can setup multiple universes in a single simulation. This is useful for simulating multiple n-body systems in parallel with varying initial configurations, forces, simuation functions and/or transformations. Simply create each universe as you would for a single universe simulation and pass them as an array to the ",e.jsx(n.strong,{children:"Simulation"})," object in the following way. Available for both 2D and 3D visualizations, UI controls (when enabled) are provided to hide/show each universe separately (see ",e.jsx(n.a,{href:"?path=/docs/visualize-controller--docs",children:"Controller"}),")."]}),`
`,e.jsx(n.h2,{id:"single-universe---2d",children:"Single Universe - 2D"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe);\r
new Simulation([universe]);
`})}),`
`,e.jsx("center",{children:e.jsx(s,{of:l,name:"SingleUniverse"})}),`
`,e.jsx(n.h2,{id:"multiverse---2d",children:"Multiverse - 2D"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation([universe1, universe2], {});
`})}),`
`,e.jsx("center",{children:e.jsx(s,{of:a,name:"Multiverse"})}),`
`,e.jsx(n.h2,{id:"multiverse---3d",children:"Multiverse - 3D"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation([universe1, universe2], {\r
  visType: "3D",\r
  controller: 'ui',\r
});
`})}),`
`,e.jsx("center",{children:e.jsx(s,{of:u,name:"Multiverse3D"})})]})}function y(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{y as default};
