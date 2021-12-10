let API = "http://localhost:5000";

export const getContratos = async (idUsuario) => {
  let res = await fetch(API +"/api/contrato/obtener/contrato/" + idUsuario, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const descargarPDF = async (pdf) => {
  let res = await fetch(API +"/api/contrato/descargar/" + pdf, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};
