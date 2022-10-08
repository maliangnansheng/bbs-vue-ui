import axios from 'axios';

// 请求后台设置的统一配置
export const getConfig = () => axios.get('/config');
