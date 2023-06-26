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

export default function ReporteRecursos() {
  // añado

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  const [sobras, setSobras] = useState([]);

  useEffect(() => {
    const obtenerSobrantes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/sobrantes/${id}`);
        const data = await response.json();
        setSobras(data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerSobrantes();
  }, [id]);

  const cargarDatos = async (proyecto_id) => {
    const response = await fetch(
      `http://localhost:4000/recursos/${proyecto_id}`
    );
    const data = await response.json();
    setDatos(data);
  };
  useEffect(() => {
    if (id) {
      cargarDatos(id);
    }
  }, [id]);

  return (
    <>
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Reporte de recursos
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
                  Id
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Recurso
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tipo
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Proveedor
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Cant. asig.
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Costo
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Cant. disp.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((dato) => (
                <TableRow key={dato.id}>
                  <TableCell sx={{ textAlign: "center" }}>{dato.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato.recurso}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato.tipo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato.proveedor}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Cant. asig."]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato.costo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Cant. disp."]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <Typography style={{ fontWeight: "bold" }}>
          Recursos sobrantes
        </Typography>
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
                  Id
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Recurso
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Tipo
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Proveedor
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Cant. disp.
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Costo
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Cant. total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sobras.map((sobra) => (
                <TableRow key={sobra.id}>
                  <TableCell sx={{ textAlign: "center" }}>{sobra.id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {sobra.recurso}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {sobra.tipo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {sobra.proveedor}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {sobra["Cant. disp"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {sobra.costo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {sobra["Cant.total"]}
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
