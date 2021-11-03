import Tabla from "../Tabla"
import { useEffect,useState } from "react";
const ContMisPagos = () => {
  const [nomRows, setNomRows] = useState();
  useEffect(() => {
    setNomRows(["Id Pedido","Monto a Pagar","Fecha de Pago" ,"Estado", "Acción"])
  },[])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Pagos</h1>
      <Tabla nomRows={nomRows}/>
    </div>
  );
};

export default ContMisPagos;