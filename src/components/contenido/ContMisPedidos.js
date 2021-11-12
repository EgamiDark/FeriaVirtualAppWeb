import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import { makeStyles } from "@mui/styles";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Tabla from "../Tabla";
import useAuth from "../../auth/useAuth";
import moment from "moment";

import { getPedidosUsuario, postCancelarPedido } from "../../Api/pedido";
import { getEstPedido, getProductos } from "../../Api/datosFk";

const ContMisPedidos = () => {
  const MySwal = withReactContent(Swal);
  let auth = useAuth();
  let idUsuario = auth?.user[0];
  let idRol = auth?.user[9];

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
  const [reset, setReset] = useState(0);
  const [reload, setReload] = useState(0);

  const cancelarPedido = async (idPedido) => {
    await MySwal.fire({
      title: "¿Esta seguro que deseas cancelar el pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar pedido!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await postCancelarPedido(JSON.stringify(idPedido));

          if (res.success) {
            await MySwal.fire(
              "Cancelado!",
              "El pedido ha sido cancelado correctamente!",
              "success"
            );
            setReset(0);
            setReload(1);
          } else {
            await MySwal.fire({
              title: <strong>Que Mal!</strong>,
              html: <i>Ha ocurrido un error intentelo nuevamente!</i>,
              icon: "error",
            });
          }
        } catch (error) {
          await MySwal.fire({
            title: <strong>Que Mal!</strong>,
            html: (
              <i>
                La base de datos se encuentra en mantenimiento, intente mas
                tarde!
              </i>
            ),
            icon: "warning",
          });
        }
      }
    });
  };

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

      switch (misPedidos?.rows[i][6]) {
        case 1:
          f.push(
            <div>
              <IconButton
                sx={{ color: "green" }}
                aria-label="update"
                onClick={() =>
                  history.push({
                    pathname: "/modificarPedido",
                    state: { idPedido: misPedidos?.rows[i][0] },
                  })
                }
              >
                <EditIcon />
              </IconButton>

              <IconButton
                sx={{ color: "red" }}
                aria-label="act/desac"
                onClick={() => {
                  cancelarPedido(misPedidos?.rows[i][0]);
                }}
              >
                <CancelIcon />
              </IconButton>
            </div>
          );
          break;
        case 2:
          <p style={{ color: "green", fontWeight: "bold" }}>
            PROCESO FINALIZADO
          </p>;
          break;
        case 3:
          f.push(
            <p style={{ color: "red", fontWeight: "bold" }}>NO PERMITIDO</p>
          );
          break;
        default:
          break;
      }

      r.push(f);
    }

    setRows(r);
  };

  useEffect(async () => {
    setProductos(await getProductos());
    setEstadosPedido(await getEstPedido());
    setMisPedidos(await getPedidosUsuario(idUsuario));
    setReload(0);
    setReset(1);
  }, [reload]);

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
