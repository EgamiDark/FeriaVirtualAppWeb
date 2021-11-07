let API = "http://localhost:5000";

export const getPedidosD = async () => {
  let res = await fetch(API +"/api/pedido/obtener/disponibles", {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const getPedidosUsuario = async (idUsuario) => {
  let res = await fetch(API +"/api/pedido/obtener/todos/usuario/" + idUsuario, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};