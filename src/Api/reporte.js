let API = "http://localhost:5000";
export const postIngresarReporte = async (bd)=>{
    let res = await fetch(API + "/api/reporte/reporte", {
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

  export const getReportes = async () => {
    let res = await fetch(API +"/api/reporte/reportes", {
      method: 'GET'
    })
      .then(r => r.json())
      .then(data => data)
      .catch(err => err);
    return await res;
  };