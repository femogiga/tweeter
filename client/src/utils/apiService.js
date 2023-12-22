import axios from 'axios';

//const baseUrl = 'http://localhost:9000';
const baseUrl = 'https://chatgroup.vercel.app';

const get = (url) => {
  const token = localStorage.getItem('token');
  return axios.get(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const post = (url, data) => {
  const token = localStorage.getItem('token');
  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const getById = (url, id) => {
  const token = localStorage.getItem('token');
  return axios.get(`${baseUrl}${url}${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const put = (url, data) => {
  const token = localStorage.getItem('token');
  return axios.patch(`${baseUrl}${url}`, data, {
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default { get, post, getById, put };
