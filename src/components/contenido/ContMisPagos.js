import Tabla from "../Tabla"
import { useEffect,useState } from "react";
import useAuth from "../../auth/useAuth";

import { getEstPago } from "../../Api/datosFk";
import { getMispagos } from "../../Api/pagos";

import moment from "moment";

const ContMisPagos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = ["Id Pedido","Monto a Pagar","Fecha de Pago" ,"Estado"];

  const [estadosPago, setEstadosPagos] = useState([]);
  const [rows, setRows] = useState([]);
  const [misPagos, setMisPagos] = useState([]);
  const [reset, setReset] = useState(0);

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < misPagos.rows?.length; i++) {
      let f = []

      f.push(misPagos?.rows[i][0]);
      f.push(misPagos?.rows[i][1]);
      let fechaPago = moment(misPagos?.rows[i][2]).format("DD/MM/YYYY hh:mm:ss");
      f.push(fechaPago)

      for (let e = 0; e < estadosPago.rows?.length; e++) {
        if (misPagos?.rows[i][3] == estadosPago?.rows[e][0]) {
          f.push(estadosPago?.rows[e][1]);
          break;
        }
      }

      r.push(f);      
    }

    setRows(r);
  }

  useEffect(async () => {
    setEstadosPagos(await getEstPago());
    setMisPagos(await getMispagos(idUsuario));
    setReset(1)
  }, [])

  useEffect(() => {
    iteRows();
  }, [reset])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Pagos</h1>
      <Tabla nomRows={nomRows} rows={rows}/>
    </div>
  );
};

export default ContMisPagos;