import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Material UI
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

import {
  postModificarVehiculo,
  getTransportesPatente,
} from "../../Api/transporte";

import { getTipoRefrig, getTipoTrans } from "../../Api/datosFk";

import useAuth from "../../auth/useAuth";

const useStyles = makeStyles(() => ({
  inputs: {
    textAlign: "center !important",
    width: "60% !important",
    margin: "10px 0px 10px 0px !important",
  },
  selects: {
    width: "60% !important",
    margin: "10px 0px 10px 0px !important",
  },
}));

const ModificarVehiculo = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let auth = useAuth();

  const [idUsuario, setIdUsuario] = useState(0);
  const [vehiculo, setVehiculo] = useState(0);
  const [reset, setReset] = useState(0);

  const [patente, setPatente] = useState(0);
  const [tamanio, setTamanio] = useState(0);
  const [capacidadCarga, setCapacidadCarga] = useState(0);
  const [actividad, setActividad] = useState(0);
  const [tipoRefrigeracion, setTipoRefrigeracion] = useState(0); // -> 1
  const [tipoTransporte, setTipoTransporte] = useState(0); // -> 1

  const [tiposRef, setTiposRef] = useState([]); // -> todos
  const [tiposTransp, setTiposTransp] = useState([]); // -> todos

  const [sTipoRef, setSTipoRef] = useState([]);
  const [sTipoVehic, setSTipoVehic] = useState([]);

  const iteRows = () => {
    for (let i = 0; i < vehiculo.rows?.length; i++) {
      setPatente(vehiculo?.rows[i][0]);
      setTamanio(vehiculo?.rows[i][1]);
      setCapacidadCarga(vehiculo?.rows[i][2]);
      setActividad(vehiculo?.rows[i][3]);
      setTipoRefrigeracion(vehiculo?.rows[i][4]);
      setTipoTransporte(vehiculo?.rows[i][5]);
    }
  };

  const cargarTipoRef = () => {
    let f = [];
    for (let i = 0; i < tiposRef.rows?.length; i++) {
      f.push(
        <MenuItem value={tiposRef?.rows[i][0]}>{tiposRef?.rows[i][1]}</MenuItem>
      );
    }
    setSTipoRef(f);
  };

  const cargarTipoVehic = () => {
    let f = [];
    for (let i = 0; i < tiposTransp.rows?.length; i++) {
      f.push(
        <MenuItem value={tiposTransp?.rows[i][0]}>
          {tiposTransp?.rows[i][1]}
        </MenuItem>
      );
    }
    setSTipoVehic(f);
  };

  useEffect(async () => {
    if (auth.user) {
      console.log(auth.user[0]);
      setIdUsuario(auth.user[0]);
    }
    setTiposRef(await getTipoRefrig());
    setTiposTransp(await getTipoTrans());

    setVehiculo(await getTransportesPatente(history.location.state?.patente));
    setReset(1);
  }, []);

  useEffect(() => {
    cargarTipoRef();
    cargarTipoVehic();
    iteRows();
  }, [reset]);

  const classes = useStyles();

  const modificarVehiculo = async (data) => {
    try {
      data.patente = patente;
      data.tamanio = tamanio;
      data.capacidadCarga = capacidadCarga;
      data.actividad = actividad;
      data.idTipoRefrig = tipoRefrigeracion;
      data.idTipoTrans = tipoTransporte;
      data.idUsuario = idUsuario;
      console.log(data);

      const res = await postModificarVehiculo(JSON.stringify(data));
      console.log(res)

      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Modificado Correctamente!</i>,
          icon: "success",
        });
        history.push("/misVehiculos");
      } else {
        await MySwal.fire({
          title: <strong>Que Mal!</strong>,
          html: <i>Los datos ingresados son incorrectos!</i>,
          icon: "error",
        });
      }
    } catch (error) {
      await MySwal.fire({
        title: <strong>Que Mal!</strong>,
        html: (
          <i>
            La base de datos se encuentra en mantenimiento, intente mas tarde!
          </i>
        ),
        icon: "warning",
      });
    }
  };

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h1>Modificar Vehiculo</h1>
      <form onSubmit={handleSubmit(modificarVehiculo)}>
        <TextField
          name="patente"
          className={classes.inputs}
          label="Patente"
          variant="outlined"
          value={patente}
          disabled
        ></TextField>
        <TextField
          name="tamanio"
          {...register("tamanio", {
            required: "required",
            validate: "validation",
          })}
          className={classes.inputs}
          label="Tamaño"
          variant="outlined"
          value={tamanio}
          onChange={(item) => {
            setTamanio(item.target.value);
          }}
        ></TextField>
        <TextField
          name="capacidadCarga"
          {...register("capacidadCarga", {
            required: "required",
            validate: "validation",
          })}
          className={classes.inputs}
          label="Capacidad carga"
          variant="outlined"
          value={capacidadCarga}
          onChange={(item) => {
            setCapacidadCarga(item.target.value);
          }}
        ></TextField>
        <TextField
          name="idTipoRefrig"
          className={classes.inputs}
          select
          label="Tipo Refrigeración"
          variant="outlined"
          helperText="Seleccione un tipo de refrigeración"
          value={tipoRefrigeracion}
          onChange={(item) => {
            setTipoRefrigeracion(item.target.value);
          }}
        >
          {sTipoRef}
        </TextField>
        <TextField
          name="idTipoTrans"
          className={classes.selects}
          select
          label="Tipo Transporte"
          variant="outlined"
          helperText="Seleccione un tipo de transporte"
          value={tipoTransporte}
          onChange={(item) => {
            setTipoTransporte(item.target.value);
          }}
        >
          {sTipoVehic}
        </TextField>
        <Button
          className={classes.selects}
          type="submit"
          variant="contained"
          color="primary"
        >
          Guardar
        </Button>
      </form>
    </div>
  );
};

export default ModificarVehiculo;
