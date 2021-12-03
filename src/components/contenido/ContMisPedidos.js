import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Tabla from "../Tabla";
import useAuth from "../../auth/useAuth";
import moment from "moment";

import {
  getPedidosUsuario,
  postCancelarPedido,
  getOferPByPedido,
} from "../../Api/pedido";
import { getEstPedido, getProductos } from "../../Api/datosFk";

const useStyles = makeStyles(() => ({
  inputs: {
    textAlign: "center !important",
    width: "100% !important",
    margin: "10px 0px 10px 0px !important",
  },
  selects: {
    width: "60% !important",
    margin: "10px 0px 10px 0px !important",
  },
}));

const ContMisPedidos = () => {
  const [open, setOpen] = useState(false);
  const [tabla, setTabla] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tablaOfertas = (row) => {
    return (
      <div>
        <Tabla nomRows={nomRowsOfertasP} rows={row} />
      </div>
    )
  }
  const ofertas = async (idPedido) => {
    let ofer = await getOferPByPedido(idPedido);
    let r = [];

    for (let i = 0; i < ofer.rows?.length; i++) {
      let f = [];

      f.push(ofer?.rows[i][0]);
      f.push(ofer?.rows[i][1]);
      f.push(ofer?.rows[i][2]);
      f.push(ofer?.rows[i][3]);
      f.push(moment(ofer?.rows[i][4]).format("DD/MM/YYYY"));

      r.push(f);
    }
    setTabla(tablaOfertas(r));
    handleOpen();

  };

  const classes = useStyles();

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "white",
    border: "1px solid gray",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const MySwal = withReactContent(Swal);
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  const history = useHistory();
  const [productos, setProductos] = useState([]);
  const [estadosPedido, setEstadosPedido] = useState([]);
  let nomRows = ["Id Pedido",
    "Producto",
    "Fecha Solicitud",
    "Fecha Termino",
    "Cantidad Solicitada",
    "Kg X unidad",
    "Precio Max Unidad",
    "Estado",
    "Acción",
  ];

  let nomRowsOfertasP = [
    "Id",
    "Precio Unidad",
    "Cantidad Solicitada",
    "Fecha Cosecha",
    "Fecha Caducidad",
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
      f.push(misPedidos?.rows[i][0]);
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
      f.push("$" + misPedidos?.rows[i][5]);

      for (let e = 0; e < estadosPedido.rows?.length; e++) {
        if (misPedidos?.rows[i][6] == estadosPedido?.rows[e][0]) {
          f.push(estadosPedido?.rows[e][1]);
          break;
        }
      }

      let ofer = await getOferPByPedido(misPedidos?.rows[i][0]);
      let cantOfer = ofer.rows?.length;
      switch (misPedidos?.rows[i][6]) {
        case 1:
          f.push(
            <div>
              {cantOfer ?
                <Tooltip title="No modificable">
                  <IconButton
                    sx={{ color: "fff", opacity: "60%" }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                : <Tooltip title="Modificar">
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
              </Tooltip>}
              <Tooltip title="Ofertas">
              <IconButton
                sx={{ color: "blue" }}
                onClick={() => { ofertas(misPedidos?.rows[i][0]) }}>
                <FormatListBulletedIcon />
              </IconButton>
              </Tooltip>
              <Tooltip title="Cancelar">
              <IconButton
                sx={{ color: "red" }}
                aria-label="act/desac"
                onClick={() => {
                  cancelarPedido(misPedidos?.rows[i][0]);
                }}
              >
                <CancelIcon />
              </IconButton>
              </Tooltip>
            </div>
          );
          break;
        case 2:
        case 3:
        case 4:
        case 5:
          f.push(
            <div>
              <Tooltip title="No modificable">
                <IconButton
                  sx={{ color: "fff", opacity: "60%" }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Ofertas">
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => { ofertas(misPedidos?.rows[i][0]) }}>
                  <FormatListBulletedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="No cancelable">
                <IconButton
                  sx={{ color: "fff", opacity: "60%" }}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
          break;
        default:
          f.push(
            <p style={{ color: "red", fontWeight: "bold" }}>ERROR</p>
          );
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          {tabla}
        </Box>
      </Modal>
    </div>
  );
};

export default ContMisPedidos;
