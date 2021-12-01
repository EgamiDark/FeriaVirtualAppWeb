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

export const cambiaEstadoPago = async (idPago)=>{
  let res = await fetch(API + "/api/pagos/cambiaEstPago", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: idPago,
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return res;
}