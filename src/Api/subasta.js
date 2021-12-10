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

export const getOfertas = async (id) => {
  let res = await fetch(API +"/api/subasta/ofertas/"+id, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const getOfertasByIdSubasta = async (id) => {
  let res = await fetch(API +"/api/subasta/ofertas/subasta/"+id, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const getOferta = async (id) => {
  console.log("Id oferta: "+id)
  let res = await fetch(API +"/api/subasta/oferta/"+id, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const postOfertar = async (bd) => {
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

export const postModificarOferta = async (bd) => {
  let res = await fetch(API + "/api/subasta/modificarOferta", {
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

export const postCancelarOferta = async (id) => {
  let res = await fetch(API + "/api/subasta/cancelarOferta/"+id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return res;
};