import Tabla from "../Tabla"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

import { getPedidos } from "../../Api/pedido";
import useAuth from '../../auth/useAuth';

const ContMisPedidos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  const history = useHistory();
  const [nomRows, setNomRows] = useState();
  const [rows, setRows] = useState([]);
  const [misPedidos, setMisPedidos] = useState([]);
  const [reset, setReset] = useState([]);

  const iteRows = async () => {

    let r = []

    for (let i = 0; i < misPedidos.rows?.length; i++) {
      let f = []
      f.push(misPedidos?.rows[i][0])
      f.push(misPedidos?.rows[i][1])
      f.push(misPedidos?.rows[i][2])
      f.push(misPedidos?.rows[i][3])
      f.push(misPedidos?.rows[i][4])
      f.push(misPedidos?.rows[i][5])
      f.push(misPedidos?.rows[i][6])
      f.push(misPedidos?.rows[i][7])
      r.push(f)
    }

    setRows(r)    
  }

  useEffect(async () => {
    setMisPedidos(await getPedidos(idUsuario));
    setReset(1)
  }, [])

  useEffect(() => {
    setNomRows(["Id Pedido","Producto","Fecha Solicitud", "Fecha Termino","Cantidad Solicitada","Kg X unidad","Precio Max Unidad","Estado", "Acción"])
    iteRows();
  },[reset])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Pedidos</h1>
      <div style={{ textAlign: "right", padding:5 }}>
      <IconButton sx={{ color: "white",backgroundColor:"green"}} aria-label="add" onClick={()=>history.push("/añadirPedido")}>
        <AddIcon />
      </IconButton>
      </div>
      <Tabla nomRows={nomRows} rows={rows}/>
    </div>
  );
};

export default ContMisPedidos;
