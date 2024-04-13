import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as t}from"./index-z5U8iC57.js";import{M as o,d as s}from"./index-DVskBQuG.js";import{ShowTrailsOff as a,ShowTrailsOn as l}from"./Trails.stories-C5sFe_IA.js";import"./index-BBkUAzwr.js";import"./iframe-Dx-CAhZM.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";import"./Universe-DLuwJnRa.js";import"./Universe-PvbTHax1.js";function i(r){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Visualize/Trails"}),`
`,e.jsx(n.h1,{id:"trails",children:"Trails"}),`
`,e.jsxs(n.p,{children:["Trails are the paths that objects take as they move through space. They can be shown or hidden using the ",e.jsx(n.code,{children:"showTrails"})," field when creating a ",e.jsx(n.strong,{children:"Simulation"})," object in the following way. Once simulation is running, trails can be toggled on or off using the UI controls or through code, when controller is set to ",e.jsx(n.code,{children:"ui"})," or ",e.jsx(n.code,{children:"code"})," respectively. Maximum trail length can also be set using the ",e.jsx(n.code,{children:"maxTrailLength"})," field, and this is the maximum number of points that will be tracked for all objects combined. Available in both 2D and 3D views."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
    showTrails: true | false,\r
    maxTrailLength: number,\r
})
`})}),`
`,e.jsx(n.h2,{id:"off-default",children:"Off (default)"}),`
`,e.jsx(n.p,{children:"When set to false, trails are not shown."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
    showTrails: false\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(s,{of:a,name:"ShowTrailsOff"})}),`
`,e.jsx(n.h2,{id:"on",children:"On"}),`
`,e.jsx(n.p,{children:"When set to true, trails are shown."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`new Simulation(universe, {\r
    showTrails: true\r
})
`})}),`
`,e.jsx("center",{children:e.jsx(s,{of:l,name:"ShowTrailsOn"})})]})}function b(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{b as default};
