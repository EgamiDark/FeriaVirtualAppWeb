import Tabla from "../Tabla";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { getPedidosUsuario } from "../../Api/pedido";
import { getEstPedido, getProductos } from "../../Api/datosFk";
import useAuth from "../../auth/useAuth";
import moment from "moment";

const ContMisPedidos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  const history = useHistory();
  const [productos, setProductos] = useState([]);
  const [estadosPedido, setEstadosPedido] = useState([]);
  let nomRows = [
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
  const [misPedidos, setMisPedidos] = useState([]);
  const [reset, setReset] = useState([]);

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < misPedidos.rows?.length; i++) {
      let f = [];

      for (let p = 0; p < productos.rows?.length; p++) {
        if (misPedidos?.rows[i][8] == productos?.rows[p][0]) {
          f.push(productos?.rows[p][1]);
          break;
        }
      }

      let fechaSolicitud = moment(misPedidos?.rows[i][1]).format("DD/MM/YYYY");
      f.push(fechaSolicitud);

      let fechaTermino = moment(misPedidos?.rows[i][2]).format("DD/MM/YYYY");
      f.push(fechaTermino);
      f.push(misPedidos?.rows[i][3]);
      f.push(misPedidos?.rows[i][4]);
      f.push(misPedidos?.rows[i][5]);

      for (let e = 0; e < estadosPedido.rows?.length; e++) {
        if (misPedidos?.rows[i][6] == estadosPedido?.rows[e][0]) {
          f.push(estadosPedido?.rows[e][1]);
          break;
        }
      }

      f.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton sx={{ color: "green" }} aria-label="add">
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: "red" }} aria-label="add">
            <CancelIcon />
          </IconButton>
        </div>
      );

      r.push(f);
    }

    setRows(r);
  };

  useEffect(async () => {
    setProductos(await getProductos());
    setEstadosPedido(await getEstPedido());
    setMisPedidos(await getPedidosUsuario(idUsuario));
    setReset(1);
  }, []);

  useEffect(() => {
    iteRows();
  }, [reset]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Pedidos</h1>
      <div style={{ textAlign: "right", padding: 5 }}>
        <IconButton
          sx={{ color: "white", backgroundColor: "green" }}
          aria-label="add"
          onClick={() => history.push("/añadirPedido")}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContMisPedidos;
