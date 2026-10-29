// Adapted from swapagrawal14/rigpop, commit 6c6431b. Original Canvas skinning renderer.
export function createPlayer(cv, demoId='octo') {
const cx=cv.getContext('2d'),R=Math.PI/180,INK='#191c35';
let iw=360,ih=420,J=[],img=null,M=null,dirty=1,anim=null;
const by=n=>J.find(j=>j.name===n),kids=n=>J.filter(j=>j.parent===n);
const DJ=[]; const WAVE='{}'; const hiker=()=>{},demo=()=>{};
const mul=(m,n)=>[m[0]*n[0]+m[2]*n[1],m[1]*n[0]+m[3]*n[1],m[0]*n[2]+m[2]*n[3],m[1]*n[2]+m[3]*n[3],m[0]*n[4]+m[2]*n[5]+m[4],m[1]*n[4]+m[3]*n[5]+m[5]];
const tr=(x,y)=>[1,0,0,1,x,y],ro=a=>{const c=Math.cos(a*R),s=Math.sin(a*R);return[c,s,-s,c,0,0]};
function fk(){const W={};const g=j=>{if(W[j.name])return W[j.name];const p=j.parent&&by(j.parent);return W[j.name]=p?mul(mul(g(p),tr(j.x-p.x,j.y-p.y)),ro(j.a)):mul(tr(j.x+j.dx,j.y+j.dy),ro(j.a))};J.forEach(g);return W}
function dseg(px,py,ax,ay,bx,cy){const dx=bx-ax,dy=cy-ay,l=dx*dx+dy*dy;let t=l?((px-ax)*dx+(py-ay)*dy)/l:0;t=Math.max(0,Math.min(1,t));return Math.hypot(px-ax-t*dx,py-ay-t*dy)}

/* mesh skinning: each grid vertex follows nearby bones, weighted by distance */
function build(){const cols=30,rows=Math.max(2,Math.round(cols*ih/iw)),D=[];
 J.forEach(j=>{const k=kids(j.name);(k.length?k:[j]).forEach(c=>D.push({n:j.name,a:j,b:c}))});
 const K=Math.max(iw,ih)/40,V=[];
 for(let r=0;r<=rows;r++)for(let c=0;c<=cols;c++){const u=c/cols*iw,v=r/rows*ih;
  let w=D.map((d,i)=>[i,1/Math.pow(1+dseg(u,v,d.a.x,d.a.y,d.b.x,d.b.y)/K,4)]);const s=w.reduce((a,b)=>a+b[1],0);
  w=w.map(x=>[x[0],x[1]/s]).filter(x=>x[1]>.01);const s2=w.reduce((a,b)=>a+b[1],0)||1;w=w.map(x=>[x[0],x[1]/s2]);V.push({u,v,w})}
 let id=null;try{id=img.getContext("2d").getImageData(0,0,iw,ih).data}catch(e){}const on=[];
 for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){let h=id?0:1;const x0=Math.floor(c/cols*iw),x1=Math.min(iw-1,Math.ceil((c+1)/cols*iw)),y0=Math.floor(r/rows*ih),y1=Math.min(ih-1,Math.ceil((r+1)/rows*ih));
  for(let y=y0;y<=y1&&!h;y+=3)for(let x=x0;x<=x1;x+=3)if(id[(y*iw+x)*4+3]>8){h=1;break}
  on.push(h)}
 M={cols,rows,D,V,on};dirty=0}
function tri(i,j,k,P){const V=M.V,s=[V[i],V[j],V[k]],d=[P[i],P[j],P[k]];
 const su1=s[1].u-s[0].u,su2=s[2].u-s[0].u,sv1=s[1].v-s[0].v,sv2=s[2].v-s[0].v,det=su1*sv2-su2*sv1;if(!det)return;
 const du1=d[1][0]-d[0][0],du2=d[2][0]-d[0][0],dv1=d[1][1]-d[0][1],dv2=d[2][1]-d[0][1];
 const a=(du1*sv2-du2*sv1)/det,c=(du2*su1-du1*su2)/det,b=(dv1*sv2-dv2*sv1)/det,dd=(dv2*su1-dv1*su2)/det;
 const e=d[0][0]-a*s[0].u-c*s[0].v,f=d[0][1]-b*s[0].u-dd*s[0].v,mx=(d[0][0]+d[1][0]+d[2][0])/3,my=(d[0][1]+d[1][1]+d[2][1])/3;
 const x0=Math.max(0,Math.floor(Math.min(s[0].u,s[1].u,s[2].u))-1),y0=Math.max(0,Math.floor(Math.min(s[0].v,s[1].v,s[2].v))-1),
 x1=Math.min(iw,Math.ceil(Math.max(s[0].u,s[1].u,s[2].u))+1),y1=Math.min(ih,Math.ceil(Math.max(s[0].v,s[1].v,s[2].v))+1);
 cx.save();cx.beginPath();
 d.forEach((p,n)=>{const dx=p[0]-mx,dy=p[1]-my,l=Math.hypot(dx,dy)||1,x=p[0]+dx/l*.7,y=p[1]+dy/l*.7;n?cx.lineTo(x,y):cx.moveTo(x,y)});
 cx.closePath();cx.clip();cx.setTransform(a,b,c,dd,e,f);cx.drawImage(img,x0,y0,x1-x0,y1-y0,x0,y0,x1-x0,y1-y0);cx.restore()}
