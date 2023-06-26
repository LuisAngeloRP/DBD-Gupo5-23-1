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
  Box,
  Paper,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function PresupuestoxProy() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [datos, setDatos] = useState([]);
  // añado esto
  const [presupuesto, setPresupuesto] = useState(null);
  const [totalG, setTotalG] = useState(null);
  const [porcentaje, setPorcentaje] = useState(null);

  useEffect(() => {
    const obtenerPresupuesto = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cuadro2/${id}`);
        const data = await response.json();
        setPresupuesto(data.monto_presupuesto);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPresupuesto();
  }, [id]);

  useEffect(() => {
    const obtenerTotalG = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cuadro3/${id}`);
        const data = await response.json();
        setTotalG(data.sum);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerTotalG();
  }, [id]);

  useEffect(() => {
    const obtenerPorcentaje = async () => {
      try {
        const response = await fetch(`http://localhost:4000/cuadro4/${id}`);
        const data = await response.json();
        setPorcentaje(data["Porcentaje usado del presupuesto(%)"]);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerPorcentaje();
  }, [id]);

  const cargarTareas = async (proyecto_id) => {
    const response = await fetch(
      `http://localhost:4000/presuxproyecto/${proyecto_id}`
    );
    const data = await response.json();
    setDatos(data);
  };
  useEffect(() => {
    if (id) {
      cargarTareas(id);
    }
  }, [id]);

  return (
    <>
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Reporte del presupuesto por proyecto
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

        <Typography variant="h5">Gastos</Typography>
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
                  Nombre de recurso
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Costo de recurso S/.
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha de adquisición
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datos.map((dato) => (
                <TableRow key={dato.id}>
                  <TableCell sx={{ textAlign: "center" }}>{dato.Id}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Nombre de recurso"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Costo de recurso (S/.)"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {dato["Fecha de adquisición"]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Paper variant="outlined" square>
          <Box display="flex" alignItems="center" p={2}>
            <Typography variant="h6" component="div">
              Presupuesto del proyecto
            </Typography>
            <Box ml={2} bgcolor="#f9f9f9" p={1}>
              {presupuesto}
            </Box>
          </Box>
        </Paper>
        <Paper variant="outlined" square>
          <Box display="flex" alignItems="center" p={2}>
            <Typography variant="h6" component="div">
              Total de gastos
            </Typography>
            <Box ml={2} bgcolor="#f9f9f9" p={1}>
              {totalG}
            </Box>
          </Box>
        </Paper>
        <Paper variant="outlined" square>
          <Box display="flex" alignItems="center" p={2}>
            <Typography variant="h6" component="div">
              Porcentaje usado del presupuesto %
            </Typography>
            <Box ml={2} bgcolor="#f9f9f9" p={1}>
              {porcentaje}
            </Box>
          </Box>
        </Paper>
      </div>
    </>
  );
}
