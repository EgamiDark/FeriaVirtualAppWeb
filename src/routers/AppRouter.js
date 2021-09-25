import { BrowserRouter, Route, Switch } from "react-router-dom";
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
  MisSubastas,
  MisVehiculos,
  Perfil,
} from "../templates/Pages";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/login" component={SignIn} />
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/pedidos" component={Pedidos} />
        <PrivateRoute exact path="/misProductos" component={MisProductos} />
        <PrivateRoute exact path="/misContratos" component={MisContratos} />
        <PrivateRoute exact path="/misPedidos" component={MisPedidos} />
        <PrivateRoute exact path="/misPagos" component={MisPagos} />
        <PrivateRoute exact path="/subastas" component={Subastas} />
        <PrivateRoute exact path="/misSubastas" component={MisSubastas} />
        <PrivateRoute exact path="/misVehiculos" component={MisVehiculos} />
        <PrivateRoute exact path="/perfil" component={Perfil} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
