import { useEffect, useState } from "react";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
// añado useParams

export default function Tareas() {
  // añado

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [tareas, setTareas] = useState([]);

  const cargarTareas = async (proyecto_id) => {
    const response = await fetch(`http://localhost:4000/tareas/${proyecto_id}`);
    const data = await response.json();
    setTareas(data);
  };
  useEffect(() => {
    if (id) {
      cargarTareas(id);
    }
  }, [id]);

  return (
    <>
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Reporte de tareas
      </Typography>

      <div
        style={{
          marginTop: "15px",
          height: "30px",
          backgroundColor: "black",
          marginBottom: "10px",
          marginRight: "10px",
          marginLeft: "10px",
        }}
      ></div>

      <div
        style={{
          marginTop: "15px",
          height: "50px",
          backgroundColor: "#ccc",
          marginBottom: "10px",
          marginRight: "10px",
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, margin: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Volver
          </Button>
        </div>

        <Typography variant="h5">Proyecto</Typography>
      </div>

      <div
        style={{
          backgroundColor: "#ccc",
          borderRadius: "5px",
          padding: "10px",
          margin: "10px",
          height: "70vh",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tarea
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Encargado
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha inicio
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha límite
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha fin
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Descripción
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tareas.map((tarea) => (
                <TableRow key={tarea.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {tarea.Tarea}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {tarea.Encargado}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {tarea["Fecha inicio"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {tarea["Fecha límite"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {tarea["Fecha fin"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {tarea.Descripcion}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {tarea.Estado}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
