// Rigpop Canvas renderer adapted from swapagrawal14/rigpop, commit 6c6431b.
export function createProjectPlayer(cv) {
const cx=cv.getContext('2d'),R=Math.PI/180;
let iw=400,ih=600,J=[],img=null,bgImg=null,M=null,dirty=1,anim={duration:3,tracks:{}};
const by=n=>J.find(j=>j.name===n),kids=n=>J.filter(j=>j.parent===n);
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

let time=0,speed=1,paused=false,bones=false,visible=true,destroyed=false,last=0,request=0,loadToken=0,current=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function normalize(a){const tracks={};for(const [name,keys] of Object.entries(a?.tracks||{})){if(keys.length)tracks[name]=keys.map(k=>({t:+k.t||0,rot:+k.rot||0,dx:+k.dx||0,dy:+k.dy||0})).sort((a,b)=>a.t-b.t);}return{duration:Math.max(.1,+a?.duration||3),tracks};}
function image(src){return new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=()=>reject(Error('Image could not load'));i.src=src;});}
async function load(project,baseURL=document.baseURI){const token=++loadToken;const source=await image(new URL(project.image,baseURL));const bg=project.background?await image(new URL(project.background,baseURL)):null;if(token!==loadToken||destroyed)return;current=structuredClone(project);iw=project.size?.[0]||source.naturalWidth;ih=project.size?.[1]||source.naturalHeight;cv.width=iw;cv.height=ih;img=document.createElement('canvas');img.width=iw;img.height=ih;img.getContext('2d').drawImage(source,0,0,iw,ih);bgImg=bg;setJoints(project.joints||[]);anim=normalize(project.animation);time=0;render();}
function setJoints(joints){const seen=new Set();J=joints.map(j=>{if(seen.has(j.name)||j.parent&&!seen.has(j.parent))throw Error('Joints need unique names; parents must come first.');seen.add(j.name);return{...j,a:0,dx:0,dy:0};});M=null;dirty=1;render();}
function render(){if(!img)return;cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,iw,ih);if(bgImg)cx.drawImage(bgImg,0,0,iw,ih);evalAnim(reduced.matches?0:time);let W;if(J.length){W=fk();deform(W);}else cx.drawImage(img,0,0);if(bones&&J.length){cx.lineWidth=2;cx.strokeStyle='#f63876';for(const j of J){const p=j.parent&&W[j.parent],m=W[j.name];if(p){cx.beginPath();cx.moveTo(p[4],p[5]);cx.lineTo(m[4],m[5]);cx.stroke();}cx.beginPath();cx.arc(m[4],m[5],5,0,7);cx.fillStyle='#fff';cx.fill();cx.stroke();}}}
function tick(ts){const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(visible&&!document.hidden&&img){if(!paused&&!reduced.matches)time=(time+dt*speed)%anim.duration;render();}if(!destroyed)request=requestAnimationFrame(tick);}
const obs=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});obs.observe(cv);request=requestAnimationFrame(tick);
return{load,setJoints,setAnimation(a){anim=normalize(a);time=0;},setPaused(v){paused=v;time=0;render();},setBones(v){bones=v;render();},setSpeed(v){speed=v;},getProject(){return{...current,size:[iw,ih],joints:J.map(({name,x,y,parent})=>({name,x,y,parent})),animation:anim};},destroy(){destroyed=true;++loadToken;cancelAnimationFrame(request);obs.disconnect();}};
}
