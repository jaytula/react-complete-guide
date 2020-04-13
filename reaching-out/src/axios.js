import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request.use(req => {
//   console.log(req);
//   return req;
// })

export default instance;