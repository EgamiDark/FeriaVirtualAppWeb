import React,{useState,useEffect} from 'react';
import {Dashboard,ShoppingCart,AccountCircle,Logout, AddShoppingCart,AttachMoney,Book,LocalShipping,Sell} from '@mui/icons-material'
import ListItemButton from '@mui/material/ListItemButton/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon'
import ListItemText from '@mui/material/ListItemText/ListItemText'
import useAuth from '../../auth/useAuth';
import { useHistory } from "react-router-dom";

const MainListItems = ()=>{
  let auth = useAuth();
  const [rol,setRol]=useState(0);
  useEffect(()=>{
    if(auth.user){
      setRol(auth.user[9]);
    }
  },[])
  const history = useHistory();
  return(
  <div>
    
    <ListItemButton onClick={()=>history.push("/home")}>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>
    { rol===2 ?
    <ListItemButton onClick={()=>history.push("/subastas")}>
      <ListItemIcon>
        <AddShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Subastas" />
    </ListItemButton>:<></>}
    { rol===2 ?
    <ListItemButton onClick={()=>history.push("/misOfertas")}>
      <ListItemIcon>
        <Sell />
      </ListItemIcon>
      <ListItemText primary="Mis Ofertas" />
    </ListItemButton>:<></>}
    { rol===2 ?
    <ListItemButton onClick={()=>history.push("/misVehiculos")}>
      <ListItemIcon>
        <LocalShipping />
      </ListItemIcon>
      <ListItemText primary="Mis Vehiculos" />
    </ListItemButton>:<></>}
    { rol===3 ?
    <ListItemButton onClick={()=>history.push("/pedidos")}>
      <ListItemIcon>
      <AddShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Pedidos" />
    </ListItemButton>:<></>}
    { rol===3 ?
    <ListItemButton onClick={()=>history.push("/misProductos")}>
      <ListItemIcon>
        <Sell />
      </ListItemIcon>
      <ListItemText primary="Mis Productos" />
    </ListItemButton>:<></>}
    { rol===3 ?
    <ListItemButton onClick={()=>history.push("/misContratos")}>
      <ListItemIcon>
        <Book />
      </ListItemIcon>
      <ListItemText primary="Mis Contratos" />
    </ListItemButton>:<></>}
    { rol===4 ?
    <ListItemButton onClick={()=>history.push("/misPedidos")}>
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Mis Pedidos" />
    </ListItemButton>:<></>}
    { rol===4 ?
    <ListItemButton onClick={()=>history.push("/misPagos")}>
      <ListItemIcon>
        <AttachMoney />
      </ListItemIcon>
      <ListItemText primary="Mis Pagos" />
    </ListItemButton>:<></>}

    { rol===5 ?
    <ListItemButton onClick={()=>history.push("/ofertasVL")}>
      <ListItemIcon>
        <Sell />
      </ListItemIcon>
      <ListItemText primary="Mis Ofertas" />
    </ListItemButton>:<></>}

    { rol===5 ?
    <ListItemButton onClick={()=>history.push("/misVL")}>
      <ListItemIcon>
        <ShoppingCart />
      </ListItemIcon>
      <ListItemText primary="Mis Pedidos" />
    </ListItemButton>:<></>}

    { rol===5 ?
    <ListItemButton onClick={()=>history.push("/misPagos")}>
      <ListItemIcon>
        <AttachMoney />
      </ListItemIcon>
      <ListItemText primary="Mis Pagos" />
    </ListItemButton>:<></>}
    
    <ListItemButton onClick={()=>history.push("/perfil")}>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Perfil" />
    </ListItemButton>

    <ListItemButton onClick={()=>auth.logout()}>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="Cerrar Sesión" />
    </ListItemButton>
  </div>
)}

export default MainListItems;
