import Tabla from "../Tabla"
import {useState,useEffect} from 'react'
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getOfertas, postCancelarOferta } from "../../Api/subasta";
import useAuth from '../../auth/useAuth';
import { getEstOferta } from "../../Api/datosFk";
import { useHistory } from "react-router-dom";
import moment from "moment";

const ContMisOfertas = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory();
  let auth = useAuth();
  let idUsuario = auth?.user[0];
  let nomRows = ["Id Subasta", "Fecha Entrega","Precio Oferta","Cantidad Transporte","Transporte","Estado", "Acción"];
  const [oferta,setOferta] = useState([])
  const [estOferta,setEstOferta] = useState([])
  const [rows,setRows] = useState([])
  const [reset,setReset] = useState(0);

  const cancelarOferta = async (id)=>{
    await MySwal.fire({
      title: '¿Esta seguro de cancelar esta oferta?',
      text: "Si quieres volver a ofertar deberas ir al apartado de subastas!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelar oferta!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await postCancelarOferta(id);
          if (res.success) {
            await MySwal.fire(
              'Cancelada!',
              'Esta oferta ha sido cancelada.',
              'success'
            )
            history.go(1);
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
                La base de datos se encuentra en mantenimiento, intente mas tarde!
              </i>
            ),
            icon: "warning",
          });
        }
        
      }
    })
  }
  const iteRows = ()=>{
    let r = []
    for (let i = 0; i < oferta.rows?.length; i++) {
      let f = []
      f.push(oferta?.rows[i][0])
      f.push(moment(oferta?.rows[i][1]).format("DD/MM/YYYY"))
      f.push(oferta?.rows[i][2])
      f.push(oferta?.rows[i][3])
      f.push(oferta?.rows[i][4])
      for (let e = 0; e < estOferta.rows?.length; e++) {
        if(estOferta.rows[e][0]==oferta?.rows[i][5]){
          f.push(estOferta.rows[e][1]);
          break;
        } 
      }
      //f.push(oferta?.rows[i][6])id oferta
      f.push(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton sx={{ color: "blue" }} aria-label="update" onClick={() => history.push({pathname:"/ofertarSubasta",state:{idOferta:oferta?.rows[i][6]}})}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ color: "red" }} aria-label="delete" onClick={()=>{cancelarOferta(oferta?.rows[i][6])}}>
            <CancelIcon />
          </IconButton>
        </div>
      )
      r.push(f)
    }
    setRows(r)
  }

  useEffect(async ()=>{
    setOferta(await getOfertas(idUsuario))
    setEstOferta(await getEstOferta())
    setReset(1);
  },[])
  useEffect(()=>{
    iteRows();
  },[reset])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis Ofertas</h1>
      <Tabla nomRows={nomRows} rows={rows}/>
    </div>
  );
};
export default ContMisOfertas;
