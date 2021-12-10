import { useHistory } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tabla from "../Tabla";
import {getUsuarios} from '../../Api/auth'
import {getReportes} from '../../Api/reporte'
import {getRol} from '../../Api'
import { useState, useEffect } from "react";
import moment from "moment";

const ContInforme = () => {
  const history = useHistory();
  let nomRows = ["Id Reporte","Usuario Consultor","Fecha Ingreso", "Fecha Desde", "Fecha Hasta", "Rol Reporte","Nota"];
  const [rows,setRows] = useState([]);
  const [reportes,setReportes] = useState([]);
  const [roles,setRoles] = useState([]);
  const [usuarios,setUsuarios] = useState([]);
  const [reset,setReset] = useState(0);

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < reportes.rows?.length; i++) {
      let f = []

      f.push(reportes?.rows[i][0])
      for (let u = 0; u < usuarios.rows?.length; u++) {
        if(usuarios?.rows[u][0]==reportes?.rows[i][6]){
          f.push(usuarios?.rows[u][2]+' '+usuarios?.rows[u][3])
        }
      }
      f.push(moment(reportes?.rows[i][2]).format("DD/MM/YYYY"))
      f.push(moment(reportes?.rows[i][3]).format("DD/MM/YYYY"))
      f.push(moment(reportes?.rows[i][4]).format("DD/MM/YYYY"))
      for (let r = 0; r < roles.rows?.length; r++) {
        if(roles?.rows[r][0]==reportes?.rows[i][5]){
          f.push(roles?.rows[r][1])
        }
      }
      
      f.push(reportes?.rows[i][1])
      r.push(f);      
    }

    setRows(r);
  }

  useEffect(async () => {
    setReportes(await getReportes());
    setUsuarios(await getUsuarios())
    setRoles(await getRol())
    setReset(1);
  },[])

  useEffect(() => {
    iteRows();
  },[reset])

  return (  
    <div style={{ textAlign: "center" }}>
      <h1>Reportes</h1>
      <div style={{ textAlign: "right", padding: 5 }}>
        <Tooltip title="Ingresar Reporte">
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
