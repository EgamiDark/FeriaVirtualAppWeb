import Tabla from "../Tabla"
import { useState,useEffect } from "react";
const ContMisProductos = () => {
  const [nomRows, setNomRows] = useState();
  useEffect(() => {
    setNomRows(["Id Pedido","Producto","Precio Unidad","Cantidad Ofertada","Fecha Cosecha","Fecha Caducidad","Estado", "Acción"])
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Productos</h1>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};

export default ContMisProductos;