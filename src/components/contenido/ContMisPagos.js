import * as React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../auth/useAuth";

// Material UI
import IconButton from "@mui/material/IconButton";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

import Tabla from "../Tabla";

import { getEstPago } from "../../Api/datosFk";
import { getMispagos } from "../../Api/pagos";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    borderRadius: 2
  };

  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = [
    "Id Pedido",
    "Monto a Pagar",
    "Fecha de Pago",
    "Estado",
    "Pagar",
  ];

  const [estadosPago, setEstadosPagos] = useState([]);
  const [rows, setRows] = useState([]);
  const [misPagos, setMisPagos] = useState([]);
  const [reset, setReset] = useState(0);

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < misPagos.rows?.length; i++) {
      let f = [];

      f.push(misPagos?.rows[i][0]);
      f.push(misPagos?.rows[i][1]);
      let fechaPago = moment(misPagos?.rows[i][2]).format(
        "DD/MM/YYYY hh:mm:ss"
      );
      f.push(fechaPago);

      for (let e = 0; e < estadosPago.rows?.length; e++) {
        if (misPagos?.rows[i][3] == estadosPago?.rows[e][0]) {
          f.push(estadosPago?.rows[e][1]);
          break;
        }
      }

      f.push(
        <div>
          <IconButton sx={{ color: "blue" }} onClick={handleOpen}>
            <MonetizationOnIcon />
          </IconButton>
        </div>
      );

      r.push(f);
    }

    setRows(r);
  };

  useEffect(async () => {
    setEstadosPagos(await getEstPago());
    setMisPagos(await getMispagos(idUsuario));
    setReset(1);
  }, []);

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
          <form>
            <div style={{ textAlign: "center" }}>
              <h1>Realizar Pago</h1>

              <TextField
                name="vencimiento"
                className={classes.inputs}
                label="Vencimiento"
                variant="outlined"
              ></TextField>
              <TextField
                name="numeroTarjeta"
                className={classes.inputs}
                label="Numero Tarjeta"
                variant="outlined"
              ></TextField>
              <TextField
                name="codigoTarjeta"
                className={classes.inputs}
                label="Codigo Tarjeta"
                variant="outlined"
              ></TextField>
              <TextField
                name="montoPago"
                className={classes.inputs}
                label="Monto a Pagar"
                variant="outlined"
                value={1}
                disabled
              ></TextField>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
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
