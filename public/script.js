function showResult(title, message, icon) {
  const iconn = icon ? icon.toLowerCase() : "";
  if (iconn === "error"){
   //playShortAudio("error.mp3");
  }
  Swal.fire({
    title: title,
    html: message,
    icon: iconn,
  //  showCancelButton: true,
    confirmButtonColor: "#0061ff",
  // cancelButtonColor: "#d33",
    confirmButtonText: "Okay"
  });
}

let sound = null;
function playMusic(url, isalang, isLoop){
  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }
   sound = new Howl({
      src: [url],
      loop: isLoop,
      format: ['mp3'],
      volume: 1,
      onend: () => {}
    });
  if (isalang){
    sound.play();
  }
}

function playShortAudio(url){
  const s = new Howl({
    src: [url],
    loop: false,
    volume: 1,
    autoplay: true
  });
  s.play();
}
function rainbow(div,text){
  let math = Math.floor(Math.random() * 99999999);
  let k = 0;
  let pogi = new Array();
  let neth = new Array("#FF0000", "#FF4000", "#FF8000", "#FFC000", "#FFFF00", "#C0FF00", "#80FF00", "#40FF00", "#00FF00", "#00FF40", "#00FF80", "#00FFC0", "#00FFFF", "#00C0FF", "#0080FF", "#0040FF", "#0000FF", "#4000FF", "#8000FF", "#C000FF", "#FF00FF", "#FF00C0", "#FF0080", "#FF0040");
  const startColor = () => {
    for (var b = 0; b < pogi.length; b++) {
      document.getElementById(text+math+b).style.color = neth[b]
    }
    for (var c = 0; c < neth.length; c++) {
      neth[c - 1] = neth[c]
    }
    neth[neth.length - 1] = neth[-1];
    setTimeout(() => startColor(), 50);
  }
  while (neth.length<text.length){neth=neth.concat(neth);}
  while (k<=text.length){pogi[k]=text.charAt(k);k++;}
  for(var d=0;d<pogi.length;d++){div.innerHTML += `<span id='${text+math+d}' class='${text+math+d}'>${pogi[d]}</span>`}
  startColor();
}
const result = document.getElementById('result');
const footertxt = document.getElementById('pogiako');
footertxt.innerHTML = "© 2024 | Kenneth Aceberos";
rainbow(document.getElementById("test1"), "API List Available");
let file = "NethBgmusic";
let getm = localStorage.getItem(file);
let s = false;
function switchie1(b) {
  let pogika = document.getElementById("pogika");
  playMusic("FB_VID_8187911807065092653.mp3", b, true);
  pogika.innerHTML = "";
  rainbow(pogika, (b ? "🎧 " : "") + "NethWieAPI");
}
const pogika = document.getElementById("pogika");
pogika.addEventListener('click', () => {
    s=!s;
    let succ=s?"1":"0";
    switchie1(s);
    localStorage.setItem(file, succ);
    return;
});
s=getm==="1"?true:false;
switchie1(s);

const bgn = document.getElementById("bgn");
async function add(title, msg, endpoint){
const container = document.createElement('div');
container.classList.add('bgn');
const label = document.createElement('label');
label.classList.add('neth12');
label.innerHTML = `<font color=white><b>${title}</b></font>`;
container.appendChild(label);
container.onclick = () => {
  Swal.fire({
    title: title,
    html: `<p>${msg}</p><br><code><pre>${endpoint}</pre></code>`,
    icon: "",
    showDenyButton: true,
    confirmButtonColor: "#00cc00",
    denyButtonColor: "#d33",
    confirmButtonText: "Try It!",
    denyButtonText: "Close",
    background: "#141A25 url(dg.svg)"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "/" + endpoint;
    }
  });
};
bgn.appendChild(container);

}
//setTimeout(() => showResult("Please contact the developer if you had problem:<br><a style=\"color:#0061ff; text-decoration: underline;\" href=\"https://www.facebook.com/kennethaceberos\" target=\"blank\"><b>👉 Ken Neth</b></a>", "", "info"), 500);

