import React from "react";
import {
  Typography,
  TextField,
  IconButton,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logo from "./fotoTech.jpeg";
import { Link } from "react-router-dom";

export default function Ventana1() {
  const [selectedProjectId, setSelectedProjectId] = React.useState(null);
  const [showProjects, setShowProjects] = React.useState(false);
  const [projects, setProjects] = React.useState([]);

  const projectItemStyle = {
    color: "dark",
  };

  const cargarProyectos = async () => {
    try {
      const response = await fetch("http://localhost:4000/proyectos");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error al cargar los proyectos:", error);
    }
  };

  const handleToggleProjects = () => {
    setShowProjects(!showProjects);
    if (!showProjects) {
      cargarProyectos();
    }
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            backgroundColor: "#d9d9d9",
            padding: "30px",
            marginRight: "30px",
            marginTop: "150px",
            borderRadius: "2%",
          }}
        >
          <div
            style={{
              backgroundColor: "#d9d9d9",
              padding: "15px",
              marginRight: "600px",
            }}
          >
            <Typography variant="h4">Reportes</Typography>
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                marginTop: "10px",
                borderRadius: "0.5%",
              }}
            >
              <Typography variant="h5">Informes por proyecto</Typography>
              <Typography variant="subtitle1">Seleccionar Proyectos</Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <TextField
                  label="Buscar proyectos"
                  variant="outlined"
                  fullWidth
                />
                <IconButton onClick={handleToggleProjects}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </div>
              {showProjects && (
                <List>
                  {projects.map((project) => (
                    <ListItem
                      button
                      key={project.proyecto_id}
                      onClick={() => handleSelectProject(project.proyecto_id)}
                      style={
                        project.proyecto_id === selectedProjectId
                          ? { backgroundColor: "#e0e0e0" }
                          : null
                      }
                    >
                      <ListItemText
                        primary={project.nombre_proyecto}
                        style={projectItemStyle}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </div>
          <hr
            style={{
              backgroundColor: "black",
              height: "6px",
              border: "none",
              margin: 0,
              marginTop: "10px",
            }}
          />
          <Typography variant="h6">Generar Reportes</Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "20px",
              marginBottom: "80px",
            }}
          >
            <Button
              variant="contained"
              component={Link}
              to={`/presuxpro/${selectedProjectId}`}
              style={{
                marginBottom: "25px",
                marginRight: "20px",
                backgroundColor: "black",
              }}
              disabled={!selectedProjectId} // Deshabilitar el botón si no hay un proyecto seleccionado
            >
              Presupuesto
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/objetivos/${selectedProjectId}`}
              style={{
                marginBottom: "25px",
                marginRight: "20px",
                backgroundColor: "black",
              }}
              disabled={!selectedProjectId} // Deshabilitar el botón si no hay un proyecto seleccionado
            >
              Objetivos
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/planifivsRepor/1/2`}
              style={{
                marginBottom: "25px",
                marginRight: "20px",
                backgroundColor: "black",
              }}
              disabled={!selectedProjectId} // Deshabilitar el botón si no hay un proyecto seleccionado
            >
              Planificado vs Reportado
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/empleadoxProy/${selectedProjectId}`}
              style={{
                marginBottom: "25px",
                marginRight: "20px",
                backgroundColor: "black",
              }}
              disabled={!selectedProjectId} // Deshabilitar el botón si no hay un proyecto seleccionado tengo sueño
            >
              Horas de empleado por proyecto
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/tareas/${selectedProjectId}`}
              style={{
                marginBottom: "25px",
                marginRight: "20px",
                backgroundColor: "black",
              }}
              disabled={!selectedProjectId} // Deshabilitar el botón si no hay un proyecto seleccionado
            >
              Tareas por proyecto
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/repRecurso/${selectedProjectId}`}
              style={{
                marginBottom: "25px",
                marginRight: "10px",
                backgroundColor: "black",
              }}
              disabled={!selectedProjectId} // Deshabilitar el botón si no hay un proyecto seleccionado
            >
              Recursos
            </Button>
            <Button
              variant="contained"
              component={Link}
              to={`/progreso/${selectedProjectId}`}
              style={{
                marginBottom: "25px",
                marginRight: "10px",
                backgroundColor: "black",
              }}
              disabled={!selectedProjectId} // Deshabilitar el botón si no hay un proyecto seleccionado
            >
              Progreso
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
