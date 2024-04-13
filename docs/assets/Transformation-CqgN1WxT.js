import{j as n}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as a}from"./index-z5U8iC57.js";import{M as o}from"./index-DVskBQuG.js";import"./index-BBkUAzwr.js";import"./iframe-Dx-CAhZM.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function t(r){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{title:"Define/Transformation"}),`
`,n.jsx(e.h1,{id:"transformation",children:"Transformation"}),`
`,n.jsxs(e.p,{children:["A ",n.jsx(e.strong,{children:"Transformation"})," object can be used to modify/transform the ",n.jsx(e.a,{href:"https://en.wikipedia.org/wiki/Frame_of_reference",rel:"nofollow",children:"frame of reference"})," of the nbody system. It has a ",n.jsx(e.code,{children:"transform"})," method that takes in a state and returns a new state with the updated frame of reference by modifying the position, velocity and acceleration of the bodies as necessary."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`export interface Transformation {\r
  transform(state: State, deltaT: number): State;\r
}
`})}),`
`,n.jsxs(e.p,{children:["Full API reference can be found ",n.jsx(e.a,{href:"https://source-academy.github.io/nbody/api/interfaces/Transformation.html",rel:"nofollow",children:"here"}),"."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#inbuilt-transformations",children:"Inbuilt Transformations"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#javascript",children:"Javascript"})}),`
`,n.jsx(e.li,{children:n.jsx(e.a,{href:"#typescript",children:"Typescript"})}),`
`]}),`
`,n.jsx(e.h2,{id:"inbuilt-transformations",children:"Inbuilt Transformations"}),`
`,n.jsx(e.h3,{id:"body-center-transformation",children:"Body Center Transformation"}),`
`,n.jsx(e.p,{children:"A frame of reference transformation that uses the position of the ith body as the origin."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`new BodyCenterTransformation();\r
new BodyCenterTransformation(index);
`})}),`
`,n.jsx(e.h3,{id:"center-of-mass-transformation",children:"Center of Mass Transformation"}),`
`,n.jsx(e.p,{children:"A frame of reference transformation that uses the position of the center of mass of the system as the origin."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`new CoMTransformation();
`})}),`
`,n.jsx(e.h3,{id:"rotate-transformation",children:"Rotate Transformation"}),`
`,n.jsx(e.p,{children:"A frame of reference transformation that rotates the frames around the provided axis by the provided angle."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`new RotateTransformation(new Vector3(0, 1, 0), Math.PI / 2);
`})}),`
`,n.jsx(e.h3,{id:"lambda-transformation",children:"Lambda Transformation"}),`
`,n.jsx(e.p,{children:"A frame of reference transformation that uses the given lambda/arrow/anonymous function to transform states."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`new LambdaTransformation((state, deltaT) => {\r
  // your transformation logic here\r
  return state;\r
});
`})}),`
`,n.jsx(e.h2,{id:"javascript",children:"Javascript"}),`
`,n.jsx(e.p,{children:"You can define and configure your own transformation object in javascript with a transform method as follows"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-javascript",children:`const customTransform = {\r
    transform(state) {\r
    const offset = state.bodies[0].position.clone();\r
    state.bodies.forEach((b) => {\r
      b.position.sub(offset);\r
    });\r
    return state;\r
  }\r
}
`})}),`
`,n.jsx(e.h2,{id:"typescript",children:"Typescript"}),`
`,n.jsx(e.p,{children:"You can define and configure your own transformation object in typescript by implementing the Transformation interface as follows"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-typescript",children:`class CustomTransformation implements Transformation {\r
  transform(state: State): State {\r
    const offset = state.bodies[0].position.clone();\r
    state.bodies.forEach((b) => {\r
      b.position.sub(offset);\r
    });\r
    return state;\r
  }\r
}
`})})]})}function j(r={}){const{wrapper:e}={...a(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(t,{...r})}):t(r)}export{j as default};
