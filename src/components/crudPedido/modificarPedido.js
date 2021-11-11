import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// Material Ui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import useAuth from "../../auth/useAuth";
import moment from "moment";

import { getPedidoById, postModificarPedido } from "../../Api/pedido";

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

const ModificarPedido = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let auth = useAuth();
  let idUsu = auth?.user[0];

  const [pedido, setPedido] = useState(0);

  const [idPedido, setIdPedido] = useState(0);
  const [fechaSolicitud, setFechaSolicitud] = useState("");
  const [fechaTermino, setFechaTermino] = useState("");
  const [cantidadSolicitada, setCantidadSolicitada] = useState(0);
  const [kgUnidad, setKgUnidad] = useState(0);
  const [precioMaximo, setPrecioMaximo] = useState(0);
  const [idEstPedido, setIdEstPedido] = useState(0);
  const [idUsuario, setIdUsuario] = useState(0);
  const [idProducto, setIdProducto] = useState(0);
  const [reset, setReset] = useState(0);

  const classes = useStyles();

  const iteRows = () => {
    for (let i = 0; i < pedido.rows?.length; i++) {
      setIdPedido(pedido?.rows[i][0]);
      setFechaSolicitud(moment(pedido?.rows[i][1]).format("YYYY-MM-DD"));
      setFechaTermino(moment(pedido?.rows[i][2]).format("YYYY-MM-DD"));
      setCantidadSolicitada(pedido?.rows[i][3]);
      setKgUnidad(pedido?.rows[i][4]);
      setPrecioMaximo(pedido?.rows[i][5]);
      setIdEstPedido(pedido?.rows[i][6]);
      setIdUsuario(pedido?.rows[i][7]);
      setIdProducto(pedido?.rows[i][8]);
    }
  };

  useEffect(async () => {
    setPedido(await getPedidoById(history.location.state?.idPedido));
    setIdUsuario(idUsu);
    setReset(1);
  }, []);

  useEffect(() => {
    iteRows();
  }, [reset]);

  const modificarPedido = async (data) => {
    console.log(data)
    try {
      data.idPedido = idPedido;
      data.fechaSolicitud = moment(fechaSolicitud).format("DD-MM-YYYY");
      data.fechaTermino = moment(fechaTermino).format("DD-MM-YYYY");
      data.cantidadSolicitada = parseInt(cantidadSolicitada);
      data.kgUnidad = parseInt(kgUnidad);
      data.precioMaximo = parseInt(precioMaximo);
      data.idEstadoPedido = idEstPedido;
      data.idUsuario = idUsuario;
      data.idProducto = idProducto;

      const res = await postModificarPedido(JSON.stringify(data));

      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Modificado Correctamente!</i>,
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
      <h1>Modificar Pedido</h1>
      <form onSubmit={handleSubmit(modificarPedido)}>
        <TextField
          name="idPedido"
          className={classes.inputs}
          label="Id Pedido"
          variant="outlined"
          value={idPedido}
          disabled
        ></TextField>
        <TextField
          name="fechaSolicitud"
          className={classes.inputs}
          label="Fecha Solicitud"
          value={fechaSolicitud}
          variant="outlined"
          disabled
        ></TextField>
        <TextField
          name="fechaTermino"
          className={classes.inputs}
          label="Fecha Termino"
          value={fechaTermino}
          onChange={(item) => {
            setFechaTermino(moment(item.target.value).format("YYYY-MM-DD"));
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
          label="Cantidad Solicitada*"
          variant="outlined"
          type="number"
          value={cantidadSolicitada}
          onChange={(item) => {
            setCantidadSolicitada(item.target.value);
          }}
        ></TextField>
        <TextField
          name="kgUnidad"
          {...register("kgUnidad", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          error={!!errors.kgUnidad}
          helperText={errors.kgUnidad ? errors.kgUnidad.message : ""}
          className={classes.inputs}
          label="KG X Unidad*"
          variant="outlined"
          type="number"
          value={kgUnidad}
          onChange={(item) => {
            setKgUnidad(item.target.value);
          }}
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
          label="Precio máximo*"
          variant="outlined"
          type="number"
          value={precioMaximo}
          onChange={(item) => {
            setPrecioMaximo(item.target.value);
          }}
        ></TextField>
        <Button
          className={classes.selects}
          type="submit"
          variant="contained"
          color="primary"
        >
          Modificar
        </Button>
      </form>
    </div>
  );
};

export default ModificarPedido;
