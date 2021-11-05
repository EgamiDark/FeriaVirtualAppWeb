import React from "react";
import ContHome from "../components/contenido/ContHome";
import ContMisContratos from "../components/contenido/ContMisContratos";
import ContMisPagos from "../components/contenido/ContMisPagos";
import ContMisPedidos from "../components/contenido/ContMisPedidos";
import ContMisProductos from "../components/contenido/ContMisProductos";
import ContMisOfertas from "../components/contenido/ContMisOfertas";
import ContMisVehiculos from "../components/contenido/ContMisVehiculos";
import AñadirV from "../components/crudVehiculo/Añadir"
import ContPedidos from "../components/contenido/ContPedidos";
import AñadirP from "../components/crudPedido/Añadir"
import ContPerfil from "../components/contenido/ContPerfil";
import ContSubastas from "../components/contenido/ContSubastas";
import DashBoard from "../components/dashboard/Dashboard";



export const Home = () => {
  return <DashBoard contenido={<ContHome/>}/>
};

export const MisContratos = () => {
  return <DashBoard contenido={<ContMisContratos/>}/>
};

export const MisPagos = () => {
  return <DashBoard contenido={<ContMisPagos/>}/>
};

export const MisPedidos = () => {
  return <DashBoard contenido={<ContMisPedidos/>}/>
};

export const MisProductos = () => {
  return <DashBoard contenido={<ContMisProductos/>}/>
};

export const MisOfertas = () => {
  return <DashBoard contenido={<ContMisOfertas/>}/>
};

export const MisVehiculos = () => {
  return <DashBoard contenido={<ContMisVehiculos/>}/>
};

export const AñadirVehiculo = () =>{
  return <DashBoard contenido={<AñadirV/>}/>
}

export const Pedidos = () => {
  return <DashBoard contenido={<ContPedidos/>}/>
};

export const AñadirPedido = () =>{
  return <DashBoard contenido={<AñadirP/>}/>
}

export const Perfil = () => {
  return <DashBoard contenido={<ContPerfil/>}/>
};

export const Subastas = () => {
  return <DashBoard contenido={<ContSubastas/>}/>
};