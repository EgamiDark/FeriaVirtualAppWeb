let API = "http://localhost:5000";

export const getSubastasD = async () => {
  let res = await fetch(API +"/api/subasta/subastasD", {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};


export const postOfertar = async (bd) => {
  console.log(bd)
  let res = await fetch(API + "/api/subasta/insertarOferta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bd,
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return res;
};