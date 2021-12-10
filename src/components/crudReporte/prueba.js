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

const Prueba = () => {
  const classes = useStyles();

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <h1>Generar Reporte Prueba</h1>
      <form onSubmit={() => {}}>
      <TextField
          name="email"
          className={classes.inputs}
          label="Email"
          variant="outlined"
          
        ></TextField>
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

export default Prueba;
