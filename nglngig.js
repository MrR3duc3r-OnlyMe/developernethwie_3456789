const axios = require("axios");
function randomize(neth) {
  let _=Math.random()*12042023;
  return neth.replace(/[xy]/g,c=>{
    let __=Math.random()*16; 
    __=(__+_)%16|0;_=Math.floor(_/16);
    return[(c==='x'?__:(__&0x3|0x8)).toString(16)].map((_)=>Math.random()<.6?_:_.toUpperCase()).join('');
  });
}
async function spam(username, amount, message){
const headers = {
      'referer': `https://ngl.link/${username}`,
      'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    };

    const data = {
      'username': username,
      'question': message,
      'deviceId': randomize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx').toLowerCase(),
      'gameSlug': '',
      'referrer': '',
    };

    let count = 0;
  
    const interval = setInterval(async () => {
      if (count >= amount) {
        clearInterval(interval);
        return;
      }
      
      try {
        await axios.post('https://ngl.link/api/submit', data, {
          headers,
        });
       //console.log(`Sent`);
       } catch (e) {
        //console.log('Test');
      }
      count++;
    }, 3*1000); 
}

module.exports = {
  spam
};
