import Tabla from "../Tabla";
import { useState, useEffect } from "react";

import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

import { getContratos, descargarPDF } from "../../Api/contrato";
import useAuth from "../../auth/useAuth";

import moment from "moment";

const base64 = require("base64topdf");

const ContMisContratos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = ["Fecha Creación", "Fecha Termino", "Acción"];
  const [rows, setRows] = useState([]);
  const [misContratos, setMisContratos] = useState([]);
  const [reset, setReset] = useState(0);

  const descargarPDF = async (pdfBLOB) => {
    const linkSource = `data:application/pdf;base64,${pdfBLOB}`;
    const downloadLink = document.createElement("a");
    const fileName = "contrato.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const iteRows = async () => {
    let r = [];

    for (let i = 0; i < misContratos.rows?.length; i++) {
      let f = [];

      let fechaCreacion = moment(misContratos?.rows[i][1]).format(
        "DD/MM/YYYY hh:mm:ss"
      );
      f.push(fechaCreacion);

      let fechaTermino = moment(misContratos?.rows[i][2]).format(
        "DD/MM/YYYY hh:mm:ss"
      );
      f.push(fechaTermino);

      // Este seria el PDF
      console.log(misContratos?.rows[i][4]);
      f.push(
        <div>
          <IconButton
            sx={{ color: "green" }}
            aria-label="add"
            onClick={() => {
              descargarPDF(misContratos?.rows[i][4]);
            }}
          >
            <DownloadIcon />
          </IconButton>
        </div>
      );

      r.push(f);
    }

    setRows(r);
  };

  useEffect(async () => {
    setMisContratos(await getContratos(idUsuario));
    setReset(1);
  }, []);

  useEffect(() => {
    iteRows();
  }, [reset]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Contratos</h1>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContMisContratos;
