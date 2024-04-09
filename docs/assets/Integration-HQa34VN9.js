import{j as n}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as t}from"./index-z5U8iC57.js";import{M as o}from"./index-BLJ7OnYF.js";import"./index-BBkUAzwr.js";import"./iframe-5rd2FdmP.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function i(r){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Integration"}),`
`,n.jsx(e.h1,{id:"integration",children:"Integration"}),`
`,n.jsxs(e.p,{children:["Once installed into your ",n.jsx(e.code,{children:"node_modules"}),", you can use ",n.jsx(e.strong,{children:"nbody"})," in your choice of your frontend framework just like you would any other client side library."]}),`
`,n.jsx(e.h2,{id:"table-of-contents",children:"Table of Contents"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#compatible-frameworks",children:"Compatible Frameworks"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#react",children:"React"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#typescript",children:"Typescript"})}),`
`]}),`
`,n.jsx(e.h2,{id:"compatible-frameworks",children:"Compatible Frameworks"}),`
`,n.jsxs(e.p,{children:["Following combinations of Frontend frameworks + build tools + dev tools have been tested to be compatible with nbody. Consider raising a ",n.jsx(e.a,{href:"https://github.com/source-academy/nbody/issues",rel:"nofollow",children:"request"})," if any frameworks are missing. Additionally do consider ",n.jsx(e.a,{href:"?path=/docs/contribute--docs",children:"contributing"})," to the project directly."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Plain HTML + JS"}),`
`,n.jsx(e.li,{children:"React + Vite"}),`
`,n.jsx(e.li,{children:"React + Vite + TS"}),`
`,n.jsx(e.li,{children:"React + Webpack"}),`
`,n.jsx(e.li,{children:"React + Webpack + TS"}),`
`]}),`
`,n.jsx(e.h2,{id:"react",children:"React"}),`
`,n.jsx(e.h3,{id:"using-ref",children:"Using ref"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`function CustomComponent() {\r
  let simulation = new Simulation(...);\r
\r
  return (\r
    <div\r
      id="demo-canvas"\r
      style={{\r
        overflow: "hidden",\r
        width: "800px",\r
        height: "800px",\r
        position: "relative",\r
      }}\r
      ref={() => simulation.start("demo-canvas", 800, 800);}\r
    ></div>\r
  );\r
}
`})}),`
`,n.jsx(e.h3,{id:"using-useeffect-recommended",children:"Using useEffect (recommended)"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`function CustomComponent() {\r
  useEffect(() => {\r
    let simulation = new Simulation(...);\r
    simulation.start("demo-canvas", 800, 800);\r
    return () => simulation.stop(); // properly cleanup the simulation\r
  }, []);\r
\r
  return (\r
    <div\r
      id="demo-canvas"\r
      style={{\r
        overflow: "hidden",\r
        width: "800px",\r
        height: "800px",\r
        position: "relative",\r
      }}\r
    ></div>\r
  );\r
}
`})})]})}function x(r={}){const{wrapper:e}={...t(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(i,{...r})}):i(r)}export{x as default};
