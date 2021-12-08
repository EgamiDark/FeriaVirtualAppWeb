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

export const getPedidos = async () => {
  let res = await fetch(API +"/api/pedido/obtener/todos", {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const getOferPByPedido = async (idPedido) => {
  let res = await fetch(API +"/api/pedido/obtener/ofertP/" + idPedido, {
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

export const getOfertasProd = async (idUsuario) => {
  let res = await fetch(API +"/api/pedido/ofertas/" + idUsuario, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const getOfertaProd = async (id) => {
  let res = await fetch(API +"/api/pedido/oferta/" + id, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const getPedidoById = async (id) => {
  let res = await fetch(API +"/api/pedido/obtener/" + id, {
    method: 'GET'
  })
    .then(r => r.json())
    .then(data => data)
    .catch(err => err);
  return await res;
};

export const postIngresarPedido = async (bd)=>{
  let res = await fetch(API + "/api/pedido/insertar", {
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
}

export const postOfertar = async (bd) => {
  let res = await fetch(API + "/api/pedido/insertarOferta", {
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
  let res = await fetch(API + "/api/pedido/modificarOferta", {
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

export const postModificarPedido = async (bd) => {
  let res = await fetch(API + "/api/pedido/modificar", {
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
  let res = await fetch(API + "/api/pedido/cancelarOferta/"+id, {
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

export const postCancelarPedido = async (idPedido) => {
  let res = await fetch(API + "/api/pedido/cancelarPedido/"+idPedido, {
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

export const postTerminarPedido = async (idPedido) => {
  let res = await fetch(API + "/api/pedido/terminarPedido/"+idPedido, {
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

