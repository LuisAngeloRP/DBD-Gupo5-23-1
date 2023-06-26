const pool = require("../db")

const mostrarListaProyectos = async (req, res) => {
    try {
        const proyectos = await pool.query('SELECT P.PROYECTO_ID, '+
            'P.FECHA_CREACION, '+
            'P.FECHA_FINALIZACION_ESTIMADA, '+
            'P.NOMBRE_PROYECTO, '+
            'P.DESCRIPCION_PROYECTO, '+
            'P.ESTADO_PROYECTO, '+
            'C2.NOMBRE_CLIENTE '+
        'FROM PROYECTO P '+
        'INNER JOIN CONTRATO C ON (P.PROYECTO_ID = C.PROYECTO_ID) '+
        'INNER JOIN CLIENTE C2 ON (C.CLIENTE_ID = C2.CLIENTE_ID)');
        const rows = proyectos.rows.map((row) => {
            const modifiedRows = { ...row }
            modifiedRows["fecha_creacion"] = modifiedRows["fecha_creacion"].toISOString().substring(0, 10)
            modifiedRows["fecha_finalizacion_estimada"] = modifiedRows["fecha_finalizacion_estimada"].toISOString().substring(0, 10)
            return modifiedRows
        });
        res.json(rows);
    } catch (error) {
        console.log(error)
    }
};
const mostrarAsignacionesRecursos = async (req, res) => {
    try {
        const { id } = req.params;
        const asignacionesRecursos = await pool.query('select R.recurso_id, '+
            'R.nombre, '+
            'R.tipo_recurso, '+
            'AR.CANTIDAD_ASIGNADA '+
        'from ASIGNACION_RECURSOS AR '+
        'inner join RECURSOS R on (ar.RECURSO_ID = r.RECURSO_ID) '+
        'left join hardware h on (AR.recurso_id = h.recurso_id) '+
        'left join software s on (AR.recurso_id = s.recurso_id) '+
        'WHERE AR.PROYECTO_ID = $1', [id]);
        res.json(asignacionesRecursos.rows);
    } catch (error) {
        console.log(error);
    }
};
const mostrarRecursosDisponibles = async (req, res) => {
    try {
        const recursosDisponibles = await pool.query('SELECT R.RECURSO_ID, '+
			'R.NOMBRE, '+
			'R.TIPO_RECURSO, '+
			'R.CANTIDAD_DISPONIBLE '+
		'FROM RECURSOS R '+
		'LEFT JOIN ASIGNACION_RECURSOS AR ON (R.RECURSO_ID = AR.RECURSO_ID) '+
		'WHERE AR.RECURSO_ID IS NULL');
        res.json(recursosDisponibles.rows);
    } catch (error) {
        console.log(error);
    }
};
const mostrarProyecto = async (req, res) => {
    try {
        const { id } = req.params;
        const proyecto = await pool.query('SELECT P.PROYECTO_ID, '+
            'P.FECHA_CREACION, '+
            'P.FECHA_FINALIZACION_ESTIMADA, '+
            'P.NOMBRE_PROYECTO, '+
            'P.DESCRIPCION_PROYECTO, '+
            'P.ESTADO_PROYECTO '+
        'FROM PROYECTO P '+
        'WHERE P.PROYECTO_ID = $1', [id]);
        res.json(proyecto.rows)
    } catch (error) {
        console.log(error)
    }
}
const mostrarRecurso = async (req, res) => {
    try {
        const { id } = req.params;
        const recurso = await pool.query('SELECT R.RECURSO_ID, '+
            'R.NOMBRE, '+
            'R.TIPO_RECURSO, '+
            'R.CANTIDAD_DISPONIBLE '+
        'FROM RECURSOS R '+
        'WHERE R.RECURSO_ID = $1', [id]);
        res.json(recurso.rows)
    } catch (error) {
        console.log(error)
    }
}
const agregarRecursoAsignado = async (req, res, next) => {
    try {
        const { id_recurso, id_proyecto } = req.params;
        const { cantidad_asignada, tiempo_asignado } = req.body;
        const result = await pool.query('INSERT INTO Asignacion_Recursos (cantidad_asignada, '+
            'tiempo_asignado, '+
            'fecha_asignacion, '+
            'recurso_id, '+
            'PROYECTO_ID) VALUES ($1, '+
            '$2, '+
            'CURRENT_DATE, '+
            '$3, '+
            '$4)', [cantidad_asignada, tiempo_asignado, id_recurso, id_proyecto]);
        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}
const quitarRecursoAsignado = async (req, res, next) => {
    try {
        const { id_proyecto, id_recurso } = req.params;
        const result = await pool.query('DELETE FROM ASIGNACION_RECURSOS '+
        'WHERE PROYECTO_ID = $1 AND RECURSO_ID = $2', [id_proyecto, id_recurso]);
        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}
const editarCantidadAsignadaRecurso = async (req, res, next) => {
    try {
        const { id_recurso, id_proyecto } = req.params;
        const { cantidad_asignada } = req.body;
        const result = await pool.query('UPDATE ASIGNACION_RECURSOS SET CANTIDAD_ASIGNADA = $1 '+
		'WHERE RECURSO_ID = $2 AND PROYECTO_ID = $3', [cantidad_asignada, id_recurso, id_proyecto]);
        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}
const mostrarAsignacionesEmpleados = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT E.EMPLEADO_ID, '+
            'CONCAT(E.NOMBRE, \' \', E.APELLIDO), '+
            'AE.HORAS_ASIGNADAS_TRABAJO, '+
            'E.ESPECIALIDAD '+
        'FROM ASIGNACION_EMPLEADOS AE '+
        'INNER JOIN EMPLEADO E ON (AE.EMPLEADO_ID = E.EMPLEADO_ID) '+
        'WHERE AE.PROYECTO_ID = $1', [id]);
        console.log('Resultados de la consulta:', result.rows);
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}
const mostrarEmpleadosDisponibles = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT E.EMPLEADO_ID, '+
            'CONCAT(E.NOMBRE, \' \', E.APELLIDO), '+
            'E.ESPECIALIDAD, '+
            'E.TOTAL_HORAS_DISPONIBLES, '+
            'E.SALARIO_HORA '+
        'FROM EMPLEADO E '+
        'LEFT JOIN ASIGNACION_EMPLEADOS AE ON (E.EMPLEADO_ID = AE.EMPLEADO_ID) '+
        'WHERE AE.PROYECTO_ID IS NULL');
        res.json(result.rows)
    } catch (error) {
        next(error)
    }
}
const agregarAsignacionEmpleado = async (req, res, next) => {
    try {
        const { id_proyecto, id_empleado } = req.params;
        const { fecha_fin_trabajo, horas_asignadas_trabajo } = req.body;
        const result = await pool.query('INSERT INTO ASIGNACION_EMPLEADOS (FECHA_INICIO_TRABAJO, '+
            'FECHA_FIN_TRABAJO, '+
            'HORAS_ASIGNADAS_TRABAJO, '+
            'PROYECTO_ID, '+
            'EMPLEADO_ID) VALUES (CURRENT_DATE, '+
            '$1, '+
            '$2, '+
            '$3, '+
            '$4)', [fecha_fin_trabajo, horas_asignadas_trabajo, id_proyecto, id_empleado]);
        return res.json(result.rows)
    } catch (error) {
        next(error)
    }
}
const quitarAsignacionEmpleado = async (req, res, next) => {
    try {
        console.log(req.params)
        console.log(' asdasdasd')
        const { id_proyecto, id_empleado } = req.params;
        const result = await pool.query('DELETE FROM ASIGNACION_EMPLEADOS '+
           'WHERE PROYECTO_ID = $1 AND EMPLEADO_ID = $2', [id_proyecto, id_empleado]);
        return res.json(result.rows)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    mostrarListaProyectos,
    mostrarAsignacionesRecursos,
    mostrarRecursosDisponibles,
    mostrarProyecto,
    mostrarRecurso,
    agregarRecursoAsignado,
    quitarRecursoAsignado,
    editarCantidadAsignadaRecurso,
    mostrarAsignacionesEmpleados,
    mostrarEmpleadosDisponibles,
    agregarAsignacionEmpleado,
    quitarAsignacionEmpleado
}