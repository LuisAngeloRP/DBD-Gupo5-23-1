import { useEffect, useState, useRef } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Grid,
  Typography
} from "@mui/material";

import {useParams, useNavigate } from "react-router-dom";

export default function ListaPartidas() {
  const { id, id_pre} = useParams();
  const [listaPartidas, setListaPartidas] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();

  const cargarListaPartidas = async () => {
    const response = await fetch("http://localhost:4000/partidas");
    const data = await response.json();
    setListaPartidas(data);
  };

  useEffect(() => {
    cargarListaPartidas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    await fetch("http://localhost:4000/partidas/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    cargarListaPartidas();
    formRef.current.reset();
  };

  const obtenerFechaActual = () => {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    return `${anio}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`;
  };


  return (
    <Container>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Partida
      </Typography>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="descripcion"
              label="Descripción"
              fullWidth
              margin="normal"
              placeholder="Ingrese la descripción"
            />
            <TextField
              name="fecha_estimacion"
              label="Fecha estimación"
              fullWidth
              margin="normal"
              defaultValue={obtenerFechaActual()}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="monto"
              label="Monto"
              type="number"
              fullWidth
              margin="normal"
              placeholder="Ingrese el monto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="divisa"
              label="Divisa"
              fullWidth
              margin="normal"
              placeholder="Ingrese la divisa"
            />
            <TextField
              name="estado_partida"
              label="Estado"
              fullWidth
              margin="normal"
              placeholder="Ingrese el estado de la partida"
            />
            <TextField
              name="presupuesto_id"
              label="Presupuesto Id"
              fullWidth
              margin="normal"
              placeholder="Ingrese el ID del presupuesto"
            />
            <TextField
              name="tipo_partida"
              label="Tipo Partida"
              fullWidth
              margin="normal"
              placeholder="Ingrese el tipo de partida"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Agregar Partida
        </Button>
      </form>
      {/* Tabla de partidas */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Partida Id</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha estimación</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Divisa</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Presupuesto Id</TableCell>
              <TableCell>Tipo Partida</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaPartidas.map((row) => (
              <TableRow
                key={row.partida_id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => navigate(`/proyecto/${id}/presupuestos/${id_pre}/partidas/${row.partida_id}/gastos`)}
              >
                <TableCell>{row.partida_id}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.fecha_estimacion}</TableCell>
                <TableCell>{row.monto}</TableCell>
                <TableCell>{row.divisa}</TableCell>
                <TableCell>{row.estado_partida}</TableCell>
                <TableCell>{row.presupuesto_id}</TableCell>
                <TableCell>{row.tipo_partida}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Botones adicionales */}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Quitar Partida
        </Button>
        <Button variant="contained" color="primary">
          Editar Partida
        </Button>
      </Box>
    </Container>
  );
}
