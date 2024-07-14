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
  let math = Math.floor(Math.random() * 999999999999999);
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
  rainbow(pogika, (b ? "🎧" : "👋") + " Neth");
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
  )
}
tryandtry();