import React,{useEffect, useState} from "react";
import perfil from "../../img/perfil.jpg";
import useAuth from '../../auth/useAuth';
import {getRol} from "../../Api";
import { width } from "dom-helpers";
import { borderRadius } from "@mui/system";
const ContPerfil = () => {
  let auth = useAuth();
  const [roles,setRoles]=useState([]);
  const [rol, setRol] = useState("");
  const [reset, setReset]=useState(0);

  const iteRol = async ()=>{
    for (let i = 0; i < roles.rows?.length; i++) {
      if(auth?.user[9]==roles.rows[i][0]){
        setRol(roles.rows[i][1])
        break;
      }
    }
  }

  useEffect (async ()=>{
    setRoles(await getRol());
    setReset(1);
  },[])

  useEffect(()=>{
    iteRol();
  },[reset])
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Perfil</h1>
      <img src={perfil} style={{width:"200px", borderRadius:"30px"}}/>
      <h3>Nombre: {auth?.user[2]}</h3>
      <h3>Apellidos: {auth?.user[3]}</h3>
      <h3>Correo: {auth?.user[4]}</h3>
      <h3>Direccion: {auth?.user[7]}</h3>
      <h3>Telefono: {auth?.user[8]}</h3>
      <h3>Rol: {rol}</h3>
    </div>
  );
};
export default ContPerfil;