function deform(W){if(dirty||!M)build();const SJ={};J.forEach(j=>SJ[j.name]=mul(W[j.name],tr(-j.x,-j.y)));
 const P=M.V.map(p=>{let x=0,y=0;p.w.forEach(([i,w])=>{const m=SJ[M.D[i].n];x+=w*(m[0]*p.u+m[2]*p.v+m[4]);y+=w*(m[1]*p.u+m[3]*p.v+m[5])});return[x,y]});
 const q=(r,c)=>r*(M.cols+1)+c;
 for(let r=0;r<M.rows;r++)for(let c=0;c<M.cols;c++){if(!M.on[r*M.cols+c])continue;const a=q(r,c),b=q(r,c+1),d=q(r+1,c),e=q(r+1,c+1);tri(a,b,d,P);tri(b,e,d,P)}}
function smp(k,t,f){if(t<=k[0].t)return k[0][f];const l=k[k.length-1];if(t>=l.t)return l[f];let i=0;while(k[i+1].t<t)i++;const a=k[i],b=k[i+1],u=(t-a.t)/((b.t-a.t)||1);return a[f]+(b[f]-a[f])*u}
function evalAnim(t){J.forEach(j=>{const k=anim.tracks[j.name];j.a=k?smp(k,t,"rot"):0;j.dx=k?smp(k,t,"dx"):0;j.dy=k?smp(k,t,"dy"):0})}
function mk(w,h,fn){const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.lineCap=g.lineJoin="round";
 g.L=(p,w,col)=>{g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.strokeStyle=INK;g.lineWidth=w+8;g.stroke();g.strokeStyle=col;g.lineWidth=w;g.stroke()};
 g.E=(x,y,rx,ry,col,lw)=>{g.beginPath();g.ellipse(x,y,rx,ry,0,0,7);if(col){g.fillStyle=col;g.fill()}g.lineWidth=lw||6;g.strokeStyle=INK;g.stroke()};
 g.D=(x,y,r)=>{g.beginPath();g.arc(x,y,r,0,7);g.fillStyle=INK;g.fill()};
 g.S=(p,lw,col)=>{g.beginPath();p.forEach((q,i)=>i?g.lineTo(q[0],q[1]):g.moveTo(q[0],q[1]));g.strokeStyle=col||INK;g.lineWidth=lw;g.stroke()};
 fn(g);return c}
