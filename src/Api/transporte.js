let API = "http://localhost:5000";

export const crearTransporte = async (bd) => {
  let res = await fetch(API + "/api/transporte/insertar", {
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

export const getTransportesUsuario = async (idUsuario) => {
  let res = await fetch(API +"/api/transporte/obtener/todos/usuario/" + idUsuario, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const getTransportesPatente = async (patente) => {
  let res = await fetch(API +"/api/transporte/obtener/transporte/" + patente, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const postModificarVehiculo = async (bd) => {
  console.log(bd)
  let res = await fetch(API + "/api/transporte/modificar", {
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

export const actividadVehiculo = async (bd) => {
  let res = await fetch(API + "/api/transporte/modificar/actividad", {
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