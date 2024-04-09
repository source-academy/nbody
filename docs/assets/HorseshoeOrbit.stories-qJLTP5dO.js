import{S as a}from"./Simulation-uzMF7En_.js";import{a as i,C as o,V as e,U as c,R as m}from"./Universe-DpKi-MhS.js";import{R as p,C as w,P as u}from"./Transformation-ClZa9c5r.js";import"./jsx-runtime-DRTy3Uxn.js";import"./index-BBkUAzwr.js";const l=new i([new o("Sun",19885e26,69634e4,new e(0,0,0),new e(0,0,0),new e(0,0,0)),new o("Earth",597219e19,6371e3,new e(-248109932596539e-4,1449948612736719e-4,-8215203670851886e-9),new e(-29841.46365518679,-5126.262286859617,1.184224839788195),new e(0,0,0)),new o("YORP",1,1,new e(1789598196203594e-4,467757011067789e-4,5131735873924753e-6),new e(-5641.374152889482,22817.8307950743,-65.07224186314708),new e(0,0,0))]),d=new c({label:"54509 YORP",currState:new p(new e(1,0,0),Math.PI/2).transform(l.clone()),simFunc:new m,color:["#FDB813","#287AB8","#767676"],transformations:[new w,new u(new e(1,0,0),1)]}),h={yorp:d},R={title:"Showcase/Horseshoe Orbit",component:a,parameters:{layout:"centered",controls:{disable:!0}},tags:[],argTypes:{},args:{}},r={args:{storyName:"Horseshoe Orbit YORP",universe:[h.yorp],showDebugInfo:!0,controller:"ui",visType:"3D",width:800,playSpeed:2,showTrails:!0,record:!0,looped:!0,recordFor:332,recordSpeed:2e7,maxTrailLength:2e3}};var n,t,s;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    storyName: "Horseshoe Orbit YORP",
    universe: [horseshoe.yorp],
    showDebugInfo: true,
    controller: "ui",
    visType: "3D",
    width: 800,
    playSpeed: 2,
    showTrails: true,
    record: true,
    looped: true,
    recordFor: 332,
    recordSpeed: 20000000,
    maxTrailLength: 2000
  }
}`,...(s=(t=r.parameters)==null?void 0:t.docs)==null?void 0:s.source}}};const T=["YORP"];export{r as YORP,T as __namedExportsOrder,R as default};
