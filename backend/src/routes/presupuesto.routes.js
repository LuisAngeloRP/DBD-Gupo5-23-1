const { Router } = require("express");
const {
  crearPresupuesto,
  mostrarPresupuesto,
  obtenerPresupuesto,
  borrarPresupuesto,
  actualizarPresupuesto,
  crearGasto,
  mostrarGasto,
  obtenerGasto,
  borrarGasto,
  actualizarGasto,
  crearPartida,
  mostrarPartida,
  obtenerPartida,
  borrarPartida,
  actualizarPartida,
} = require("../controllers/presupuesto.controller");
const { route } = require("express/lib/application");
const pool = require("../db");

const router = Router();

router.post("/gastos/crear", crearGasto);
router.get("/gastos", mostrarGasto);
router.get("/gastos/:id", obtenerGasto);
router.delete("/gastos/:id", borrarGasto);
router.put("/gastos/:id", actualizarGasto);
router.post("/partidas/crear", crearPartida);
router.get("/partidas", mostrarPartida);
router.get("/partidas/:id", obtenerPartida);
router.delete("/partidas/:id", borrarPartida);
router.put("/partidas/:id", actualizarPartida);
router.post("/presupuestos/crear", crearPresupuesto);
router.get("/presupuestos", mostrarPresupuesto);
router.get("/presupuestos/:id", obtenerPresupuesto);
router.delete("/presupuestos/:id", borrarPresupuesto);
router.put("/presupuestos/:id", actualizarPresupuesto);

module.exports = router;
