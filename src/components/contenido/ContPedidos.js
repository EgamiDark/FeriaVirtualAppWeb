import Tabla from "../Tabla";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getPedidosD,getOferPByPedido } from "../../Api/pedido";
import { getEstPedido, getProductos } from "../../Api/datosFk";
import Tooltip from '@mui/material/Tooltip';
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
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

const ContPedidos = () => {
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
    textAlign:"center",
  };
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
  
  let nomRowsOfertasP = [
    "Id",
    "Precio Unidad",
    "Cantidad Solicitada",
    "Fecha Cosecha",
    "Fecha Caducidad",
  ];
  const [rows, setRows] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [productos, setProductos] = useState([]);
  const [reset, setReset] = useState(0);
  const [reload, setReload] = useState(0);
  const [estPedido, setEstPedido] = useState([]);

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < pedido.rows?.length; i++) {
      let f = [];
      f.push(pedido?.rows[i][0]); //ID
      let prod = "";
      for (let pr = 0; pr < productos.rows?.length; pr++) {
        if (productos?.rows[pr][0] == pedido?.rows[i][8]) {
          f.push(productos?.rows[pr][1]);
          prod = productos?.rows[pr][1];
          break;
        }
      }

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
      f.push(<div>
        <Tooltip title="Ofertar">
        <IconButton sx={{ color: "green" }} aria-label="add" onClick={() => history.push({ pathname: "/ofertarProducto", state: { idPedido: pedido?.rows[i][0], kgUnidad: pedido?.rows[i][4], producto:prod } })}>
          <ArrowUpwardIcon />
        </IconButton>
        </Tooltip>
        <Tooltip title="Ofertas">
                <IconButton
                  sx={{ color: "blue" }}
                  onClick={() => { ofertas(pedido?.rows[i][0]) }}>
                  <FormatListBulletedIcon />
                </IconButton>
              </Tooltip>
        </div>)
        
      r.push(f);
    }
    setRows(r);
  };

  useEffect(async () => {
    setProductos(await getProductos());
    setPedido(await getPedidosD());
    setEstPedido(await getEstPedido());
    setReload(0);
    setReset(1);
  }, []);

  useEffect(() => {
    iteRows();
  }, [reset]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pedidos</h1>
      <Tabla nomRows={nomRows} rows={rows} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <h1>Ofertas</h1>
          {tabla}
        </Box>
      </Modal>
    </div>
  );
};

export default ContPedidos;
