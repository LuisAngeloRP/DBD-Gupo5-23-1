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

import { useParams, useNavigate } from "react-router-dom";

export default function ListaPresupuestos() {

  const { id} = useParams();
  const [listaPresupuestos, setListaPresupuestos] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();

  const cargarListaPresupuestos = async () => {
    const response = await fetch("http://localhost:4000/presupuestos");
    const data = await response.json();
    setListaPresupuestos(data);
  };

  useEffect(() => {
    cargarListaPresupuestos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData.entries());
    await fetch("http://localhost:4000/presupuestos/crear", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });
    cargarListaPresupuestos();
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
        Presupuesto
      </Typography>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="descripcion_presupuesto"
              label="Descripción"
              fullWidth
              margin="normal"
              placeholder="Ingrese la descripción"
            />
            <TextField
              name="fecha_creacion_presupuesto"
              label="Fecha creación"
              fullWidth
              margin="normal"
              defaultValue={obtenerFechaActual()}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="monto_presupuesto"
              label="Monto"
              type="number"
              fullWidth
              margin="normal"
              placeholder="Ingrese el monto"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="divisa_presupuesto"
              label="Divisa"
              fullWidth
              margin="normal"
              placeholder="Ingrese la divisa"
            />
            <TextField
              name="porcentaje_usado"
              label="Uso"
              fullWidth
              margin="normal"
              placeholder="Ingrese el porcentaje de uso"
            />
            <TextField
              name="estado_presupuesto"
              label="Estado"
              fullWidth
              margin="normal"
              placeholder="Ingrese el estado"
            />
            <TextField
              name="proyecto_id"
              label="Proyecto Id"
              fullWidth
              margin="normal"
              placeholder="Ingrese el ID del proyecto"
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Agregar Presupuesto
        </Button>
      </form>
      {/* Tabla de presupuestos */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Presupuesto Id</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha creación</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Divisa</TableCell>
              <TableCell>Uso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Proyecto Id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaPresupuestos.map((row) => (
              <TableRow
                key={row.presupuesto_id}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
                onClick={() => navigate(`/proyecto/${id}/presupuestos/${row.presupuesto_id}/partidas`)}
              >
                <TableCell>{row.presupuesto_id}</TableCell>
                <TableCell>{row.descripcion_presupuesto}</TableCell>
                <TableCell>{row.fecha_creacion_presupuesto}</TableCell>
                <TableCell>{row.monto_presupuesto}</TableCell>
                <TableCell>{row.divisa_presupuesto}</TableCell>
                <TableCell>{row.porcentaje_usado}</TableCell>
                <TableCell>{row.estado_presupuesto}</TableCell>
                <TableCell>{row.proyecto_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Botones adicionales */}
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
          Quitar Presupuesto
        </Button>
        <Button variant="contained" color="primary">
          Editar Presupuesto
        </Button>
      </Box>
    </Container>
  );
}
