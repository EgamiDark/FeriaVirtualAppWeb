import Tabla from "../Tabla"
import { useState,useEffect } from "react";
import {getOfertasProd, getPedidos} from "../../Api/pedido"
import useAuth from '../../auth/useAuth';
import { getEstOfertaProd, getProductos } from "../../Api/datosFk";

import moment from "moment";

const ContMisProductos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];
  let nomRows = ["Id Pedido","Producto","Precio Unidad","KG X Unidad","Cantidad Ofertada","Fecha Cosecha","Fecha Caducidad","Estado", "Acción"];
  const [rows,setRows] = useState([])
  const [misProductos,setMisProductos] = useState([]);
  const [producto,setProducto] = useState([]);
  const [pedido,setPedido] = useState([]);
  const [estOfer,setEstOfer] = useState([]);
  const [reset,setReset] = useState(0)

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
      r.push(f)
    }
    setRows(r)
  }

  useEffect(async () => {
    setMisProductos(await getOfertasProd(idUsuario))
    setProducto(await getProductos())
    setPedido(await getPedidos())
    setEstOfer(await getEstOfertaProd())
    setReset(1)
  },[])
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