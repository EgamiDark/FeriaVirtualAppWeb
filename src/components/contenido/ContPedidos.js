import Tabla from "../Tabla";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPedidosD } from "../../Api/pedido";
import { getEstPedido } from "../../Api/datosFk";

import moment from "moment";

const ContPedidos = () => {
  const history = useHistory();
  let nomRows = [
    "Id Pedido",
    "Producto",
    "Fecha Solicitud",
    "Fecha Termino",
    "Cantidad Solicitada",
    "Kg X unidad",
    "Precio Max Unidad",
    "Estado",
    "Acción",
  ];
  const [rows, setRows] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [reset, setReset] = useState(0);
  const [estPedido, setEstPedido] = useState([]);

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < pedido.rows?.length; i++) {
      let f = [];
      f.push(pedido?.rows[i][0]); //ID
      f.push("PALTA");

      let fechaSolicitud = moment(pedido?.rows[i][1]).format("DD/MM/YYYY");
      f.push(fechaSolicitud); //FECHA SOL.

      let fechaTermino = moment(pedido?.rows[i][2]).format("DD/MM/YYYY");
      f.push(fechaTermino); //FECHA TERM.

      f.push(pedido?.rows[i][3]); //CANTIDAD
      f.push(pedido?.rows[i][4]); //KGXUNIDAD
      f.push(pedido?.rows[i][5]); //PRECIO MAX

      for (let a = 0; a < estPedido.rows?.length; a++) {
        if (pedido?.rows[i][6] == estPedido?.rows[a][0]) {
          f.push(estPedido?.rows[a][1]); //ESTADO
          break;
        }
      }
      r.push(f);
    }
    setRows(r);
  };

  useEffect(async () => {
    setPedido(await getPedidosD());
    setEstPedido(await getEstPedido());
    setReset(1);
  }, []);

  useEffect(() => {
    iteRows();
  }, [reset]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pedidos</h1>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContPedidos;
