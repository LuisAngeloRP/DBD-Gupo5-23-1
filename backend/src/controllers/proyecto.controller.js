const pool = require("../db");

const mostrarDetalleProyecto = async (req, res) => {
  try {
    const { id } = req.params;
    const detallesProyecto = await pool.query(
      "SELECT P.PROYECTO_ID, P.NOMBRE_PROYECTO, CL.NOMBRE_CLIENTE, " +
        "P.FECHA_CREACION, P.FECHA_FINALIZACION_ESTIMADA, " +
        "P.DESCRIPCION_PROYECTO,  E.NOMBRE || ' ' || E.APELLIDO AS JEFE_PROYECTO " +
        "FROM PROYECTO P " +
        "INNER JOIN CONTRATO CO ON P.PROYECTO_ID = CO.PROYECTO_ID " +
        "INNER JOIN CLIENTE CL ON CO.CLIENTE_ID = CL.CLIENTE_ID " +
        "INNER JOIN EMPLEADO E ON P.EMPLEADO_ID =E.EMPLEADO_ID " +
        "WHERE P.PROYECTO_ID = $1",
      [id]
    );

    const desarrolladores = await pool.query(
      "SELECT E.NOMBRE || ' ' || E.APELLIDO AS DESARROLLADORES " +
        "FROM PROYECTO P " +
        "INNER JOIN ASIGNACION_EMPLEADOS AE ON P.PROYECTO_ID = AE.PROYECTO_ID " +
        "INNER JOIN EMPLEADO E ON AE.EMPLEADO_ID = E.EMPLEADO_ID " +
        "WHERE P.PROYECTO_ID = $1",
      [id]
    );

    const hardware = await pool.query(
      "SELECT R.NOMBRE AS RECURSO_HARDWARE " +
        "FROM PROYECTO P " +
        "INNER JOIN ASIGNACION_RECURSOS AR ON P.PROYECTO_ID = AR.PROYECTO_ID " +
        "INNER JOIN RECURSOS R ON AR.RECURSO_ID = R.RECURSO_ID " +
        "INNER JOIN HARDWARE H ON R.RECURSO_ID = H.RECURSO_ID " +
        "WHERE P.PROYECTO_ID = $1",
      [id]
    );

    const software = await pool.query(
      "SELECT R.NOMBRE AS RECURSO_SOFTWARE " +
        "FROM PROYECTO P " +
        "INNER JOIN ASIGNACION_RECURSOS AR ON P.PROYECTO_ID = AR.PROYECTO_ID " +
        "INNER JOIN RECURSOS R ON AR.RECURSO_ID = R.RECURSO_ID " +
        "INNER JOIN SOFTWARE S  ON R.RECURSO_ID = S.RECURSO_ID " +
        "WHERE P.PROYECTO_ID = $1",
      [id]
    );

    const adjuntos = await pool.query(
      "SELECT A.NOMBRE_ADJUNTO, A.URL_ADJUNTO " +
        "FROM PROYECTO P " +
        "INNER JOIN COMENTARIO C ON P.PROYECTO_ID = C.PROYECTO_ID " +
        "INNER JOIN ADJUNTO A ON C.COMENTARIO_ID = A.COMENTARIO_ID " +
        "WHERE P.PROYECTO_ID = $1",
      [id]
    );

    const resultados = {
      detallesProyecto: detallesProyecto.rows,
      desarrolladores: desarrolladores.rows,
      hardware: hardware.rows,
      software: software.rows,
      adjuntos: adjuntos.rows,
    };

    res.json(resultados);
  } catch (error) {
    console.log(error);
  }
};

const mostrarListaReuniones = async (req, res) => {
  try {
    const { id } = req.params;
    const listaReunion = await pool.query(
      "SELECT R.DIA_REUNION || ' ' || R.HORA_REUNION AS DIA_HORA, R.DESCRIPCION_REUNION " +
        "FROM PROYECTO P " +
        "INNER JOIN REUNION R ON P.PROYECTO_ID = R.PROYECTO_ID " +
        "WHERE R.PROYECTO_ID = $1 " +
        "ORDER BY DIA_HORA",
      [id]
    );
    res.json(listaReunion.rows);
  } catch (error) {
    console.log(error);
  }
};

