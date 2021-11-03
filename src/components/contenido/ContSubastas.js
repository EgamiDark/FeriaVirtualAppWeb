import Tabla from "../Tabla"
import {useState,useEffect} from 'react'
const ContSubastas = () => {
  const [nomRows, setNomRows] = useState();
  useEffect(() => {
    setNomRows(["Id Subasta","Fecha Subasta", "Fecha Termino","Producto","Peso Total","Refrigerante","Tipo Transporte","Dirección","Estado", "Acción"])
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Subastas</h1>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};
export default ContSubastas;
