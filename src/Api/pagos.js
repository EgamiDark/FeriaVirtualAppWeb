let API = "http://localhost:5000";

export const getMispagos = async (idUsuario) => {
  let res = await fetch(API +"/api/pagos/obtener/pago/pedido/" + idUsuario, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};
