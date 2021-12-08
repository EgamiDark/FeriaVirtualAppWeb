import { useHistory } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tabla from "../Tabla";

const ContInforme = () => {
  const history = useHistory();
  let nomRows = ["Id Reporte","Fecha Ingreso", "Fecha Desde", "Fecha Hasta", "Rol"];
  let rows = [];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Reportes</h1>
      <div style={{ textAlign: "right", padding: 5 }}>
        <Tooltip title="Ingresar Informe">
          <IconButton
            sx={{ color: "white", backgroundColor: "green" }}
            aria-label="add"
            onClick={() => history.push("/añadirReporte")}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContInforme;
