import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { SingIn } from "../Api";
import { useForm } from "react-hook-form";
import useAuth from "../auth/useAuth";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import logo from '../img/Logo5.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        FeriaVirtualApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divlogo: {
    margin: theme.spacing(1),
  },
  logo:{
    width:350
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const MySwal = withReactContent(Swal)
  const history = useHistory();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const Olvido= async () =>{
    await MySwal.fire({
      title: <strong>Que Mal!</strong>,
      html: <i>Esta funcionalidad aun esta en contruccion!</i>,
      icon: 'warning'
    })
  }

  const onSubmit = async (data) => {
    try {
      const res = await SingIn(JSON.stringify(data));
      const d = res.rows[0]

      console.log(JSON.stringify(data))
      if(d){
        
        auth.login(d)
        history.push("/home")
      }
      else{
        await MySwal.fire({
          title: <strong>Que Mal!</strong>,
          html: <i>Los datos ingresados son incorrectos!</i>,
          icon: 'error'
        })
      }
    } catch (error) {
      await MySwal.fire({
        title: <strong>Que Mal!</strong>,
        html: <i>La base de datos se encuentra en mantenimiento, intente mas tarde!</i>,
        icon: 'warning'
      })
    }
    
  }; 

  const classes = useStyles();

  return (
    <Container style={{backgroundColor:"white"}} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.divLogo}>
          <img className={classes.logo} src={logo}/>
        </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="email"
            {...register ("email", {required: "required", validate: "validation"})}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            variant="outlined"
            required
            margin="normal"
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            type="email"
          />
          <TextField
            name="contrasenia"
            {...register ("contrasenia", {required: "required", validate: "validation"})}
            error={!!errors.contrasenia}
            required
            helperText={errors.contrasenia ? errors.contrasenia.message : ""}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={()=>Olvido()} variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
