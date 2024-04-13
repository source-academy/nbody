import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as t}from"./index-z5U8iC57.js";import{M as s,d as r}from"./index-DVskBQuG.js";import{None as l,Ui as c,Code as a}from"./Controller.stories-L9ug8sr9.js";import"./index-BBkUAzwr.js";import"./iframe-Dx-CAhZM.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./Universe-DLuwJnRa.js";import"./Universe-PvbTHax1.js";function i(o){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Visualize/Controller"}),`
`,e.jsx(n.h1,{id:"controller",children:"Controller"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Simulation"})," objects can be controlled in three ways - through the UI, through code, or not at all. You can set the ",e.jsx(n.code,{children:"controller"})," field when creating a ",e.jsx(n.strong,{children:"Simulation"})," object in the following way. Controls include play, pause, speed, show/hide trails and show/hide each universe. Available in both 2D and 3D views."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
    controller: 'none' | 'ui' | 'code',\r
})
`})}),`
`,e.jsx(n.h2,{id:"none-default",children:"None (default)"}),`
`,e.jsx(n.p,{children:"When set to none, simulation cannot be controlled through the UI or code."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
    controller: 'none'\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(r,{of:l,name:"None"})}),`
`,e.jsx(n.h2,{id:"ui",children:"Ui"}),`
`,e.jsx(n.p,{children:"Displays UI controls to change speed, show/hide trails and show/hide each universe."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
  controller: 'ui'\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(r,{of:c,name:"Ui"})}),`
`,e.jsx(n.h2,{id:"code",children:"Code"}),`
`,e.jsxs(n.p,{children:["Allows you to control the simulation through code via methods on the ",e.jsx(n.strong,{children:"Simulation"})," object. Full API reference available ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/classes/Simulation.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
    controller: 'code'\r
    showTrails: true,\r
})\r
\r
// toggle show/hide universe every 500 ms
`})}),`
`,e.jsx("center",{children:e.jsx(r,{of:a,name:"Code"})})]})}function y(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{y as default};
