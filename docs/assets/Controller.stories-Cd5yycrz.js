import{S as v}from"./Simulation-ChslY3aX.js";import{f as e}from"./Universe-BHXwzv85.js";import"./jsx-runtime-DRTy3Uxn.js";import"./index-BBkUAzwr.js";import"./Universe-PJ2jYdc8.js";const b={title:"Visualize/Controller",component:v,parameters:{layout:"centered",controls:{disable:!0}},tags:[],argTypes:{},args:{}},r={args:{storyName:"None",universe:[e],controller:"none"}},o={args:{storyName:"Ui",universe:[e],controller:"ui"}},n={args:{storyName:"Code",universe:[e],controller:"code",callback:s=>{const g=setInterval(()=>{s.setShowUniverse(e.label,!s.getShowUniverse(e.label))},500);return()=>{clearInterval(g)}}}};var a,t,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    storyName: 'None',
    universe: [fig8],
    controller: 'none'
  }
}`,...(i=(t=r.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var c,l,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    storyName: 'Ui',
    universe: [fig8],
    controller: 'ui'
  }
}`,...(m=(l=o.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,d,p;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    storyName: 'Code',
    universe: [fig8],
    controller: 'code',
    callback: sim => {
      const id = setInterval(() => {
        sim.setShowUniverse(fig8.label, !sim.getShowUniverse(fig8.label));
      }, 500);
      return () => {
        clearInterval(id);
      };
    }
  }
}`,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const C=["None","Ui","Code"];export{n as Code,r as None,o as Ui,C as __namedExportsOrder,b as default};
