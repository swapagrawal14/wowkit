// Loop-safe procedural keyframes. Root translation only; limb rotations inferred
// from joint names when available, otherwise their position relative to the root.
export const motionLabels={sway:'Gentle sway',bounce:'Happy bounce',walk:'Walking',jump:'Jumping',run:'Running',wave:'Waving',dance:'Little dance',float:'Floating'};
export function makeMotion(kind,joints,size=[400,600]){
 if(!motionLabels[kind])throw Error('Unknown motion');
 const [w,h]=size,root=joints.find(j=>!j.parent)||{x:w/2,y:h*.6};
 const duration={walk:1.6,run:.9,jump:1.8,wave:2.4,dance:2.2,float:3.6,sway:3,bounce:2}[kind];
 const tracks={};
 for(const [index,j]of joints.entries()){
  const name=j.name.toLowerCase(),isRoot=!j.parent;
  const leg=/hip|thigh|knee|ankle|foot/.test(name)&&!isRoot||j.y>root.y+h*.06;
  const knee=/knee|ankle/.test(name)||leg&&j.y>root.y+h*.18;
  const arm=/shoulder|elbow|hand/.test(name)||!leg&&!isRoot&&Math.abs(j.x-root.x)>w*.12;
  const side=j.x<root.x?-1:1;
  const phase=side<0?0:Math.PI;
  tracks[j.name]=Array.from({length:49},(_,i)=>{
   const u=i/48,p=u*2*Math.PI,s=Math.sin(p);let rot=0,dy=0,dx=0;
   if(kind==='sway')rot=(isRoot?2:5)*(Math.sin(p+index*.25)-Math.sin(index*.25));
   if(kind==='bounce'){dy=isRoot?-h*.025*(1-Math.cos(p)):0;rot=arm?side*5*s:0;}
   if(kind==='walk'||kind==='run'){
    const stride=kind==='run'?23:15;
    if(isRoot){dy=-h*(kind==='run'?.018:.009)*(1-Math.cos(p*2));rot=1.5*s;}
    else if(leg)rot=knee?side*stride*.65*(Math.max(0,Math.sin(p+phase))-Math.max(0,Math.sin(phase))):stride*Math.sin(p+phase);
    else if(arm)rot=-stride*.7*Math.sin(p+phase);
    else rot=2*s;
   }
   if(kind==='jump'){
    // anticipation, launch, airtime and landing; endpoints match at rest
    const air=u>.2&&u<.8?Math.sin((u-.2)/.6*Math.PI):0;
    if(isRoot)dy=-h*.10*air+(u<.2?h*.018*Math.sin(u/.2*Math.PI):u>.8?h*.012*Math.sin((u-.8)/.2*Math.PI):0);
    else if(arm)rot=side*18*air;
    else if(leg)rot=side*(knee?-10:5)*air;
   }
   if(kind==='wave'){if(arm&&side>0)rot=/elbow|hand/.test(name)?14*s:16*(1-Math.cos(p));else if(isRoot)rot=1.5*s;}
   if(kind==='dance'){if(isRoot){rot=4*s;dy=-h*.012*(1-Math.cos(p*2));}else if(arm)rot=side*15*s;else if(leg)rot=side*7*s;else rot=-5*s;}
   if(kind==='float'){if(isRoot){dy=-h*.025*(1-Math.cos(p));dx=w*.015*s;rot=2*s;}else if(arm)rot=side*4*s;}
   if(i===0||i===48){rot=0;dx=0;dy=0;}
   return{t:+(u*duration).toFixed(5),rot:+rot.toFixed(4),dx:+dx.toFixed(4),dy:+dy.toFixed(4)};
  });
 }
 return{duration,tracks};
}
