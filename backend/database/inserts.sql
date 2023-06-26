CREATE TABLE Usuario (
	usuario_id SERIAL PRIMARY KEY,
	nombre_usuario VARCHAR(255),
	correo_electronico_usuario VARCHAR(255),
	contraseña_usuario VARCHAR(255),
	rol_usuario INT
);

CREATE TABLE Empleado (
	empleado_id SERIAL PRIMARY KEY,
	apellido VARCHAR(255),
	nombre VARCHAR(255),
	especialidad VARCHAR(255),
	fecha_incorporacion DATE,
	estado_empleado INT,
	correo VARCHAR(255),
	dni VARCHAR(20),
	total_horas_disponibles INT,
	salario_hora NUMERIC(10, 2),
	gasto_id INT,
	usuario_id INT,
	FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);

CREATE TABLE Proyecto (
  proyecto_id SERIAL PRIMARY KEY,
  fecha_creacion DATE,
  fecha_finalizacion_estimada DATE,
  fecha_finalizacion DATE,
  estado_proyecto INT,
  descripcion_proyecto TEXT,
  empleado_id INT,
  nombre_proyecto VARCHAR(255),
  FOREIGN KEY (empleado_id) REFERENCES Empleado(empleado_id)
);

CREATE TABLE Hito
(
  hito_id SERIAL,
  descripcion_hito TEXT,
  nombre_hito VARCHAR(20),
  prioridad_hito INT,
  fecha_inicio_hito DATE,
  fecha_fin_hito DATE,
  progreso_hito INT,
  proyecto_id INT,
  PRIMARY KEY (hito_id, proyecto_id),
  FOREIGN KEY (proyecto_id) REFERENCES proyecto(proyecto_id)
);

CREATE TABLE Cliente (
  cliente_id SERIAL PRIMARY KEY,
  ruc_cliente BIGINT,
  nombre_cliente VARCHAR(255),
  direccion_cliente VARCHAR(255),
  telefono_cliente VARCHAR(255),
  nombre_contacto_cliente VARCHAR(255),
  apellido_contacto_cliente VARCHAR(255),
  correo_electronico_contacto_cliente VARCHAR(255)
);

CREATE TABLE Reunion (
  reunion_id SERIAL PRIMARY KEY,
  descripcion_reunion TEXT,
  dia_reunion DATE,
  hora_reunion TIME,
  proyecto_id INT,
  FOREIGN KEY (proyecto_id) REFERENCES Proyecto(proyecto_id)
);

CREATE TABLE Tarea (
	tarea_id SERIAL PRIMARY KEY,
	nombre_tarea VARCHAR(50)	,
	descripcion_tarea TEXT,
	fecha_creacion_tarea DATE,
	hora_creacion_tarea TIME,
	fecha_limite_tarea DATE,
	hora_limite_tarea TIME,
	fecha_realizada_tarea DATE,
	hora_realizada_tarea TIME,
	estado_tarea INT,
	proyecto_id INT,
	usuario_id INT,
	hito_id INT,
	FOREIGN KEY (proyecto_id) REFERENCES Proyecto(proyecto_id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
	FOREIGN KEY (hito_id, proyecto_id) REFERENCES Hito(hito_id, proyecto_id)
);

CREATE TABLE Notificacion (
  notificacion_id SERIAL PRIMARY KEY,
  tipo_notificacion INT,
  fecha_notificacion DATE,
  hora_notificacion TIME,
  estado_notificacion INT,
  detalle_notificacion TEXT,
  reunion_id INT,
  tarea_id INT,
  FOREIGN KEY (reunion_id) REFERENCES Reunion(reunion_id),
  FOREIGN KEY (tarea_id) REFERENCES Tarea(tarea_id)
);

CREATE TABLE Asignacion_Empleados (
	fecha_inicio_trabajo DATE,
	fecha_fin_trabajo DATE,
	horas_asignadas_trabajo INT,
	proyecto_id INT,
	empleado_id INT,
	PRIMARY KEY (proyecto_id, empleado_id),
	FOREIGN KEY (proyecto_id) REFERENCES Proyecto(proyecto_id),
	FOREIGN KEY (empleado_id) REFERENCES Empleado(empleado_id)
);

CREATE TABLE Contrato (
	cliente_id INT,
	proyecto_id INT,
	PRIMARY KEY (cliente_id, proyecto_id),
	FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id),
	FOREIGN KEY (proyecto_id) REFERENCES Proyecto(proyecto_id)
);

