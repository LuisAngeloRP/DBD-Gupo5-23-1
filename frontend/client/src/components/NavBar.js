import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useNavigate, Link } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
//   const MiComponente = () => {
//     const [nombreUsuario, setNombreUsuario] = useState('');
  
//     // Función para manejar el inicio de sesión
//     const handleLogin = (nombre) => {
//       // Realizar lógica de inicio de sesión
//       // ...
  
//       // Actualizar el estado con el nombre de usuario
//       setNombreUsuario(nombre);
//     };

  return (
    <Box >
      <AppBar position="static" sx= {{
        backgroundColor: '#FFFFFF',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "9px 45px"
      }}>

        <img src={require("./img/Logo.png")} width="158" height="68" style={{}}/>

        <div style={{display: "flex", alignItems: "center" }}>

            <img src={require("./img/bell.png")} style={{width:"27", height:"30",  marginRight: 25}}/>
            <img src={require("./img/calendar.png")} style={{width:"30", height:"30",  marginRight: 25}}/>

            <div style={{ width: 179, 
                            height: 42, 
                            position: "relative", 
                            backgroundColor: "#D9D9D9", 
                            borderRadius: 20, 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "left"}}>
                <img src={require("./img/user.png")} style={{width:"30", height:"30",  marginLeft: 8}}/>
                <Typography variant="body1" style={{ marginLeft: '10px', color:"#000000"}}>
                    {/* {nombreUsuario ? `Hola, ${nombreUsuario}` : 'Iniciar sesión'} */}
                    Luigui Layme
                </Typography>
            </div>

        </div>
      </AppBar>
    </Box>
  );
}