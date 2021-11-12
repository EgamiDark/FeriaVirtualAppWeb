import React from "react";
import ContHome from "../components/contenido/ContHome";
import ContMisContratos from "../components/contenido/ContMisContratos";
import ContMisPagos from "../components/contenido/ContMisPagos";
import ContMisPedidos from "../components/contenido/ContMisPedidos";
import ContMisProductos from "../components/contenido/ContMisProductos";
import ContMisOfertas from "../components/contenido/ContMisOfertas";
import ContMisVehiculos from "../components/contenido/ContMisVehiculos";
import AñadirV from "../components/crudVehiculo/Añadir"
import ModificarV from "../components/crudVehiculo/modificarVehiculo"
import ContPedidos from "../components/contenido/ContPedidos";
import AñadirP from "../components/crudPedido/Añadir"
import ModificarP from "../components/crudPedido/modificarPedido"
import OferProd from "../components/crudPedido/ofertar"
import ModOferP from "../components/crudPedido/modificarOferta"
import ContPerfil from "../components/contenido/ContPerfil";
import ContSubastas from "../components/contenido/ContSubastas";
import OferSubasta from "../components/crudSubasta/ofertar"
import ModOferS from "../components/crudSubasta/modificarOferta"
import DashBoard from "../components/dashboard/Dashboard";
import OfertasVL from "../components/contenido/ContProductos";
import MisVL from "../components/contenido/ContMisPedidosVL";

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

export const ModificarPedido = () =>{
  return <DashBoard contenido={<ModificarP/>}/>
}

export const OfertarProducto = () =>{
  return <DashBoard contenido={<OferProd/>}/>
}

export const ModificarOfertaP = () =>{
  return <DashBoard contenido={<ModOferP/>}/>
}

export const Perfil = () => {
  return <DashBoard contenido={<ContPerfil/>}/>
};

export const Subastas = () => {
  return <DashBoard contenido={<ContSubastas/>}/>
};

export const OfertarSubasta = () =>{
  return <DashBoard contenido={<OferSubasta/>}/>
}

export const ModificarOfertaS = () =>{
  return <DashBoard contenido={<ModOferS/>}/>
}

export const ModificarVehiculo = () =>{
  return <DashBoard contenido={<ModificarV/>}/>
}

export const OfertasVentaLocal = () =>{
  return <DashBoard contenido={<OfertasVL/>}/>
}

export const MisVentasLocales = () =>{
  return <DashBoard contenido={<MisVL/>}/>
}