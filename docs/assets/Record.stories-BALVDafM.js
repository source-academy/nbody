import{S as l}from"./Simulation-uzMF7En_.js";import{f as s}from"./Universe-BbLae_pC.js";import"./jsx-runtime-DRTy3Uxn.js";import"./index-BBkUAzwr.js";import"./Universe-DpKi-MhS.js";const f={title:"Visualize/Record",component:l,parameters:{layout:"centered",controls:{disable:!0}},tags:[],argTypes:{},args:{}},e={args:{storyName:"RealTime",universe:[s],visType:"3D"}},r={args:{storyName:"Recorded",universe:[s],visType:"3D",record:!0,looped:!1}},o={args:{storyName:"RecordedLooped",universe:[s],visType:"3D",record:!0,looped:!0}};var a,t,d;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    storyName: 'RealTime',
    universe: [fig8],
    visType: '3D'
  }
}`,...(d=(t=e.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var n,c,i;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    storyName: 'Recorded',
    universe: [fig8],
    visType: '3D',
    record: true,
    looped: false
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var p,m,u;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    storyName: 'RecordedLooped',
    universe: [fig8],
    visType: '3D',
    record: true,
    looped: true
  }
}`,...(u=(m=o.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const D=["RealTime","Recorded","RecordedLooped"];export{e as RealTime,r as Recorded,o as RecordedLooped,D as __namedExportsOrder,f as default};
