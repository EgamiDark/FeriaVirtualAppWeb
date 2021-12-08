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

import { getOferta, postModificarOferta } from "../../Api/subasta";
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

  const [vehiculo, setVehiculo] = useState([]);
  const [selectV, setSelectV] = useState([]);
  const [oferta, setOferta] = useState([]);
  const [idSubasta, setIdSubasta] = useState(0);
  const [fecha, setFecha] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [patente, setPatente] = useState("");
  const [idOferta, setIdOferta] = useState(0);
  const [reset, setReset] = useState(0);

  const classes = useStyles();

  const iteRows = () => {
    for (let i = 0; i < oferta.rows?.length; i++) {
      setIdSubasta(oferta?.rows[i][0]);
      setFecha(moment(oferta?.rows[i][1]).format("YYYY-MM-DD"));
      setPrecio(oferta?.rows[i][2]);
      setPatente(oferta?.rows[i][3]);
      setIdOferta(oferta?.rows[i][6]);
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
    setOferta(await getOferta(history.location.state?.idOferta));
    setReset(1);
  }, []);

  useEffect(() => {
    cargarVehiculo();
    iteRows();
  }, [reset]);

  const modificarOferta = async (data) => {
    try {
      data.idSubasta = idSubasta;
      data.fechaEntrega = moment(fecha).format("DD-MM-YYYY");
      data.precioOferta = precio;
      data.cantidadTransporte = cantidad;
      data.patente = patente;
      data.idOferta = idOferta;
      const res = await postModificarOferta(JSON.stringify(data));

      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Modificado Correctamente!</i>,
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
      <h1>Modificar Oferta Subasta</h1>
      <form onSubmit={handleSubmit(modificarOferta)}>
        <TextField
          name="idSubasta"
          className={classes.inputs}
          label="Id Subasta "
          variant="outlined"
          value={idSubasta}
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
          value={precio}
          onChange={(item) => {
            setPrecio(item.target.value);
          }}
        ></TextField>
        <TextField
          name="cantidadTransporte"
          {...register("cantidadTransporte", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
          })}
          requerid
          error={!!errors.cantidadTransporte}
          helperText={
            errors.cantidadTransporte ? errors.cantidadTransporte.message : ""
          }
          className={classes.inputs}
          label="Cantidad a Transportar*"
          variant="outlined"
          type="number"
          value={cantidad}
          onChange={(item) => {
            setCantidad(item.target.value);
          }}
        ></TextField>
        <TextField
          name="fechaEntrega"
          className={classes.inputs}
          label="Fecha Entrega(Aprox.)"
          value={fecha}
          onChange={(item) => {
            setFecha(moment(item.target.value).format("YYYY-MM-DD"));
          }}
          variant="outlined"
          type="date"
        ></TextField>
        <TextField
          name="patente"
          className={classes.selects}
          select
          label="Vehiculo*"
          variant="outlined"
          value={patente}
          onChange={(item) => {
            setPatente(item.target.value);
          }}
        >
          {selectV}
        </TextField>
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

export default Ofertar;
