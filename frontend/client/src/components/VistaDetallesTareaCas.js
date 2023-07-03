import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  Paper,
  List,
  ListItem,
  ListItemText,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DetallesTareaComponent from "./detallesTarea";
import CrearTarea from './CrearTarea';
import DetallesTareaCasComponent from "./detallesTareaCas";
import CrearTareaCas from "./CrearTareaCas";

const TareasCas = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [tareas, setTareas] = useState({
    tareasPendientes: [],
    tareasEnProgreso: [],
    tareasFinalizadas: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openAgregarTareaDialog, setOpenAgregarTareaDialog] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/mostrar-detalles-proyecto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProyecto(data);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del proyecto:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:4000/mostrar-tarea-columnaCas`)
      .then((response) => response.json())
      .then((data) => {
        const tareasPendientes = data.tareasPendientes.map((tarea) => {
          const fechaHora = `${tarea.fecha_limite_tarea} ${tarea.hora_limite_tarea}`;
          return { ...tarea, fecha_hora: fechaHora };
        });
  
        const tareasEnProgreso = data.tareasEnProgreso.map((tarea) => {
          const fechaHora = `${tarea.fecha_limite_tarea} ${tarea.hora_limite_tarea}`;
          return { ...tarea, fecha_hora: fechaHora };
        });
  
        const tareasFinalizadas = data.tareasFinalizadas.map((tarea) => {
          const fechaHora = `${tarea.fecha_limite_tarea} ${tarea.hora_limite_tarea}`;
          return { ...tarea, fecha_hora: fechaHora };
        });
        setTareas({ tareasPendientes, tareasEnProgreso, tareasFinalizadas });
      })
      .catch((error) => {
        console.error("Error al obtener las tareas de la columna:", error);
      });
  }, []);

  if (!proyecto) {
    return <div>Cargando...</div>;
  }

  const { detallesProyecto } = proyecto;
  const { nombre_proyecto } = detallesProyecto[0];

  const handleOpenDialog = (tareaId) => {
    setOpenDialog(tareaId);
  };

  const handleCloseDialog = () => {
    setOpenDialog();
  };

  const handleOpenAgregarTareaDialog = () => {
    setOpenAgregarTareaDialog(true);
  };

  // Función para cerrar el diálogo "Agregar Tarea"
  const handleCloseAgregarTareaDialog = () => {
    setOpenAgregarTareaDialog(false);
  };


  return (
    <Paper
      style={{
        padding: "30px",
        borderRadius: "10px",
        backgroundColor: "#D9D9D9",
        margin: "36px",
      }}
    >
      <Typography variant="h5" style={{ fontSize: "48px", margin: "20px" }}>
        {nombre_proyecto}
      </Typography>
      <Table>
        <TableRow
          style={{
            marginLeft: 20,
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <TableCell
            style={{
              backgroundColor: "#C7C4C4",
              borderRadius: "8px 8px 0 0",
              borderTopColor: "transparent",
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Detalles
          </TableCell>
          <TableCell
            style={{
              backgroundColor: "#C7C4C4",
              borderRadius: "8px 8px 0 0",
              borderTopColor: "transparent",
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Hitos
          </TableCell>
          <TableCell
            style={{
              backgroundColor: "#C7C4C4",
              borderRadius: "8px 8px 0 0",
              borderTopColor: "transparent",
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Asignaciones
          </TableCell>
          <TableCell
            style={{
              backgroundColor: "#C7C4C4",
              borderRadius: "8px 8px 0 0",
              borderTopColor: "transparent",
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Presupuesto
          </TableCell>
          <TableCell
            style={{
              backgroundColor: "#C7C4C4",
              borderRadius: "8px 8px 0 0",
              borderTopColor: "transparent",
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Gastos
          </TableCell>
          <TableCell
            style={{
              backgroundColor: "#C7C4C4",
              borderRadius: "8px 8px 0 0",
              borderTopColor: "transparent",
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Reuniones
          </TableCell>
          <TableCell
            style={{
              backgroundColor: "#ECECEC",
              borderRadius: "8px 8px 0 0",
              borderTopColor: "transparent",
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            Tareas
          </TableCell>
        </TableRow>
      </Table>
      <Paper
        style={{
          width: "calc(100% - 36px)",
          height: "calc(100% - 190px)",
          padding: 18,
          backgroundColor: "#ECECEC",
          display: "flex",
        }}
      >
      
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  backgroundColor: "#C7C4C4",
                  borderRadius: "8px 8px 0 0",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Tareas Pendientes
              </Typography>
              <List
                style={{
                  backgroundColor: "#D9D9D9",
                  height: "100%",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                {tareas.tareasPendientes.map((tarea, index) => (
                  <ListItem key={index}>
                    <Grid container direction="column">
                      <Grid item>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              {tarea.nombre_tarea}
                            </Typography>
                            }
                          secondary={
                              <Typography variant="body" component="span">
                                {tarea.descripcion_tarea}
                              </Typography>
                            }
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          component="div"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "8px",
                            fontWeight: "bold",
                          }}
                        >
                          {tarea.fecha_hora}
                          <img src={require("./img/eye.png")} width='24px' onClick={() => handleOpenDialog(tarea.tarea_id)}/>
                          <Dialog 
                            open={openDialog === tarea.tarea_id} 
                            onClose={handleCloseDialog} 
                            PaperProps={{style: {
                              width: '60vw',
                              maxWidth: 'none',
                              height: '85%',
                              },}}>
                              <DialogTitle fontSize='48px'>Tarea </DialogTitle>
                              <DialogContent>
                                  <DetallesTareaCasComponent id={tarea.tarea_id} />
                              </DialogContent>
                              <DialogActions>
                                  <Button onClick={handleCloseDialog} color="primary">
                                  Cerrar
                                  </Button>
                              </DialogActions>
                          </Dialog>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  backgroundColor: "#C7C4C4",
                  borderRadius: "8px 8px 0 0",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Tareas en Progreso
              </Typography>
              <List
                style={{
                  backgroundColor: "#D9D9D9",
                  height: "100%",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                {tareas.tareasEnProgreso.map((tarea) => (
                  <ListItem key={tarea.tarea_id}>
                    <Grid container direction="column">
                      <Grid item>
                        <ListItemText
                          primary={
                            <Typography variant="h6">
                              {tarea.nombre_tarea}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body" component="span">
                              {tarea.descripcion_tarea}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          component="div"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "8px",
                            fontWeight: "bold",
                          }}
                        >
                          {tarea.fecha_hora}
                          <img
                            src={require("./img/eye.png")}
                            width="24px"
                            onClick={() => handleOpenDialog(tarea.tarea_id)}
                          />
                          <Dialog
                            open={openDialog === tarea.tarea_id}
                            onClose={handleCloseDialog}
                            PaperProps={{
                              style: {
                                width: "60vw",
                                maxWidth: "none",
                                height: "85%",
                              },
                            }}
                          >
                            <DialogTitle fontSize="48px">Tarea </DialogTitle>
                            <DialogContent>
                              <DetallesTareaCasComponent id={tarea.tarea_id} />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleCloseDialog} color="primary">
                              Cerrar
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  backgroundColor: "#C7C4C4",
                  borderRadius: "8px 8px 0 0",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Tareas Finalizadas
              </Typography>
              <List
                style={{
                  backgroundColor: "#D9D9D9",
                  height: "100%",
                  borderRadius: "0 0 8px 8px",
                }}
              >
                {tareas.tareasFinalizadas.map((tarea, index) => (
                  <ListItem key={index}>
                    <Grid container direction="column">
                      <Grid item>
                        <ListItemText
                          primary={
                          <Typography variant="h6">
                            {tarea.nombre_tarea}
                          </Typography>
                          }
                          secondary={
                            <Typography variant="body" component="span">
                              {tarea.descripcion_tarea}
                            </Typography>
                          }
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                          component="div"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            gap: "8px",
                            fontWeight: "bold",
                          }}
                        >
                          {tarea.fecha_hora}
                          <img src={require("./img/eye.png")} width='24px' onClick={() => handleOpenDialog(tarea.tarea_id)}/>
                          <Dialog 
                            open={openDialog === tarea.tarea_id} 
                            onClose={handleCloseDialog} 
                            PaperProps={{style: {
                              width: '60vw',
                              maxWidth: 'none',
                              height: '85%',
                              },}}>
                            <DialogTitle fontSize='48px'>Tarea </DialogTitle>
                            <DialogContent>
                                <DetallesTareaCasComponent id={tarea.tarea_id} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog} color="primary">
                                Cerrar
                                </Button>
                            </DialogActions>
                          </Dialog>
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
        <Dialog 
          open={openAgregarTareaDialog} 
          onClose={handleCloseAgregarTareaDialog} 
          PaperProps={{ style: 
            {width: '40vw', 
            maxWidth: 'none', 
            height: '85%' } }}>
          <DialogTitle fontSize='56px'>Agregar Tarea</DialogTitle>
          <DialogContent>
            <CrearTareaCas proyecto_id = {id}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAgregarTareaDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>

        <div style={{ 
          position: 'absolute', 
          bottom: '16px', 
          right: '16px' }}>
            <Button variant="contained" onClick={handleOpenAgregarTareaDialog} style={{backgroundColor:"#000", fontSize:24}}>
                Agregar Tarea
            </Button>
        </div>
      </Paper>
    </Paper>
  );
};

export default TareasCas;