function cyc(d,n,spec){const t={};Object.entries(spec).forEach(([k,f])=>{t[k]=[];for(let i=0;i<=n;i++){const p=2*Math.PI*i/n;t[k].push(Object.assign({t:+(i/n*d).toFixed(3)},f(p,Math.sin(p),Math.cos(p))))}});return{duration:d,tracks:t}}
const sn=Math.sin;
const DEMOS=[
 {id:"hiker",icon:"🥾",name:"Hiker walk",run:()=>hiker()},
 {id:"stick",icon:"👋",name:"Stick wave",run:()=>demo()},
 {id:"hoodie",icon:"🐻",name:"Hoodie dance",w:360,h:480,sel:"rsh",
  joints:[["hip",180,300,""],["spine",180,200,"hip"],["head",180,118,"spine"],["lsh",126,208,"spine"],["lel",100,264,"lsh"],["lha",92,322,"lel"],["rsh",234,208,"spine"],["rel",260,264,"rsh"],["rha",268,322,"rel"],["lhip",160,308,"hip"],["lkn",156,385,"lhip"],["lft",154,452,"lkn"],["rhip",200,308,"hip"],["rkn",204,385,"rhip"],["rft",206,452,"rkn"]],
  draw:g=>{const R="#d6282d",SK="#fce2ce";
   g.L([[160,300],[156,385],[154,452]],34,R);g.L([[200,300],[204,385],[206,452]],34,R);
   g.L([[126,208],[100,264],[92,318]],24,R);g.L([[234,208],[260,264],[268,318]],24,R);
   g.E(92,326,12,12,SK,5);g.E(268,326,12,12,SK,5);
   g.L([[180,200],[180,296]],68,R);
   g.E(146,62,19,19,R);g.E(214,62,19,19,R);g.E(180,118,52,64,R);g.E(180,124,34,46,SK,5);
   g.D(167,112,3.5);g.D(193,112,3.5);g.S([[181,104],[179,132],[189,132]],3.5);g.S([[172,150],[188,150]],3.5);
   g.S([[172,188],[168,214]],5,"#fff");g.S([[188,188],[192,214]],5,"#fff")},
  anim:()=>cyc(1.6,24,{hip:(p,s)=>({dy:-12*Math.abs(s),rot:3*sn(p)}),spine:p=>({rot:6*sn(p)}),head:p=>({rot:-9*sn(p+.4)}),
   lsh:p=>({rot:50+50*sn(p)}),lel:p=>({rot:30*sn(p*2)}),rsh:p=>({rot:-50+50*sn(p)}),rel:p=>({rot:-30*sn(p*2+.5)}),
   lhip:p=>({rot:12*sn(p)}),lkn:p=>({rot:-18*Math.max(0,sn(p))}),rhip:p=>({rot:12*sn(p)}),rkn:p=>({rot:18*Math.max(0,-sn(p))})})},
 {id:"tulip",icon:"🌷",name:"Tulip sway",w:360,h:480,sel:"s3",
  joints:[["s0",180,462,""],["s1",180,392,"s0"],["s2",180,322,"s1"],["s3",180,252,"s2"],["bloom",180,178,"s3"]],
  draw:g=>{const G="#3f9a4c";g.L([[180,462],[180,392],[180,322],[180,252],[180,200]],14,G);
   g.save();g.translate(150,370);g.rotate(-.7);g.E(0,0,16,50,"#5cbf63");g.restore();g.save();g.translate(212,330);g.rotate(.7);g.E(0,0,14,44,"#5cbf63");g.restore();
   g.beginPath();g.moveTo(140,150);g.quadraticCurveTo(138,222,180,222);g.quadraticCurveTo(222,222,220,150);g.lineTo(200,172);g.lineTo(180,138);g.lineTo(160,172);g.closePath();g.fillStyle="#ff6f9c";g.fill();g.lineWidth=6;g.strokeStyle=INK;g.stroke();
   g.S([[180,150],[180,205]],4,"#c9466f")},
  anim:()=>cyc(3,24,{s0:p=>({rot:3*sn(p)}),s1:p=>({rot:5*sn(p-.5)}),s2:p=>({rot:6*sn(p-1)}),s3:p=>({rot:7*sn(p-1.5)}),bloom:p=>({rot:6*sn(p-2)})})},
 {id:"octo",icon:"🐙",name:"Octopus wiggle",w:360,h:420,sel:"body",
  joints:(()=>{const j=[["body",180,130,""]];[96,148,212,264].forEach((x,i)=>{const n="t"+(i+1),dx=(x-180)*.35;j.push([n+"a",x,205,"body"],[n+"b",x+dx,285,n+"a"],[n+"c",x+dx*1.6,365,n+"b"])});return j})(),
  draw:g=>{const P="#8f63d9";[96,148,212,264].forEach(x=>{const dx=(x-180)*.35;g.L([[x,190],[x,205],[x+dx,285],[x+dx*1.6,365],[x+dx*1.7,388]],26,P)});
   g.E(180,130,92,82,P);g.E(150,128,14,16,"#fff",5);g.E(210,128,14,16,"#fff",5);g.D(153,132,6);g.D(213,132,6);
   g.S([[166,168],[180,176],[194,168]],5);g.E(126,160,10,6,"#ff9ec1",0.01);g.E(234,160,10,6,"#ff9ec1",0.01)},
  anim:()=>{const s={body:(p,s)=>({dy:-10*s,rot:3*sn(p)})};[0,1,2,3].forEach(i=>{const n="t"+(i+1),o=i*1.2;s[n+"a"]=p=>({rot:10*sn(p+o)});s[n+"b"]=p=>({rot:20*sn(p+o-.8)});s[n+"c"]=p=>({rot:28*sn(p+o-1.6)})});return cyc(2.4,24,s)}},
 {id:"fish",icon:"🐟",name:"Fish swim",w:480,h:300,sel:"tail1",
  joints:[["head",400,150,""],["mid",300,150,"head"],["tail1",205,150,"mid"],["tail2",125,150,"tail1"],["fin",45,150,"tail2"]],
  draw:g=>{const O="#ff9f1c";g.beginPath();g.moveTo(120,150);g.lineTo(40,92);g.quadraticCurveTo(60,150,40,208);g.closePath();g.fillStyle=O;g.fill();g.lineWidth=6;g.strokeStyle=INK;g.stroke();
   g.E(270,150,160,72,O);g.beginPath();g.moveTo(240,80);g.quadraticCurveTo(280,40,320,84);g.fillStyle="#ffbf69";g.fill();g.stroke();
   g.S([[330,90],[315,150],[330,210]],5);g.E(380,135,15,15,"#fff",5);g.D(384,137,7);g.S([[418,168],[428,172]],5);
   [[230,130],[260,165],[200,170],[290,120]].forEach(([x,y])=>{g.E(x,y,12,9,"#ffd166",4)})},
  anim:()=>cyc(1.4,24,{head:(p,s)=>({dy:8*s,rot:3*sn(p)}),mid:p=>({rot:5*sn(p-.6)}),tail1:p=>({rot:12*sn(p-1.2)}),tail2:p=>({rot:22*sn(p-1.9)})})},
 {id:"tooth",icon:"🦷",name:"Tooth wave",w:360,h:480,sel:"rshoulder",
  joints:[["hip",180,300,""],["spine",180,190,"hip"],["lshoulder",116,212,"spine"],["lelbow",90,266,"lshoulder"],["lhand",84,322,"lelbow"],["rshoulder",244,212,"spine"],["relbow",270,266,"rshoulder"],["rhand",276,322,"relbow"],["lroot",152,312,"hip"],["lfoot",146,415,"lroot"],["rroot",208,312,"hip"],["rfoot",214,415,"rroot"]],
  draw:g=>{const W="#fffdf6";g.L([[152,300],[146,415]],38,W);g.L([[208,300],[214,415]],38,W);
   g.L([[116,212],[90,266],[84,318]],18,W);g.L([[244,212],[270,266],[276,318]],18,W);g.E(84,324,13,13,W,5);g.E(276,324,13,13,W,5);
   g.beginPath();g.moveTo(112,150);g.quadraticCurveTo(112,96,150,98);g.quadraticCurveTo(180,108,210,98);g.quadraticCurveTo(248,96,248,150);g.quadraticCurveTo(250,250,226,320);g.lineTo(134,320);g.quadraticCurveTo(110,250,112,150);g.fillStyle=W;g.fill();g.lineWidth=7;g.strokeStyle=INK;g.stroke();
   g.D(160,180,6);g.D(200,180,6);g.S([[160,210],[180,224],[200,210]],5);g.E(140,205,11,7,"#ffb3c7",0.01);g.E(220,205,11,7,"#ffb3c7",0.01);
   g.S([[268,92],[268,118]],4,"#7fd3ff");g.S([[255,105],[281,105]],4,"#7fd3ff")},
  anim:()=>JSON.parse(WAVE)},
 {id:"icecream",icon:"🍦",name:"Ice cream (with background)",src:"examples/icecream.jpg",w:600,h:800,sel:"lelbow",
  joints:[["pelvis",300,500,""],["spine",300,330,"pelvis"],["neck",300,275,"spine"],["head",300,190,"neck"],["lsh",245,320,"spine"],["lelbow",185,395,"lsh"],["lhand",140,320,"lelbow"],["cone",145,250,"lhand"],["rsh",358,320,"spine"],["relbow",390,410,"rsh"],["rhand",400,490,"relbow"],["lhip",275,520,"pelvis"],["lknee",268,600,"lhip"],["lfoot",262,700,"lknee"],["rhip",330,520,"pelvis"],["rknee",335,600,"rhip"],["rfoot",345,700,"rknee"],...[[30,30],[300,30],[570,30],[30,260],[570,260],[460,180],[30,520],[570,520],[30,770],[300,780],[570,770],[480,420],[130,560],[470,640]].map(([x,y],i)=>["pin"+(i+1),x,y,""])],
  anim:()=>{const k=(a)=>a.map(([t,rot])=>({t,rot}));return{duration:3,tracks:{
   lsh:k([[0,0],[.6,-12],[1.7,-12],[2.3,0],[3,0]]),lelbow:k([[0,0],[.6,32],[.85,26],[1.1,34],[1.35,26],[1.7,32],[2.3,0],[3,0]]),lhand:k([[0,0],[.6,-8],[1.7,-8],[2.3,0],[3,0]]),
   neck:k([[0,0],[.6,-6],[.85,-8],[1.1,-5],[1.35,-8],[1.7,-6],[2.3,0],[3,0]]),head:k([[0,0],[.7,-3],[1.7,-3],[2.4,2],[3,0]]),
   spine:k([[0,0],[.6,-2],[1.7,-2],[2.3,1],[3,0]]),rsh:k([[0,0],[1.5,4],[3,0]]),relbow:k([[0,0],[1.6,-5],[3,0]])}}}},
 {id:"robot",icon:"🤖",name:"Robot dance",w:360,h:480,sel:"rshoulder",joints:DJ.map(j=>({lshoulder:["lshoulder",118,185,"spine"],lelbow:["lelbow",96,255,"lshoulder"],lhand:["lhand",90,325,"lelbow"],rshoulder:["rshoulder",242,185,"spine"],relbow:["relbow",264,255,"rshoulder"],rhand:["rhand",270,325,"relbow"]})[j[0]]||j),
  draw:g=>{const M="#9aa7b4",B="#5b8def";g.L([[160,300],[156,380],[156,452]],30,M);g.L([[200,300],[204,380],[204,452]],30,M);
   g.L([[118,185],[96,255],[90,325]],20,M);g.L([[242,185],[264,255],[270,325]],20,M);
   g.fillStyle=B;g.strokeStyle=INK;g.lineWidth=7;g.fillRect(140,170,80,135);g.strokeRect(140,170,80,135);
   g.fillStyle="#ffd166";g.fillRect(160,200,40,26);g.strokeRect(160,200,40,26);
   g.fillStyle=M;g.fillRect(138,62,84,84);g.strokeRect(138,62,84,84);g.S([[180,62],[180,38]],5);g.E(180,34,7,7,"#ff5c8a",4);
   g.fillStyle="#7fffd4";g.fillRect(152,88,18,14);g.fillRect(190,88,18,14);g.strokeRect(152,88,18,14);g.strokeRect(190,88,18,14);g.S([[160,122],[200,122]],5)},
  anim:()=>{const st=(v,n)=>Math.round(v*n)/n,d=2,k=[0,.5,1,1.5,2];const tr=(vals)=>vals.map((r,i)=>({t:k[i],rot:r}));
   return{duration:d,tracks:{lshoulder:tr([0,90,90,0,0]),lelbow:tr([0,-90,0,-90,0]),rshoulder:tr([0,0,-90,-90,0]),relbow:tr([0,0,90,0,0]),head:tr([0,10,-10,10,0]),spine:tr([0,4,-4,4,0]),hip:[{t:0},{t:.25,dy:-10},{t:.5},{t:.75,dy:-10},{t:1},{t:1.25,dy:-10},{t:1.5},{t:1.75,dy:-10},{t:2}]}}}}
];

