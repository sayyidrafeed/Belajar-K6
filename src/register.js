import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
  summaryTrendStats: ['avg', 'min', 'max', 'p(95)', 'p(99)'],
};

export default function() {
  const uniqueId = new Date().getTime();
  const body = {
    username: `user-${uniqueId}`,
    password: 'rahasia',
    name: 'Rafee'
  };

  http.post('http://localhost:3000/api/users', JSON.stringify(body), {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  })

  const loginBody = {
    username: `user-${uniqueId}`,
    password: 'rahasia'
  }


  const res = http.post('http://localhost:3000/api/users/login', JSON.stringify(loginBody), {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  })

  const responseBody = res.json();

  const currentResponse = http.get(`http://localhost:3000/api/users/current`, {
    headers: {
      'Authorization': `Bearer ${responseBody.data.token}`
    }
  });
}

