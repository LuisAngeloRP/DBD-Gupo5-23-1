const { Router } = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');
const { mostrarDetalleProyecto,
    mostrarDetallesReunion,
    mostrarListaReuniones,
    mostrarTareasLista,
    mostrarTareasColumna,
    mostrarDetallesTarea,
    comentariosTarea,
    calendarioProyecto
} = require('../controllers/proyecto.controller');

const router = Router()
router.use(bodyParser.json())

// Relacionado a proyectos
router.get('/mostrar-detalles-proyecto/:id', mostrarDetalleProyecto)
router.get('/mostrar-detalles-reunion/:id', mostrarDetallesReunion)
router.get('/mostrar-lista-reunion/:id', mostrarListaReuniones)
router.get('/mostrar-tarea-lista/:id', mostrarTareasLista)
router.get('/mostrar-tarea-columna/:id', mostrarTareasColumna)
router.get('/mostrar-detalles-tarea/:id', mostrarDetallesTarea)
router.get('/mostrar-comentarios-tarea/:id', comentariosTarea)
router.get('/proyecto/:id/calendario/:fecha', calendarioProyecto)

module.exports = router;