const axios = require("axios");
const cheerio = require("cheerio");
async function get_cookie(user,pass) {
const aray1 = (obj) => {
	let result = {};
	for (let key of Object.keys(obj)) {
		if (obj[key] !== null && obj[key] !== undefined) result[key] = obj[key];
  }
	return result;
}
const wiegine1 = `https://mbasic.facebook.com`;
const ok = await axios.get(`${wiegine1}/login`);
const $ = cheerio.load(ok.data);
const lsd = $('input[name="lsd"]').attr('value');
const jazoest = $('input[name="jazoest"]').attr('value');
const m_ts = $('input[name="m_ts"]').attr('value');
const li = $('input[name="li"]').attr('value');
const bi_xrwh = $('input[name="bi_xrwh"]').attr('value');
let co_ok = ok.headers["set-cookie"].map(neth=>`${neth.split(";")[1-1]};`);
if(!co_ok){return({error:"Something went wrong"})}
var neth1 = await axios.post(`${wiegine1}/login/device-based/regular/login/?refsrc=deprecated&lwv=100&ref=dbl`, new URLSearchParams(aray1({
    lsd,
    jazoest,
    m_ts,
    li,
    try_number: 0,
    email: user,
    pass: pass,
    unrecognized_tries: 0,
    login: "Log in",
    bi_xrwh,
  }, false)), {
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
  headers: {
    "user-agent": "Mozilla/5.0 (Mobile; rv:48.0; A405DL) Gecko/48.0 Firefox/48.0 KAIOS/2.5",
    "cookie": co_ok
  }});
let co_ok1 = neth1.headers["set-cookie"].map(neth=>`${neth.split(";")[1-1]};`);
if(!co_ok1){return({error:"Something went wrong"})}
const salp = co_ok.shift()+co_ok1.join("")+"locale=en_US;ps_l=1;ps_n=1;m_pixel_ratio=1;dpr=1.5;wd=360x520;";
const salp_ = salp.split(";").map(baby => ({
        key: baby.split("=")[0],
        value: baby.split("=")[1],
        domain: ".facebook.com",
        path: "/",
        hostOnly: false,
        creation: new Date().toISOString(),
        lastAccessed: new Date().toISOString()
      })).slice(0,-1);
const salp__ = JSON.stringify(salp_, null, 4);
if (salp_.find(salp0=>salp0.key==="c_user")){
  return ({
  cookie: salp,
  appstate: salp__,
  });
} else {
  return ({
   error: "Incorrect username/password! Please check your login credentials and try again."
  });
}
}
module.exports = {
  get_cookie
};