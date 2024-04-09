import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as i}from"./index-z5U8iC57.js";import{M as a}from"./index-SQMR4-IU.js";import"./index-BBkUAzwr.js";import"./iframe-BaWYFvPh.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function n(r){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Define/Simulate Function"}),`
`,e.jsx(t.h1,{id:"simulate-function",children:"Simulate Function"}),`
`,e.jsxs(t.p,{children:["A ",e.jsx(t.strong,{children:"Simulate Function"})," object encapsulates logic for advancing the state of the universe over time, usually using ",e.jsx(t.a,{href:"https://en.wikipedia.org/wiki/Numerical_integration",rel:"nofollow",children:"numerical integration"}),". It has a simulate method that takes in a time step, current state of the universe, (optionally the previous state of the universe) and returns the next state of the universe."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`interface SimulateFunction {\r
  simulate(deltaT: number, currState: State, prevState: State): State\r
}
`})}),`
`,e.jsxs(t.p,{children:["Full API reference can be found ",e.jsx(t.a,{href:"https://source-academy.github.io/nbody/api/interfaces/SimulateFunction.html",rel:"nofollow",children:"here"}),"."]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"#inbuilt-simulate-functions",children:"Inbuilt Simulate Functions"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"#javascript",children:"Javascript"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"#typescript",children:"Typescript"})}),`
`]}),`
`,e.jsx(t.h2,{id:"inbuilt-simulate-functions",children:"Inbuilt Simulate Functions"}),`
`,e.jsx(t.h3,{id:"velocity-verlet",children:"Velocity Verlet"}),`
`,e.jsxs(t.p,{children:["Create a ",e.jsx(t.a,{href:"https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet",rel:"nofollow",children:"velocity verlet"})," integrator. Uses newtonian gravity by default, or the provided force object."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`new VelocityVerletSim();\r
new VelocityVerletSim(customForce);
`})}),`
`,e.jsx(t.h3,{id:"explicit-euler",children:"Explicit Euler"}),`
`,e.jsxs(t.p,{children:["Create a ",e.jsx(t.a,{href:"https://en.wikipedia.org/wiki/Explicit_and_implicit_methods",rel:"nofollow",children:"explicit euler"})," integrator. Uses newtonian gravity by default, or the provided force object."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`new ExplicitEulerSim();\r
new ExplicitEulerSim(customForce);
`})}),`
`,e.jsx(t.h3,{id:"semi-implicit-euler",children:"Semi Implicit Euler"}),`
`,e.jsxs(t.p,{children:["Create a ",e.jsx(t.a,{href:"https://en.wikipedia.org/wiki/Explicit_and_implicit_methods",rel:"nofollow",children:"semi-implicit euler"})," integrator. Uses newtonian gravity by default, or the provided force object."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`new SemiImplicitEulerSim();\r
new SemiImplicitEulerSim(customForce);
`})}),`
`,e.jsx(t.h3,{id:"runge-kutta-order-4",children:"Runge-Kutta Order 4"}),`
`,e.jsxs(t.p,{children:["Create a ",e.jsx(t.a,{href:"https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods",rel:"nofollow",children:"runge-kutta order 4"})," integrator. Uses newtonian gravity by default, or the provided force object. Optionally, you can provide the weight coefficients for the averaging step."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`new RungeKutta4Sim();\r
new RungeKutta4Sim(customForce);\r
new RungeKutta4Sim(customForce, [1, 2, 2, 1]);
`})}),`
`,e.jsx(t.h3,{id:"lambda-integrator",children:"Lambda integrator"}),`
`,e.jsx(t.p,{children:"Create a simulate function from a lambda function."}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`new LambdaSim((deltaT, currState, prevState) => {\r
  // your logic here\r
});
`})}),`
`,e.jsx(t.h2,{id:"javascript",children:"Javascript"}),`
`,e.jsx(t.p,{children:"You can define and configure your own simulate function object in javascript with a simulate method as follows"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`const explicitEulerSim = {\r
  simulate(deltaT, currState, prevState) {\r
    const updatedBodies = currState.bodies.map((b) =>\r
      b.clone(\r
        this.rateUpdate(b.position, b.velocity, deltaT),\r
        this.rateUpdate(b.velocity, b.acceleration, deltaT)\r
      )\r
    );\r
    const updatedForces = customForce.getForces(updatedBodies);\r
    updatedBodies.forEach((b, i) => {\r
      b.acceleration = updatedForces[i].divideScalar(b.mass);\r
    });\r
    return new State(updatedBodies);\r
  },\r
  rateUpdate(prev, rate, deltaT) {\r
    return rate.clone().multiplyScalar(deltaT).add(prev);\r
  },\r
};
`})}),`
`,e.jsx(t.h2,{id:"typescript",children:"Typescript"}),`
`,e.jsx(t.p,{children:"You can define and configure your own simulate function object in Typescript by implementing the SimulateFunction interface as follows"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`class ExplicitEulerSim implements SimulateFunction {\r
  force: Force = new Gravity();\r
\r
  simulate(deltaT: number, currState: State): State {\r
    const updatedBodies = currState.bodies.map((b) => b.clone(\r
      this.rateUpdate(b.position, b.velocity, deltaT),\r
      this.rateUpdate(b.velocity, b.acceleration, deltaT),\r
    ));\r
    const updatedForces = this.force.getForces(updatedBodies);\r
    updatedBodies.forEach((b, i) => {\r
      b.acceleration = updatedForces[i].divideScalar(b.mass);\r
    });\r
    return new State(updatedBodies);\r
  }\r
\r
  private rateUpdate(prev: Vector3, rate: Vector3, deltaT: number) {\r
    return rate.clone()\r
      .multiplyScalar(deltaT)\r
      .add(prev);\r
  }\r
}\r

`})})]})}function j(r={}){const{wrapper:t}={...i(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(n,{...r})}):n(r)}export{j as default};
