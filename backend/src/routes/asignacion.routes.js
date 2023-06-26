const { Router } = require('express');
const bodyParser = require('body-parser');
const pool = require('../db');
const { mostrarListaProyectos,
    mostrarAsignacionesRecursos,
    mostrarRecursosDisponibles,
    mostrarProyecto,
    mostrarRecurso,
    editarCantidadAsignadaRecurso,
    agregarRecursoAsignado,
    quitarRecursoAsignado,
    mostrarAsignacionesEmpleados,
    mostrarEmpleadosDisponibles,
    agregarAsignacionEmpleado,
    quitarAsignacionEmpleado
} = require('../controllers/asignacion.controller');

const router = Router();
router.use(bodyParser.json())

router.get('/mostrar-lista-proyectos', mostrarListaProyectos)
router.get('/mostrar-asignaciones-recursos/:id', mostrarAsignacionesRecursos)
router.get('/mostrar-recursos-disponibles', mostrarRecursosDisponibles)
router.get('/mostrar-proyecto/:id', mostrarProyecto)
router.get('/mostrar-recurso/:id', mostrarRecurso)
router.post('/agregar-recurso-asignado/:id_proyecto/:id_recurso', agregarRecursoAsignado)
router.delete('/quitar-recurso-asignado/:id_proyecto/:id_recurso', quitarRecursoAsignado)
router.patch('/editar-cantidad-asignada-recurso/:id_proyecto/:id_recurso', editarCantidadAsignadaRecurso)
router.get('/mostrar-asignaciones-empleados/:id', mostrarAsignacionesEmpleados)
router.get('/mostrar-empleados-disponibles', mostrarEmpleadosDisponibles)
router.post('/agregar-asignacion-empleado/:id_proyecto/:id_empleado', agregarAsignacionEmpleado)
router.delete('/quitar-asignacion-empleado/:id_proyecto/:id_empleado', quitarAsignacionEmpleado)

module.exports = router;