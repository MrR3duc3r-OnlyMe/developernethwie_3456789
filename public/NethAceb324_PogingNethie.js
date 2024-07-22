let __________$__________ = (2+2+2+2+2+2+2-2+2-2+2-2+2-2/2*2);
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
footertxt.innerHTML = "© 2024 NethProjects — by Kenneth Aceberos";
rainbow(document.getElementById("test1"), "API List Available");
let file = "NethBgmusic";
let getm = localStorage.getItem(file);
let s = false;
function switchie1(b) {
  let pogika = document.getElementById("pogika");
  playMusic("W"+"i"+"e"+"g"+"i"+"n"+"e"+((1+1+1+1+1+1+1+1+1+1+1+1)-1-1-1-1-1-1-1-1-1-1-1-1+(__________$__________)+987654321).toString()+".mp3", b, true);
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
const ife = endpoint.startsWith("This uses POST method.<br>");
const container = document.createElement('div');
container.classList.add('bgn-isa');
const label = document.createElement('label');
label.classList.add('neth12');
label.innerHTML = `<font color=white><b>${title}</b></font>`;
container.appendChild(label);
container.onclick = () => {
  setTimeout(() => {
  Swal.fire({
    title: title,
    html: `<p>${msg}</p><br><code><pre>${endpoint}</pre></code>`,
    icon: "",
    showDenyButton: true,
    showConfirmButton: !ife,
    confirmButtonColor: "#00cc00",
    denyButtonColor: "#d33",
    confirmButtonText: "Try It!",
    denyButtonText: "Close",
    background: "#141A25 url(dg.svg)"
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = endpoint;
    }
  });
  },(1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1));
};
bgn.appendChild(container);

}
//setTimeout(() => showResult("Please contact the developer if you had problem:<br><a style=\"color:#0061ff; text-decoration: underline;\" href=\"https://www.facebook.com/kennethaceberos\" target=\"blank\"><b>👉 Ken Neth</b></a>", "", "info"), 500);

