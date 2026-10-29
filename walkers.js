import {createProjectPlayer} from './player/project-player.js';
import {makeMotion} from './player/motions.js';
const players=[];
for(const [index,rail] of [...document.querySelectorAll('.walker-rail')].entries()){
 const canvas=rail.querySelector('canvas'),engine=createProjectPlayer(canvas);players.push(engine);
 try{const name=index?'mushroom':'frog';const r=await fetch(`projects/cast/${name}.json`);if(!r.ok)throw Error('Missing walker');const project=await r.json();project.animation=makeMotion('walk',project.joints,project.size);await engine.load(project);engine.setSpeed(index?.85:1);}catch{canvas.hidden=true;}
}
const toggle=document.querySelector('#walker-toggle');let paused=false;
toggle.addEventListener('click',()=>{paused=!paused;document.body.classList.toggle('walkers-paused',paused);players.forEach(p=>p.setPaused(paused));toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'Resume walkers ▷':'Pause walkers Ⅱ';});
window.addEventListener('pagehide',()=>players.forEach(p=>p.destroy()));
