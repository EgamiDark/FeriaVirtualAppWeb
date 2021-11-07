let API = "http://localhost:5000";

export const getUsuarios = async () => {
  let res = await fetch(API +"/api/auth/usuarios", {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};