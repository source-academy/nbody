import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as i}from"./index-z5U8iC57.js";import{M as t,d as o}from"./index-DVskBQuG.js";import{RealTime as s,Recorded as c,RecordedLooped as a}from"./Record.stories-D-X9pPdt.js";import"./index-BBkUAzwr.js";import"./iframe-Dx-CAhZM.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./Universe-DLuwJnRa.js";import"./Universe-PvbTHax1.js";function d(n){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Visualize/Record"}),`
`,e.jsx(r.h1,{id:"record",children:"Record"}),`
`,e.jsxs(r.p,{children:["You can simulate and visualize the n-body system in real-time or record the simulation and play it back later. Simply set the ",e.jsx(r.code,{children:"record"})," field when creating a ",e.jsx(r.strong,{children:"Simulation"})," object in the following way. Available in both 2D and 3D views."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`new Simulation(universe, {\r
  record: true,\r
})
`})}),`
`,e.jsx(r.h2,{id:"real-time-default",children:"Real-Time (Default)"}),`
`,e.jsx(r.p,{children:"The universe(s) are simulated and visualized in real-time."}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`new Simulation(universe, {})\r
new Simulation(universe, {\r
  record: false,\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(o,{of:s,name:"Real-time"})}),`
`,e.jsx(r.h2,{id:"recorded",children:"Recorded"}),`
`,e.jsxs(r.p,{children:["The universe(s) are simulated at ",e.jsx(r.code,{children:"recordSpeed"})," and recorded completely for ",e.jsx(r.code,{children:"recordFor"})," seconds worth of playback. The recording can then be played back at any specified speed include -ve values for reverse playback."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`const sim = new Simulation(universe, {\r
  record: true,\r
})\r
// divId, width, height, playSpeed, startPaused, recordFor, recordSpeed\r
sim.start(<div-id, <width>, <height>, 1, false, 60, 2)
`})}),`
`,e.jsx("center",{children:e.jsx(o,{of:c,name:"Record"})}),`
`,e.jsx(r.h2,{id:"recorded-and-looped",children:"Recorded and Looped"}),`
`,e.jsxs(r.p,{children:["The recorded simulation can also be looped indefinitely with the ",e.jsx(r.code,{children:"looped"})," field set to ",e.jsx(r.code,{children:"true"})," in the ",e.jsx(r.strong,{children:"Simulation"})," object - upon reaching the end of the recording, loops back to the start and loops back to the end in case of reverse playback. The recorded playback is not looped by default."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-js",children:`new Simulation(universe, {\r
  record: true,\r
  looped: true,\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(o,{of:a,name:"RecordLooped"})})]})}function w(n={}){const{wrapper:r}={...i(),...n.components};return r?e.jsx(r,{...n,children:e.jsx(d,{...n})}):d(n)}export{w as default};
