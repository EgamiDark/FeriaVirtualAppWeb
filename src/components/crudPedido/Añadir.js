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

import { postIngresarPedido } from "../../Api/pedido";
import { getProductos } from "../../Api/datosFk";

const useStyles = makeStyles(() => ({
  img: {
    width: "50px",
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
  let hoy = new Date() ;
  hoy.setDate(hoy.getDate() + 1);
  let fechaHoy = moment(hoy.toISOString()).format("YYYY-MM-DD");
  const [fecha, setFecha] = useState(fechaHoy);
  const [producto, setProducto] = useState([]);
  const [selectP, setSelectP] = useState([]);
  const [reset, setReset] = useState(0);

  const classes = useStyles();

  const cargarProducto = () => {
    let f = [];
    for (let i = 0; i < producto.rows?.length; i++) {
      let img = "data:image/png;base64, "+producto?.rows[i][3];
      f.push(
        <MenuItem value={producto?.rows[i][0]}>
          <img className={classes.img} src={img} />
          {producto?.rows[i][1]}
        </MenuItem>
      );
    }
    setSelectP(f);
  };

  const setearFecha = (newFecha)=>{
    if(Date.parse(newFecha)>=Date.parse(fechaHoy)){
      setFecha(moment(newFecha).format("YYYY-MM-DD"));
    }
    else{
      setFecha(moment(fechaHoy).format("YYYY-MM-DD"));
    }
  }

  useEffect(async () => {
    setProducto(await getProductos());
    setReset(1);
  }, []);

  useEffect(() => {
    cargarProducto();
  }, [reset]);

  const guardarPedido = async (data) => {
    try {
      data.idSubasta = history.location.state?.idSubasta;
      let f = new Date();
      data.fechaSolicitud = moment(f.toISOString()).format("DD-MM-YYYY");
      data.fechaTermino = moment(fecha).format("DD-MM-YYYY");
      data.idEstadoPedido = 1;
      data.idUsuario = idUsuario;
      const res = await postIngresarPedido(JSON.stringify(data));
      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Guardado Correctamente!</i>,
          icon: "success",
        });
        history.push("/misPedidos");
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
      <form onSubmit={handleSubmit(guardarPedido)}>
        <TextField
          name="fechaTermino"
          className={classes.inputs}
          label="Fecha de termino para ofertar"
          
          value={fecha}
          onChange={(item) => {
            setearFecha(item.target.value);
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
          name="idProducto"
          {...register("idProducto", { required: "Este campo es requerido" })}
          error={!!errors.idProducto}
          helperText={errors.idProducto ? errors.idProducto.message : ""}
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
