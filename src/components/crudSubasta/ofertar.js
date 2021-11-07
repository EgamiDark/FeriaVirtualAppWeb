import TextField from "@material-ui/core/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { postOfertar } from "../../Api/subasta";

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
    const [fechaHoy, setFechaHoy] = useState();
    const [reset, setReset] = useState(0);

    const classes = useStyles();

    const guardarOferta = async (data) => {
        try {
          const res = await postOfertar(JSON.stringify(data));
    
          if (res.success) {
            await MySwal.fire({
              title: <strong>Exito!</strong>,
              html: (
                <i>
                  Guardado Correctamente!
                </i>
              ),
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

    useEffect(() => {
        let today = new Date()
        setFechaHoy(today.toISOString().substring(0, 10))
        setReset(1)
    }, [reset])

    return (
        <div style={{ textAlign: "center", width: "100%" }}>
            <h1>Añadir Oferta</h1>
            <form onSubmit={handleSubmit(guardarOferta)}>
                <TextField
                    name="idSubasta"
                    {...register("idSubasta", {
                        required: "required",
                        validate: "validation",
                    })}
                    className={classes.inputs}
                    label="Id Subasta "
                    variant="outlined"
                    value={history.location.state?.idSubasta}
                    disabled
                ></TextField>
                <TextField
                    name="precioOferta"
                    {...register("precioOferta", {
                        required: "required",
                        validate: "validation",
                    })}
                    className={classes.inputs}
                    label="Precio Oferta"
                    variant="outlined"
                    type="number"
                ></TextField>
                <TextField
                    name="cantidadTransporte"
                    {...register("cantidadTransporte", {
                        required: "required",
                        validate: "validation",
                    })}
                    className={classes.inputs}
                    label="Cantidad a Transportar"
                    variant="outlined"
                    type="number"
                ></TextField>
                <TextField
                    name="fechaEntrega"
                    {...register("fechaEntrega", {
                        required: "required",
                        validate: "validation",
                    })}
                    className={classes.inputs}
                    label="Fecha Entrega(Aprox.)"
                    
                    variant="outlined"
                    type="date"
                    defaultValue={fechaHoy}
                ></TextField>
                <TextField
                    name="patente"
                    {...register("patente", { required: "required" })}
                    className={classes.selects}
                    select
                    label="Vehiculo"
                    variant="outlined"
                    helperText="Seleccione el vehículo para transporte"
                >
                    <MenuItem value={1}>QE-RW-22</MenuItem>
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