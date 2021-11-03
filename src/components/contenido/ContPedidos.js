import Tabla from "../Tabla"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

const ContPedidos = () => {
  const history = useHistory();
  const [nomRows, setNomRows] = useState();
  useEffect(() => {
    setNomRows(["Id Pedido","Producto","Fecha Solicitud", "Fecha Termino","Cantidad Solicitada","Kg X unidad","Precio Max Unidad", "Acción"])
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Pedidos</h1>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};

export default ContPedidos;

