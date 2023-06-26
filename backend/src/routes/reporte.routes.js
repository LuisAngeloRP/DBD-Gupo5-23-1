const { Router } = require("express");
const { route } = require("express/lib/application");
const {
  getRepObjetivos,
  getRepEmpxProyecto,
  getRepPlanivsRepo,
  getRepTareas,
  getRepRecursos,
  getRepProgreso,
  getRepPresuxPro,
  getCuadro2,
  getCuadro3,
  getCuadro4,
  inicio,
  getSobrantes,
  getProyectos,
} = require("../controllers/reporte.controller");
const pool = require("../db");

const router = Router();

// reporte de objetivos
router.get("/objetivos/:id", getRepObjetivos);

// inicio
router.get("/", inicio);

// reporte empleado por proyecto
router.get("/empxpro/:id", getRepEmpxProyecto);

// reporte planificado vs reportado
router.get("/planivsrepo/:fecha1/:fecha2", getRepPlanivsRepo);

// reporte de tareas
router.get("/tareas/:id", getRepTareas);

// reporte de recursos
router.get("/recursos/:id", getRepRecursos);
router.get("/sobrantes/:id", getSobrantes);

// reporte de progreso
router.get("/progreso/:fecha", getRepProgreso);

// reportes presupuesto por proyecto
router.get("/presuxproyecto/:id", getRepPresuxPro);

// cuadro 2
router.get("/cuadro2/:id", getCuadro2);

// cuadro 3
router.get("/cuadro3/:id", getCuadro3);

// cuadro 4
router.get("/cuadro4/:id", getCuadro4);

// proyectos
router.get("/proyectos", getProyectos);

module.exports = router;