let speed=1,paused=false,bones=false,time=0,last=0,raf=0,visible=true,destroyed=false;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function select(id){ const D=DEMOS.find(d=>d.id===id&&d.draw); if(!D)throw Error('Unknown drawable demo'); iw=D.w;ih=D.h;cv.width=iw;cv.height=ih;img=mk(iw,ih,D.draw);J=D.joints.map(([name,x,y,parent])=>({name,x,y,parent:parent||null,a:0,dx:0,dy:0})); anim=D.anim();Object.values(anim.tracks).forEach(keys=>keys.forEach(k=>{k.rot??=0;k.dx??=0;k.dy??=0}));M=null;dirty=1;time=0;render(); }
function render(){evalAnim(reduced.matches?0:time);cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,iw,ih);const W=fk();deform(W);if(bones){cx.strokeStyle='#dfff00';cx.lineWidth=2;J.forEach(j=>{const p=j.parent&&W[j.parent];if(p){cx.beginPath();cx.moveTo(p[4],p[5]);cx.lineTo(W[j.name][4],W[j.name][5]);cx.stroke()}cx.beginPath();cx.arc(W[j.name][4],W[j.name][5],4,0,7);cx.fillStyle='#fff';cx.fill();});}}
function tick(ts){if(destroyed)return;const dt=Math.min((ts-last)/1000||0,.05);last=ts;if(visible&&!document.hidden){if(!paused&&!reduced.matches)time=(time+dt*speed)%anim.duration;render();}raf=requestAnimationFrame(tick);}
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});observer.observe(cv);
select(demoId);raf=requestAnimationFrame(tick);
return {select,setSpeed(v){speed=v},toggle(){paused=!paused;return paused},toggleBones(){bones=!bones;return bones},destroy(){destroyed=true;cancelAnimationFrame(raf);observer.disconnect();}};
}
