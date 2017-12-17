// self.addEventListener('activate',()=>{
//   console.log('Service worker active');
// })
const pwaCache = 'cache-v3';
self.addEventListener('install',event=>{
  let cacheShell = caches.open(pwaCache)
    .then(cache=>{
      console.log('Cache is created');
      return cache.addAll([
        '/',
        'style.css',
        'app.js'
    ]);
    });
    event.waitUntil(cacheShell);
});

self.addEventListener('fetch',evt=>{
  //Do not serve local cache but use remote resource
  if (!evt.request.url.match(location.origin)) return;

// Serve local cache
    let newRes = caches.open(pwaCache)
      .then(cache=>{
        return cache.match(evt.request)
          .then(res=>{
            //Check if request was found in cache
            if (res) {
              console.log(`Serving ${res.url} from cache`);
              return res;}

            // Fetch and cache app.js which contains service worker itself
            return fetch(evt.request)
              .then(fetchReq=>{
                cache.put(evt.request,fetchReq.clone());
                return fetchReq;
              });
            });
      });


    evt.respondWith(newRes);

});
