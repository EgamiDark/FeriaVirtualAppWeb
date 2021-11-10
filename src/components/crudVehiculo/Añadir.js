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
  const [idUsuario, setIdUsuario] = useState(0);

  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    if(auth.user){
      console.log(auth.user[0])
      setIdUsuario(auth.user[0]);
    }
  },[])
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
          label="Capacidad carga"
          variant="standard"
        ></TextField>
        <TextField
          name="actividad"
          {...register("actividad", {
            required: "required",
            validate: "validation",
          })}
          className={classes.inputs}
          label="Actividad"
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
          <MenuItem value={1}>Ten</MenuItem>
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
          <MenuItem value={1}>Ten</MenuItem>
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
