import axios from 'axios';

const EcommerceApi = axios.create({
  baseURL: 'https://backendecommerecci.onrender.com/',
  headers: {
    'Content-type': 'application/json',
  },
});


export default EcommerceApi;
