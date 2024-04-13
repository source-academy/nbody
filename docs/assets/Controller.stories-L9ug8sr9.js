import{S as v,f as e}from"./Universe-DLuwJnRa.js";import"./jsx-runtime-DRTy3Uxn.js";import"./index-BBkUAzwr.js";import"./Universe-PvbTHax1.js";const U={title:"Visualize/Controller",component:v,parameters:{layout:"centered",controls:{disable:!0}},tags:[],argTypes:{},args:{}},r={args:{storyName:"None",universe:[e],controller:"none"}},o={args:{storyName:"Ui",universe:[e],controller:"ui"}},s={args:{storyName:"Code",universe:[e],controller:"code",showTrails:!0,callback:n=>{const g=setInterval(()=>{n.setShowUniverse(e.label,!n.getShowUniverse(e.label))},500);return()=>{clearInterval(g)}}}};var a,t,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    storyName: 'None',
    universe: [fig8],
    controller: 'none'
  }
}`,...(i=(t=r.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var l,c,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    storyName: 'Ui',
    universe: [fig8],
    controller: 'ui'
  }
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,d,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    storyName: 'Code',
    universe: [fig8],
    controller: 'code',
    showTrails: true,
    callback: sim => {
      const id = setInterval(() => {
        sim.setShowUniverse(fig8.label, !sim.getShowUniverse(fig8.label));
      }, 500);
      return () => {
        clearInterval(id);
      };
    }
  }
}`,...(p=(d=s.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const b=["None","Ui","Code"];export{s as Code,r as None,o as Ui,b as __namedExportsOrder,U as default};