async function tryandtry(){
  add(
    "Workers AI",
    `Powered by Cloudflare Workers AI.<br>
    <br>— The param 'model' is a worker AI model. (check on "Fetch all AI models")
    <br>— The param 'system' is your desired prompt (optional).
    <br>— The param 'user' is your desired question or query.`,
    "/ai?model=@cf/meta/llama-3-8b-instruct&system=You are a friendly chatbot.&user=Hello, what model are you?"
  );
  add(
    "Workers AI (Image-Sdxl)",
    `Powered by Cloudflare Workers AI.<br>
    <br>— The param 'model' is a Worker AI model. (check on "Fetch all AI models")
    <br>— The param 'prompt' is your desired prompt.`,
    "/cfimg?model=@cf/stabilityai/stable-diffusion-xl-base-1.0&user=couple"
  );
  add(
    "WiegineAI",
    `Talk to Wiegine (Neth's gf)— but an AI.`,
    "/ai?model=wiegine&user=hello"
  );
  add(
    "NethAI",
    `Talk to Neth— but an AI.`,
    "/ai?model=neth&user=hello"
  );
  add(
    "Fetch all AI Models(Plain Text)",
    `Fetch all Workers AI models.`,
    "/ai?list=plain"
  );
  add(
    "Fetch all AI Models(Json)",
    `Fetch all Workers AI models.`,
    "/ai?list=all"
  );
  add(
    "Spam share",
    `Boost shares on your facebook post using our API.
    <br>Uses access token(EAA***)`,
    "/share?token=&url=&amount=&interval="
  );
  add(
    "Access token Getter",
    `Retrieve your Facebook login credentials' token.
    <br>Available types: <b>EAAD6V7, EAAAAU, EAAAAAY</b>`,
    "/token?type=EAAD6V7&u=example@login.com&p=Example123"
  );
  add(
    "Cookie/Appstate Getter",
    `Retrieve your Facebook login credentials' cookie.<br><i>Not all accounts are working. Use <b>a dummy</b> instead.</i>`,
    "/getcapp?u=example@login.com&p=Example123"
  );
  add(
    "Appstate to Cookie&Token",
    `Convert your appstate to cookie and token(EAAGN).<br>
    EAAGN token worked on spamshare btw.`,
    `This uses POST method.<br>await axios.post("apilink/appstate2token", {<br>appstate: "<b>APPSTATE HERE(Make sure it's Json Stringify)</b>"<br>});`
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
    "Random girl Picture(Image)",
    `Generates a random girl picture.`,
    "/randomgirl"
  );
  add(
    "Random girl Picture(Json)",
    `Generates a random girl picture.`,
    "/randomgirl?get=json"
  );
  add(
    "Random anh 18+(Image)",
    `Generates a random anh 18+ picture.`,
    "/random18"
  );
  add(
    "Random anh 18+(Json)",
    `Generates a random anh 18+ picture.`,
    "/random18?get=json"
  );
  add(
    "Boost Follow via token",
    `Boost your followers via donated tokens.
    <br>(<b>MORE DONATED TOKENS = MORE FOLLOWERS</b>)`,
    "/follow?uid="
  );
  add(
    "Donate tokens",
    `Donate your access token and adds to the database. (Used for boost follow and other tools(maybe))`,
    "/donate?token="
  );
  add(
    "Comment on Post",
    `Boost your comments,<br>
    Using your access token with page (or one profile),<br>
    <i>⚠️Warning: it may cause an account limitations if u abusing or spamming it</i>`,
    "/comment?token=&link=&msg=Test comment"
  );
  /*add(
    "Auto Create Page",
    `Create pages,<br>
    Using your appstate<br>
    <b>(EXPERIMENTAL, SOME MIGHT NOT WORK)</b><br>
    <i>⚠Warning: make sure the delay is more about 1-30 minutes to prevent account issue.</i>`,
    `This uses POST method.<br>await axios.post("apilink/createpage", {<br>appstate: "<b>APPSTATE HERE(Make sure it's Json Stringify)</b>",<br>name: "<b>Page name here</b>",<br>amount: 10,//any amount will do<br>delay: 1<br>});`
  );
  add(
    "Created Page History",
    `To check if your page is created. (via Auto Create Page)`,
    "/createdpage"
  );*/
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
  add(
    "Fbcover V1",
    `Generate a cool fb cover for you.<br>— On param 'color' can also work with custom color.<br>color=-0061ff<br><i>(Replace '#' with '-').</i>`,
    "/fbcover?name=Mark&subname=Zuckerberg&color=-0061ff&address=USA&email=zuck@gmail.com&sdt=09121234567&uid=4"
  );
  add(
    "Get Picture From FB User",
    `If the person / user in Facebook is locked or guard on, you can use this to get picture from a locked user. Requires User ID.<br><i>⚠️👀sa isa dyan: alam ko binabalak mo!!!</i>`,
    "/getfbpic?uid=4"
  );
  add(
    "Fb Auto Create",
    `NOT YET TESTED. THIS IS EXPERIMENTAL FEATURE`,
    "/fbacc"
  );
  add(
    "Ngl Spam",
    `Spam a message to provided ngl.link (Don't use this for illegal use / abuse)`,
    "/nglspam?username=&amount=&message="
  );
  add(
    "Bible Verse",
    `Generates a bible verse.`,
    "/bible"
  );
  add(
    "Auto Likers(Flikers)",
    `30-40 reacts every cookie. Cooldown is 30 minutes every cookie.
    <br>The param 'type' is to choose a reaction you want. <b>LIKE,LOVE,CARE,HAHA,<br>WOW,SAD,ANGRY</b>`,
    "/flikers?link=&type=&cookie="
  );
  add(
    "Yt Search",
    `Scraped Yt search. Can get many results`,
    "/ytsearch?name=pantropiko"
  );
  setInterval(async() => {
  const res = await fetch("/cpuptime");
  const {
  cpu,memory
  } = await res.json();
  const cores = cpu.length;
  const processor = cpu[0].model;
  document.getElementById('checkm').innerHTML = 
  `Powered by ${cores}-core ${processor}<br>Memory: ${memory}<br>Status: <font color=green>Server is Good</font>`;
  }, 1*1000);
}
tryandtry();