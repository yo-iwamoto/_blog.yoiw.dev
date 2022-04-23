import Axios from 'axios';

const axios = Axios.create();

axios.interceptors.request.use((_config) => {
  // edit config here
});

export { axios };
