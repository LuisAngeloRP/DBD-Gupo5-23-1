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

export default function Objetivos() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [objetivos, setObjetivos] = useState([]);

  const cargarObjetivos = async (proyecto_id) => {
    const response = await fetch(
      `http://localhost:4000/objetivos/${proyecto_id}`
    );
    const data = await response.json();
    setObjetivos(data);
  };
  useEffect(() => {
    if (id) {
      cargarObjetivos(id);
    }
  }, [id]);

  return (
    <>
      <Typography textAlign="center" variant="h4" fontWeight="bold">
        Reporte de objetivos
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
                  Nombre del hito
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Descripción del hito
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha inicio del hito
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Fecha final del hito
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "#3498DB",
                    color: "#FFFFFF",
                    textAlign: "center",
                  }}
                >
                  Observación
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {objetivos.map((objetivo) => (
                <TableRow key={objetivo.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {objetivo["ID"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {objetivo["Nombre del hito"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {objetivo["Descripcion del hito"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {objetivo["Fecha inicio del hito"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {objetivo["Fecha final del hito"]}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {objetivo.Observacion}
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