const mostrarDetallesReunion = async (req, res) => {
  try {
    const { id } = req.params;

    const detallesReunion = await pool.query(
      "SELECT R.DIA_REUNION || ' - ' || R.HORA_REUNION AS FECHA_PROGRAMADA, " +
        "R.DESCRIPCION_REUNION " +
        "FROM REUNION R " +
        "WHERE R.REUNION_ID = $1 ",
      [id]
    );

    const jefeProyecto = await pool.query(
      "SELECT E.NOMBRE || ' ' || E.APELLIDO AS JEFE_PROYECTO " +
        "FROM REUNION R " +
        "INNER JOIN PROYECTO P ON R.PROYECTO_ID = P.PROYECTO_ID " +
        "INNER JOIN EMPLEADO E ON P.EMPLEADO_ID = E.EMPLEADO_ID " +
        "WHERE R.REUNION_ID = $1",
      [id]
    );

    const participantes = await pool.query(
      "SELECT E.NOMBRE || ' ' || E.APELLIDO AS PARTICIPANTES " +
        "FROM REUNION R " +
        "INNER JOIN SESION S ON R.REUNION_ID = S.REUNION_ID " +
        "INNER JOIN USUARIO U ON S.USUARIO_ID = U.USUARIO_ID " +
        "INNER JOIN EMPLEADO E ON U.USUARIO_ID = E.USUARIO_ID " +
        "WHERE R.REUNION_ID = $1",
      [id]
    );

    const temas = await pool.query(
      "SELECT TR.DESCRIPCION_TEMA " +
        "FROM REUNION R " +
        "INNER JOIN TEMA_REUNION TR ON R.REUNION_ID = TR.REUNION_ID " +
        "WHERE R.REUNION_ID = $1",
      [id]
    );

    const acuerdos = await pool.query(
      "SELECT AR.DESCRIPCION_ACUERDO " +
        "FROM REUNION R " +
        "INNER JOIN ACUERDO_REUNION AR ON R.REUNION_ID = AR.REUNION_ID " +
        "WHERE R.REUNION_ID = $1",
      [id]
    );

    const tareasPlanteadas = await pool.query(
      "SELECT TPR.DESCRIPCION_TAREA_PLANTEADA " +
        "FROM REUNION R " +
        "INNER JOIN TAREA_PLANTEADA_REUNION TPR ON R.REUNION_ID = TPR.REUNION_ID " +
        "WHERE R.REUNION_ID = $1",
      [id]
    );

    const resultados = {
      detallesReunion: detallesReunion.rows,
      jefeProyecto: jefeProyecto.rows,
      participantes: participantes.rows,
      temas: temas.rows,
      acuerdos: acuerdos.rows,
      tareasPlanteadas: tareasPlanteadas.rows,
    };

    res.json(resultados);
  } catch (error) {
    console.log(error);
  }
};

const mostrarTareasLista = async (req, res) => {
  try {
    const { id } = req.params;

    const listaTarea = await pool.query(
      "SELECT T.TAREA_ID, T.NOMBRE_TAREA, T.ESTADO_TAREA, T.FECHA_LIMITE_TAREA || ' - ' || T.HORA_LIMITE_TAREA  AS FECHA_HORA " +
        "FROM PROYECTO P " +
        "INNER JOIN TAREA T ON P.PROYECTO_ID = T.PROYECTO_ID " +
        "WHERE P.PROYECTO_ID = $1 " +
        "ORDER BY FECHA_HORA ",
      [id]
    );

    const tareas = listaTarea.rows;

    const tareasIds = tareas.map((tarea) => tarea.tarea_id);

    const encargados = await pool.query(
      "SELECT T.TAREA_ID, E.NOMBRE || ' ' || E.APELLIDO AS ENCARGADO " +
        "FROM TAREA T " +
        "INNER JOIN ASIGNACION_TAREA AT2 ON T.TAREA_ID = AT2.TAREA_ID " +
        "INNER JOIN USUARIO U ON AT2.USUARIO_ID = U.USUARIO_ID " +
        "INNER JOIN EMPLEADO E ON U.USUARIO_ID = E.USUARIO_ID " +
        "WHERE T.TAREA_ID = ANY($1)",
      [tareasIds]
    );

    const encargadosPorTarea = {};

    encargados.rows.forEach((encargado) => {
      const tareaId = encargado.tarea_id;
      const nombreEncargado = encargado.encargado;

      if (!encargadosPorTarea[tareaId]) {
        encargadosPorTarea[tareaId] = [];
      }

      encargadosPorTarea[tareaId].push(nombreEncargado);
    });

    const tareasConEncargados = tareas.map((tarea) => {
      const tareaId = tarea.tarea_id;
      const encargados = encargadosPorTarea[tareaId] || [];

      return {
        ...tarea,
        encargados: encargados,
      };
    });

    res.json(tareasConEncargados);
  } catch (error) {
    console.log(error);
  }
};

