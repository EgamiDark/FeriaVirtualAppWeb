let API = 'http://localhost:5000';

export const SingIn = async (bd) => {
  let res = await fetch(API + '/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: bd,
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return res;
};

export const getRol = async (bd) => {
  let res = await fetch(API + '/api/auth/rol', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: bd,
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return res;
};