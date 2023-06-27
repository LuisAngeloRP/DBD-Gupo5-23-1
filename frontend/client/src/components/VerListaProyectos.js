import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ListaProyectos() {
  const navigate = useNavigate();
  const [listaProyectos, setListaProyectos] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const cargarListaProyectos = async () => {
    const response = await fetch(
      "http://localhost:4000/mostrar-lista-proyectos"
    );
    const data = await response.json();
    setListaProyectos(data);
  };

  useEffect(() => {
    cargarListaProyectos();
  }, []);

  const handleCheckboxChange = (projectId) => {
    setSelectedProjectId(projectId === selectedProjectId ? null : projectId);
  };

  return (
    <Container>
      <Typography
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          fontWeight: "bold",
          fontSize: "3.5rem",
          fontFamily: "monospace",
        }}
      >
        Lista de proyectos en desarrollo
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "600px", overflowY: "auto" }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#4285F4" }}>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Id
            </TableCell>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Fecha de creación
            </TableCell>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Fecha de finalización
            </TableCell>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Nombre
            </TableCell>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Descripción
            </TableCell>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Estado
            </TableCell>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            >
              Cliente
            </TableCell>
            <TableCell
              sx={{
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            ></TableCell>
          </TableHead>
          <TableBody>
            {listaProyectos.map((row) => (
              <TableRow
                key={row.proyecto_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigate(`/proyecto/${row.proyecto_id}`)}
              >
                <TableCell sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {row.proyecto_id}
                </TableCell>
                <TableCell sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {row.fecha_creacion}
                </TableCell>
                <TableCell sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {row.fecha_finalizacion_estimada}
                </TableCell>
                <TableCell sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {row.nombre_proyecto}
                </TableCell>
                <TableCell sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {row.descripcion_proyecto}
                </TableCell>
                <TableCell sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {row.estado_proyecto}
                </TableCell>
                <TableCell sx={{ fontSize: "1.2rem", textAlign: "center" }}>
                  {row.nombre_cliente}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
