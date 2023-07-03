const { Router } = require("express");
const bodyParser = require("body-parser");
const pool = require("../db");
const {
  mostrarDetalleProyecto,
  mostrarDetallesReunion,
  mostrarListaReuniones,
  mostrarTareasLista,
  mostrarTareasColumna,
  mostrarDetallesTarea,
  comentariosTarea,
  calendarioProyecto,
  crearReunionYSesion,
  mostrarListaEmpleados,
  actualizarEstadoYFechaTarea,
  crearTareaYSesion,
  mostrarDetalleProyectoCas,
  mostrarDetallesTareaCas,
  mostrarTareasColumnaCas,
  crearTareaCas
} = require("../controllers/proyecto.controller");

const router = Router();
router.use(bodyParser.json());

// Relacionado a proyectos
router.get("/mostrar-detalles-proyecto/:id", mostrarDetalleProyecto);
router.get("/mostrar-detalles-proyectoCas/:id", mostrarDetalleProyectoCas);
router.get("/mostrar-detalles-reunion/:id", mostrarDetallesReunion);
router.get("/mostrar-lista-reunion/:id", mostrarListaReuniones);
router.get("/mostrar-tarea-lista/:id", mostrarTareasLista);
router.get("/mostrar-tarea-columna/:id", mostrarTareasColumna);
router.get("/mostrar-tarea-columnaCas/", mostrarTareasColumnaCas);
router.get("/mostrar-detalles-tarea/:id", mostrarDetallesTarea);
router.get("/mostrar-detalles-tareaCas/:id", mostrarDetallesTareaCas);
router.get("/mostrar-comentarios-tarea/:id", comentariosTarea);
router.get("/proyecto/:id/calendario/:fecha", calendarioProyecto);
router.post("/crear-reunion", crearReunionYSesion);
router.get("/empleados/:id", mostrarListaEmpleados);
router.put('/tarea/:tareaId', actualizarEstadoYFechaTarea);
router.post('/crear-tarea', crearTareaYSesion);
router.post('/crear-tareaCas', crearTareaCas);

module.exports = router;
