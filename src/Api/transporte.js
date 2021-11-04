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

export const GetTransportesUsuario = async (idUsuario) => {
    console.log(idUsuario)
  let res = await fetch(API + "/api/transporte/obtener/todos/usuario/" + idUsuario, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
    
  return res;
};
