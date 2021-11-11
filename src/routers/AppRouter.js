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
  OfertarProducto
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
        { rol!==2 ?
        <PrivateRoute exact path="/subastas" component={Subastas} />:<Redirect to="/home"/>}
        { rol!==2 ?
        <PrivateRoute exact path="/ofertarSubasta" component={OfertarSubasta} />:<Redirect to="/home"/>}
        { rol!==2 ?
        <PrivateRoute exact path="/modificarOfertaS" component={ModificarOfertaS} />:<Redirect to="/home"/>}
        { rol!==2 ?
        <PrivateRoute exact path="/misOfertas" component={MisOfertas} />:<Redirect to="/home"/>}
        { rol!==2 ?
        <PrivateRoute exact path="/misVehiculos" component={MisVehiculos} />:<Redirect to="/home"/>}
        { rol!==2 ?
        <PrivateRoute exact path="/añadirVehiculo" component={AñadirVehiculo} />:<Redirect to="/home"/>}
        { rol!==2 ?
        <PrivateRoute exact path="/modificarVehiculo" component={ModificarVehiculo} />:<Redirect to="/home"/>}
        { rol!==3 ?
        <PrivateRoute exact path="/pedidos" component={Pedidos} />:<Redirect to="/home"/>}
        { rol!==3 ?
        <PrivateRoute exact path="/ofertarProducto" component={OfertarProducto} />:<Redirect to="/home"/>}
        { rol!==3 ?
        <PrivateRoute exact path="/misProductos" component={MisProductos} />:<Redirect to="/home"/>}
        { rol!==3 ?
        <PrivateRoute exact path="/modificarOfertaP" component={ModificarOfertaP} />:<Redirect to="/home"/>}
        { rol!==3 ?
        <PrivateRoute exact path="/misContratos" component={MisContratos} />:<Redirect to="/home"/>}
        { rol!==4 ?
        <PrivateRoute exact path="/misPedidos" component={MisPedidos} />:<Redirect to="/home"/>}
        { rol!==4 ?
        <PrivateRoute exact path="/modificarPedido" component={ModificarPedido} />:<Redirect to="/home"/>}
        { rol!==4 ?
        <PrivateRoute exact path="/añadirPedido" component={AñadirPedido} />:<Redirect to="/home"/>}
        { rol!==4 ?
        <PrivateRoute exact path="/misPagos" component={MisPagos} />:<Redirect to="/home"/>}
        <PrivateRoute exact path="/perfil" component={Perfil} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
