import Tabla from "../Tabla"
import {useState,useEffect} from 'react'
const ContMisOfertas = () => {
  const [nomRows, setNomRows] = useState();
  useEffect(() => {
    setNomRows(["Id Subasta", "Fecha Entrega","Precio Oferta","Cantidad Transporte","Transporte","Estado", "Acción"])
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Ofertas</h1>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};
export default ContMisOfertas;
