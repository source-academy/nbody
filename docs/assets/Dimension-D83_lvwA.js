import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as t}from"./index-z5U8iC57.js";import{M as r,d as o}from"./index-DVskBQuG.js";import{TwoD as l,ThreeD as a}from"./Dimension.stories-DocIpVtH.js";import"./index-BBkUAzwr.js";import"./iframe-Dx-CAhZM.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./Universe-DLuwJnRa.js";import"./Universe-PvbTHax1.js";function s(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Visualize/Dimension"}),`
`,e.jsx(n.h1,{id:"dimension",children:"Dimension"}),`
`,e.jsxs(n.p,{children:["You can choose a 2 dimensional or 3 dimensional visualization system for your simulation. Simply set the ",e.jsx(n.code,{children:"visType"})," field when creating a ",e.jsx(n.strong,{children:"Simulation"})," object in the following way."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
  visType: '2D' | '3D',\r
})
`})}),`
`,e.jsx(n.h2,{id:"2d-default",children:"2D (default)"}),`
`,e.jsxs(n.p,{children:["The 2D visualization system uses ",e.jsx(n.a,{href:"https://plotly.com/javascript/",rel:"nofollow",children:"Plotly.js"}),". It provides default controls for panning, zooming, and scaling the view, along with responsive axes indicating the scale of the universe(s) being visualized. Additionally, you can hover on bodies to see their details like label and position."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
  visType: '2D',\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(o,{of:l,name:"2D"})}),`
`,e.jsx(n.h2,{id:"3d",children:"3D"}),`
`,e.jsxs(n.p,{children:["The 3D visualization system uses ",e.jsx(n.a,{href:"https://threejs.org/",rel:"nofollow",children:"Three.js"}),". There is a small orientation helper at the bottom right provided for easier navigation along with coloured axes. You can control the visualization as follows:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Orbit around the center of the frame by holding down the left click and moving the mouse in direction of choice"}),`
`,e.jsx(n.li,{children:"Scroll up to zoom in and down to zoom out"}),`
`,e.jsx(n.li,{children:"Pan around by holding down the right click and moving the mouse in direction of choice."}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
  visType: '3D',\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(o,{of:a,name:"3D"})})]})}function w(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{w as default};
