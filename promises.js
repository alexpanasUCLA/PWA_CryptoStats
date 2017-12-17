

let marketCap = fetch(' https://api.coinmarketcap.com/v1/global/')
    .then((res)=>{return res.json()})
    .then((data)=>{
      // console.log(data.active_assets);
      return data;
    });

let top3marketCap = fetch('https://api.coinmarketcap.com/v1/ticker/?limit=3')
        .then((res)=>{return res.json()})
        .then((data)=>{
          // console.log(data.active_assets);
          return data;
        });
let arPromises = [top3marketCap,marketCap];

Promise.all(arPromises)
  .then((resprom)=>{
    console.log(resprom);
  })
