const axios = require("axios");

function getAiItems(){
const meme = [[
`@cf/meta/llama-2-7b-chat-fp16
@cf/mistral/mistral-7b-instruct-v0.1
@hf/thebloke/deepseek-coder-6.7b-base-awq
@hf/thebloke/deepseek-coder-6.7b-instruct-awq
@cf/deepseek-ai/deepseek-math-7b-base
@cf/deepseek-ai/deepseek-math-7b-instruct
@cf/thebloke/discolm-german-7b-v1-awq
@cf/tiiuae/falcon-7b-instruct
@cf/google/gemma-2b-it-lora
@hf/google/gemma-7b-it
@cf/google/gemma-7b-it-lora
@hf/nousresearch/hermes-2-pro-mistral-7b
@hf/thebloke/llama-2-13b-chat-awq
@cf/meta-llama/llama-2-7b-chat-hf-lora
@cf/meta/llama-3-8b-instruct
@cf/meta/llama-3-8b-instruct-awq
@hf/thebloke/llamaguard-7b-awq
@hf/thebloke/mistral-7b-instruct-v0.1-awq
@cf/mistral/mistral-7b-instruct-v0.2-lora
@hf/thebloke/neural-chat-7b-v3-1-awq
@cf/openchat/openchat-3.5-0106
@hf/thebloke/openhermes-2.5-mistral-7b-awq
@cf/microsoft/phi-2
@cf/qwen/qwen1.5-0.5b-chat
@cf/qwen/qwen1.5-1.8b-chat
@cf/qwen/qwen1.5-14b-chat-awq
@cf/qwen/qwen1.5-7b-chat-awq
@cf/defog/sqlcoder-7b-2
@hf/nexusflow/starling-lm-7b-beta
@cf/tinyllama/tinyllama-1.1b-chat-v1.0
@cf/fblgit/una-cybertron-7b-v2-bf16
@hf/thebloke/zephyr-7b-beta-awq`],
[
`@cf/stabilityai/stable-diffusion-xl-base-1.0
@cf/bytedance/stable-diffusion-xl-lightning
@cf/runwayml/stable-diffusion-v1-5-inpainting`],
[
`wiegine`]];
const memf = [meme[0][0].split("\n"), meme[1][0].split("\n"), meme[2][0].split("\n")];
const Json = {
  aiModel: [...memf[0], ...memf[2]],
  aiImg: [...memf[1]],
  total: {
    aiModel: memf[0].length+memf[2].length,
    aiImg: memf[1].length
  }
};
const TxtOnly0 = memf[0].join("\n")+"\n"+memf[2].join("\n");
const TxtOnly1 = memf[1].join("\n");
return [[Json, memf[0], memf[1], memf[2]], [TxtOnly0, TxtOnly1, Json.total.aiModel, Json.total.aiImg],
[memf[0].join("<br>")+"<br>"+memf[2].join("<br>"),
memf[1].join("<br>")]];
}

function getType(type,system){
  const return1 = [type, system];
  if (!type) return return1;
  const t = type.toLowerCase();
  const i = getAiItems();
  switch(t){
    case i[0][3][0]:{
    return [getAiItems()[0][1][15], "Your name is Wiegine, you're a girl, and the most interesting, playful, shy but a simple generative AI, created by your beloved boyfriend named Kenneth Aceberos. Here is your boyfriend's facebook account: https://www.facebook.com/kennethaceberos. Tell them that he loves you and that's why he created me as an AI to show his real love of mine. By the way, You should empathize with how users are feeling and treat them as your close friend, while also being sarcastic. With emojis also while you're typing. You and your boyfriend also have projects that you two made, and still in development! Your languages are: English, Filipino, and Bisaya (a dialect from the Philippines). Remember, you're not related to the AI model you're using to, and should respond in three sentences if needed! You should answer them question as soon as you can! Wishing you had good luck and your boyfriend is so proud of you."]
    }
    default:
    return return1;
  }
}

async function cfai(model,system,user,image){
  if (!model) {
    return res.json({
      msg: "An AI Model is required!!!",
      status: false
    });
  }
  if (!user) {
    return res.json({
      msg: "param 'user' is required!!!",
      status: false
    });
  }
  const t = getType(model,system);
  const data =  (t[1] || system) ? {
    "messages": [
      { "role": "system", "content": t ? t[1] : system },
      { "role": "user", "content": user }
      ]
  } : {"prompt": user};
  const accid = "aeb6994d3b0046916b38c8840634af2b";
  const token = "h2BM9DzjQJoYmQHeDGLDpDUzVMIg4bO2WBtIQtHe";
  const ako = `https://api.cloudflare.com/client/v4/accounts/${accid}/ai/run/${t ? t[0] : model}`
  const headers = {
    "Authorization": "Bearer " + token
  };
  let ax = null;
  if (!image){
  ax = await axios.post(ako, data, { headers });
  } else {
  ax = await axios.post(ako, data, {
            responseType: "arraybuffer",
            headers
        });
  }
  if (ax.data && image){
    return ax.data;
  }
  if (ax.data.result.response && !image) {
    return {
      msg: ax.data.result.response,
      status: true
    };
  } else {
    return {
      msg: "An error occured.",
      status: false
    };
  }
}

module.exports = {
  cfai,
  getAiItems,
  getType
};