import {createProjectPlayer} from './player/project-player.js';
function createPlayer(canvas){const engine=createProjectPlayer(canvas);let paused=false,bones=false;async function select(name){const r=await fetch(`projects/cast/${name}.json`);if(!r.ok)throw Error('Could not load rig');await engine.load(await r.json());}select('cloud').catch(console.error);return{select,toggle(){paused=!paused;engine.setPaused(paused);return paused},toggleBones(){bones=!bones;engine.setBones(bones);return bones},setSpeed(v){engine.setSpeed(v)},destroy(){engine.destroy()}};}

let player;
const status=document.querySelector('#lab-status');
try{player=createPlayer(document.querySelector('#character'));}catch(e){status.textContent='The character could not load. The editor and playbook are still available.';console.error(e);}
document.querySelectorAll('[data-character]').forEach(b=>b.addEventListener('click',()=>{if(!player)return;player.select(b.dataset.character);document.querySelectorAll('[data-character]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));status.textContent=`${b.textContent}: animated live by Rigpop. Try showing the rig.`;document.querySelector('#character').setAttribute('aria-label',`Animated Rigpop ${b.textContent} character`);}));
document.querySelector('#pause').addEventListener('click',e=>{if(!player)return;const paused=player.toggle();e.currentTarget.textContent=paused?'Play ▷':'Pause Ⅱ';e.currentTarget.setAttribute('aria-pressed',String(paused));});
document.querySelector('#bones').addEventListener('click',e=>{if(!player)return;const bones=player.toggleBones();e.currentTarget.textContent=bones?'Hide rig':'Show rig';e.currentTarget.setAttribute('aria-pressed',String(bones));});
document.querySelector('#speed').addEventListener('input',e=>player?.setSpeed(+e.target.value));
document.querySelector('#copy').addEventListener('click',async()=>{const status=document.querySelector('#copy-status'),text=document.querySelector('#prompt').textContent;try{await Promise.race([navigator.clipboard.writeText(text),new Promise((_,reject)=>setTimeout(reject,1500))]);status.textContent='Copied. Replace the placeholders and give it to your agent.';}catch{document.querySelector('#prompt').hidden=false;status.textContent='Select and copy the build prompt below.';}});
window.addEventListener('pagehide',()=>player?.destroy());
