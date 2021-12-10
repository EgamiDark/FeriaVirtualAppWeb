import { useState, useEffect } from "react";

// Material UI
import Tooltip from "@mui/material/Tooltip";
import Tabla from "../Tabla";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";

// Sweetalert2
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import useAuth from "../../auth/useAuth";

import {
  getVentasLocalesUsuario,
  getOfertasProductos,
  cancelarVL,
  getEstadosVenta
} from "../../Api/ventaLocal";
import { getProductos } from "../../Api/datosFk";
import { getPedidos } from "../../Api/pedido";

const ContProductos = () => {
  let auth = useAuth();
  let idUsuario = auth?.user[0];
  let nomRows = ["Id compra","Producto","Cantidad" ,"Monto Total", "Estado", "Acción"];

  const MySwal = withReactContent(Swal);

  const [rows, setRows] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [estadosVenta, setEstadosVenta] = useState([]);
  const [productos, setProductos] = useState([]);
  const [misVentasLocales, setMisVentasLocales] = useState([]);
  const [ofertasProductos, setOfertasProductos] = useState([]);

  const [reset, setReset] = useState(0);
  const [reload, setReload] = useState(0);

  const cancelarPedido = async (data) => {
    console.log("Id de venta local: " + data);
    await MySwal.fire({
      title: "¿Esta seguro de cancelar este pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar pedido!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await cancelarVL(JSON.stringify({ idVentaLocal: data[0],  idOfertaProd: data[2]}));
          if (res.success) {
            await MySwal.fire(
              "Cancelada!",
              "Este pedido ha sido cancelado.",
              "success"
            );
            setReset(0);
            setReload(1);
          } else {
            await MySwal.fire({
              title: <strong>Que Mal!</strong>,
              html: <i>Ha ocurrido un error intentelo nuevamente!</i>,
              icon: "error",
            });
          }
        } catch (error) {
          await MySwal.fire({
            title: <strong>Que Mal!</strong>,
            html: (
              <i>
                La base de datos se encuentra en mantenimiento, intente mas
                tarde!
              </i>
            ),
            icon: "warning",
          });
        }
      }
    });
  };

  const iteRows = () => {
    let r = [];

    for (let i = 0; i < misVentasLocales.rows?.length; i++) {
      let f = [];

      f.push(misVentasLocales?.rows[i][0]);
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
                  // setea el nombre del producto
                  f.push(productos?.rows[pr][1]);
                  break;
                }
              }
            }
          }
        }
      }

      //Cantidad
      f.push(misVentasLocales?.rows[i][5]);

      // Monto Total
      f.push(misVentasLocales?.rows[i][1]);

      // Estado de venta
      for (let e = 0; e < estadosVenta.rows?.length; e++) {
        if (misVentasLocales?.rows[i][4] == estadosVenta?.rows[e][0]) {
          f.push(estadosVenta?.rows[e][1]);
        }
      }
      switch (misVentasLocales?.rows[i][4]) {
        case 1:
          f.push(
            <div>
              <Tooltip title="Cancelar">
              <IconButton
                sx={{ color: "red" }}
                aria-label="cancelar"
                onClick={() => {
                  cancelarPedido(misVentasLocales?.rows[i]);
                }}
              >
                <CancelIcon />
              </IconButton>
              </Tooltip>
            </div>
          );
          break;
        case 2:
        case 3:
        case 4:
        case 5:
          f.push(
            <div>
              <Tooltip title="No Cancelable">
              <IconButton
                sx={{ color: "fff", opacity: "60%"  }}
                aria-label="cancelar"
                onClick={() => {
                  
                }}
              >
                <CancelIcon />
              </IconButton>
              </Tooltip>
            </div>
          );
          break;
        default:
          break;
      }
      r.push(f);
    }
    setRows(r);
  };

  useEffect(async () => {
    // Obtiene todos los estados de venta
    setEstadosVenta(await getEstadosVenta())

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
      <h1>Mis Pedidos</h1>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContProductos;
