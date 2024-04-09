import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as o}from"./index-z5U8iC57.js";import{M as t}from"./index-BLJ7OnYF.js";import"./index-BBkUAzwr.js";import"./iframe-5rd2FdmP.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function i(r){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{title:"Define/Force"}),`
`,e.jsx(n.h1,{id:"force",children:"Force"}),`
`,e.jsx(n.p,{children:"A force object encapsulates logic for calculating forces acting on celestial bodies due to other objects or environment. It has a getForces method that takes in an array of celestial bodies and returns an array of forces acting on each body. It is defined as the following Typescript interface."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface Force {\r
  getForces(bodies: CelestialBody[]): Vector3[];\r
}
`})}),`
`,e.jsxs(n.p,{children:["Full API reference can be found ",e.jsx(n.a,{href:"https://source-academy.github.io/nbody/api/interfaces/Force.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#inbuilt-forces",children:"Inbuilt Forces"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#javascript",children:"Javascript"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#typescript",children:"Typescript"})}),`
`]}),`
`,e.jsx(n.h2,{id:"inbuilt-forces",children:"Inbuilt Forces"}),`
`,e.jsx(n.h3,{id:"gravity",children:"Gravity"}),`
`,e.jsxs(n.p,{children:["Create a ",e.jsx(n.a,{href:"https://en.wikipedia.org/wiki/Newton%27s_law_of_universal_gravitation",rel:"nofollow",children:"newtonian gravitational"})," force object with a gravitational constant of ",e.jsx(n.code,{children:"6.674e-11"}),". You can also pass in a custom gravitational constant."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`new Gravity();\r
new Gravity(10);
`})}),`
`,e.jsx(n.h3,{id:"centripetal-force",children:"Centripetal Force"}),`
`,e.jsxs(n.p,{children:["Create a ",e.jsx(n.a,{href:"https://en.wikipedia.org/wiki/Centripetal_force",rel:"nofollow",children:"centripetal"})," force object with a center of rotation. Default center is ",e.jsx(n.code,{children:"(0, 0, 0)"}),"."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`new CentripetalForce();\r
new CentripetalForce(new Vector3(x, y, z));
`})}),`
`,e.jsx(n.h3,{id:"combined-force",children:"Combined Force"}),`
`,e.jsx(n.p,{children:"Create a force object that is a result of additively combining multiple forces acting on a system of bodies."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`new CombinedForce([new Gravity(), new CentripetalForce()]);
`})}),`
`,e.jsx(n.h3,{id:"lambda-force",children:"Lambda Force"}),`
`,e.jsxs(n.p,{children:["Create a force object that uses a ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",rel:"nofollow",children:"lambda/arrow"})," function to calculate forces."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`new LambdaForce((bodies) => {\r
  return bodies.map(body => new Vector3(0, 0, 0)); // zero force\r
});
`})}),`
`,e.jsx(n.h2,{id:"javascript",children:"Javascript"}),`
`,e.jsx(n.p,{children:"You can define and configure your own force object in javascript with a getForces method as follows"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`// gravitational constant\r
const G = 6.67430e-11;\r
\r
// define your own newtonian gravitational force\r
const gravity = {\r
  // must contain a getForces method\r
  getForces(bodies) {\r
    let n = bodies.length;\r
    let ans = [];\r
    for (let i = 0; i < n; i++) {\r
      ans.push(new Vector3(0, 0, 0));\r
    }\r
    for (let i = 0; i < n; i++) {\r
      for (let j = i + 1; j < n; j++) {\r
        let currForce = this.calcNewtonian(bodies[i], bodies[j]);\r
        ans[i].add(currForce);\r
        ans[j].sub(currForce);\r
      }\r
    }\r
    return ans;\r
  },\r
  // helper function to calculate force between two bodies\r
  calcNewtonian(a, b) {\r
    let distSq = a.position.distanceToSquared(b.position);\r
    let forceVal = (G * a.mass * b.mass) / distSq;\r
    return b.position\r
      .clone()\r
      .sub(a.position)\r
      .normalize()\r
      .multiplyScalar(forceVal);\r
  }\r
}
`})}),`
`,e.jsx(n.h2,{id:"typescript",children:"Typescript"}),`
`,e.jsx(n.p,{children:"You can define and configure your own force object in typescript by implementing the Force interface as follows"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`class Gravity implements Force {\r
  readonly G: number = 6.674e-11;\r
\r
  getForces(bodies: CelestialBody[]): Vector3[] {\r
    let n = bodies.length;\r
    let ans: Vector3[] = [];\r
    for (let i = 0; i < n; i++) {\r
      ans.push(new Vector3(0, 0, 0));\r
    }\r
    for (let i = 0; i < n; i++) {\r
      for (let j = i + 1; j < n; j++) {\r
        let currForce = this.calcNewtonian(bodies[i], bodies[j]);\r
        ans[i].add(currForce);\r
        ans[j].sub(currForce);\r
      }\r
    }\r
    return ans;\r
  }\r
\r
  private calcNewtonian(a: CelestialBody, b: CelestialBody): Vector3 {\r
    let distSq = a.position.distanceToSquared(b.position);\r
    let forceVal = (this.G * a.mass * b.mass) / distSq;\r
    return b.position\r
      .clone()\r
      .sub(a.position)\r
      .normalize()\r
      .multiplyScalar(forceVal);\r
  }\r
}
`})})]})}function u(r={}){const{wrapper:n}={...o(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(i,{...r})}):i(r)}export{u as default};
