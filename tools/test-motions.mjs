import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {makeMotion,motionLabels} from '../player/motions.js';
for(const character of ['frog','robot','cloud']){
 const p=JSON.parse(await readFile(new URL(`../projects/cast/${character}.json`,import.meta.url)));
 for(const kind of Object.keys(motionLabels)){
  const a=makeMotion(kind,p.joints,p.size);assert(a.duration>0);
  for(const j of p.joints){const keys=a.tracks[j.name];assert.deepEqual({...keys[0],t:0},{...keys.at(-1),t:0});for(const key of keys){for(const v of Object.values(key))assert(Number.isFinite(v));if(j.parent){assert.equal(key.dx,0);assert.equal(key.dy,0);}}assert.equal(keys.at(-1).t,a.duration);}
 }
}
console.log('PASS: 8 motions × 3 rigs; finite, loop-closed, root-only translation.');
