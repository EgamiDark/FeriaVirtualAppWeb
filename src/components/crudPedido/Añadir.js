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
import enContru from "../../img/enContru.jpg";

import { postOfertar } from "../../Api/subasta";
import { getProductos } from "../../Api/datosFk";

const useStyles = makeStyles(() => ({
  img: {
    width: "100px",
  },
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

const Añadir = () => {
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
  const [producto, setProducto] = useState([]);
  const [selectP, setSelectP] = useState([]);
  const [reset, setReset] = useState(0);

  const classes = useStyles();

  const cargarProducto = () => {
    let f = [];
    for (let i = 0; i < producto.rows?.length; i++) {
      f.push(
        <MenuItem value={producto?.rows[i][0]}>
          <img className={classes.img} src={enContru} />
          {producto?.rows[i][1]}
        </MenuItem>
      );
    }
    setSelectP(f);
  };

  useEffect(async () => {
    setProducto(await getProductos());
    setFecha(moment(fechaHoy).format("DD-MM-YYYY"));
    setReset(1);
  }, []);

  useEffect(() => {
    cargarProducto();
  }, [reset]);

  const guardarOferta = async (data) => {
    try {
      data.idSubasta = history.location.state?.idSubasta;
      data.fechaEntrega = fecha;
      console.log(JSON.stringify(data));
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
      <h1>Añadir Pedido</h1>
      <form onSubmit={handleSubmit(guardarOferta)}>
        <TextField
          name="fechaTermino"
          className={classes.inputs}
          label="Fecha de termino para ofertar"
          defaultValue={fechaHoy}
          onChange={(item) => {
            setFecha(moment(item.target.value).format("DD-MM-YYYY"));
          }}
          variant="outlined"
          type="date"
        ></TextField>
        <TextField
          name="cantidadSolicitada"
          {...register("cantidadSolicitada", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          error={!!errors.cantidadSolicitada}
          helperText={
            errors.cantidadSolicitada ? errors.cantidadSolicitada.message : ""
          }
          className={classes.inputs}
          label="Cantidad a solicitar*"
          variant="outlined"
          type="number"
        ></TextField>
        <TextField
          name="kgUnidad"
          {...register("kgUnidad", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          requerid
          error={!!errors.kgUnidad}
          helperText={errors.kgUnidad ? errors.kgUnidad.message : ""}
          className={classes.inputs}
          label="Kg por Unidad*"
          variant="outlined"
          type="number"
        ></TextField>
        <TextField
          name="precioMaximo"
          {...register("precioMaximo", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          requerid
          error={!!errors.precioMaximo}
          helperText={errors.precioMaximo ? errors.precioMaximo.message : ""}
          className={classes.inputs}
          label="Precio maximo a pagar por unidad*"
          variant="outlined"
          type="number"
        ></TextField>
        <TextField
          name="producto"
          {...register("producto", { required: "Este campo es requerido" })}
          error={!!errors.producto}
          helperText={errors.producto ? errors.producto.message : ""}
          className={classes.selects}
          select
          label="Producto*"
          variant="outlined"
        >
          {selectP}
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
