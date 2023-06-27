import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  Table,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DetallesTareaComponent from "./detallesTarea";
import CrearReunion from "./crearReunion";

const ListaReuion = () => {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);
  const [reunion, setReunion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCrearReunion = () => {
    // Lógica adicional si es necesario antes o después de crear la reunión
    handleCloseDialog(); // Cerrar el diálogo después de crear la reunión
  };

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
    fetch(`http://localhost:4000/mostrar-lista-reunion/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setReunion(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!proyecto) {
    return <div>Cargando...</div>;
  }
  const { detallesProyecto } = proyecto;
  const { proyecto_id, nombre_proyecto } = detallesProyecto[0];

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
            Reuniones
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
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div>
            <div
              style={{
                width: "calc(100% - 12px)",
                borderRadius: "12px 12px 0 0",
                height: "40px",
                backgroundColor: "#000",
              }}
            ></div>
            {reunion.map((reunionItem, index) => (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "row", marginTop: 12 }}
              >
                <Typography
                  variant="body1"
                  style={{
                    width: 42,
                    textAlign: "center",
                    marginRight: 12,
                    backgroundColor: "#A1C5BC",
                    fontSize: 28,
                    padding: "6px 0",
                  }}
                >
                  <strong>{index + 1}</strong>
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    width: "30%",
                    textAlign: "center",
                    marginRight: 12,
                    backgroundColor: "#A1C5BC",
                    fontSize: 28,
                    padding: "6px 0",
                  }}
                >
                  {reunionItem.dia_hora}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    width: "calc(70% - 66px)",
                    textAlign: "center",
                    marginRight: 12,
                    backgroundColor: "#A1C5BC",
                    fontSize: 28,
                    padding: "6px 0",
                  }}
                >
                  {reunionItem.descripcion_reunion}
                </Typography>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: "16px", right: "16px" }}>
            <Button
              variant="contained"
              onClick={handleOpenDialog}
              style={{ backgroundColor: "#000", fontSize: 24 }}
            >
              Agregar Reunion
            </Button>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              PaperProps={{
                style: {
                  width: "40vw",
                  maxWidth: "none",
                  height: "70%",
                },
              }}
            >
              <DialogTitle fontSize="56px">Crear Reunión</DialogTitle>
              <DialogContent>
                <CrearReunion proyecto_id={proyecto_id} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="secondary">
                  Cerrar
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </Paper>
    </Paper>
  );
};

export default ListaReuion;
