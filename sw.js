if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const l=e=>s(e,t),d={module:{uri:t},exports:o,require:l};i[t]=Promise.all(n.map((e=>d[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-e0782b83"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-8923e6b0.css",revision:null},{url:"assets/index-d10744fe.js",revision:null},{url:"index.html",revision:"e33e24ab963f90539b8e75c512d0b622"},{url:"registerSW.js",revision:"d60a3c2bfa0c17b2151e86c0ede660f4"},{url:"icon-192x192.png",revision:"fff6e1a355eeb4a1bb4b2637738b6d2d"},{url:"icon-512x512.png",revision:"c92ddb86a6eaa642c986a324557f5ee8"},{url:"manifest.webmanifest",revision:"e8b291ab44d786d33619ac95fd680610"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));