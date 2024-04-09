import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as i}from"./index-z5U8iC57.js";import{M as s,d as t}from"./index-SQMR4-IU.js";import{DebugInfoOff as a,DebugInfoOn as m}from"./Debug.stories-B0zfNn6S.js";import"./index-BBkUAzwr.js";import"./iframe-BaWYFvPh.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./Simulation-uzMF7En_.js";import"./Universe-DpKi-MhS.js";import"./Universe-BbLae_pC.js";function r(o){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Visualize/Debug Info"}),`
`,e.jsx(n.h1,{id:"debug-info",children:"Debug Info"}),`
`,e.jsxs(n.p,{children:["Passed as the ",e.jsx(n.code,{children:"showDebugInfo"})," property in the Simulation config. This will display debug information in the corner of the simulation canvas. Click on the pop-up to toggle between frames showing the frame rate, time taken for each frame and the total memory usage."]}),`
`,e.jsx(n.h2,{id:"off-default",children:"Off (default)"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
  showDebugInfo: false\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(t,{of:a,name:"Off"})}),`
`,e.jsx(n.h2,{id:"on",children:"On"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
  showDebugInfo: true\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(t,{of:m,name:"On"})})]})}function I(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(r,{...o})}):r(o)}export{I as default};