CREATE TABLE Sesion (
	usuario_id INT,
	reunion_id INT,
	PRIMARY KEY (usuario_id, reunion_id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
	FOREIGN KEY (reunion_id) REFERENCES Reunion(reunion_id)
);

CREATE TABLE Asignacion_Tarea (
	usuario_id INT,
	tarea_id INT,
	PRIMARY KEY (usuario_id, tarea_id),
	FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
	FOREIGN KEY (tarea_id) REFERENCES Tarea(tarea_id)
);

CREATE TABLE Acuerdo_Reunion (
  acuerdo_id SERIAL,
  reunion_id INT,
  descripcion_acuerdo TEXT,
  PRIMARY KEY (acuerdo_id),
  FOREIGN KEY (reunion_id) REFERENCES Reunion(reunion_id)
);

CREATE TABLE Tarea_Planteada_Reunion (
  tarea_id SERIAL,
  reunion_id INT,
  descripcion_tarea_planteada TEXT,
  PRIMARY KEY (tarea_id),
  FOREIGN KEY (reunion_id) REFERENCES Reunion(reunion_id)
);

CREATE TABLE Tema_Reunion (
  tema_id SERIAL,
  reunion_id INT,
  descripcion_tema TEXT,
  PRIMARY KEY (tema_id),
  FOREIGN KEY (reunion_id) REFERENCES Reunion(reunion_id)
);

CREATE TABLE Presupuesto (
  presupuesto_id SERIAL PRIMARY KEY,
  descripcion_presupuesto TEXT,
  fecha_creacion_presupuesto DATE,
  monto_presupuesto NUMERIC(10, 2),
  divisa_presupuesto INT,
  porcentaje_usado INT,
  estado_presupuesto INT,
  proyecto_id INT,
  FOREIGN KEY (proyecto_id) REFERENCES Proyecto(proyecto_id)
);

CREATE TABLE Comentario (
	comentario_id SERIAL PRIMARY KEY,
	contenido_comentario TEXT,
	dia_comentario DATE,
	hora_comentario TIME,
	usuario_id INT,
	tarea_id INT,
	proyecto_id INT,
	reunion_id INT,
	comentario_padre_id INT,
	FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id),
	FOREIGN KEY (tarea_id) REFERENCES Tarea(tarea_id),
	FOREIGN KEY (proyecto_id) REFERENCES Proyecto(proyecto_id),
	FOREIGN KEY (reunion_id) REFERENCES Reunion(reunion_id),
	FOREIGN KEY (comentario_padre_id) REFERENCES Comentario(comentario_id)
);

CREATE TABLE Adjunto (
	adjunto_id SERIAL PRIMARY KEY,
	nombre_adjunto VARCHAR(100),
	url_adjunto VARCHAR(200),
	tipo_adjunto INT,
	comentario_id INT,
	FOREIGN KEY (comentario_id) REFERENCES Comentario(comentario_id)
);

CREATE TABLE Recursos (
	recurso_id SERIAL PRIMARY KEY,
	nombre VARCHAR(255),
	estado_recurso INT,
	fecha_pedido DATE,
	fecha_llegada DATE,
	unidad_cantidad VARCHAR(20),
	cantidad_disponible INT,
	gasto_id INT,
	tipo_recurso INT,
	proveedor_recurso VARCHAR(255)
);

CREATE TABLE Partida (
	partida_id SERIAL,
	estado_partida INT,
	divisa VARCHAR(3),
	descripcion TEXT,
	monto NUMERIC(10, 2),
	fecha_estimacion DATE,
	presupuesto_id INT,
	tipo_partida INT,
	PRIMARY KEY (partida_id)
);

CREATE TABLE Hardware (
  modelo VARCHAR(255),
  fabricante VARCHAR(255),
  recurso_id INT PRIMARY KEY
);

