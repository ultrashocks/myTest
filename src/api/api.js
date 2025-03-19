import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000, // 5초 제한
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (JWT 토큰 추가)
// 추후 로그인하고 토큰 로컬스토리지에 담는 다는 가정으로 만들어 두었습니다.
apiInstance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터
apiInstance.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response || error.message);
    if (error.response && error.response.status === 401) {
      alert('로그인이 필요합니다.');
    }
    return Promise.reject(error);
  },
);

const api = {
  getData: (endpoint, params = {}) => apiInstance.get(endpoint, { params }),
  postData: (endpoint, data) => apiInstance.post(endpoint, data),
  putData: (endpoint, data) => apiInstance.put(endpoint, data),
  deleteData: endpoint => apiInstance.delete(endpoint),
};

export default api;
