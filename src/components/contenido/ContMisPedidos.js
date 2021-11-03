import Tabla from "../Tabla"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

const ContMisPedidos = () => {
  const history = useHistory();
  const [nomRows, setNomRows] = useState();
  useEffect(() => {
    setNomRows(["Id Pedido","Producto","Fecha Solicitud", "Fecha Termino","Cantidad Solicitada","Kg X unidad","Precio Max Unidad","Estado", "Acción"])
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Pedidos</h1>
      <div style={{ textAlign: "right", padding:5 }}>
      <IconButton sx={{ color: "white",backgroundColor:"green"}} aria-label="add" onClick={()=>history.push("/añadirPedido")}>
        <AddIcon />
      </IconButton>
      </div>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};

export default ContMisPedidos;
