import Tabla from "../Tabla"
import { useState,useEffect } from "react";
const ContMisProductos = () => {
  let nomRows = ["Id Pedido","Producto","Precio Unidad","Cantidad Ofertada","Fecha Cosecha","Fecha Caducidad","Estado", "Acción"];
  useEffect(() => {
    
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Productos</h1>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};

export default ContMisProductos;