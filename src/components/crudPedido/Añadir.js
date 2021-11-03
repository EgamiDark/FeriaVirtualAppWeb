import TextField from "@material-ui/core/TextField";

const Añadir = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Añadir Pedido</h1>
      <form style={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column"}}>
        <TextField
          name="cantidad"
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label="Cantidad a Solicitar"
          autoComplete="cantidad"
          autoFocus
          type="number"
          style={{width:"30%"}}
        />
        <TextField
          name="kg"
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label="KG X Unidad"
          autoComplete="kg"
          autoFocus
          type="number"
          style={{width:"30%"}}
        />
        <TextField
          name="precio"
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label="Precio Maximo(Unid.)"
          autoComplete="precio"
          autoFocus
          type="number"
          style={{width:"30%"}}
        />
      </form>
    </div>
  );
};

export default Añadir;