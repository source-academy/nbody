import{C as o,V as e,U as i,a as l,R as u,S as c}from"./Simulation-7H4WISkI.js";import{R as m,T as w,B as h}from"./Transformation-KUb0IKcR.js";import"./jsx-runtime-DRTy3Uxn.js";import"./index-BBkUAzwr.js";const p=new o("Sun",1989e27,new e(0,0,0),new e(0,0,0),new e(0,0,0)),d=new o("Earth",5972e21,new e(1521e8,0,0),new e(0,0,-29290),new e(0,0,0)),T=new m(new e(0,0,1),-(23.4/180)*Math.PI),S=new m(new e(0,1,0),-(Math.PI/2)),a=new h(1),f=new i({label:"Sun-Earth System",currState:S.transform(T.transform(a.transform(new l([p.clone(),d.clone()])))),color:["#FDB813","#287AB8"],simFunc:new u,transformations:[a,new w(new e(0,1,0),365.25*24*60*60)]}),R={title:"Showcase/Analemma",component:c,parameters:{layout:"centered",controls:{disable:!0}},tags:[],argTypes:{},args:{}},n={args:{storyName:"SunEarthAnalemma",universe:[f],controller:"ui",showTrails:!0,speed:5e6,visType:"3D",width:800,maxTrailLength:300,showDebugInfo:!0}};var t,r,s;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    storyName: "SunEarthAnalemma",
    universe: [sunEarth],
    controller: 'ui',
    showTrails: true,
    speed: 5000000,
    visType: '3D',
    width: 800,
    maxTrailLength: 300,
    showDebugInfo: true
  }
}`,...(s=(r=n.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const b=["SunEarthAnalemma"];export{n as SunEarthAnalemma,b as __namedExportsOrder,R as default};