async function tryandtry(){
  add(
    "Workers AI",
    `Powered by Cloudflare Workers AI.<br>
    <br>— The param 'model' is a worker AI model. (check here)
    <br>— The param 'system' is your desired prompt (optional).
    <br>— The param 'user' is your desired question or query.`,
    "ai?model=@cf/meta/llama-3-8b-instruct&system=You are a friendly chatbot.&user=Hello, what model are you?"
  );
  add(
    "Workers AI(Image)",
    `Powered by Cloudflare Workers AI.<br>
    <br>— The param 'model' is a Worker AI model.
    <br>— The param 'prompt' is your desired prompt.`,
    "cfimg?model=@cf/stabilityai/stable-diffusion-xl-base-1.0&user=couple"
  );
  add(
    "WiegineAI",
    `Talk to Wiegine (Neth's gf)— but an AI.`,
    "ai?model=wiegine&user=hello"
  );
  add(
    "Fetch all AI Models(Plain Text)",
    `Fetch all Workers AI models.`,
    "ai?list=plain"
  );
  add(
    "Fetch all AI Models(Json)",
    `Fetch all Workers AI models.`,
    "ai?list=all"
  );
  add(
    "Spam share",
    `Boost shares on your facebook post using our API.
    <br>Uses access token(EAA***)`,
    "/share?token=&url=&amount=&delay="
  );
  add(
    "Access token Getter",
    `Retrieve your Facebook login credentials' token.
    <br>EAAD6V7, EAAAAU, EAAAAAY`,
    "token?u=example@login.com&p=Example123"
  );
  add(
    "Appstate to Cookie&Token",
    `Convert your appstate to cookie and token(EAAGN).<br>
    EAAGN token worked on spamshare btw.`,
    `This uses POST method.<br>await axios.post("apilink/appstate2token", {<br>appstate: "<b>APPSTATE HERE(Make sure it's Json Stringify)"<br>});`
  );
  add(
    "Random User Agent",
    `Generates a random user agent.`,
    "/useragent"
  );
  add(
    "Random dummy Cookie",
    `Generates a random dummy Facebook cookie.`,
    "/dummycookie"
  );
  add(
    "Random girl Picture",
    `Generates a random girl picture.`,
    "/randomgirl"
  );
  add(
    "Random anh 18+",
    `Generates a random anh 18+ picture.`,
    "/random18"
  );
  add(
    "Auto Follow",
    `Boost your followers,<br>
    Using your access token with page (or one profile),<br>
    More tokens added = More followers!
    <br>Also works on multiple UIDs (seperates by ",")`,
    "/follow?token=&uid=100015801404865"
  );
  add(
    "Auto Comment",
    `Boost your comments,<br>
    Using your access token with page (or one profile),<br>
    More tokens added = More comments!
    <i>⚠️Warning: it may cause an account limitation so the delay must be 5 seconds above long.</i>`,
    "/comment?token=&link=&msg=Test comment&delay=10"
  );
  add(
    "Auto Create Page",
    `Create pages,<br>
    Using your appstate<br>
    <b>(EXPERIMENTAL, SOME MIGHT NOT WORK)</b><br>
    <i>⚠Warning: make sure the delay is more about 1-30 minutes to prevent account issue.</i>`,
    `This uses POST method.<br>await axios.post("apilink/createpage", {<br>appstate: "<b>APPSTATE HERE(Make sure it's Json Stringify)</b>",<br>name: "<b>Page name here</b>",<br>amount: 10,//any amount will do<br>delay: 1<br>});`
  );
  add(
    "Get TikTok ID",
    `Gets TikTok ID by @username.`,
    "/tikid?username=bini_maloi"
  );
  add(
    "Report TikTok User",
    `Report TikTok user / ID.<br>
    <i>if u don't have one, get a user id from the API.</i>
    <br><b>NOT YET TESTED, SO DON'T EXPECT TO BE WORKING</b>
    <br><i>Credits to shiki</i>`,
    "/tikreport?id="
  );
  setInterval(async() => {
  const res = await fetch("/cpuptime");
  const {
   memory,uptime
  } = await res.json();
  document.getElementById('checkm').innerHTML = 
  `${memory}<br>Running in ${uptime}.`;
  }, 3*1000);
}
tryandtry();