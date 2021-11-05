import React, { useEffect, useState } from "react";
import Tabla from "../Tabla"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import useAuth from '../../auth/useAuth';

import { getTransportesUsuario } from "../../Api/transporte";
import { getTipoRefrig, getTipoTrans } from "../../Api/datosFk";

const ContMisVehiculos = () => {
  const history = useHistory();
  const [nomRows, setNomRows] = useState([]);
  const [rows, setRows] = useState([]);
  let auth = useAuth();
  let idUsuario = auth?.user[0];
  const [misVehiculos, setMisVehiculos] = useState([]);
  const [tipoRefrig, setTipoRefrig] = useState([]);
  const [tipoTrans, setTipoTrans] = useState([]);
  const [reset,setReset] = useState([]);

  const iteRows = async () => {

    let r = []

    for (let i = 0; i < misVehiculos.rows?.length; i++) {
      let f = []
      f.push(misVehiculos?.rows[i][0])
      f.push(misVehiculos?.rows[i][1])
      f.push(misVehiculos?.rows[i][2])
      if (misVehiculos?.rows[i][3] == 0) {
        f.push("Desactivado")
      }
      if (misVehiculos?.rows[i][3] == 1) {
        f.push("Activado")
      }
      for (let tr = 0; tr < tipoRefrig.rows?.length; tr++) {
        if (misVehiculos?.rows[i][4] == tipoRefrig.rows[tr][0]) {
          f.push(tipoRefrig.rows[tr][1])
          break;
        }
      }
      
      for (let tt = 0; tt < tipoTrans.rows?.length; tt++) {
        if (misVehiculos?.rows[i][5] == tipoTrans.rows[tt][0]) {
          f.push(tipoTrans.rows[tt][1])
          break;
        }
      }
      r.push(f)
    }
    setRows(r)
    
  }

  useEffect(async () => {
    setMisVehiculos(await getTransportesUsuario(idUsuario));
    setTipoRefrig(await getTipoRefrig());
    setTipoTrans(await getTipoTrans());
    setReset(1)
  }, [])

  useEffect(()=>{
    setNomRows(["Patente", "Tamaño", "Capacidad Carga", "Activo", "Refrigeracion", "Tipo", "Acción"])
    iteRows();
    console.log(rows)
  },[reset])

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Vehiculos</h1>
      <div style={{ textAlign: "right", padding: 5 }}>
        <IconButton sx={{ color: "white", backgroundColor: "green" }} aria-label="add" onClick={() => history.push("/añadirVehiculo")}>
          <AddIcon />
        </IconButton>
      </div>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContMisVehiculos;