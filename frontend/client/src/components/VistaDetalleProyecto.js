import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Proyecto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [proyecto, setProyecto] = useState(null);

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

  if (!proyecto) {
    return <div>Cargando...</div>;
  }

  const { detallesProyecto, desarrolladores, hardware, software, adjuntos } =
    proyecto;

  const {
    nombre_proyecto,
    nombre_cliente,
    fecha_creacion,
    fecha_finalizacion_estimada,
    descripcion_proyecto,
    jefe_proyecto,
  } = detallesProyecto[0];
  const fechaCreacionFix = fecha_creacion.substring(0, 10);
  const fechaFinalizacionFix = fecha_finalizacion_estimada.substring(0, 10);

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
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/detalles-proyecto" style={{ textDecoration: "none", color: "inherit" }}>
              Detalles
            </Link>
          </TableCell>
          <TableCell
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/hitos" style={{ textDecoration: "none", color: "inherit" }}>
              Hitos
            </Link>
          </TableCell>
          <TableCell
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button onClick={() => navigate(`/lista-proyecto/${id}/asignaciones-recursos`)} style={{ textDecoration: "none", color: "inherit" }}>
              Asignaciones
            </Button>
          </TableCell>
          <TableCell
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button onClick={() => navigate(`/proyecto/${id}/presupuestos`)} style={{ textDecoration: "none", color: "inherit" }}>
              Presupuesto
            </Button>
          </TableCell>
          <TableCell
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/gastos" style={{ textDecoration: "none", color: "inherit" }}>
              Gastos
            </Link>
          </TableCell>
          <TableCell
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
          </TableCell>
          <TableCell
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/tareas" style={{ textDecoration: "none", color: "inherit" }}>
              Tareas
            </Link>
          </TableCell>
          <TableCell
            component={Button}
            variant="contained"
            color="primary"
            style={{
              fontSize: "20px",
              marginTop: "8px",
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
            }}
          >
           
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
        <div style={{ flex: 1 }}>
          <Typography variant="h6">Cliente:</Typography>
          <Typography
            style={{
              width: "calc(100% - 32px)",
              marginTop: 6,
              backgroundColor: "#D9D9D9",
              paddingLeft: 10,
              fontSize: 20,
            }}
          >
            {nombre_cliente}
          </Typography>

          <Typography variant="h6" marginTop="17px">
            Fecha de creación:
          </Typography>
          <Typography
            style={{
              width: "calc(100% - 32px)",
              marginTop: 6,
              backgroundColor: "#D9D9D9",
              paddingLeft: 10,
              fontSize: 20,
            }}
          >
            {fechaCreacionFix}
          </Typography>

          <Typography variant="h6" marginTop="17px">
            Fecha de finalización:
          </Typography>
          <Typography
            style={{
              width: "calc(100% - 32px)",
              marginTop: 6,
              backgroundColor: "#D9D9D9",
              paddingLeft: 10,
              fontSize: 20,
            }}
          >
            {fechaFinalizacionFix}
          </Typography>
          <Typography variant="h6" marginTop="17px">
            Descripción:
          </Typography>
          <Typography
            style={{
              width: "calc(100% - 32px)",
              marginTop: 6,
              backgroundColor: "#D9D9D9",
              paddingLeft: 10,
              fontSize: 20,
            }}
          >
            {descripcion_proyecto}
          </Typography>
          <Typography variant="h6" marginTop="17px">
            Hardware:
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {hardware.map((hardware, index) => (
              <div
                key={index}
                style={{
                  width: "calc(100% - 22px)",
                  marginTop: 6,
                  backgroundColor: "#D9D9D9",
                }}
              >
                <Typography style={{ paddingLeft: 10, fontSize: 20 }}>
                  {hardware.recurso_hardware}
                </Typography>
              </div>
            ))}
          </div>
        </div>
        <div
          style={{ flex: 1, borderLeft: "1px solid #000000", paddingLeft: 11 }}
        >
          <Typography variant="h6">Jefe de Proyecto:</Typography>
          <Typography
            style={{
              flex: "1 0 100%",
              marginTop: 6,
              backgroundColor: "#D9D9D9",
              paddingLeft: 10,
              fontSize: 20,
            }}
          >
            {jefe_proyecto}
          </Typography>
          <Typography variant="h6" marginTop="17px">
            Desarrolladores:
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {desarrolladores.map((desarrollador, index) => (
              <div
                key={index}
                style={{
                  flex: "1 0 100%",
                  marginTop: 6,
                  backgroundColor: "#D9D9D9",
                }}
              >
                <Typography style={{ paddingLeft: 10, fontSize: 20 }}>
                  {desarrollador.desarrolladores}
                </Typography>
              </div>
            ))}
          </div>
          <Typography variant="h6" marginTop="17px">
            Software:
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {software.map((software, index) => (
              <div
                key={index}
                style={{
                  flex: "1 0 100%",
                  margin: 6,
                  backgroundColor: "#D9D9D9",
                }}
              >
                <Typography style={{ paddingLeft: 10, fontSize: 20 }}>
                  {software.recurso_software}
                </Typography>
              </div>
            ))}
          </div>
          <Typography variant="h6" marginTop="17px">
            Adjuntos:
          </Typography>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {adjuntos.map((adjuntos, index) => (
              <div
                key={index}
                style={{
                  flex: "1 0 100%",
                  marginTop: 6,
                  backgroundColor: "#D9D9D9",
                }}
              >
                <Link
                  to={adjuntos.adjunto_link}
                  target="_blank"
                  download={adjuntos.nombre_adjunto}
                >
                  <Typography style={{ paddingLeft: 10, fontSize: 20 }}>
                    {adjuntos.nombre_adjunto}
                  </Typography>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </Paper>
  );
};

export default Proyecto;
