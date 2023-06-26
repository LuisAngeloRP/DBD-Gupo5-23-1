import * as React from 'react';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FormGroup,
	FormControlLabel,
	Checkbox,
	FormHelperText
} from '@mui/material';
import DialogAsignarEmpleado from './DialogAsignarEmpleado';
import DialogQuitarEmpleado from './DialogQuitarEmpleado';
import { styled } from '@mui/material/styles';

export default function VerProyectoAsignacionesEmpleados() {
	const navigate = useNavigate();
	const params = useParams();
	const [ empleadosAsignadosProyecto, setEmpleadosAsignadosProyecto ] = useState([]);
	const cargarEmpleadosAsignadosProyecto = async (id) => {
		const response = await fetch('http://localhost:4000/mostrar-asignaciones-empleados/'+id);
		const data = await response.json();
		setEmpleadosAsignadosProyecto(data)
	};
	const [ empleadosDisponibles, setEmpleadosDisponibles ] = useState([]);
	const cargarEmpleadosDisponibles = async () => {
		const response = await fetch('http://localhost:4000/mostrar-empleados-disponibles');
		const data = await response.json();
		setEmpleadosDisponibles(data)
	};
	const [ datosProyecto, setDatosProyecto ] = useState([]);
	const cargarDatosProyecto = async (id) => {
		const response = await fetch('http://localhost:4000/mostrar-proyecto/'+id);
		const data = await response.json();
		setDatosProyecto(data)
	};
	useEffect(() => {
		if (params.id) cargarDatosProyecto(params.id)
		if (params.id) cargarEmpleadosAsignadosProyecto(params.id)
		cargarEmpleadosDisponibles()
	}, [params.id])
	const [ selectedEmpleadoId, setSelectedEmpleadoId ] = useState(null);
	const handleCheckBoxChange = (empleadoId) => {
		setSelectedEmpleadoId(empleadoId)
	};
	const isButtonAsignarDisabled = selectedEmpleadoId === null || empleadosAsignadosProyecto.some(empleado => empleado.empleado_id === selectedEmpleadoId);
	const isButtonQuitarDisabled = selectedEmpleadoId === null || empleadosDisponibles.some(empleado => empleado.empleado_id === selectedEmpleadoId);
	const [openDialog, setOpenDialog] = useState(false);
	const handleButtonClick = () => {
		setOpenDialog(true);
	};
	const [ selectedEmpleado, setSelectedEmpleado ] = useState(null);
	const proyectoSeleccionado = datosProyecto.length > 0 ? datosProyecto[0] : null;
	useEffect(() => {
		let selectedEmpleado = empleadosAsignadosProyecto.find(
			(empleado) => empleado.empleado_id === selectedEmpleadoId
		);
		if (!selectedEmpleado) {
			selectedEmpleado = empleadosDisponibles.find(
				(empleado) => empleado.empleado_id === selectedEmpleadoId
			)
		}
		setSelectedEmpleado(selectedEmpleado)
	}, [empleadosAsignadosProyecto, selectedEmpleadoId])
	const [openAsignarDialog, setOpenAsignarDialog] = useState(false);
	const [openQuitarDialog, setOpenQuitarDialog] = useState(false);
	const handleAsignarButtonClick = () => {
		setOpenAsignarDialog(true);
	};
	const handleQuitarButtonClick = () => {
		setOpenQuitarDialog(true);
	};
	const handleDialogClose = () => {
		setOpenAsignarDialog(false);
		setOpenQuitarDialog(false);
	};
	return (
		<Container>
			<Button style={{ margin: '1rem', fontSize: '2rem' }} variant = 'contained' onClick={() => navigate(`/lista-proyectos/${params.id}/asignaciones-recursos`)}>
				Recursos
			</Button>
			<Button style={{ margin: '1rem', fontSize: '2rem' }} variant = 'contained' onClick={() => navigate(`/lista-proyectos/${params.id}/asignaciones-empleados`)}>
				Empleados
			</Button>
			{
				proyectoSeleccionado && (
					<Typography style={{ marginTop: '1rem', marginBottom: '1rem', fontWeight: 'bold', fontSize: '4rem', fontFamily: 'monospace' }}>
						{proyectoSeleccionado.nombre_proyecto}
					</Typography>
				)
			}
			<Typography style={{ marginTop: '1rem', marginBottom: '1rem', fontSize: '2rem', fontFamily: 'monospace' }}>Empleados asignados al proyecto</Typography>
			<TableContainer component={Paper}>
				<Table>
						<TableHead sx = {{ backgroundColor: '#4285F4' }}>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Id</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Empleado</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Especialidad</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Horas por semana</TableCell>
							<TableCell>
							</TableCell>
						</TableHead>
						<TableBody>
							{
								empleadosAsignadosProyecto.map(row => (
									<TableRow key={row.empleado_id} sx={
										{'&:last-child td, &:last-child th': { border: 0 }}
									}>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.empleado_id}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.concat}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.especialidad}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.horas_asignadas_trabajo}</TableCell>
										<TableCell>
											<FormGroup>
												<FormControlLabel
													control={
														<Checkbox
															checked = {selectedEmpleadoId === row.empleado_id}
															onChange = {() => handleCheckBoxChange(row.empleado_id)}
														/>
													}
												/>
											</FormGroup>
										</TableCell>
									</TableRow>
							))}	
						</TableBody>
				</Table>			
			</TableContainer>
			<Typography style={{ marginTop: '1rem', marginBottom: '1rem', fontSize: '2rem', fontFamily: 'monospace' }}>Empleados disponibles</Typography>
			<TableContainer component={Paper}>
				<Table>
						<TableHead sx = {{ backgroundColor: '#4285F4' }}>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Id</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Empleado</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Especialidad</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Horas disponibles por semana</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Salario por hora</TableCell>	
							<TableCell>
							</TableCell>
						</TableHead>
						<TableBody sx={{ maxWidth: '50px' }}>
							{
								empleadosDisponibles.map(row => (
									<TableRow key={row.empleado_id} sx={
										{'&:last-child td, &:last-child th': { border: 0 }}
									}>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.empleado_id}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.concat}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.especialidad}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.total_horas_disponibles}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.salario_hora}</TableCell>
										<TableCell>
											<FormGroup>
												<FormControlLabel
													control={
														<Checkbox
															checked = {selectedEmpleadoId === row.empleado_id}
															onChange={() => handleCheckBoxChange(row.empleado_id)}
														/>
													}
												/>
											</FormGroup>
										</TableCell>
									</TableRow>
							))}
						</TableBody>
				</Table>
			</TableContainer>
			<Button
				variant	= "contained"
				color = "success"
				disabled = { isButtonAsignarDisabled }
				onClick = { handleAsignarButtonClick }
				style={{ margin: '1rem' }}
			>
				Asignar empleado
			</Button>
			{
				openAsignarDialog && (
					<DialogAsignarEmpleado
						open = { openAsignarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						empleado = { selectedEmpleado }
					/>
				)
			}
			<Button
				variant	= "contained"
				color = "error"
				disabled = { isButtonQuitarDisabled }
				onClick = { handleQuitarButtonClick }
				style={{ margin: '1rem' }}
			>
				Quitar empleado
			</Button>
			{
				openQuitarDialog && (
					<DialogQuitarEmpleado
						open = { openQuitarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						empleado = { selectedEmpleado }
					/>
				)
			}
		</Container>
	)
}