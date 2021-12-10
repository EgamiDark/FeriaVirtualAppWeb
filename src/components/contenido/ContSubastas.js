import Tabla from "../Tabla";
import { useState, useEffect } from "react";
import { getSubastasD, getOfertasByIdSubasta } from "../../Api/subasta";
import { getPedidos } from "../../Api/pedido";
import {
  getEstSubasta,
  getProductos,
  getTipoRefrig,
  getTipoTrans,
} from "../../Api/datosFk";
import { getUsuarios } from "../../Api/auth";
import { getVentasLocales } from "../../Api/ventaLocal";
import { getOfertasProductos } from "../../Api/ventaLocal";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useHistory } from "react-router-dom";
import moment from "moment";
import Tooltip from "@mui/material/Tooltip";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ContSubastas = () => {
  const history = useHistory();
  let nomRows = [
    "Id Subasta",
    "Fecha Subasta",
    "Fecha Termino",
    "Producto",
    "Peso Total",
    "Cantidad",
    "Refrigerante",
    "Tipo Transporte",
    "Dirección",
    "Tipo Venta",
    "Estado",
    "Acción",
  ];
  const [rows, setRows] = useState([]);

  const [subasta, setSubasta] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [ventaL, setVentaL] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [producto, setProducto] = useState([]);
  const [refrig, setRefrig] = useState([]);
  const [trans, setTrans] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [estSubasta, setEstSubasta] = useState([]);
  const [reset, setReset] = useState(0);

  const [open, setOpen] = useState(false);
  const [tabla, setTabla] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let nomRowsOfertasP = ["Id", "Precio Oferta", "Fecha Entrega", "Patente"];

  const tablaOfertas = (row) => {
    return (
      <div>
        <Tabla nomRows={nomRowsOfertasP} rows={row} />
      </div>
    );
  };
  const ofertasT = async (id) => {
    let ofer = await getOfertasByIdSubasta(id);
    console.log(ofer);
    let r = [];

    for (let i = 0; i < ofer.rows?.length; i++) {
      if (ofer?.rows[i][4] == 1) {
        let f = [];

        f.push(ofer?.rows[i][0]);
        f.push("$" + ofer?.rows[i][1]);
        f.push(moment(ofer?.rows[i][2]).format("DD/MM/YYYY"));
        f.push(ofer?.rows[i][5]);

        r.push(f);
      }
    }
    setTabla(tablaOfertas(r));
    handleOpen();
  };

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
    textAlign: "center",
  };

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < subasta.rows?.length; i++) {
      let f = [];
      f.push(subasta?.rows[i][0]);
      f.push(moment(subasta?.rows[i][1]).format("DD/MM/YYYY"));
      f.push(moment(subasta?.rows[i][2]).format("DD/MM/YYYY"));
      //Externa
      if (subasta?.rows[i][8] == 1) {
        for (let p = 0; p < pedido.rows?.length; p++) {
          if (pedido?.rows[p][0] == subasta?.rows[i][3]) {
            for (let pr = 0; pr < producto.rows?.length; pr++) {
              if (pedido?.rows[p][8] == producto?.rows[pr][0]) {
                f.push(producto?.rows[pr][1]);
                break;
              }
            }
            f.push(pedido?.rows[p][3] * pedido?.rows[p][4]);
            f.push(pedido?.rows[p][3]);
            for (let rf = 0; rf < refrig?.rows?.length; rf++) {
              if (refrig?.rows[rf][0] == subasta?.rows[i][5]) {
                f.push(refrig?.rows[rf][1]);
                break;
              }
            }
            for (let tr = 0; tr < trans.rows?.length; tr++) {
              if (trans?.rows[tr][0] == subasta?.rows[i][6]) {
                f.push(trans?.rows[tr][1]);
                break;
              }
            }
            for (let u = 0; u < usuarios.rows?.length; u++) {
              if (usuarios?.rows[u][0] == pedido?.rows[p][7]) {
                f.push(usuarios?.rows[u][7]);
                break;
              }
            }
            f.push("Venta Externa");
            for (let es = 0; es < estSubasta.rows?.length; es++) {
              if (estSubasta?.rows[es][0] == subasta?.rows[i][7]) {
                f.push(estSubasta?.rows[es][1]);
                break;
              }
            }
            f.push(
              <div>
                <Tooltip title="Ofertar">
                  <IconButton
                    sx={{ color: "green" }}
                    aria-label="add"
                    onClick={() =>
                      history.push({
                        pathname: "/ofertarSubasta",
                        state: { idSubasta: subasta?.rows[i][0] },
                      })
                    }
                  >
                    <ArrowUpwardIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Ofertas">
                  <IconButton
                    sx={{ color: "blue" }}
                    onClick={() => {
                      ofertasT(subasta?.rows[i][0]);
                    }}
                  >
                    <FormatListBulletedIcon />
                  </IconButton>
                </Tooltip>
              </div>
            );
            break;
          }
        }
      }
      //Local
      if (subasta?.rows[i][8] == 2) {
        for (let v = 0; v < ventaL.rows?.length; v++) {
          if (ventaL?.rows[v][0] == subasta?.rows[i][4]) {
            for (let o = 0; o < ofertas.rows?.length; o++) {
              if (ofertas?.rows[o][0] == ventaL?.rows[v][2]) {
                for (let p = 0; p < pedido.rows?.length; p++) {
                  if (pedido?.rows[p][0] == ofertas?.rows[o][6]) {
                    for (let pr = 0; pr < producto.rows?.length; pr++) {
                      if (pedido?.rows[p][8] == producto?.rows[pr][0]) {
                        f.push(producto?.rows[pr][1]);
                        break;
                      }
                    }
                    f.push(ofertas?.rows[o][2] * ofertas?.rows[o][3]);
                    f.push(ofertas?.rows[o][3]);
                    for (let rf = 0; rf < refrig?.rows?.length; rf++) {
                      if (refrig?.rows[rf][0] == subasta?.rows[i][5]) {
                        f.push(refrig?.rows[rf][1]);
                        break;
                      }
                    }
                    for (let tr = 0; tr < trans.rows?.length; tr++) {
                      if (trans?.rows[tr][0] == subasta?.rows[i][6]) {
                        f.push(trans?.rows[tr][1]);
                        break;
                      }
                    }
                    for (let u = 0; u < usuarios.rows?.length; u++) {
                      if (usuarios?.rows[u][0] == ventaL?.rows[v][3]) {
                        f.push(usuarios?.rows[u][7]);
                        break;
                      }
                    }
                    f.push("Venta Local");
                    for (let es = 0; es < estSubasta.rows?.length; es++) {
                      if (estSubasta?.rows[es][0] == subasta?.rows[i][7]) {
                        f.push(estSubasta?.rows[es][1]);
                        break;
                      }
                    }
                    f.push(
                      <div>
                        <Tooltip title="Ofertar">
                          <IconButton
                            sx={{ color: "green" }}
                            aria-label="add"
                            onClick={() =>
                              history.push({
                                pathname: "/ofertarSubasta",
                                state: { idSubasta: subasta?.rows[i][0] },
                              })
                            }
                          >
                            <ArrowUpwardIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Ofertas">
                          <IconButton
                            sx={{ color: "blue" }}
                            onClick={() => {
                              ofertasT(subasta?.rows[i][0]);
                            }}
                          >
                            <FormatListBulletedIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    );
                    break;
                  }
                }
              }
            }
          }
        }
      }
      r.push(f);
    }
    setRows(r);
  };

  useEffect(async () => {
    setSubasta(await getSubastasD());
    setPedido(await getPedidos());
    setVentaL(await getVentasLocales());
    setOfertas(await getOfertasProductos());
    setProducto(await getProductos());
    setRefrig(await getTipoRefrig());
    setTrans(await getTipoTrans());
    setUsuarios(await getUsuarios());
    setEstSubasta(await getEstSubasta());
    setReset(1);
  }, []);

  useEffect(() => {
    iteRows();
  }, [reset]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Subastas</h1>
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
export default ContSubastas;
