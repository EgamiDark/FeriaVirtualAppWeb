import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { useState, useEffect } from "react";
import { getRol } from "../../Api";

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

const AñadirInforme = () => {
  const classes = useStyles();
  let mesAtras = new Date();
  mesAtras.setDate(mesAtras.getDate() - 30);
  let fechaMesAtras = moment(mesAtras.toISOString()).format("YYYY-MM-DD");
  let hoy = new Date();
  let fechaHoy = moment(hoy.toISOString()).format("YYYY-MM-DD");
  const [rol, setRol] = useState([]);
  const [selectR, setSelectR] = useState([]);
  const [reset, setReset] = useState(0);

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

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h1>Generar Reporte</h1>
      <form onSubmit={() => {}}>
        <TextField
          name="rol"
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
              name="desde"
              className={classes.inputs}
              label="Fecha desde"
              defaultValue={fechaMesAtras}
              onChange={(item) => {}}
              variant="outlined"
              type="date"
            ></TextField>
          </div>
          <div
            style={{ width: "60%", display: "flex", justifyContent: "left" }}
          >
            <TextField
              name="hasta"
              className={classes.inputs}
              label="Fecha hasta"
              defaultValue={fechaHoy}
              onChange={(item) => {}}
              variant="outlined"
              type="date"
            ></TextField>
          </div>
        </div>
        <Button
          className={classes.selects}
          type="submit"
          variant="contained"
          color="primary"
        >
          Enviar Informes
        </Button>
      </form>
    </div>
  );
};

export default AñadirInforme;
