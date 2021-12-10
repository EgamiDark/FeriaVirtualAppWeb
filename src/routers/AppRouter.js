import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import SignIn from "../templates/SingIn";
import Error404 from "../templates/Error404";
import PrivateRoute from "./PrivateRoute";
import {
  Home,
  Pedidos,
  MisProductos,
  MisContratos,
  MisPedidos,
  MisPagos,
  Subastas,
  MisOfertas,
  MisVehiculos,
  Perfil,
  AñadirPedido,
  ModificarPedido,
  AñadirVehiculo,
  OfertarSubasta,
  ModificarOfertaS,
  ModificarVehiculo,
  ModificarOfertaP,
  OfertarProducto,
  OfertasVentaLocal,
  MisVentasLocales,
  MisPagosVL,
  Reportes,
  AñadirReporte,
  Prueba
} from "../templates/Pages";
import useAuth from '../auth/useAuth'
import { useState } from "react";
import { useEffect } from "react";

const AppRouter = () => {
  let auth = useAuth();
  const [rol,setRol]=useState(0);
  useEffect(()=>{
    if(auth.user){
      setRol(auth.user[9]);
    }
  },[])
  
  
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/login" component={SignIn} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/reportes" component={Reportes} />
        <PrivateRoute exact path="/prueba" component={Prueba} />
        <PrivateRoute exact path="/añadirReporte" component={AñadirReporte} />
        <PrivateRoute exact path="/subastas" component={Subastas} />
        <PrivateRoute exact path="/ofertarSubasta" component={OfertarSubasta} />
        <PrivateRoute exact path="/modificarOfertaS" component={ModificarOfertaS} />
        <PrivateRoute exact path="/misOfertas" component={MisOfertas} />
        <PrivateRoute exact path="/misVehiculos" component={MisVehiculos} />
        <PrivateRoute exact path="/añadirVehiculo" component={AñadirVehiculo} />
        <PrivateRoute exact path="/modificarVehiculo" component={ModificarVehiculo} />
        <PrivateRoute exact path="/pedidos" component={Pedidos} />
        <PrivateRoute exact path="/ofertarProducto" component={OfertarProducto} />
        <PrivateRoute exact path="/misProductos" component={MisProductos} />
        <PrivateRoute exact path="/modificarOfertaP" component={ModificarOfertaP} />
        <PrivateRoute exact path="/misContratos" component={MisContratos} />
        <PrivateRoute exact path="/misPedidos" component={MisPedidos} />
        <PrivateRoute exact path="/modificarPedido" component={ModificarPedido} />
        <PrivateRoute exact path="/añadirPedido" component={AñadirPedido} />
        <PrivateRoute exact path="/misPagos" component={MisPagos} />
        <PrivateRoute exact path="/misPagosVL" component={MisPagosVL} />
        <PrivateRoute exact path="/ofertasVL" component={OfertasVentaLocal} />
        <PrivateRoute exact path="/misVL" component={MisVentasLocales} />
        <PrivateRoute exact path="/perfil" component={Perfil} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
