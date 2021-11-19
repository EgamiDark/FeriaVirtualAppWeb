import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import Tabla from "../Tabla";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import useAuth from "../../auth/useAuth";

import {
  getVentasLocalesUsuario,
  getOfertasProductos,
} from "../../Api/ventaLocal";
import { getProductos } from "../../Api/datosFk";
import { getPedidos } from "../../Api/pedido";

const ContProductos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = ["Producto", "Monto Total", "Acciones"];

  const [rows, setRows] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [productos, setProductos] = useState([]);
  const [misVentasLocales, setMisVentasLocales] = useState([]);
  const [ofertasProductos, setOfertasProductos] = useState([]);

  const [reset, setReset] = useState(0);
  const [reload, setReload] = useState(0);

  const iteRows = () => {
    let r = [];
    
    for (let i = 0; i < misVentasLocales.rows?.length; i++) {
      let f = [];

      // venta local
      for (let op = 0; op < ofertasProductos.rows?.length; op++) {

        // obtiene ofertas productos relacionadas con la venta local
        if (ofertasProductos?.rows[op][0] == misVentasLocales?.rows[i][2]) {
          // pedido
          for (let pe = 0; pe < pedido.rows?.length; pe++) {

            // busca el pedido correspondiente a la oferta producto
            if (pedido?.rows[pe][0] == ofertasProductos?.rows[op][6]) {
              // productos
              for (let pr = 0; pr < productos.rows?.length; pr++) {

                // busca el producto correspondiente al pedido
                if (productos?.rows[pr][0] == pedido?.rows[pe][8]) {
                  // Esto setea el nombre del producto
                  f.push(productos?.rows[pr][1]);
                  break;
                }
              }
            }
          }
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

  useEffect(async () => {
    // Obtiene todos los productos
    setProductos(await getProductos());

    // Obtiene todos los pedidos
    setPedido(await getPedidos());

    // Obtiene entas Locales de un Usuario por id del mismo
    setMisVentasLocales(await getVentasLocalesUsuario(idUsuario));

    // Obtiene ofertas productos
    setOfertasProductos(await getOfertasProductos());

    setReload(0);
    setReset(1);
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
