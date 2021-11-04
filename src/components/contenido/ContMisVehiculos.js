import React, { useEffect, useState } from "react";
import Tabla from "../Tabla"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";
import useAuth from '../../auth/useAuth';

import { GetTransportesUsuario } from "../../Api/transporte";

const ContMisVehiculos = () => {
  const history = useHistory();
  const [nomRows, setNomRows] = useState();
  const [rows, setRows] = useState();

  let auth = useAuth();
  const [idUsuario, setIdUsuario] = useState(0);
  const [misVehiculos, setMisVehiculos] = useState();
  const [reset, setReset] = useState(0);

  useEffect(async () => {
    if(auth.user){
      setIdUsuario(auth.user[0]);
    }

    setMisVehiculos(await GetTransportesUsuario(21));
    console.log(JSON.stringify(misVehiculos?.rows))

    
    setReset(1);
  }, [reset])

  useEffect(() => {
    setNomRows(["Patente", "Tamaño", "Capacidad Carga", "Refrigeración", "Cualquiera", "Activo", "Acción"]) 
    setRows(JSON.stringify(misVehiculos?.rows))
  },[])
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