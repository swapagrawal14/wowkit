import {readFile,access,readdir} from 'node:fs/promises';
import path from 'node:path';
const required=['AGENTS.md','README.md','index.html','app.js','styles/presets.css','effects/wow.js','effects/wow.css','prompts/start.md','recipes/editorial.md','recipes/product.md','recipes/portfolio.md','examples/studio/index.html'];
let errors=[];
for(const file of required)try{await access(file);}catch{errors.push(`Missing ${file}`);}
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){if(['node_modules','.git','screenshots'].includes(entry.name))continue;const file=path.join(dir,entry.name);if(entry.isDirectory())await walk(file);else if(file.endsWith('.html')){const text=await readFile(file,'utf8');for(const [,url]of text.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|mailto:|data:|#)/.test(url))continue;try{await access(path.resolve(path.dirname(file),url.split('#')[0]));}catch{errors.push(`${file}: broken path ${url}`);}}}}}
await walk('.');if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log('PASS: required kit files and local HTML asset/link paths. Browser and accessibility checks still required.');
