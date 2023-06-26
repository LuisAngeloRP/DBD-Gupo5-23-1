const pool = require("../db");

const mostrarPresupuesto = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Presupuesto");
    const rows = result.rows.map((row) => {
      const modifiedRows = { ...row };
      modifiedRows["fecha_creacion_presupuesto"] = modifiedRows[
        "fecha_creacion_presupuesto"
      ]
        .toISOString()
        .substring(0, 10);
      return modifiedRows;
    });
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const crearPresupuesto = async (req, res, next) => {
  const {
    descripcion_presupuesto,
    fecha_creacion_presupuesto,
    monto_presupuesto,
    divisa_presupuesto,
    porcentaje_usado,
    estado_presupuesto,
    proyecto_id,
  } = req.body;

  try {
    if (
      !descripcion_presupuesto ||
      !fecha_creacion_presupuesto ||
      !monto_presupuesto ||
      !divisa_presupuesto ||
      !porcentaje_usado ||
      !estado_presupuesto ||
      !proyecto_id
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const result = await pool.query(
      "INSERT INTO Presupuesto (descripcion_presupuesto, fecha_creacion_presupuesto, monto_presupuesto, divisa_presupuesto, porcentaje_usado, estado_presupuesto,proyecto_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        descripcion_presupuesto,
        fecha_creacion_presupuesto,
        monto_presupuesto,
        divisa_presupuesto,
        porcentaje_usado,
        estado_presupuesto,
        proyecto_id,
      ]
    );
  } catch (error) {
    next(error);
  }

  res.send("creando un Presupuesto");
};

const borrarPresupuesto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM Presupuesto WHERE presupuesto_id = $1 ",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Presupuesto no encontrado",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const obtenerPresupuesto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM Presupuesto WHERE presupuesto_id = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Presupuesto no encontrado",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const actualizarPresupuesto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      descripcion_presupuesto,
      fecha_creacion_presupuesto,
      monto_presupuesto,
      divisa_presupuesto,
      porcentaje_usado,
      estado_presupuesto,
      proyecto_id,
    } = req.body;

    const result = await pool.query(
      "UPDATE Presupuesto SET descripcion_presupuesto=$1, fecha_creacion_presupuesto=$2, monto_presupuesto=$3, divisa_presupuesto=$4, porcentaje_usado=$5, estado_presupuesto=$6,proyecto_id=$7 WHERE presupuesto_id = $8",
      [
        descripcion_presupuesto,
        fecha_creacion_presupuesto,
        monto_presupuesto,
        divisa_presupuesto,
        porcentaje_usado,
        estado_presupuesto,
        proyecto_id,
        id,
      ]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Presupuesto no encontrado",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const mostrarPartida = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Partida");
    const rows = result.rows.map((row) => {
      const modifiedRows = { ...row };
      modifiedRows["fecha_estimacion"] = modifiedRows["fecha_estimacion"]
        .toISOString()
        .substring(0, 10);
      return modifiedRows;
    });
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const crearPartida = async (req, res, next) => {
  const {
    estado_partida,
    divisa,
    descripcion,
    monto,
    fecha_estimacion,
    presupuesto_id,
    tipo_partida,
    proyecto_id,
  } = req.body;

  try {
    if (
      !estado_partida ||
      !divisa ||
      !descripcion ||
      !monto ||
      !fecha_estimacion ||
      !presupuesto_id ||
      !tipo_partida ||
      !proyecto_id
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const result = await pool.query(
      "INSERT INTO Partida (estado_partida, divisa_Partida, descripcion_Partida, monto_Partida, fecha_creacion_Partida, presupuesto_id, tipo_partida, proyecto_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        estado_partida,
        divisa,
        descripcion,
        monto,
        fecha_estimacion,
        presupuesto_id,
        tipo_partida,
        proyecto_id,
      ]
    );
    // Resto del código
  } catch (error) {
    next(error);
  }

  res.send("Creando una partida");
};

const borrarPartida = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Antes de eliminar la partida, actualiza los registros en la tabla "gasto" estableciendo partida_id como NULL
    await pool.query(
      "UPDATE gasto SET partida_id = NULL WHERE partida_id = $1",
      [id]
    );

    const result = await pool.query(
      "DELETE FROM partida WHERE partida_id = $1",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Partida no encontrada",
      });

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const obtenerPartida = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM Partida WHERE partida_id = $1",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Partida no encontrada",
      });

    const row = result.rows[0];
    const partida = {
      estado_partida: row.estado_partida,
      divisa: row.divisa_Partida,
      descripcion: row.descripcion_Partida,
      monto: row.monto_Partida,
      fecha_estimacion: row.fecha_creacion_Partida
        .toISOString()
        .substring(0, 10),
      presupuesto_id: row.presupuesto_id,
      tipo_partida: row.tipo_partida,
    };

    return res.json(partida);
  } catch (error) {
    next(error);
  }
};

const actualizarPartida = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      estado_partida,
      divisa,
      descripcion,
      monto,
      fecha_estimacion,
      presupuesto_id,
      tipo_partida,
      proyecto_id,
    } = req.body;

    const result = await pool.query(
      "UPDATE Partida SET estado_partida=$1, divisa_Partida=$2, descripcion_Partida=$3, monto_Partida=$4, fecha_creacion_Partida=$5, presupuesto_id=$6, tipo_partida=$7, proyecto_id=$8 WHERE partida_id = $9",
      [
        estado_partida,
        divisa,
        descripcion,
        monto,
        fecha_estimacion,
        presupuesto_id,
        tipo_partida,
        proyecto_id,
        id,
      ]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Partida no encontrada",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const mostrarGasto = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM Gasto");
    const rows = result.rows.map((row) => {
      const modifiedRows = { ...row };
      modifiedRows["fecha"] = modifiedRows["fecha"]
        .toISOString()
        .substring(0, 10);
      return modifiedRows;
    });
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

const crearGasto = async (req, res, next) => {
  const { descripcion, monto, fecha, divisa, partida_id } = req.body;

  try {
    if (!descripcion || !monto || !fecha || !divisa || !partida_id) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const result = await pool.query(
      "INSERT INTO Gasto (descripcion, monto, fecha, divisa, partida_id) VALUES ($1,$2,$3,$4,$5)",
      [descripcion, monto, fecha, divisa, partida_id]
    );
  } catch (error) {
    next(error);
  }

  res.send("Creando un Gasto");
};

const borrarGasto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM Gasto WHERE gasto_id = $1", [
      id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Gasto no encontrado",
      });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const obtenerGasto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM Gasto WHERE gasto_id = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Gasto no encontrado",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

const actualizarGasto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion, monto, fecha, divisa, partida_id } = req.body;

    const result = await pool.query(
      "UPDATE Gasto SET descripcion=$1, monto=$2, fecha=$3, divisa=$4, partida_id=$5 WHERE gasto_id = $6",
      [descripcion, monto, fecha, divisa, partida_id, id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Gasto no encontrado",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  mostrarPresupuesto,
  crearPresupuesto,
  obtenerPresupuesto,
  borrarPresupuesto,
  actualizarPresupuesto,
  mostrarGasto,
  crearGasto,
  obtenerGasto,
  borrarGasto,
  actualizarGasto,
  mostrarPartida,
  crearPartida,
  obtenerPartida,
  borrarPartida,
  actualizarPartida,
};
