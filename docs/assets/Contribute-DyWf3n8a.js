import{j as e}from"./jsx-runtime-DRTy3Uxn.js";import{useMDXComponents as i}from"./index-z5U8iC57.js";import{M as o}from"./index-iQvBBB1Z.js";import"./index-BBkUAzwr.js";import"./iframe-C3OM9s_A.js";import"../sb-preview/runtime.js";import"./index-PqR-_bA4.js";import"./index-DrlA5mbP.js";import"./index-DrFu-skq.js";function s(r){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Contribute"}),`
`,e.jsx(n.h1,{id:"contribute",children:"Contribute"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"nbody"})," is maintained by the open-source ",e.jsx(n.a,{href:"https://github.com/source-academy/",rel:"nofollow",children:"Source Academy"})," development community based in National University of Singapore. Anyone from anywhere is free and welcome to contribute to our project and our community."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"#developer-guide",children:"Developer Guide"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#clone-the-repository",children:"Clone the repository"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#install-packages",children:"Install packages"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#developer-setup",children:"Developer Setup"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#directory-structure",children:"Directory Structure"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#cli-commands",children:"CLI Commands"})}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"#roadmap",children:"Roadmap"})}),`
`]}),`
`,e.jsx(n.h2,{id:"developer-guide",children:"Developer Guide"}),`
`,e.jsxs(n.p,{children:["Here's a quick guide to get started on contributing to ",e.jsx(n.em,{children:"nbody"}),"."]}),`
`,e.jsx(n.h3,{id:"clone-the-repository",children:"Clone the repository"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`git clone https://github.com/source-academy/nbody
`})}),`
`,e.jsx(n.h3,{id:"install-packages",children:"Install packages"}),`
`,e.jsxs(n.p,{children:["We use ",e.jsx(n.a,{href:"https://classic.yarnpkg.com/lang/en/",rel:"nofollow",children:"Yarn 1"})," as the package manager for its speed and developer experience. This installs all depenedencies required for the development of the project."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`cd nbody\r
yarn install
`})}),`
`,e.jsx(n.h3,{id:"developer-setup",children:"Developer Setup"}),`
`,e.jsx(n.p,{children:"Core libraries used in the project"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://threejs.org/",rel:"nofollow",children:"three"})," - For 3D rendering"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://plotly.com/javascript/",rel:"nofollow",children:"plotly.js"})," - For 2D rendering"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://lil-gui.georgealways.com/",rel:"nofollow",children:"lil-gui"})," - For GUI controls"]}),`
`]}),`
`,e.jsx(n.p,{children:"Development setup of the project"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Source code is written in ES6 format in ",e.jsx(n.a,{href:"https://www.typescriptlang.org/",rel:"nofollow",children:"Typescript"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://eslint.org/",rel:"nofollow",children:"ESLint"})," for linting and ensuring code quality. If developing in VSCode, install the ESLint extension for real-time linting and format on save."]}),`
`,e.jsxs(n.li,{children:["Code comments in JSdoc format, API documentation generated using ",e.jsx(n.a,{href:"https://typedoc.org/",rel:"nofollow",children:"Typedoc"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://storybook.js.org/",rel:"nofollow",children:"Storybook"})," for general documentation and demo showcase",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.a,{href:"https://react.dev/",rel:"nofollow",children:"React"})," and ",e.jsx(n.a,{href:"https://vitejs.dev/",rel:"nofollow",children:"Vite"})," template for component development"]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"directory-structure",children:"Directory Structure"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:".storybook"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Contains configuration and components for Storybook documentation"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"dist"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Contains transpiled code along with type definitions"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"docs"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Built documentation"}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"api"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Built API documentation"}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"scripts"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Contains miscellaneous scripts for development like clean"}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"src"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Contains source code"}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"package.json"}),`
`,e.jsx(n.li,{children:"tsconfig.json"}),`
`]}),`
`,e.jsx(n.h3,{id:"cli-commands",children:"CLI Commands"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"clean"})," - Clean ",e.jsx(n.code,{children:"dist"})," (build) and ",e.jsx(n.code,{children:"docs"})," folders"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"lint"})," - Run ESLint on ",e.jsx(n.code,{children:"src"})," directory to ensure source code adheres to coding standards"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"docs"})," - Generate documentation - both Storybook and API reference"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"docs:api"})," - Generate only API documentation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"docs:storybook"})," - Generate only Storybook documentation"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"storybook"})," - Preview Storybook components"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"build"})," - Build the project - lints, cleans, transpiles and generates documentation. Used for deployment."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"dev"})," - Simple build and linking for local development"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"test"})," - Run tests"]}),`
`]}),`
`,e.jsx(n.h2,{id:"roadmap",children:"Roadmap"}),`
`,e.jsx(n.p,{children:"Contributors are free to pick up any of the following tasks or suggest new features."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Setup a bundled version of the project for CDN deployment"}),`
`]})]})}function u(r={}){const{wrapper:n}={...i(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(s,{...r})}):s(r)}export{u as default};
