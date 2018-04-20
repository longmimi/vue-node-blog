import axios from 'axios';
axios.default.timeout = 5000

//axios拦截响应
// axios.interceptors.response.use()
export default axios;
