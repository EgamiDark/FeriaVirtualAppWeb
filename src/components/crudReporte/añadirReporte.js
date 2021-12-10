import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useState, useEffect } from "react";
import { getRol } from "../../Api";
import { useForm } from "react-hook-form";
import useAuth from "../../auth/useAuth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from "react-router-dom";
import { postIngresarReporte } from "../../Api/reporte";

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

const AñadirReporte = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  let mesAtras = new Date();
  mesAtras.setDate(mesAtras.getDate() - 30);
  let fechaMesAtras = moment(mesAtras.toISOString()).format("YYYY-MM-DD");
  let hoy = new Date();
  let fechaHoy = moment(hoy.toISOString()).format("YYYY-MM-DD");
  const [fechaDesde, setFechaDesde] = useState(fechaMesAtras);
  const [fechaHasta, setFechaHasta] = useState(fechaHoy);
  const [rol, setRol] = useState([]);
  const [selectR, setSelectR] = useState([]);
  const [reset, setReset] = useState(0);
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  const cargarRol = () => {
    let f = [];
    for (let i = 0; i < rol.rows?.length; i++) {
      if (rol?.rows[i][0] != 6) {
        f.push(<MenuItem value={rol?.rows[i][0]}>{rol?.rows[i][1]}</MenuItem>);
      }
    }
    setSelectR(f);
  };

  useEffect(async () => {
    setRol(await getRol());
    console.log(rol);
    setReset(1);
  }, []);

  useEffect(() => {
    cargarRol();
  }, [reset]);

  const guardarReporte = async (data) => {
    try {
      let f = new Date();
      data.fechaIngreso = moment(f.toISOString()).format("DD-MM-YYYY");
      data.fechaDesde = moment(fechaDesde).format("DD-MM-YYYY");
      data.fechaHasta = moment(fechaHasta).format("DD-MM-YYYY");
      data.idUsuario = idUsuario;
      const res = await postIngresarReporte(JSON.stringify(data));
      if (res.success) {
        await MySwal.fire({
          title: <strong>Exito!</strong>,
          html: <i>Guardado Correctamente!</i>,
          icon: "success",
        });
        history.push("/reportes");
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
      <h1>Generar Reporte</h1>
      <form onSubmit={handleSubmit(guardarReporte)}>
        <TextField
          name="idRol"
          {...register("idRol", { required: "Este campo es requerido" })}
          error={!!errors.idRol}
          helperText={errors.idRol ? errors.idRol.message : ""}
          className={classes.selects}
          select
          label="Rol"
          variant="outlined"
        >
          {selectR}
        </TextField>
        <div style={{ display: "flex" }}>
          <div
            style={{ width: "60%", display: "flex", justifyContent: "right" }}
          >
            <TextField
              name="fechaDesde"
              className={classes.inputs}
              label="Fecha desde"
              defaultValue={fechaDesde}
              onChange={(item) => {setFechaDesde(item.target.value)}}
              variant="outlined"
              type="date"
            ></TextField>
          </div>
          <div
            style={{ width: "60%", display: "flex", justifyContent: "left" }}
          >
            <TextField
              name="fechaHasta"
              className={classes.inputs}
              label="Fecha hasta"
              defaultValue={fechaHasta}
              onChange={(item) => {setFechaHasta(item.target.value)}}
              variant="outlined"
              type="date"
            ></TextField>
          </div>
        </div>
        <TextField
          name="titulo"
          className={classes.inputs}
          label="Nota(Opcional)"
          onChange={(item) => {}}
          variant="outlined"
          type="text"
        ></TextField>
        <Button
          className={classes.selects}
          type="submit"
          variant="contained"
          color="primary"
        >
          Enviar Reportes
        </Button>
      </form>
    </div>
  );
};

export default AñadirReporte;
