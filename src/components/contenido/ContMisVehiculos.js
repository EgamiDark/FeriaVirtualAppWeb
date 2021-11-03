import React, { useEffect, useState } from "react";
import Tabla from "../Tabla"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

const ContMisVehiculos = () => {
  const history = useHistory();
  const [nomRows, setNomRows] = useState();
  const [rows, setRows] = useState();
  useEffect(() => {
    setNomRows(["Patente", "Tamaño", "Capacidad Carga", "Refrigeración", "Activo", "Acción"])
    setRows([["QURD92", "3720x1640x1680x2200", "1000", "Frigorifico", "Activo", <div><IconButton sx={{ color: "blue" }} aria-label="edit">
      <EditIcon />
    </IconButton><IconButton sx={{ color: "red" }} aria-label="delete">
        <DeleteIcon />
      </IconButton></div>]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]
      , ["DS2421", "3720x1640x1680x2200", "1000", "Frigorifico","Desactivado"]])
  }, [])
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