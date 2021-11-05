import Tabla from "../Tabla"
import {useState,useEffect} from 'react'
import {getSubastasD} from '../../Api/subasta'

const ContSubastas = () => {
  const [nomRows, setNomRows] = useState([]);
  const [rows,setRows] = useState([]);

  const [subasta, setSubasta] = useState([]);
  const [reset,setReset] = useState(0);

  const iteRows = async () => {

    let r = []

    for (let i = 0; i < subasta.rows?.length; i++) {
      let f = []
      f.push(subasta?.rows[i][0])
      f.push(subasta?.rows[i][1])
      f.push(subasta?.rows[i][2])

      r.push(f)
    }
    setRows(r)
    
  }

  useEffect(async () => {
    setSubasta(await getSubastasD())
    setReset(1)
  },[])

  useEffect(()=>{
    setNomRows(["Id Subasta","Fecha Subasta", "Fecha Termino","Producto","Peso Total","Refrigerante","Tipo Transporte","Dirección","Estado", "Acción"])
    iteRows();
  },[reset])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Subastas</h1>
      <Tabla nomRows={nomRows} rows={rows}/>
    </div>
  );
};
export default ContSubastas;