const mostrarTareasColumna = async (req, res) => {
  try {
    const { id } = req.params;

    const Tareas = await pool.query(
      "SELECT T.TAREA_ID, T.NOMBRE_TAREA, T.DESCRIPCION_TAREA, T.FECHA_LIMITE_TAREA || ' ' || T.HORA_LIMITE_TAREA AS FECHA_HORA, " +
        "T.ESTADO_TAREA " +
        "FROM PROYECTO P " +
        "INNER JOIN TAREA T ON P.PROYECTO_ID = T.PROYECTO_ID " +
        "WHERE P.PROYECTO_ID = $1 " +
        "ORDER BY FECHA_HORA",
      [id]
    );

    const tareasPendientes = Tareas.rows.filter(
      (tarea) => tarea.estado_tarea === 1
    );
    const tareasEnProgreso = Tareas.rows.filter(
      (tarea) => tarea.estado_tarea === 2
    );
    const tareasFinalizadas = Tareas.rows.filter(
      (tarea) => tarea.estado_tarea === 3
    );

    res.json({ tareasPendientes, tareasEnProgreso, tareasFinalizadas });
  } catch (error) {
    console.log(error);
  }
};

const mostrarDetallesTarea = async (req, res) => {
  try {
    const { id } = req.params;

    const detallesTarea = await pool.query(
      "SELECT T.TAREA_ID, T.NOMBRE_TAREA, T.FECHA_CREACION_TAREA || ' - ' || T.HORA_CREACION_TAREA AS FECHA_CREACION, " +
        "T.FECHA_LIMITE_TAREA || ' - ' || T.HORA_LIMITE_TAREA AS FECHA_ENTREGA, T.DESCRIPCION_TAREA, " +
        "T.FECHA_REALIZADA_TAREA, T.HORA_REALIZADA_TAREA, T.ESTADO_TAREA, " +
        "E.NOMBRE || ' ' || E.APELLIDO AS JEFE_PROYECTO " +
        "FROM TAREA T " +
        "INNER JOIN USUARIO U ON T.USUARIO_ID = U.USUARIO_ID " +
        "INNER JOIN EMPLEADO E ON U.USUARIO_ID = E.USUARIO_ID " +
        "WHERE T.TAREA_ID = $1",
      [id]
    );

    const encargados = await pool.query(
      "SELECT T.TAREA_ID, E.NOMBRE || ' ' || E.APELLIDO AS ENCARGADO " +
        "FROM TAREA T " +
        "INNER JOIN ASIGNACION_TAREA AT2 ON T.TAREA_ID = AT2.TAREA_ID " +
        "INNER JOIN USUARIO U ON AT2.USUARIO_ID = U.USUARIO_ID " +
        "INNER JOIN EMPLEADO E ON U.USUARIO_ID = E.USUARIO_ID " +
        "WHERE T.TAREA_ID = $1",
      [id]
    );

    const adjuntos = await pool.query(
      "SELECT A.NOMBRE_ADJUNTO AS ADJUNTOS, A.URL_ADJUNTO " +
        "FROM COMENTARIO C " +
        "INNER JOIN ADJUNTO A ON C.COMENTARIO_ID = A.COMENTARIO_ID " +
        "WHERE C.COMENTARIO_PADRE_ID IS NULL AND C.CONTENIDO_COMENTARIO IS NULL AND C.TAREA_ID = $1",
      [id]
    );

    const resultados = {
      detallesTarea: detallesTarea.rows,
      encargados: encargados.rows,
      adjuntos: adjuntos.rows,
    };

    res.json(resultados);
  } catch (error) {
    console.log(error);
  }
};

const comentariosTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const listaComentarios = await pool.query(
      "SELECT C.COMENTARIO_ID, E.NOMBRE || ' ' || E.APELLIDO AS USUARIO, " +
        "C.DIA_COMENTARIO || ' - ' || C.HORA_COMENTARIO AS FECHA_COMENTARIO, C.CONTENIDO_COMENTARIO " +
        "FROM TAREA T " +
        "INNER JOIN COMENTARIO C ON T.TAREA_ID = C.TAREA_ID " +
        "INNER JOIN USUARIO U ON C.USUARIO_ID = U.USUARIO_ID " +
        "INNER JOIN EMPLEADO E ON U.USUARIO_ID = E.USUARIO_ID " +
        "WHERE C.COMENTARIO_PADRE_ID IS NULL AND C.CONTENIDO_COMENTARIO IS NOT NULL  AND C.TAREA_ID = $1 " +
        "ORDER BY FECHA_COMENTARIO DESC",
      [id]
    );

    const comentarios = listaComentarios.rows;

    const comentariosIds = comentarios.map(
      (comentario) => comentario.comentario_id
    );

    const comentarioComentario = await pool.query(
      "SELECT E.NOMBRE || ' ' || E.APELLIDO AS USUARIO, " +
        "C.DIA_COMENTARIO || ' - ' || C.HORA_COMENTARIO AS FECHA_COMENTARIO, C.CONTENIDO_COMENTARIO, " +
        "C.COMENTARIO_PADRE_ID " +
        "FROM COMENTARIO C " +
        "INNER JOIN USUARIO U ON C.USUARIO_ID = U.USUARIO_ID " +
        "INNER JOIN EMPLEADO E ON U.USUARIO_ID = E.USUARIO_ID " +
        "WHERE C.COMENTARIO_PADRE_ID = ANY($1) " +
        "ORDER BY FECHA_COMENTARIO DESC",
      [comentariosIds]
    );
    const comentariosHijos = comentarioComentario.rows;

    const comentariosEstructurados = [];

    for (let i = 0; i < comentarios.length; i++) {
      const comentario = comentarios[i];
      const comentariosHijosDelComentario = comentariosHijos.filter(
        (comentarioHijo) =>
          comentarioHijo.comentario_padre_id === comentario.comentario_id
      );
      const comentarioConHijos = {
        ...comentario,
        comentarios_hijos: comentariosHijosDelComentario,
      };
      comentariosEstructurados.push(comentarioConHijos);
    }

    res.json(comentariosEstructurados);
  } catch (error) {
    console.log(error);
  }
};

const calendarioProyecto = async (req, res) => {
  try {
    const { id, fecha } = req.params;

    // Obtener las tareas y reuniones del proyecto en la fecha especificada
    const tareas = await pool.query(
      `SELECT t.nombre_tarea, t.hora_limite_tarea AS hora, t.descripcion_tarea AS descripcion, 'Tarea' AS tipo
      FROM tarea t
      INNER JOIN proyecto p ON t.proyecto_id = p.proyecto_id
      WHERE p.proyecto_id = $1 AND t.fecha_limite_tarea = $2`,
      [id, fecha]
    );
    const reuniones = await pool.query(
      `SELECT r.hora_reunion AS hora, r.descripcion_reunion AS descripcion, 'Reunión' AS tipo
      FROM reunion r
      INNER JOIN proyecto p2 ON r.proyecto_id = p2.proyecto_id
      WHERE p2.proyecto_id = $1 AND r.dia_reunion = $2`,
      [id, fecha]
    );

    // Combinar las tareas y reuniones en un solo arreglo y ordenar por hora
    const calendario = [...tareas.rows, ...reuniones.rows].sort((a, b) => {
      return a.hora.localeCompare(b.hora);
    });

    res.json(calendario);
  } catch (error) {
    console.log(error);
  }
};

