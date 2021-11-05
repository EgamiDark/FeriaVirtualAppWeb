let API = "http://localhost:5000";

export const CrearTransporte = async (bd) => {
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