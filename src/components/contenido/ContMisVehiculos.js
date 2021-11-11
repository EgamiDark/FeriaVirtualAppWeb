import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Material UI
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import Tabla from "../Tabla";
import useAuth from "../../auth/useAuth";

import { getTransportesUsuario, actividadVehiculo } from "../../Api/transporte";
import { getTipoRefrig, getTipoTrans } from "../../Api/datosFk";

const ContMisVehiculos = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();

  let nomRows = [
    "Patente",
    "Tamaño",
    "Capacidad Carga",
    "Activo",
    "Refrigeracion",
    "Tipo",
    "Acción",
  ];
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  const [rows, setRows] = useState([]);
  const [misVehiculos, setMisVehiculos] = useState([]);
  const [tipoRefrig, setTipoRefrig] = useState([]);
  const [tipoTrans, setTipoTrans] = useState([]);
  const [reset, setReset] = useState(0);
  const [reload, setReload] = useState(0);

  const changeActVehiculo = async (patente, actividad) => {
    let act;

    if(actividad == 1){
      act = 0;
    }else{
      act = 1;
    }

    await MySwal.fire({
      title: "¿Esta seguro que deseas cambiar el estado del vehiculo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar estado!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await actividadVehiculo(JSON.stringify({patente, actividad: act}));
          
          if (res.success) {
            await MySwal.fire(
              "Cambiado!",
              "El estado ha sido actualizado",
              "success"
            );
            setReset(0);
            setReload(1);
          } else {
            await MySwal.fire({
              title: <strong>Que Mal!</strong>,
              html: <i>Ha ocurrido un error intentelo nuevamente!</i>,
              icon: "error",
            });
          }
        } catch (error) {
          await MySwal.fire({
            title: <strong>Que Mal!</strong>,
            html: (
              <i>
                La base de datos se encuentra en mantenimiento, intente mas
                tarde!
              </i>
            ),
            icon: "warning",
          });
        }
      }
    });
  };

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < misVehiculos.rows?.length; i++) {
      let f = [];
      f.push(misVehiculos?.rows[i][0]);
      f.push(misVehiculos?.rows[i][1]);
      f.push(misVehiculos?.rows[i][2]);
      if (misVehiculos?.rows[i][3] == 0) {
        f.push("Desactivado");
      }
      if (misVehiculos?.rows[i][3] == 1) {
        f.push("Activado");
      }
      for (let tr = 0; tr < tipoRefrig.rows?.length; tr++) {
        if (misVehiculos?.rows[i][4] == tipoRefrig.rows[tr][0]) {
          f.push(tipoRefrig.rows[tr][1]);
          break;
        }
      }

      for (let tt = 0; tt < tipoTrans.rows?.length; tt++) {
        if (misVehiculos?.rows[i][5] == tipoTrans.rows[tt][0]) {
          f.push(tipoTrans.rows[tt][1]);
          break;
        }
      }

      f.push(
        <div style={{ display: "flex" }}>
          <IconButton
            sx={{ color: "green" }}
            aria-label="update"
            onClick={() =>
              history.push({
                pathname: "/modificarVehiculo",
                state: { patente: misVehiculos?.rows[i][0]}
              })
            }
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: "red" }}
            aria-label="act/desac"
            onClick={() =>{
              changeActVehiculo(misVehiculos?.rows[i][0], misVehiculos?.rows[i][3]);
            }}
          >
            <CancelIcon />
          </IconButton>
        </div>
      );

      r.push(f);
    }

    setRows(r);
  };

  useEffect(async () => {
    setMisVehiculos(await getTransportesUsuario(idUsuario));
    setTipoRefrig(await getTipoRefrig());
    setTipoTrans(await getTipoTrans());
    setReload(0);
    setReset(1);
  }, [reload]);

  useEffect(() => {
    iteRows();
  }, [reset]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Vehiculos</h1>
      <div style={{ textAlign: "right", padding: 5 }}>
        <IconButton
          sx={{ color: "white", backgroundColor: "green" }}
          aria-label="add"
          onClick={() => history.push({ pathname: "/modificarVehiculo" })}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContMisVehiculos;
