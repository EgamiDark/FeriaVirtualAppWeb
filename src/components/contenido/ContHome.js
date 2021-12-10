import enContru from "../../img/Logo5.png";
const ContHome = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "50px" }}>Bienvenido a Feria Virtual</h1>
      <img src={enContru} style={{ width: "50%", margin: "auto", marginBottom: "25px" }}/>
      <h3 style={{ width: "50%", margin: "auto" }}>
        Este es un sistema de subastas para productos y vehículos en los cuales
        puedes participar según tu rol en el sistema
      </h3>
      <br/>
    </div>
  );
};

export default ContHome;