CREATE TABLE Software (
  licencia VARCHAR(255),
  duracion_licencia INT,
  recurso_id INT PRIMARY KEY
);

CREATE TABLE Servicios (
  servicio_id SERIAL PRIMARY KEY,
  descripcion TEXT,
  monto NUMERIC(10, 2),
  nombre VARCHAR(255),
  estado_servicio INT,
  gasto_id INT,
  proveedor_servicio VARCHAR(255)
);

CREATE TABLE Gasto (
	gasto_id SERIAL PRIMARY KEY,
	descripcion TEXT,
	monto NUMERIC(10, 2),
	fecha DATE,
	divisa VARCHAR(3),
	partida_id INT
);

CREATE TABLE Asignacion_Recursos (
	cantidad_asignada INT,
	tiempo_asignado INT,
	fecha_asignacion DATE,
	recurso_id INT,
	proyecto_id INT,
	PRIMARY KEY (recurso_id, proyecto_id)
);

-- ALTER TABLE para agregar las relaciones de clave externa
ALTER TABLE Recursos ADD FOREIGN KEY (gasto_id) REFERENCES Gasto(gasto_id);
ALTER TABLE Empleado ADD FOREIGN KEY (gasto_id) REFERENCES Gasto(gasto_id);
ALTER TABLE Servicios ADD FOREIGN KEY (gasto_id) REFERENCES Gasto(gasto_id);
-- Correcciones en las tablas de asignaciones
-- Agregar clave externa en la tabla Asignacion_Empleados
-- Agregar clave externa en la tabla Asignacion_Recursos
ALTER TABLE Asignacion_Recursos ADD FOREIGN KEY (recurso_id) REFERENCES Recursos(recurso_id);
ALTER TABLE Asignacion_Recursos ADD FOREIGN KEY (proyecto_id) REFERENCES Proyecto(proyecto_id);
-- Agregar clave externa en la tabla Hardware
ALTER TABLE Hardware ADD FOREIGN KEY (recurso_id) REFERENCES Recursos(recurso_id);
-- Agregar clave externa en la tabla Software
ALTER TABLE Software ADD FOREIGN KEY (recurso_id) REFERENCES Recursos(recurso_id);
-- Agregar clave externa en la tabla Partida
ALTER TABLE Partida ADD FOREIGN KEY (presupuesto_id) REFERENCES Presupuesto(presupuesto_id);
ALTER TABLE Gasto ADD FOREIGN KEY (partida_id) REFERENCES Partida(partida_id);
-- Agregar atributo observación a la tabla hitos
ALTER TABLE Hito ADD COLUMN observacion text;

---------------------------------------------------------------------------------------------------------------------

--OE DANIEL HE SEGUIDO EL ORDEN DEL .TXT QUE MANDASTE

--ALGUNAS TABLAS YA ESTAN CON SUS FKS

INSERT INTO Usuario (nombre_usuario,
	correo_electronico_usuario,
	contraseña_usuario,
	rol_usuario) VALUES ('csbp',
	'christian.barrantes.p@uni.pe',
	'asdasd123123',
	1),
	('larp',
	'angelo.rodriguez.p@uni.pe',
	'123123asdasd',
	1);

INSERT INTO Empleado (apellido,
	nombre,
	especialidad,
	fecha_incorporacion,
	estado_empleado,
	correo,
	dni,
	total_horas_disponibles,
	salario_hora,
	gasto_id,
	usuario_id) VALUES ('Barrantes Padilla',
	'Christian Stefhano',
	'Software',
	'2023-05-31',
	1,
	'christian.barrantes.p@uni.pe',
	'73212422',
	22,
	45,
	null,
	null),
	('Rodriguez Parreño',
	'Luis Angelo',
	'Software',
	'2023-04-13',
	1,
	'luis.rodriguez.p@uni.pe',
	'12355321',
	50,
	20,
	null,
	null);

INSERT INTO PROYECTO (fecha_creacion,
	fecha_finalizacion_estimada,
	fecha_finalizacion,
	estado_proyecto,
	descripcion_proyecto,
	empleado_id,
	nombre_proyecto) VALUES ('2023-10-04',
	'2024-02-05',
	null,
	1,
	'Desarrollar el proyecto',
	null,
	'ERI BOT'),
	('2023-12-08',
	'2024-09-04',
	null,
	1,
	'Desarrollar el proyecto',
	null,
	'CYBER EYE BOT');

