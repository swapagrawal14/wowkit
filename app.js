import {initWow} from './effects/wow.js';
initWow();
const descriptions={signal:['SIGNAL / EDITORIAL','High contrast. Sharp edges. Editorial spirit.'],nocturne:['NOCTURNE / AFTER HOURS','Deep surfaces. Soft violet. Quiet confidence.'],clay:['CLAY / HUMAN TOUCH','Warm neutrals. Rounded edges. A softer point of view.']};
document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click',()=>{
 const preset=button.dataset.preset;
 document.documentElement.dataset.style=preset;
 document.querySelectorAll('[data-preset]').forEach(el=>el.setAttribute('aria-pressed',String(el===button)));
 document.querySelector('#preset-label').textContent=descriptions[preset][0];
 document.querySelector('#preset-description').textContent=descriptions[preset][1];
}));
document.querySelector('#copy-prompt').addEventListener('click',async()=>{
 const status=document.querySelector('#copy-status');
 try {await Promise.race([navigator.clipboard.writeText(document.querySelector('#prompt-text').textContent),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Clipboard permission timeout')),1500))]);status.textContent='Copied. Paste it into your coding agent.';}
 catch {status.textContent='Clipboard unavailable. Select and copy the prompt above.'; const selection=getSelection();const range=document.createRange();range.selectNodeContents(document.querySelector('#prompt-text'));selection.removeAllRanges();selection.addRange(range);}
});
