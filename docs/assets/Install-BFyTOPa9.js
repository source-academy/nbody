import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as s}from"./index-z5U8iC57.js";import{M as r}from"./index-BLJ7OnYF.js";import"./index-BBkUAzwr.js";import"./iframe-5rd2FdmP.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function o(t){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"Installation"}),`
`,e.jsx(n.h1,{id:"installation",children:"Installation"}),`
`,e.jsx(n.h2,{id:"via-npm-registry",children:"Via npm registry"}),`
`,e.jsxs(n.p,{children:["nbody is available on the npm registry as ",e.jsx(n.a,{href:"https://www.npmjs.com/package/nbody",rel:"nofollow",children:"nbody"}),". Simply follow the following install commands based on your package manager. Since nbody relies on ",e.jsx(n.a,{href:"https://threejs.org/",rel:"nofollow",children:"three"})," and ",e.jsx(n.a,{href:"https://plotly.com/javascript/",rel:"nofollow",children:"Plotly.js"})," for visualization of the simulations, they have to be installed alongside nbody."]}),`
`,e.jsx(n.p,{children:"If you are using Typescript, you may also have to install type definitions as well."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install nbody three plotly.js-dist\r
npm install --save-dev @types/three @types/plotly.js
`})}),`
`,e.jsx(n.p,{children:"or"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`yarn add nbody three plotly.js-dist\r
yarn add -D @types/three @types/plotly.js
`})}),`
`,e.jsx(n.h2,{id:"via-cdn",children:"Via CDN"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"WARNING"}),": Using nbody via the CDN may not work as intended as peer dependencies of three and plotly.js would not be accessible to nbody during runtime. A bundled version is in the roadmap for future development - consider ",e.jsx(n.a,{href:"?path=/docs/getting-started-contribute--docs",children:"contributing"}),"."]}),`
`]}),`
`,e.jsx(n.p,{children:"nbody is available via the unpkg CDN as follows."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script src="https://unpkg.com/nbody"><\/script>
`})})]})}function j(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{j as default};
