const axios = require('axios').default;

axios.defaults.baseURL = 'https://api.perxtech.io';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.AUTH_TOKEN}`;

const api = {
    perx: {
        getAllRewards(){
            return axios
            .get('/v4/rewards')
            .then(
                function(res){
                    return res.data;
                }
            );
        }
    },
};

module.exports = api;
