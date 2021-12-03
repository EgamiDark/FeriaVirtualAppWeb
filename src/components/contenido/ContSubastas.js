import Tabla from "../Tabla"
import { useState, useEffect } from 'react'
import { getSubastasD } from '../../Api/subasta'
import { getPedidos } from "../../Api/pedido";
import { getEstSubasta, getProductos, getTipoRefrig, getTipoTrans } from "../../Api/datosFk";
import { getUsuarios } from "../../Api/auth";
import { getVentasLocales } from "../../Api/ventaLocal";
import { getOfertasProductos } from "../../Api/ventaLocal";
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useHistory } from "react-router-dom";
import moment from "moment";


const ContSubastas = () => {
  const history = useHistory();
  let nomRows = ["Id Subasta", "Fecha Subasta", "Fecha Termino", "Producto", "Peso Total", "Cantidad", "Refrigerante", "Tipo Transporte", "Dirección", "Tipo Venta", "Estado", "Acción"];
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

  const iteRows = async () => {

    let r = []

    for (let i = 0; i < subasta.rows?.length; i++) {
      let f = []
      f.push(subasta?.rows[i][0])
      f.push(moment(subasta?.rows[i][1]).format("DD/MM/YYYY"))
      f.push(moment(subasta?.rows[i][2]).format("DD/MM/YYYY"))
      //Externa
      if (subasta?.rows[i][8] == 1) {
        
        for (let p = 0; p < pedido.rows?.length; p++) {
          if (pedido?.rows[p][0] == subasta?.rows[i][3]) {
            for (let pr = 0; pr < producto.rows?.length; pr++) {
              if (pedido?.rows[p][8] == producto?.rows[pr][0]) {
                f.push(producto?.rows[pr][1])
                break;
              }
            }
            f.push(pedido?.rows[p][3] * pedido?.rows[p][4])
            f.push(pedido?.rows[p][3])
            for (let rf = 0; rf < refrig?.rows?.length; rf++) {
              if (refrig?.rows[rf][0] == subasta?.rows[i][5]) {
                f.push(refrig?.rows[rf][1])
                break;
              }
            }
            for (let tr = 0; tr < trans.rows?.length; tr++) {
              if (trans?.rows[tr][0] == subasta?.rows[i][6]) {
                f.push(trans?.rows[tr][1])
                break;
              }
            }
            for (let u = 0; u < usuarios.rows?.length; u++) {
              if (usuarios?.rows[u][0] == pedido?.rows[p][7]) {
                f.push(usuarios?.rows[u][7])
                break
              }
            }
            f.push("Venta Externa")
            for (let es = 0; es < estSubasta.rows?.length; es++) {
              if (estSubasta?.rows[es][0] == subasta?.rows[i][7]) {
                f.push(estSubasta?.rows[es][1])
                break;
              }
            }
            f.push(<div>
              <IconButton sx={{ color: "green" }} aria-label="add" onClick={() => history.push({ pathname: "/ofertarSubasta", state: { idSubasta: subasta?.rows[i][0] } })}>
                <ArrowUpwardIcon />
              </IconButton></div>)
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
                        f.push(producto?.rows[pr][1])
                        break;
                      }
                    }
                    f.push(ofertas?.rows[o][2] * ofertas?.rows[o][3])
                    f.push(ofertas?.rows[o][3])
                    for (let rf = 0; rf < refrig?.rows?.length; rf++) {
                      if (refrig?.rows[rf][0] == subasta?.rows[i][5]) {
                        f.push(refrig?.rows[rf][1])
                        break;
                      }
                    }
                    for (let tr = 0; tr < trans.rows?.length; tr++) {
                      if (trans?.rows[tr][0] == subasta?.rows[i][6]) {
                        f.push(trans?.rows[tr][1])
                        break;
                      }
                    }
                    for (let u = 0; u < usuarios.rows?.length; u++) {
                      if (usuarios?.rows[u][0] == ventaL?.rows[v][3]) {
                        f.push(usuarios?.rows[u][7])
                        break
                      }
                    }
                    f.push("Venta Local")
                    for (let es = 0; es < estSubasta.rows?.length; es++) {
                      if (estSubasta?.rows[es][0] == subasta?.rows[i][7]) {
                        f.push(estSubasta?.rows[es][1])
                        break;
                      }
                    }
                    f.push(<div>
                      <IconButton sx={{ color: "green" }} aria-label="add" onClick={() => history.push({ pathname: "/ofertarSubasta", state: { idSubasta: subasta?.rows[i][0] } })}>
                        <ArrowUpwardIcon />
                      </IconButton></div>)
                    break;
                  }
                }
              }
            }

          }
        }
      }
      r.push(f)
    }
    setRows(r)

  }

  useEffect(async () => {
    setSubasta(await getSubastasD())
    setPedido(await getPedidos())
    setVentaL(await getVentasLocales())
    setOfertas(await getOfertasProductos())
    setProducto(await getProductos())
    setRefrig(await getTipoRefrig())
    setTrans(await getTipoTrans())
    setUsuarios(await getUsuarios())
    setEstSubasta(await getEstSubasta())
    setReset(1)
  }, [])

  useEffect(() => {
    iteRows();
  }, [reset])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Subastas</h1>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};
export default ContSubastas;