//Nueva reunion
const nuevaReunion = async (dia, hora, descripcion, proyectoId) => {
  try {
    const query = `
        INSERT INTO reunion(dia_reunion, hora_reunion, descripcion_reunion, proyecto_id)
        VALUES ($1, $2, $3, $4)
        RETURNING reunion_id`;
    const values = [dia, hora, descripcion, proyectoId];
    const result = await pool.query(query, values);
    return result.rows[0].reunion_id;
  } catch (error) {
    throw error;
  }
};

const insertSesion = async (usuarioIds, reunionId) => {
  try {
    const query = `
        INSERT INTO sesion(usuario_id, reunion_id)
        SELECT unnest($1::int[]), $2`;
    const values = [usuarioIds, reunionId];
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

const crearReunionYSesion = async (req, res) => {
  try {
    const { dia, hora, descripcion, proyectoId, usuarioIds } = req.body;
    const reunionId = await nuevaReunion(dia, hora, descripcion, proyectoId);
    await insertSesion(usuarioIds, reunionId);
    res.json({ message: "Reunión y sesiones creadas correctamente." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al crear la reunión y las sesiones." });
  }
};
const mostrarListaEmpleados = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
        SELECT E.NOMBRE || ' ' || E.APELLIDO AS EMPLEADO 
        FROM ASIGNACION_EMPLEADOS AE
        INNER JOIN EMPLEADO E ON AE.EMPLEADO_ID = E.EMPLEADO_ID
        WHERE AE.PROYECTO_ID = $1`;
    const result = await pool.query(query, [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener la lista de empleados." });
  }
};

const actualizarEstadoYFechaTarea = async (req, res) => {
  try {
    const { tareaId } = req.params;
    const { estado_tarea } = req.body;

    // Lógica para actualizar el estado de la tarea y la fecha/hora realizada
    const result = await pool.query('UPDATE tarea SET estado_tarea = $1 WHERE tarea_id = $2 RETURNING *', [estado_tarea, tareaId]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Tarea no encontrada." });

      if (estado_tarea == 3) {
        await pool.query(
          'UPDATE tarea SET fecha_realizada_tarea = current_date, hora_realizada_tarea = current_time WHERE tarea_id = $1',
          [tareaId]
        );
      }

      return res.json({ message: 'Estado y fecha de tarea actualizados correctamente.', estado_tarea:result.rows[0].estado_tarea }) 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el estado y la fecha de la tarea.' });
  }
};

const nuevaTarea = async (nombre, descripcion, dia, hora, proyectoId) => {
  try {
    const query = `
      INSERT INTO TAREA (NOMBRE_TAREA, DESCRIPCION_TAREA, FECHA_CREACION_TAREA, HORA_CREACION_TAREA, 
        FECHA_LIMITE_TAREA, HORA_LIMITE_TAREA, ESTADO_TAREA, PROYECTO_ID, USUARIO_ID) 
      VALUES ($1, $2, CURRENT_DATE, CURRENT_TIME, $3, $4, 1, $5, 1)
      RETURNING tarea_id`;
    const values = [nombre, descripcion, dia, hora, proyectoId];
    const result = await pool.query(query, values);
    return result.rows[0].tarea_id;
  } catch (error) {
    throw error;
  }
};

const insertAsignacionTarea = async (usuarioIds, tareaId) => {
  try {
    const query = `
      INSERT INTO asignacion_tarea(usuario_id, tarea_id)
      SELECT unnest($1::int[]), $2`;
    const values = [usuarioIds, tareaId];
    await pool.query(query, values);
  } catch (error) {
    throw error;
  }
};

const crearTareaYSesion = async (req, res) => {
  try {
    const { nombre, descripcion, dia, hora, proyectoId, usuarioIds } = req.body;
    const tareaId = await nuevaTarea(nombre, descripcion, dia, hora, proyectoId);
    await insertAsignacionTarea(usuarioIds, tareaId);
    res.json({ message: 'Tarea y asignaciones creadas correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la tarea y las asignaciones.' });
  }
};

module.exports = {
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
};
