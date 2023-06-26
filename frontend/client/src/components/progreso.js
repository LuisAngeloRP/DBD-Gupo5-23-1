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
import { useNavigate } from "react-router-dom";
import "./estilo.css";
// añado useParams

export default function Progreso() {
  // añado

  const [fechaCreacion, setFechaCreacion] = useState("");

  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const url = `http://localhost:4000/progreso/${fechaCreacion}`;
      const response = await fetch(url);
      const data = await response.json();
      setDatos(data);
    };

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      if (fechaCreacion) {
        cargarDatos();
      }
    }, 1500);

    setTimeoutId(newTimeoutId);
    return () => clearTimeout(timeoutId);
  }, [fechaCreacion]);

  return (
    <>
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Reporte de progreso
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

        <div className="fecha-input">
          <label htmlFor="fechaCreacion">Fecha creación:</label>
          <input
            type="text"
            id="fechaCreacion"
            value={fechaCreacion}
            onChange={(e) => setFechaCreacion(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          //   component={Link}
          //   to={`/planifivsRepor/${fechaCreacion}`}
          style={{
            marginBottom: "4px",
            marginRight: "20px",
            backgroundColor: "black",
            fontSize: 12,
          }}
        >
          Consultar
        </Button>
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
                  Proyecto
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tot.reuniones
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tareas a tiempo %
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tareas a destiempo %
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tareas no entregadas %
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Presupuesto
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Gastos
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha creación
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha final est.
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tiempo trans. "sem"
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
              {datos.map((dato) => (
                <TableRow key={dato.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato.Proyecto}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Tot.reuniones"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Tareas a tiempo(%)"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Tareas a destiempo(%)"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Tareas no entregadas(%)"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Presupuesto"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato.Gastos}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Fecha creación"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Fecha final est."]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Tiempo trans.(sem)"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Estado"]}
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
