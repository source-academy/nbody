import{j as n}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as t}from"./index-z5U8iC57.js";import{M as i}from"./index-iQvBBB1Z.js";import"./index-BBkUAzwr.js";import"./iframe-C3OM9s_A.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function a(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...t(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(i,{title:"Define/Transformation"}),`
`,n.jsx(r.h1,{id:"transformation",children:"Transformation"}),`
`,n.jsx(r.p,{children:"TODO"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-typescript",children:`export interface Transformation {\r
  transform(state: State, deltaT: number): State;\r
}
`})}),`
`,n.jsxs(r.p,{children:["Full API reference can be found ",n.jsx(r.a,{href:"https://source-academy.github.io/nbody/api/interfaces/Transformation.html",rel:"nofollow",children:"here"}),"."]}),`
`,n.jsxs(r.ul,{children:[`
`,n.jsx(r.li,{children:n.jsx(r.a,{href:"#inbuilt-transformations",children:"Inbuilt Transformations"})}),`
`,n.jsx(r.li,{children:n.jsx(r.a,{href:"#javascript",children:"Javascript"})}),`
`,n.jsx(r.li,{children:n.jsx(r.a,{href:"#typescript",children:"Typescript"})}),`
`]}),`
`,n.jsx(r.h2,{id:"inbuilt-transformations",children:"Inbuilt Transformations"}),`
`,n.jsx(r.h3,{id:"body-center-transformation",children:"Body Center Transformation"}),`
`,n.jsx(r.p,{children:"TODO"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-javascript",children:`new BodyCenterTransformation();
`})}),`
`,n.jsx(r.h3,{id:"center-of-mass-transformation",children:"Center of Mass Transformation"}),`
`,n.jsx(r.p,{children:"TODO"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-javascript",children:`new CoMTransformation();
`})}),`
`,n.jsx(r.h3,{id:"rotate-transformation",children:"Rotate Transformation"}),`
`,n.jsx(r.p,{children:"TODO"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-javascript",children:`new RotateTransformation(new Vector3(0, 1, 0), Math.PI / 2);
`})}),`
`,n.jsx(r.h3,{id:"lambda-transformation",children:"Lambda Transformation"}),`
`,n.jsx(r.p,{children:"TODO"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-javascript",children:`new LambdaTransformation((state, deltaT) => {\r
  // your transformation logic here\r
  return state;\r
});
`})}),`
`,n.jsx(r.h2,{id:"javascript",children:"Javascript"}),`
`,n.jsx(r.p,{children:"You can define and configure your own transformation object in javascript with a transform method as follows"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-javascript",children:`TODO
`})}),`
`,n.jsx(r.h2,{id:"typescript",children:"Typescript"}),`
`,n.jsx(r.p,{children:"You can define and configure your own transformation object in typescript by implementing the Transformation interface as follows"}),`
`,n.jsx(r.pre,{children:n.jsx(r.code,{className:"language-typescript",children:`TODO
`})})]})}function f(e={}){const{wrapper:r}={...t(),...e.components};return r?n.jsx(r,{...e,children:n.jsx(a,{...e})}):a(e)}export{f as default};
