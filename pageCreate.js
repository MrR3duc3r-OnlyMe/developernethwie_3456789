const axios = require('axios');
const cheerio = require('cheerio');

let createdPages = new Map();
function checkIfCreated(){
  const data = Array.from(createdPages.values()).map((page, index) => ({
  countcreated: index + 1,
  name: page.name
}));
const jsob = JSON.parse(JSON.stringify(data || [], null, 4));
return jsob;
}
async function create(appstate,uid,name,bio,ua,amount,delay) {
    createdPages.set(uid, {
          countcreated: 0,
          name
    });
    try {
        const user_data_response = await axios.get(`${leiam.create}${uid}`, {
            headers: { 'cookie': appstate }
        });
        const user_data = user_data_response.data;

        const $ = cheerio.load(user_data);
        const fb_dtsg = $('input[name="fb_dtsg"]').attr('value');
        const jazoest = $('input[name="jazoest"]').attr('value');

        let i = 1;
        while (i <= amount) {
            const page_name = `${name} ${i}`;
            const headers = {
                'cookie': appstate,
                'referer': 'https://www.facebook.com/pages/creation/?ref_type=launch_point',
                'sec-ch-prefers-color-scheme': 'light',
                'sec-ch-ua': '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
                'sec-ch-ua-full-version-list': '"Not_A Brand";v="99.0.0.0", "Google Chrome";v="109.0.5414.120", "Chromium";v="109.0.5414.120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-ch-ua-platform-version': '"0.1.0"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': ua,
                'x-asbd-id': '198387',
                'x-fb-friendly-name': 'AdditionalProfilePlusEditMutation',
                'x-fb-lsd': 'VvOG1zo3ie0zBti8fQ6zUf'
            };

            const data = {
                'fb_dtsg': fb_dtsg,
                'jazoest': jazoest,
                'fb_api_caller_class': 'RelayModern',
                'fb_api_req_friendly_name': 'AdditionalProfilePlusCreationMutation',
                'variables': `{"input":{"bio":"${bio}","categories":["1062586164506537"],"creation_source":"comet","name":"${page_name}","page_referrer":"launch_point","actor_id":"${uid}","client_mutation_id":"2"}}`,
                'server_timestamps': 'true',
                'doc_id': '5296879960418435'
            };

            const response = await axios.post('https://www.facebook.com/api/graphql/', data, { headers });
            if (response.data.data && response.data.data.additional_profile_plus_create) {
                createdPages.set(uid, {
                  ...createdPages.get(uid),
                  countcreated: createdPages.get(uid).countcreated + 1,
                });
                i++;
            }
            if (i === amount+1) {
              createdPages.delete(uid);
            }
            await new Promise(resolve => setTimeout(resolve, delay*60*1000));
        }

        return;
    } catch (error) {
        //throw new Error('Unable to create page. Please check for Facebook limitations or blocking. Retry later');
        createdPages.delete(uid);
        console.error(error);
        return;
    }
}

module.exports = {
  create,
  checkIfCreated
};