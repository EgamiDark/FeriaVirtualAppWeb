import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import moment from "moment";
import useAuth from "../../auth/useAuth";

import { postOfertar } from "../../Api/subasta";
import { getTransportesUsuario } from "../../Api/transporte";

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

const Ofertar = () => {
  const MySwal = withReactContent(Swal);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let auth = useAuth();
  let idUsuario = auth?.user[0];
  let hoy = new Date();
  let fechaHoy = moment(hoy.toISOString()).format("YYYY-MM-DD");
  const [fecha, setFecha] = useState();
  const [vehiculo, setVehiculo] = useState([]);
  const [selectV, setSelectV] = useState([]);
  const [reset, setReset] = useState(0);

  const classes = useStyles();

  const fechaActual = (fechaEntrega) => {
    console.log(fechaHoy)
    console.log(fechaEntrega)

    if (fechaEntrega < fechaHoy) {
      setFecha(moment(fechaHoy).format("YYYY-MM-DD"));
    } else {
      setFecha(moment(fechaEntrega).format("YYYY-MM-DD"));
    }
  };

  const cargarVehiculo = () => {
    let f = [];
    for (let i = 0; i < vehiculo.rows?.length; i++) {
      f.push(
        <MenuItem value={vehiculo?.rows[i][0]}>{vehiculo?.rows[i][0]}</MenuItem>
      );
    }
    setSelectV(f);
  };

  useEffect(async () => {
    setVehiculo(await getTransportesUsuario(idUsuario));
    setFecha(moment(fechaHoy).format("YYYY-MM-DD"));
    setReset(1);
  }, []);

  useEffect(() => {
    cargarVehiculo();
  }, [reset]);

  const guardarOferta = async (data) => {
    try {
      data.idSubasta = history.location.state?.idSubasta;

      data.fechaEntrega = moment(fecha).format("DD-MM-YYYY");

      const res = await postOfertar(JSON.stringify(data));

      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Guardado Correctamente!</i>,
          icon: "success",
        });
        history.push("/misOfertas");
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
      <h1>Añadir Oferta Subasta</h1>
      <form onSubmit={handleSubmit(guardarOferta)}>
        <TextField
          name="idSubasta"
          className={classes.inputs}
          label="Id Subasta "
          variant="outlined"
          value={history.location.state?.idSubasta}
          disabled
        ></TextField>
        <TextField
          name="precioOferta"
          {...register("precioOferta", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          error={!!errors.precioOferta}
          helperText={errors.precioOferta ? errors.precioOferta.message : ""}
          className={classes.inputs}
          label="Precio Oferta*"
          variant="outlined"
          type="number"
        ></TextField>
        <TextField
          name="fechaEntrega"
          className={classes.inputs}
          label="Fecha Entrega(Aprox.)"
          value={fecha}
          onChange={(item) => {
            fechaActual(item.target.value);
          }}
          variant="outlined"
          type="date"
        ></TextField>
        <TextField
          name="patente"
          {...register("patente", { required: "Este campo es requerido" })}
          error={!!errors.patente}
          helperText={errors.patente ? errors.patente.message : ""}
          className={classes.selects}
          select
          label="Vehiculo*"
          variant="outlined"
        >
          {selectV}
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

export default Ofertar;
