import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request... 
// we could also add interceptors to our own instance, you can simply use instance.interceptors.request...
// just like you did it for the default instance, the default axios object.

export default instance;