import axios from 'axios';

const baseUrl = 'http://localhost:7000';
 const token = JSON.parse(localStorage.getItem('token'));
const get = (url) => {

  return axios.get(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

const post = (url, data) => {
  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const authpost = (url, data) => {

  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const getById = (url, id) => {
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

export default { get, post, getById, put, authpost };
