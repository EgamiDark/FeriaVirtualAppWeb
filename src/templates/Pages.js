import React from "react";
import ContHome from "../components/ContHome";
import ContMisContratos from "../components/ContMisContratos";
import ContMisPagos from "../components/ContMisPagos";
import ContMisPedidos from "../components/ContMisPedidos";
import ContMisProductos from "../components/ContMisProductos";
import ContMisSubastas from "../components/ContMisSubastas";
import ContMisVehiculos from "../components/ContMisVehiculos";
import ContPedidos from "../components/ContPedidos";
import ContPerfil from "../components/ContPerfil";
import ContSubastas from "../components/ContSubastas";
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

export const MisSubastas = () => {
  return <DashBoard contenido={<ContMisSubastas/>}/>
};

export const MisVehiculos = () => {
  return <DashBoard contenido={<ContMisVehiculos/>}/>
};

export const Pedidos = () => {
  return <DashBoard contenido={<ContPedidos/>}/>
};

export const Perfil = () => {
  return <DashBoard contenido={<ContPerfil/>}/>
};

export const Subastas = () => {
  return <DashBoard contenido={<ContSubastas/>}/>
};