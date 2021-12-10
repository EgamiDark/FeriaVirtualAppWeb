import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';

import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { crearTransporte } from "../../Api/transporte";
import useAuth from '../../auth/useAuth';
import { useEffect, useState } from "react";

import { getTipoRefrig, getTipoTrans } from "../../Api/datosFk";

const useStyles = makeStyles(() => ({
  inputs: {
    textAlign: "center !important" ,
    width: "60% !important",
    margin: "10px 0px 10px 0px !important",
  },
  selects: {
    width: "60% !important",
    margin: "10px 0px 10px 0px !important",
  },
}));

const Añadir = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0]
  const [tiposRef, setTiposRef] = useState([]); // -> todos
  const [tiposTransp, setTiposTransp] = useState([]); // -> todos
  const [sTipoRef, setSTipoRef] = useState([]);
  const [sTipoVehic, setSTipoVehic] = useState([]);
  const [reset, setReset] = useState(0);
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  useEffect(async ()=>{
    setTiposRef(await getTipoRefrig());
    setTiposTransp(await getTipoTrans());
    setReset(1)
  },[])

  useEffect(()=>{
    cargarTipoRef();
    cargarTipoVehic();
  },[reset])

  const guardarTransporte = async (data) => {
    try {
      data.idUsuario = idUsuario;

      const res = await crearTransporte(JSON.stringify(data));

      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: (
            <i>
              Guardado Correctamente!
            </i>
          ),
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

  const classes = useStyles();

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h1>Añadir Vehiculo</h1>
      <form onSubmit={handleSubmit(guardarTransporte)}>
        <TextField
          name="patente"
          {...register("patente", {
            required: "required",
            validate: "validation",
          })}
          className={classes.inputs}
          label="Patente"
          variant="standard"
        ></TextField>
        <TextField
          name="tamanio"
          {...register("tamanio", {
            required: "required",
            validate: "validation",
          })}
          className={classes.inputs}
          label="Tamaño"
          variant="standard"
        ></TextField>
        <TextField
          name="capacidadCarga"
          {...register("capacidadCarga", {
            required: "required",
            validate: "validation",
          })}
          className={classes.inputs}
          label="Capacidad carga(kg)"
          variant="standard"
        ></TextField>
        <TextField
          name="idTipoRefrig"
          {...register("idTipoRefrig", { required: "required" })}
          className={classes.inputs}
          select
          label="Refrigeración"
          variant="standard"
          helperText="Seleccione un tipo de refrigeración"
        >
          {sTipoRef}
        </TextField>
        <TextField
          name="idTipoTrans"
          {...register("idTipoTrans", { required: "required" })}
          className={classes.selects}
          select
          label="Transporte"
          variant="standard"
          helperText="Seleccione un tipo de transporte"
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

export default Añadir;
