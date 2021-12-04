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

import { postOfertar } from "../../Api/pedido";

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
  let fechMinCadu = new Date();
  fechMinCadu.setDate(hoy.getDate() + 30);
  let defaultMinCadu = moment(fechMinCadu.toISOString()).format("YYYY-MM-DD");
  let fechaHoy = moment(hoy.toISOString()).format("YYYY-MM-DD");
  const [fechaCosecha, setFechaCosecha] = useState(fechaHoy);
  const [fechaCaducidad, setFechaCaducidad] = useState(defaultMinCadu);
  const [reset, setReset] = useState(0);

  const classes = useStyles();

  const fechaMinCaducidad = (fechaCaduci) => {
    console.log("hola desde la funcion fechaMinCaducidad")

    if (fechaCaduci < defaultMinCadu) {
      console.log("hola desde el if")
      setFechaCaducidad(moment(defaultMinCadu).format("YYYY-MM-DD"));
    } else {
      console.log("hola desde el else")
      setFechaCaducidad(moment(fechaCaduci).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    setReset(1);
  }, [reset]);

  const guardarOferta = async (data) => {
    try {
      data.idPedido = history.location.state?.idPedido;
      data.kgUnidad = history.location.state?.kgUnidad;
      data.fechaCosecha = fechaCosecha;
      data.fechaCaducidad = fechaCaducidad;
      data.idUsuario = idUsuario;
      const res = await postOfertar(JSON.stringify(data));

      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Guardado Correctamente!</i>,
          icon: "success",
        });
        history.push("/misProductos");
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
      <h1>Añadir Oferta Producto</h1>
      <form onSubmit={handleSubmit(guardarOferta)}>
        <TextField
          name="idPedido"
          className={classes.inputs}
          label="Id Pedido"
          variant="outlined"
          value={history.location.state?.idPedido}
          disabled
        ></TextField>
        <TextField
          name="producto"
          className={classes.inputs}
          label="Producto"
          variant="outlined"
          value={history.location.state?.producto}
          disabled
        ></TextField>
        <TextField
          name="kgUnidad"
          className={classes.inputs}
          label="KG X Unidad"
          variant="outlined"
          value={history.location.state?.kgUnidad}
          disabled
        ></TextField>
        <TextField
          name="precioUnidad"
          {...register("precioUnidad", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
            max: {
              value: history.location.state?.precioMax,
              message:
                "El precio debe ser menor o igual a" +
                " " +
                history.location.state?.precioMax,
            },
          })}
          error={!!errors.precioUnidad}
          helperText={errors.precioUnidad ? errors.precioUnidad.message : ""}
          className={classes.inputs}
          label={"Precio Unidad* " + "(Maximo " + history.location.state?.precioMax + ")" }
          variant="outlined"
          type="number"
        ></TextField>
        <TextField
          name="cantidad"
          {...register("cantidad", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
            max: {
              value: history.location.state?.cantMax,
              message:
                "El precio debe ser menor o igual a" +
                " " +
                history.location.state?.cantMax,
            },
          })}
          requerid
          error={!!errors.cantidad}
          helperText={errors.cantidad ? errors.cantidad.message : ""}
          className={classes.inputs}
          label={"Cantidad a Ofertar* " + "(Maximo " + history.location.state?.cantMax + ")" }
          variant="outlined"
          type="number"
        ></TextField>
        <TextField
          name="fechaCosecha"
          {...register("fechaCosecha", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          error={!!errors.fechaCosecha}
          helperText={errors.fechaCosecha ? errors.fechaCosecha.message : ""}
          className={classes.inputs}
          label="Fecha Cosecha"
          defaultValue={fechaHoy}
          onChange={(item) => {
            setFechaCosecha(moment(item.target.value).format("DD-MM-YYYY"));
          }}
          variant="outlined"
          type="date"
        ></TextField>
        <TextField
          name="fechaCaducidad"
          {...register("fechaCaducidad", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          error={!!errors.fechaCaducidad}
          helperText={
            errors.fechaCaducidad ? errors.fechaCaducidad.message : ""
          }
          className={classes.inputs}
          label="Fecha Caducidad"
          value={fechaCaducidad}
          onChange={(item) => {
            console.log(item.target.value)
            fechaMinCaducidad(item.target.value);
          }}
          variant="outlined"
          type="date"
        ></TextField>
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
