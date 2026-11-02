const C='f606-v16',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'],OK=['cdn.jsdelivr.net','cdnjs.cloudflare.com','www.gstatic.com','tessdata.projectnaptha.com','unpkg.com'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;
const same=u.origin===location.origin;if(!same&&!OK.includes(u.hostname))return;
const save=res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
if(same)e.respondWith(fetch(r).then(save).catch(()=>caches.match(r).then(h=>h||caches.match('index.html'))));
else e.respondWith(caches.match(r).then(h=>h||fetch(r).then(save)))});
