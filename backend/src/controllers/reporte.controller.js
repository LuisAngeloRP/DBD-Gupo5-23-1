const pool = require("../db");

// inicio
const inicio = (req, res) => {
  res.send("Este es el inicio");
};

// reporte de objetivos
const getRepObjetivos = async (req, res) => {
  try {
    const { id } = req.params;
    const allObjetivos = await pool.query(
      'SELECT h.hito_id "ID", h.nombre_hito "Nombre del hito", h.descripcion_hito "Descripcion del hito", h.fecha_inicio_hito "Fecha inicio del hito", h.fecha_fin_hito "Fecha final del hito", h.observacion "Observacion" FROM hito h JOIN proyecto p ON h.proyecto_id = p.proyecto_id WHERE p.proyecto_id = $1',
      [id]
    );

    const rows = allObjetivos.rows.map((row) => {
      const modifiedRow = { ...row };
      modifiedRow["Fecha inicio del hito"] = modifiedRow[
        "Fecha inicio del hito"
      ]
        .toISOString()
        .substring(0, 10);
      modifiedRow["Fecha final del hito"] = modifiedRow["Fecha final del hito"]
        .toISOString()
        .substring(0, 10);
      return modifiedRow;
    });
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// reporte empleado por proyecto
const getRepEmpxProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const allEmpxProyecto = await pool.query(
      'SELECT CONCAT(e.nombre, \' \', e.apellido) "Empleado", ae.horas_asignadas_trabajo "Horas empleadas" FROM empleado e JOIN asignacion_empleados ae ON e.empleado_id = ae.empleado_id JOIN proyecto p ON ae.proyecto_id = p.proyecto_id WHERE p.proyecto_id = $1 GROUP BY e.nombre, e.apellido, ae.horas_asignadas_trabajo',
      [id]
    );
    res.json(allEmpxProyecto.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// reporte planificado vs reportado
const getRepPlanivsRepo = async (req, res) => {
  try {
    const { fecha1, fecha2 } = req.params;
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);
    const allPlanivsRepo = await pool.query(
      'SELECT p.nombre_proyecto "Proyecto", p.fecha_creacion "Fecha Inicio", p.fecha_finalizacion_estimada "Fecha fin estimada", p.fecha_finalizacion "Fecha fin", SUM(ae.horas_asignadas_trabajo) "Horas empleadas" FROM proyecto p JOIN asignacion_empleados ae ON p.proyecto_id = ae.proyecto_id WHERE p.fecha_creacion >= $1 and p.fecha_finalizacion <= $2 GROUP BY p.proyecto_id, p.nombre_proyecto',
      [date1, date2]
    );
    // Modificando la respuesta para mostrar solo la fecha sin las horas
    const rows = allPlanivsRepo.rows.map((row) => {
      const modifiedRow = { ...row };
      modifiedRow["Fecha Inicio"] = modifiedRow["Fecha Inicio"]
        .toISOString()
        .substring(0, 10);
      modifiedRow["Fecha fin estimada"] = modifiedRow["Fecha fin estimada"]
        .toISOString()
        .substring(0, 10);
      modifiedRow["Fecha fin"] = modifiedRow["Fecha fin"]
        .toISOString()
        .substring(0, 10);
      return modifiedRow;
    });
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// reporte de tareas
const getRepTareas = async (req, res) => {
  try {
    const { id } = req.params;
    const allTareas = await pool.query(
      'SELECT t.tarea_id "Tarea", CONCAT (e.nombre , \' \', e.apellido) "Encargado", t.fecha_creacion_tarea "Fecha inicio", t.fecha_limite_tarea "Fecha límite", t.fecha_realizada_tarea "Fecha fin", t.descripcion_tarea "Descripcion", t.estado_tarea "Estado" FROM tarea t JOIN proyecto p ON t.proyecto_id = p.proyecto_id JOIN usuario u ON u.usuario_id = t.usuario_id JOIN empleado e ON u.usuario_id = e.usuario_id WHERE p.proyecto_id = $1 GROUP BY t.tarea_id, e.nombre, e.apellido',
      [id]
    );

    const rows = allTareas.rows.map((row) => {
      const modifiedRow = { ...row };
      modifiedRow["Fecha inicio"] = modifiedRow["Fecha inicio"]
        .toISOString()
        .substring(0, 10);
      modifiedRow["Fecha límite"] = modifiedRow["Fecha límite"]
        .toISOString()
        .substring(0, 10);
      modifiedRow["Fecha fin"] = modifiedRow["Fecha fin"]
        .toISOString()
        .substring(0, 10);
      return modifiedRow;
    });
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// reporte de recursos
const getRepRecursos = async (req, res) => {
  try {
    const { id } = req.params;
    const allRecursos = await pool.query(
      "SELECT r.recurso_id AS Id, r.nombre AS Recurso, CASE WHEN r.tipo_recurso = 1 THEN 'Hardware' WHEN r.tipo_recurso = 2 THEN 'Software' ELSE 'Otro' END AS Tipo, r.proveedor_recurso AS Proveedor, ar.cantidad_asignada AS \"Cant. asig.\", g.monto AS Costo, (r.cantidad_disponible - ar.cantidad_asignada) AS \"Cant. disp.\" FROM Recursos r LEFT JOIN Asignacion_Recursos ar ON r.recurso_id = ar.recurso_id LEFT JOIN gasto g ON r.gasto_id = g.gasto_id WHERE ar.proyecto_id = $1",
      [id]
    );
    res.json(allRecursos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// sobrantes
const getSobrantes = async (req, res) => {
  try {
    const { id } = req.params;
    const allSobrantes = await pool.query(
      "SELECT r.recurso_id AS Id, r.nombre AS Recurso, CASE WHEN r.tipo_recurso = 1 THEN 'Hardware' WHEN r.tipo_recurso = 2 THEN 'Software' ELSE 'Otro' END AS Tipo,r.proveedor_recurso AS Proveedor, (r.cantidad_disponible - ar.cantidad_asignada) \"Cant. disp\", g.monto AS Costo, r.cantidad_disponible \"Cant.total\" FROM Recursos r LEFT JOIN Asignacion_Recursos ar ON r.recurso_id = ar.recurso_id LEFT JOIN gasto g ON r.gasto_id = g.gasto_id WHERE ar.proyecto_id = $1",
      [id]
    );
    res.json(allSobrantes.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// reporte de progreso
const getRepProgreso = async (req, res) => {
  try {
    const { fecha } = req.params;
    const date1 = new Date(fecha);
    const allProgreso = await pool.query(
      'SELECT P.proyecto_id "Proyecto", COUNT(distinct R.reunion_id) "Tot.reuniones",ROUND((SUM(CASE WHEN T.estado_tarea::integer = 1 THEN 1 ELSE 0 END) / COUNT(T.tarea_id)) * 100, 0) "Tareas a tiempo(%)", ROUND((SUM(CASE WHEN T.estado_tarea::integer = 2 THEN 1 ELSE 0 END) / COUNT(T.tarea_id)) * 100, 0) "Tareas a destiempo(%)", ROUND((SUM(CASE WHEN T.estado_tarea::integer = 3 THEN 1 ELSE 0 END) / COUNT(T.tarea_id)) * 100, 0) "Tareas no entregadas(%)", P2.monto_presupuesto "Presupuesto", pa.monto "Gastos", P.fecha_creacion "Fecha creación", P.fecha_finalizacion_estimada "Fecha final est.",FLOOR((EXTRACT(DAY FROM (NOW() - P.fecha_creacion)))/7)  "Tiempo trans.(sem)", P.estado_proyecto "Estado" FROM proyecto P LEFT JOIN Reunion R on P.proyecto_id = R.proyecto_id LEFT JOIN Tarea T on P.proyecto_id = T.proyecto_id JOIN Presupuesto P2 on P2.proyecto_id = P.proyecto_id JOIN Partida pa on pa.presupuesto_id = P2.presupuesto_id WHERE P.fecha_creacion >= $1 GROUP BY P.proyecto_id , P2.monto_presupuesto,pa.monto, P.fecha_creacion, P.fecha_finalizacion_estimada, P.estado_proyecto',
      [date1]
    );

    const rows = allProgreso.rows.map((row) => {
      const modifiedRow = { ...row };
      modifiedRow["Fecha creación"] = modifiedRow["Fecha creación"]
        .toISOString()
        .substring(0, 10);
      modifiedRow["Fecha final est."] = modifiedRow["Fecha final est."]
        .toISOString()
        .substring(0, 10);
      return modifiedRow;
    });

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// reportes presupuesto por proyecto
const getRepPresuxPro = async (req, res) => {
  try {
    const { id } = req.params;
    const allPresuxPro = await pool.query(
      'SELECT r.recurso_id "Id", r.nombre "Nombre de recurso", g.monto "Costo de recurso (S/.)", ar.fecha_asignacion "Fecha de adquisición" FROM proyecto p JOIN asignacion_recursos ar ON p.proyecto_id = ar.proyecto_id JOIN recursos r ON r.recurso_id = ar.recurso_id JOIN gasto g ON r.gasto_id = g.gasto_id WHERE p.proyecto_id = $1',
      [id]
    );
    const rows = allPresuxPro.rows.map((row) => {
      const modifiedRow = { ...row };
      modifiedRow["Fecha de adquisición"] = modifiedRow["Fecha de adquisición"]
        .toISOString()
        .substring(0, 10);
      return modifiedRow;
    });
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// cuadro 2
const getCuadro2 = async (req, res) => {
  try {
    const { id } = req.params;
    const allCuadro2 = await pool.query(
      "SELECT pr.monto_presupuesto FROM presupuesto pr JOIN proyecto p ON pr.proyecto_id = p.proyecto_id WHERE p.proyecto_id = $1",
      [id]
    );
    res.json(allCuadro2.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// cuadro 3
const getCuadro3 = async (req, res) => {
  try {
    const { id } = req.params;
    const allCuadro3 = await pool.query(
      "SELECT sum(g.monto) FROM proyecto p JOIN asignacion_recursos ar ON p.proyecto_id  = ar.proyecto_id JOIN recursos r ON r.recurso_id = ar.recurso_id JOIN gasto g ON r.gasto_id = g.gasto_id WHERE p.proyecto_id = $1",
      [id]
    );
    res.json(allCuadro3.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// cuadro 4
const getCuadro4 = async (req, res) => {
  try {
    const { id } = req.params;
    const allCuadro4 = await pool.query(
      'SELECT ROUND((SUM(g.monto) / pr.monto_presupuesto),2) * 100 "Porcentaje usado del presupuesto(%)" FROM proyecto p JOIN asignacion_recursos ar ON p.proyecto_id = ar.proyecto_id JOIN recursos r ON r.recurso_id = ar.recurso_id JOIN gasto g ON r.gasto_id = g.gasto_id JOIN presupuesto pr ON pr.proyecto_id = p.proyecto_id GROUP BY p.proyecto_id, pr.monto_presupuesto HAVING p.proyecto_id = $1',
      [id]
    );
    res.json(allCuadro4.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// proyectos
const getProyectos = async (req, res) => {
  try {
    const allProyectos = await pool.query(
      "SELECT proyecto_id, nombre_proyecto FROM proyecto"
    );
    res.json(allProyectos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  inicio,
  getRepObjetivos,
  getRepEmpxProyecto,
  getRepPlanivsRepo,
  getRepTareas,
  getRepRecursos,
  getSobrantes,
  getRepProgreso,
  getRepPresuxPro,
  getCuadro2,
  getCuadro3,
  getCuadro4,
  getProyectos,
};
