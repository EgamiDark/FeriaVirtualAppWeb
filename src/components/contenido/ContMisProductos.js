import Tabla from "../Tabla"
import { useState,useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {getOfertasProd, getPedidos,postCancelarOferta} from "../../Api/pedido"
import useAuth from '../../auth/useAuth';
import { getEstOfertaProd, getProductos } from "../../Api/datosFk";
import { useHistory } from "react-router-dom";

import moment from "moment";

const ContMisProductos = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  let auth = useAuth();
  let idUsuario = auth?.user[0];
  let nomRows = ["Id Pedido","Producto","Precio Unidad","KG X Unidad","Cantidad Ofertada","Fecha Cosecha","Fecha Caducidad","Estado", "Acción"];
  const [rows,setRows] = useState([])
  const [misProductos,setMisProductos] = useState([]);
  const [producto,setProducto] = useState([]);
  const [pedido,setPedido] = useState([]);
  const [estOfer,setEstOfer] = useState([]);
  const [reload,setReload] = useState(0)
  const [reset,setReset] = useState(0)

  const cancelarOferta = async (id) => {
    await MySwal.fire({
      title: "¿Esta seguro de cancelar esta oferta?",
      text: "Si quieres volver a ofertar deberas ir al apartado de subastas!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar oferta!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await postCancelarOferta(id);
          if (res.success) {
            await MySwal.fire(
              "Cancelada!",
              "Esta oferta ha sido cancelada.",
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

  const iteRows = ()=>{
    let r= [];
    for (let i = 0; i < misProductos.rows?.length; i++) {
      let f = []
      f.push(misProductos?.rows[i][6])
      for (let p = 0; p < pedido.rows?.length; p++) {
        if(pedido?.rows[p][0]==misProductos?.rows[i][6]){
          for (let pr = 0; pr < producto.rows?.length; pr++) {
            if(pedido?.rows[p][8]==producto?.rows[pr][0]){
              f.push(producto?.rows[pr][1])
              break;
            }
          }
          break;
        }
      }
      f.push(misProductos?.rows[i][1])
      f.push(misProductos?.rows[i][2])
      f.push(misProductos?.rows[i][3])
      f.push(moment(misProductos?.rows[i][4]).format("DD/MM/YYYY"))
      f.push(moment(misProductos?.rows[i][5]).format("DD/MM/YYYY"))
      for (let e = 0; e < estOfer.rows?.length; e++) {
        if(estOfer?.rows[e][0]==misProductos?.rows[i][7]){
          f.push(estOfer?.rows[e][1])
          break;
        }
      }
      f.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            sx={{ color: "blue" }}
            aria-label="update"
            onClick={() =>
              history.push({
                pathname: "/modificarOfertaP",
                state: { idOferta: misProductos?.rows[i][0] },
              })
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: "red" }}
            aria-label="delete"
            onClick={() => {
              cancelarOferta(misProductos?.rows[i][0]);
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
      );
      r.push(f)
    }
    setRows(r)
  }

  useEffect(async () => {
    setMisProductos(await getOfertasProd(idUsuario))
    setProducto(await getProductos())
    setPedido(await getPedidos())
    setEstOfer(await getEstOfertaProd())
    setReload(0)
    setReset(1)
  },[reload])
  useEffect(()=>{
    iteRows()
  },[reset])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Ofertas(Productos)</h1>
      <Tabla nomRows={nomRows} rows={rows}/>
    </div>
  );
};

export default ContMisProductos;