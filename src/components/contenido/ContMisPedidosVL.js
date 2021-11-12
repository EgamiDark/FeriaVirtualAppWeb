import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import Tabla from "../Tabla";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useAuth from "../../auth/useAuth";

import { getVentasLocalesUsuario, getOfertasVentalocal } from "../../Api/ventaLocal";
import { getEstOfertaProd, getProductos } from "../../Api/datosFk";
import { getPedidos } from "../../Api/pedido"

const ContProductos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = [
    "Producto",
    "Monto Total",
  ];

  const [rows, setRows] = useState([]);
  const [productos, setProductos] = useState([]);
  const [misVentasLocales, setMisVentasLocales] = useState([]);

  const [ventaLocal, setVentaLocal] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [reload, setReload] = useState(0);
  const [reset, setReset] = useState(0);

  const iteRows = () => {
    let r = [];
    for (let i = 0; i < misVentasLocales.rows?.length; i++) {
      let f = [];

      for (let p = 0; p < ventaLocal.rows?.length; p++) {
        if (ventaLocal?.rows[p][2] == misVentasLocales?.rows[i][6]) {
          for (let pr = 0; pr < productos.rows?.length; pr++) {
            if (misVentasLocales?.rows[p][8] == productos?.rows[pr][0]) {
              // Esto setea el nombre del producto
              f.push(productos?.rows[pr][1]);
              break;
            }
          }
          break;
        }
      }

      // Monto Total
      f.push(misVentasLocales?.rows[i][1]);
      f.push(
        <div>
          <IconButton sx={{ color: "blue" }} aria-label="update">
            <ShoppingCartIcon />
          </IconButton>
        </div>
      );
      r.push(f);
    }
    setRows(r);
  };
  console.log(misVentasLocales)

  useEffect(async () => {
    setProductos(await getProductos());
    setVentaLocal(await getOfertasVentalocal());
    setMisVentasLocales(await getVentasLocalesUsuario(idUsuario));
    setPedido(await getPedidos())
    setReload(0);
    setReset(1);
    console.log(ventaLocal);
  }, [reload]);
  useEffect(() => {
    iteRows();
  }, [reset]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Ofertas(Productos)</h1>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContProductos;
