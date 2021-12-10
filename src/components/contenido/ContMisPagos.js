import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Material UI
import Tooltip from '@mui/material/Tooltip';
import IconButton from "@mui/material/IconButton";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

// Sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import useAuth from "../../auth/useAuth";
import Tabla from "../Tabla";

import { getEstPago } from "../../Api/datosFk";
import { getMispagos, cambiaEstadoPago } from "../../Api/pagos";

import moment from "moment";

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

const ContMisPagos = () => {
  const MySwal = withReactContent(Swal);

  const { handleSubmit } = useForm();

  const [open, setOpen] = useState(false);
  const [montoTotal, setMontoTotal] = useState(0);
  const [idPago, setIdPago] = useState(0);
  const [estadosPago, setEstadosPagos] = useState([]);
  const [rows, setRows] = useState([]);
  const [misPagos, setMisPagos] = useState([]);
  const [reset, setReset] = useState(0);
  const [reload, setReload] = useState(0);

  const handleOpen = (pedido) => {
    setOpen(true);
    setMontoTotal(pedido[3]);
    setIdPago(pedido[0]);
  };

  const cambiarEstado = async () => {
    try {
      console.log("Id del pago: " + idPago);
      const res = await cambiaEstadoPago(JSON.stringify({ idPago }));
      if (res.success) {
        setOpen(false);
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Guardado Correctamente!</i>,
          icon: "success",
        });
        setReset(0);
        setReload(1);
      } else {
        setOpen(false);
        await MySwal.fire({
          title: <strong>Que Mal!</strong>,
          html: <i>Los datos ingresados son incorrectos!</i>,
          icon: "error",
        });
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "1px solid gray",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = [
  "Id Pago",
  "Id Pedido",
  "Fecha de Pago",
  "Cantidad Productos",
  "Monto Productos",
  "Monto Transporte",
  "Monto Total",
  "Estado",
  "Acción",
  ];

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < misPagos.rows?.length; i++) {
      let f = [];

      // Id
      f.push(misPagos?.rows[i][0]);
      f.push(misPagos?.rows[i][6]);
      let fechaPago = moment(misPagos?.rows[i][4]).format(
        "DD/MM/YYYY hh:mm:ss"
      );
      f.push(fechaPago);
      f.push(misPagos?.rows[i][9]);
      f.push("$"+misPagos?.rows[i][1]);
      f.push("$"+misPagos?.rows[i][2]);
      f.push("$"+misPagos?.rows[i][3]);
      for (let e = 0; e < estadosPago.rows?.length; e++) {
        if (misPagos?.rows[i][5] == estadosPago?.rows[e][0]) {
          f.push(estadosPago?.rows[e][1]);
          break;
        }
      }if (misPagos?.rows[i][1]==0 || misPagos?.rows[i][2]==0) {
        f.push(
          <div>
            <Tooltip title="Aun no puede pagar">
              <IconButton sx={{ color: "fff", opacity:"60%" }} >
                <MonetizationOnIcon />
              </IconButton>
            </Tooltip>
          </div>
        );
        
      }
      else {
        if(misPagos?.rows[i][5]==1){
          f.push(
            <div>
              <Tooltip title="Pagar">
                <IconButton sx={{ color: "blue" }} onClick={()=>{handleOpen(misPagos?.rows[i])}}>
                  <MonetizationOnIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        }
        else{
          f.push(
            <div>
              <Tooltip title="Pedido Pagado">
                <IconButton sx={{ color: "fff", opacity:"60%" }} >
                  <MonetizationOnIcon />
                </IconButton>
              </Tooltip>
            </div>
          );
        }
        
      }

      r.push(f);
    }

    setRows(r);
  };

  useEffect(async () => {
    setEstadosPagos(await getEstPago());
    setMisPagos(await getMispagos(idUsuario));
    setReload(0);
    setReset(1);
  }, [reload]);

  useEffect(() => {
    iteRows();
  }, [reset]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Pagos</h1>
      <Tabla nomRows={nomRows} rows={rows} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <form onSubmit={handleSubmit(cambiarEstado)}>
            <div style={{ textAlign: "center" }}>
              <h1>Realizar Pago</h1>

              <TextField
                name="vencimiento"
                className={classes.inputs}
                label="Vencimiento"
                variant="outlined"
                type="date"
                defaultValue="2021-01-01"
                required
              ></TextField>

              <TextField
                name="numeroTarjeta"
                className={classes.inputs}
                label="Numero Tarjeta"
                variant="outlined"
                required
              ></TextField>

              <TextField
                name="codigoTarjeta"
                className={classes.inputs}
                label="Codigo Tarjeta"
                variant="outlined"
                required
              ></TextField>

              <TextField
                name="montoPago"
                className={classes.inputs}
                label="Monto a Pagar"
                variant="outlined"
                value={montoTotal}
                disabled
              ></TextField>

              <Button type="submit" variant="contained" color="primary">
                Pagar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ContMisPagos;
