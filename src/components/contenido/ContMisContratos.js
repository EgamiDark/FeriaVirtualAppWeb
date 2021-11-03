import Tabla from "../Tabla"
import { useState,useEffect } from "react";
const ContMisContratos = () => {
  const [nomRows, setNomRows] = useState();
  useEffect(() => {
    setNomRows(["Id Contrato","Fecha Creación","Fecha Termino", "Acción"])
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Contratos</h1>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};

export default ContMisContratos;