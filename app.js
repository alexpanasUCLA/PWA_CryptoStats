if (navigator.serviceWorker) {

  navigator.serviceWorker.register('/sw.js')
    .then((registration)=>{
      console.log('SW registered');
    })
    .catch(err=>{
      console.log("SW failed to register",err);
    })

}

const btn = document.querySelector('button');
const priceSpan = document.querySelector('span');
const topTen = document.querySelector('.topten');
const spinner = document.querySelector('.spinner');



btn.addEventListener('click', function () {

// make button invisible
btn.style.display = 'none';
spinner.style.display = 'block';



// Fetching json file of aggregated data
  let aggregateData = fetch(' https://api.coinmarketcap.com/v1/global/')
      .then((res)=>{return res.json()})
      .then((agData)=>{
        return agData;
      });

// Fetching json data on all the coins
  let allCoins = fetch('https://api.coinmarketcap.com/v1/ticker/?limit=0')
        .then((res)=>{return res.json()})
        .then((data)=>{
          let coins = Array.from(data);
          return coins; });


// Creating array of promises

 let arrPromises = [allCoins,aggregateData];
 Promise.all(arrPromises)
  .then( (result)=>{

    let coinArr = result[0];
    let marketData = result[1];
    console.log(marketData);

// Calculation of market cap of top 10 coins
            let top10 = 0;
            for (var i = 0; i < 10; i++) {
              top10 += Number(coinArr[i].market_cap_usd);
            }

// Calculation of share of topTen coins in total market share
    let shareTopTen = (top10/marketData.total_market_cap_usd*100).toFixed(0);
    top10 = top10.toLocaleString();
    topTen.innerText = `Market share of top 10 coins is ${shareTopTen} % out
    of total market cap ${marketData.total_market_cap_usd.toLocaleString()}USD`;

// Calculation of number of tokens that went up
    let count = 0;
    for (coin of coinArr) {
                // console.log(`The price of ${coin.name} is ${coin.price_usd}`);
        let dailyPriceChange = Number(coin.percent_change_24h);
                if (dailyPriceChange > 0) {
                  // console.log(dailyPriceChange);
                  count++;
                                          }
                        };

    console.log(`${count} coins went up out of total number ${coinArr.length}`);
    priceSpan.innerText = `${count} coins went up out of total number ${coinArr.length}`;

    // Select img tag to insert gif url

    const imgGif = document.getElementById('gifImage');
    let url = "https://api.giphy.com/v1/gifs/random?api_key=DaGpuX8wBO5c2lz6t61WqxYYgmKcAUum&tag=bitcoin&rating=G";

    // fetch random gif from url
    fetch(url)
      .then(resp=>{
        return resp.json()})
      .then(obj=>{
        console.log(obj.data.image_url);
    // Add gif to image tag
        imgGif.src = obj.data.image_url;
        btn.style.display = 'block';
        spinner.style.display = 'none';
      });




});
});
