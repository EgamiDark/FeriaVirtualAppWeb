import {Route, Redirect} from 'react-router-dom'
import useAuth from '../auth/useAuth';

const PrivateRoute = ({component:Component, ...rest})=>{
    const auth = useAuth();
    return <Route {...rest}>{auth.user? <Component/>:<Redirect to="/"/>}</Route>
}

export default PrivateRoute;