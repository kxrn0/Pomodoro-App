if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let l={};const f=e=>i(e,o),c={module:{uri:o},exports:l,require:f};s[o]=Promise.all(n.map((e=>c[e]||f(e)))).then((e=>(r(...e),l)))}}define(["./workbox-e0782b83"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/alarm_sound-70613cea.mp3",revision:null},{url:"assets/check-a6cbe2e2.svg",revision:null},{url:"assets/icon-arrow-down-b30a8646.svg",revision:null},{url:"assets/icon-arrow-up-de8181a0.svg",revision:null},{url:"assets/icon-close-a58ba8fd.svg",revision:null},{url:"assets/icon-settings-347c10e9.svg",revision:null},{url:"assets/index-5c273da7.js",revision:null},{url:"assets/index-8923e6b0.css",revision:null},{url:"assets/KumbhSans-VariableFont_wght-777ad139.ttf",revision:null},{url:"assets/RobotoSlab-VariableFont_wght-959df2f6.ttf",revision:null},{url:"assets/SpaceMono-Bold-d9cb77aa.ttf",revision:null},{url:"assets/SpaceMono-Regular-74ea8049.ttf",revision:null},{url:"fvc.ico",revision:"7198c97dbb23095fdeff3d24bc8fbf74"},{url:"icon-192x192.png",revision:"eee47b44f29a70cbef2f4549b8e12b3f"},{url:"icon-256x256.png",revision:"f08d8e91f1f388912e050511ef13d7ab"},{url:"icon-384x384.png",revision:"005c28ff9fc1c9b088ecc41c7873b213"},{url:"icon-512x512.png",revision:"e888bf85a94f7f12a777d0e3a78c0dfe"},{url:"index.html",revision:"15b9263da8499ac6d494e6b943be12c1"},{url:"manifest.webmanifest",revision:"daf3e550f21814344a9e808bc565d798"},{url:"registerSW.js",revision:"d60a3c2bfa0c17b2151e86c0ede660f4"},{url:"icon-192x192.png",revision:"eee47b44f29a70cbef2f4549b8e12b3f"},{url:"icon-256x256.png",revision:"f08d8e91f1f388912e050511ef13d7ab"},{url:"icon-384x384.png",revision:"005c28ff9fc1c9b088ecc41c7873b213"},{url:"icon-512x512.png",revision:"e888bf85a94f7f12a777d0e3a78c0dfe"},{url:"manifest.webmanifest",revision:"daf3e550f21814344a9e808bc565d798"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
