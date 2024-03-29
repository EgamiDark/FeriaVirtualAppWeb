let API = "http://localhost:5000";

export const getTipoRefrig = async () => {
  let res = await fetch(API + "/api/datosFk/tRefrigeracion", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const getTipoTrans = async () => {
  let res = await fetch(API + "/api/datosFk/tTransporte", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const getEstPedido = async () => {
  let res = await fetch(API + "/api/datosFk/estPedido", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const getEstSubasta = async () => {
  let res = await fetch(API + "/api/datosFk/estSubasta", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const getEstOfertaSub = async () => {
  let res = await fetch(API + "/api/datosFk/estOfertaSub", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};
export const getEstOfertaProd = async () => {
  let res = await fetch(API + "/api/datosFk/estOfertaProd", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const getEstPago = async () => {
  let res = await fetch(API + "/api/datosFk/estPago", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const getProductos = async () => {
  let res = await fetch(API + "/api/producto/obtener/todos", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};
