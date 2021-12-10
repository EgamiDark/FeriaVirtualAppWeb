import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Material UI
import Tabla from "../Tabla";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import useAuth from "../../auth/useAuth";

import { getPedidos } from "../../Api/pedido";
import { getOfertasVentalocal, comprarVL, cambiaEstOfertaVL } from "../../Api/ventaLocal";
import { getEstOfertaProd, getProductos } from "../../Api/datosFk";

import moment from "moment";

const ContProductos = () => {
  const MySwal = withReactContent(Swal);
  let auth = useAuth();
  let idUsuario = auth?.user[0];

  let nomRows = [
    "Id Pedido",
    "Producto",
    "Precio Unidad",
    "Cantidad Ofertada",
    "KG X Unidad",
    "Fecha Cosecha",
    "Fecha Caducidad",
    "Estado",
    "Acción",
  ];

  const [rows, setRows] = useState([]);
  const [misOfertasVL, setMisOfertasVL] = useState([]);
  const [producto, setProducto] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [estOfer, setEstOfer] = useState([]);
  const [reload, setReload] = useState(0);
  const [reset, setReset] = useState(0);

  const comprar = async (idOfertaProd, precio, cantidad, kgUnidad) => {
    const montoTotal = precio * cantidad;

    let data = {};
    data.montoTotal = montoTotal;
    data.idOfertaProd = idOfertaProd;
    data.idUsuario = idUsuario;

    await MySwal.fire({
      title: "Proceso de Compra",
      text: "El total a pagar es de : $" + montoTotal,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, comprar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await comprarVL(JSON.stringify(data));
          const resCambiaEst = await cambiaEstOfertaVL(JSON.stringify(data));
          console.log(resCambiaEst);

          if (res.success && resCambiaEst) {
            await MySwal.fire(
              "Compra!",
              "Proceso realizado con exito!",
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
    for (let i = 0; i < misOfertasVL.rows?.length; i++) {
      let f = [];
      // Id Pedido
      f.push(misOfertasVL?.rows[i][6]);

      for (let p = 0; p < pedido.rows?.length; p++) {
        if (pedido?.rows[p][0] == misOfertasVL?.rows[i][6]) {
          for (let pr = 0; pr < producto.rows?.length; pr++) {
            if (pedido?.rows[p][8] == producto?.rows[pr][0]) {
              // Esto setea el nombre del producto
              f.push(producto?.rows[pr][1]);
              break;
            }
          }
          break;
        }
      }
      f.push("$"+misOfertasVL?.rows[i][1]);
      f.push(misOfertasVL?.rows[i][2]);
      f.push(misOfertasVL?.rows[i][3]);
      f.push(moment(misOfertasVL?.rows[i][4]).format("DD/MM/YYYY"));
      f.push(moment(misOfertasVL?.rows[i][5]).format("DD/MM/YYYY"));
      for (let e = 0; e < estOfer.rows?.length; e++) {
        if (estOfer?.rows[e][0] == misOfertasVL?.rows[i][7]) {
          f.push(estOfer?.rows[e][1]);
          break;
        }
      }
      f.push(
        <div>
          <IconButton
            sx={{ color: "blue" }}
            aria-label="comprar"
            onClick={() => {
              comprar(
                misOfertasVL?.rows[i][0],
                misOfertasVL?.rows[i][1],
                misOfertasVL?.rows[i][2],
                misOfertasVL?.rows[i][3]
              );
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
        </div>
      );
      r.push(f);
    }
    setRows(r);
  };

  useEffect(async () => {
    setMisOfertasVL(await getOfertasVentalocal());
    setProducto(await getProductos());
    setPedido(await getPedidos());
    setEstOfer(await getEstOfertaProd());
    setReload(0);
    setReset(1);
  }, [reload]);
  useEffect(() => {
    iteRows();
  }, [reset]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Ofertas Productos</h1>
      <Tabla nomRows={nomRows} rows={rows} />
    </div>
  );
};

export default ContProductos;