INSERT INTO HITO (descripcion_hito,
	nombre_hito,
	prioridad_hito,
	fecha_inicio_hito,
	fecha_fin_hito,
	progreso_hito,
	proyecto_id,
	observacion) VALUES ('Identificar los requisitos necesarios',
	'Identificacion',
	1,
	'2023-10-07',
	'2023-10-13',
	25,
	1,
	'Fuera de la fecha limite'),
	('Documentar los requisitos identificados',
	'Documentación',
	1,
	'2023-10-13',
	'2023-10-22',
	60,
	1,
	'Se inicio con una demora de 3 dias');

INSERT INTO CLIENTE (ruc_cliente,
	nombre_cliente,
	direccion_cliente,
	telefono_cliente,
	nombre_contacto_cliente,
	apellido_contacto_cliente,
	correo_electronico_contacto_cliente) VALUES ('22221111',
	'Universidad Nacional de Ingenieria',
	'Lima, Perú',
	'123123123',
	'Daniel Antonio',
	'Zanabria Adriazola',
	'daniel.zanabria.a@uni.pe'),
	('11114444',
	'Agro Industrial Paramonga',
	'Lima, Perú',
	'999888322',
	'Juan Josue',
	'Teran Rebaza',
	'juan.teran.r@uni.pe');

INSERT INTO REUNION (descripcion_reunion,
	dia_reunion,
	hora_reunion,
	proyecto_id) VALUES ('Reunión de seguimiento',
	'2022-04-05',
	'10:00:00',
	1),
	('Reunión de planificación',
	'2022-03-20',
	'14:30:00',
	2);

INSERT INTO TAREA (nombre_tarea,
	descripcion_tarea,
	fecha_creacion_tarea,
	hora_creacion_tarea,
	fecha_limite_tarea,
	hora_limite_tarea,
	fecha_realizada_tarea,
	hora_realizada_tarea,
	estado_tarea,
	proyecto_id,
	usuario_id,
	hito_id) VALUES ('Desarrollo de Software',
	'Aprender metodología',
	'2023-01-01',
	'00:00:00',
	'2023-03-01',
	'12:00:00',
	'2023-03-12',
	'14:23:55',
	2,
	1,
	1,
	1),
	('Desarrollo de Software',
	'Realizar código',
	'2023-02-01',
	'11:00:00',
	'2023-04-01',
	'12:00:40',
	'2023-05-02',
	'14:23:55',
	2,
	1,
	2,
	2);

INSERT INTO NOTIFICACION (tipo_notificacion,
	fecha_notificacion,
	hora_notificacion,
	estado_notificacion,
	detalle_notificacion,
	reunion_id,
	tarea_id) VALUES (1,
	'2023-06-16',
	'14:51:13',
	1,
	'Recordatorio de reunión',
	1,
	1),
	(1,
	'2023-06-18',
	'21:27:58',
	1,
	'Se han realizado cambios en la reunión',
	2,
	1);

INSERT INTO ASIGNACION_EMPLEADOS (fecha_inicio_trabajo,
	fecha_fin_trabajo,
	horas_asignadas_trabajo,
	proyecto_id,
	empleado_id) VALUES ('2022-03-31',
	'2022-08-31',
	140,
	1,
	1),
	('2023-04-25',
	'2023-11-10',
	160,
	2,
	2);

INSERT INTO CONTRATO (cliente_id,
	proyecto_id) VALUES (1,
	1),
	(2,
	2);

INSERT INTO SESION (usuario_id,
	reunion_id) VALUES (1,
	1),
	(2,
	2);

INSERT INTO ASIGNACION_TAREA (usuario_id,
	tarea_id) VALUES (1,
	1),
	(2,
	2);

INSERT INTO ACUERDO_REUNION (reunion_id,
	descripcion_acuerdo) VALUES (1,
	'Acordar fecha límite para la entrega del informe'),
	(2,
	'Definir las tareas prioritarias para la próxima semana');