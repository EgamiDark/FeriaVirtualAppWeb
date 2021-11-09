import Tabla from "../Tabla"
import { useState,useEffect } from "react";

import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';

import { getContratos } from "../../Api/contrato";
import useAuth from "../../auth/useAuth";

import moment from "moment";

const ContMisContratos = () => {

  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = ["Fecha Creación","Fecha Termino", "Acción"];
  const [rows, setRows] = useState([]);
  const [misContratos, setMisContratos] = useState([]);
  const [reset, setReset] = useState([]);

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < misContratos.rows?.length; i++) {
      let f = []

      let fechaCreacion = moment(misContratos?.rows[i][1]).format("DD/MM/YYYY hh:mm:ss");
      f.push(fechaCreacion)

      let fechaTermino = moment(misContratos?.rows[i][2]).format("DD/MM/YYYY hh:mm:ss");
      f.push(fechaTermino)

      // Este seria el PDF
      //f.push(misContratos?.rows[i][3])
      f.push(<div>
        <IconButton sx={{ color: "green"}} aria-label="add">
          <DownloadIcon />
        </IconButton></div>)

      r.push(f);      
    }

    setRows(r);
  }

  useEffect(async () => {
    setMisContratos(await getContratos(idUsuario));
    setReset(1);
  },[])

  useEffect(() => {
    iteRows();
  },[reset])
  
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Contratos</h1>
      <Tabla nomRows={nomRows} rows={rows}/>
    </div>
  );
};

export default ContMisContratos;