import {
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo2.png";

export default function NavBarra() {
  const navigate = useNavigate();
  return (
    
      <Box sx={{ width: "200px", backgroundColor: "#f0f0f0" }}>
        <Link to="/">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "100%", maxWidth: "150px" }}
            />
          </Box>
        </Link>
        <List component="nav">
          <ListItem button onClick={() => navigate("/lista-proyectos")}>
            <ListItemText primary="Proyectos" />  
          </ListItem>
          <ListItem button onClick={() => navigate("/lista-proyectos/1")}>
            <ListItemText primary="Asignaciones" />
          </ListItem>
          <ListItem button onClick={() => navigate("/presupuestos")}>
            <ListItemText primary="Presupuesto" />
          </ListItem>
          <ListItem button onClick={() => navigate("/reportes")}>
            <ListItemText primary="Reportes" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Pestaña 5" />
          </ListItem>
        </List>
      </Box>
     
    
  );
}
