import axios from 'axios';
axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//axios拦截响应
// axios.interceptors.response.use()
export default axios;
