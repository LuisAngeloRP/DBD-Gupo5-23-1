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

import { useNavigate } from "react-router-dom";

export default function ListaGastos() {
  const [listaGastos, setListaGastos] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();

  const cargarListaGastos = async () => {
    const response = await fetch("http://localhost:4000/gastos");
    const data = await response.json();
    setListaGastos(data);
  };

  useEffect(() => {
    cargarListaGastos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    await fetch("http://localhost:4000/gastos/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    cargarListaGastos();
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
        Gasto
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
              name="fecha"
              label="Fecha"
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
              name="partida_id"
              label="Partida Id"
              fullWidth
              margin="normal"
              placeholder="Ingrese el ID de la partida"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Agregar Gasto
        </Button>
      </form>
      {/* Tabla de gastos */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Gasto Id</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Divisa</TableCell>
              <TableCell>Partida Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaGastos.map((row) => (
              <TableRow
                key={row.gasto_id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => navigate(`/gastos/${row.gasto_id}`)}
              >
                <TableCell>{row.gasto_id}</TableCell>
                <TableCell>{row.descripcion}</TableCell>
                <TableCell>{row.fecha}</TableCell>
                <TableCell>{row.monto}</TableCell>
                <TableCell>{row.divisa}</TableCell>
                <TableCell>{row.partida_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Botones adicionales */}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Quitar Gasto
        </Button>
        <Button variant="contained" color="primary">
          Editar Gasto
        </Button>
      </Box>
    </Container>
  );
}
