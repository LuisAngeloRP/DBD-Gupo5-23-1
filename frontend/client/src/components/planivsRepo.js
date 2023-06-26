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
import { useNavigate, Link } from "react-router-dom";
import "./estilo.css";
// añado useParams

export default function PlanifivsReportado() {
  // añado

  const [fechaCreacion, setFechaCreacion] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  //   const { fecha1, fecha2 } = useParams();

  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);

  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const url = `http://localhost:4000/planivsrepo/${fechaCreacion}/${fechaFin}`;
      const response = await fetch(url);
      const data = await response.json();
      setDatos(data);
    };

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      if (fechaCreacion && fechaFin) {
        cargarDatos();
      }
    }, 1500);

    setTimeoutId(newTimeoutId);
    return () => clearTimeout(timeoutId);
  }, [fechaCreacion, fechaFin]);

  return (
    <>
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Planificado vs Reportado
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
        <div className="fecha-input">
          <label htmlFor="fechaFin">Fecha fin:</label>
          <input
            type="text"
            id="fechaFin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          component={Link}
          to={`/planifivsRepor/${fechaCreacion}/${fechaFin}`}
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
                  Fecha Inicio
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha fin estimada
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
                  Horas empleadas
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
                    {dato["Fecha Inicio"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Fecha fin estimada"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Fecha fin"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Horas empleadas"]}
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
