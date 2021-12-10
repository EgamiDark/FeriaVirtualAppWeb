import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import moment from "moment";
import useAuth from '../../auth/useAuth';

import { getOfertaProd, postModificarOferta,getPedidoById } from "../../Api/pedido";


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
  let hoy = new Date();
  let fechMinCadu = new Date();
  fechMinCadu.setDate(hoy.getDate() + 30);
  let defaultMinCadu = moment(fechMinCadu.toISOString()).format("YYYY-MM-DD");
  let fechaHoy = moment(hoy.toISOString()).format("YYYY-MM-DD");
  let idUsuario = auth?.user[0];
  let pedido = history.location.state?.pedido;
  const [oferta, setOferta] = useState([])
  const [idOferta, setIdOferta] = useState(0)
  const [precioUnidad, setPrecioUnidad] = useState(0)
  const [kgUnidad, setKgUnidad] = useState(0)
  const [cantidad, setCantidad] = useState(0)
  const [fechaCosecha, setFechaCosecha] = useState("")
  const [fechaCaducidad, setFechaCaducidad] = useState("")
  const [idPedido, setIdPedido] = useState(0)
  const [reset, setReset] = useState(0)

  const classes = useStyles();

  const iteRows = async() => {
    for (let i = 0; i < oferta.rows?.length; i++) {
      setIdOferta(oferta?.rows[i][0])
      setPrecioUnidad(oferta?.rows[i][1])
      setKgUnidad(oferta?.rows[i][2])
      setCantidad(oferta?.rows[i][3])
      setFechaCosecha(moment(oferta?.rows[i][4]).format("YYYY-MM-DD"))
      setFechaCaducidad(moment(oferta?.rows[i][5]).format("YYYY-MM-DD"))
      setIdPedido(oferta?.rows[i][6])
    }
    
  }

  useEffect(async () => {
    setOferta(await getOfertaProd(history.location.state?.idOferta))
    
    setReset(1)
  }, [])

  useEffect(() => {
    iteRows()
  }, [reset])

  const fechaMinCaducidad = (fechaCaduci) => {


    if (fechaCaduci < defaultMinCadu) {
      
      setFechaCaducidad(moment(defaultMinCadu).format("YYYY-MM-DD"));
    } else {
     
      setFechaCaducidad(moment(fechaCaduci).format("YYYY-MM-DD"));
    }
  };

  const modificarOferta = async (data) => {
    try {
      data.precioUnidad = precioUnidad;
      data.kgUnidad = kgUnidad;
      data.cantidad = cantidad;
      data.fechaCosecha = moment(fechaCosecha).format("DD-MM-YYYY");
      data.fechaCaducidad = moment(fechaCaducidad).format("DD-MM-YYYY");
      data.idOferta = idOferta;
      const res = await postModificarOferta(JSON.stringify(data));

      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: (
            <i>
              Modificado Correctamente!
            </i>
          ),
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
      <h1>Modificar Oferta Pedido</h1>
      <form onSubmit={handleSubmit(modificarOferta)}>
        <TextField
          name="idPedido"
          className={classes.inputs}
          label="Id Pedido"
          variant="outlined"
          value={idPedido}
          disabled
        ></TextField>
        <TextField
          name="kgUnidad"
          className={classes.inputs}
          label="KG X Unidad"
          variant="outlined"
          value={kgUnidad}
          disabled
        ></TextField>
        <TextField
          name="precioUnidad"
          {...register("precioUnidad", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
            max: {
              value: pedido[5],
              message:
                "El precio debe ser menor o igual a" +
                " " +
                pedido[5],
            },
          })}
          error={!!errors.precioUnidad}
          helperText={errors.precioUnidad ? errors.precioUnidad.message : ""}
          className={classes.inputs}
          label={"Precio Unidad*"+ "(Maximo " + pedido[5] + ")" }
          variant="outlined"
          type="number"
          value={precioUnidad}
          onChange={item=>{
            setPrecioUnidad(item.target.value)
          }}
        ></TextField>
        <TextField
          name="cantidad"
          {...register("cantidad", {
            required: "Este campo es requerido",
            validate: "Campo no valido",
            max: {
              value: pedido[3],
              message:
                "El precio debe ser menor o igual a" +
                " " +
                pedido[3],
            },
          })}
          requerid
          error={!!errors.cantidad}
          helperText={errors.cantidad ? errors.cantidad.message : ""}
          className={classes.inputs}
          label={"Cantidad a Ofertar*"+ "(Maximo " + pedido[3] + ")" }
          variant="outlined"
          type="number"
          value={cantidad}
          onChange={item=>{
            setCantidad(item.target.value)
          }}
        ></TextField>
        <TextField
          name="fechaCosecha"
          className={classes.inputs}
          label="Fecha Cosecha"
          value={fechaCosecha}
          onChange={(item) => {
            setFechaCosecha(item.target.value)
          }}
          variant="outlined"
          type="date"
        ></TextField>
        <TextField
          name="fechaCaducidad"
          className={classes.inputs}
          label="Fecha Caducidad"
          value={fechaCaducidad}
          onChange={(item) => {
            fechaMinCaducidad(item.target.value)
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
          Modificar
        </Button>
      </form>
    </div>
  );
};

export default Ofertar;