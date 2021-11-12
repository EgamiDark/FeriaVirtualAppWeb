let API = "http://localhost:5000";

export const getOfertasVentalocal = async () => {
  let res = await fetch(API + "/api/ventaLocal/ofertasVL", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const comprarVL = async (data) => {
  let res = await fetch(API + "/api/ventaLocal/guardar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => err);
  return await res;
};

export const cambiaEstOfertaVL = async (data) => {
    console.log(data)
    let res = await fetch(API + "/api/ventaLocal/ofertaVL/aceptada", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((r) => r.json())
      .catch((err) => err);
    return await res;
  };
