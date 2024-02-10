import axios from 'axios';

//const baseUrl = 'http://localhost:7000';
const baseUrl = 'https://tweeter-production-ae19.up.railway.app';
const token = JSON.parse(localStorage.getItem('token'));
const get = (url) => {
  return axios.get(`${baseUrl}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

const postWithImage = (url, data) => {
  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
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

const authRegister = (url, data) => {
  return axios.post(`${baseUrl}${url}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
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
  return axios.put(`${baseUrl}${url}`, data, {
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const patch = (url, data) => {
  const token = localStorage.getItem('token');
  return axios.patch(`${baseUrl}${url}`, data, {
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export default {
  get,
  post,
  getById,
  put,
  patch,
  authpost,
  postWithImage,
  authRegister,
};
