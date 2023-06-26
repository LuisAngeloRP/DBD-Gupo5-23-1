import * as React from 'react';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { FormGroup,
	FormControlLabel,
	Checkbox,
	FormHelperText
} from '@mui/material';
import DialogAsignarRecurso from './DialogAsignarRecurso';
import DialogQuitarRecurso from './DialogQuitarRecurso'
import DialogEditarRecurso from './DialogEditarRecurso';
import { alignProperty } from '@mui/material/styles/cssUtils';

export default function VerProyectoAsignacionesRecursos() {
	const navigate = useNavigate();
	const params = useParams();
	const [proyectoAsignacionesRecursos, setProyectoAsignacionesRecursos] = useState([]);
	const cargarProyectoAsignacionesRecursos = async (id) => {
		const response = await fetch('http://localhost:4000/mostrar-asignaciones-recursos/'+id);
		const data = await response.json();
		setProyectoAsignacionesRecursos(data)
	};
	const [recursosDisponibles, setRecursosDisponibles] = useState([]);
	const cargarRecursosDisponibles = async () => {
		const response = await fetch('http://localhost:4000/mostrar-recursos-disponibles');
		const data = await response.json();
		setRecursosDisponibles(data)
	};
	const [datosProyecto, setDatosProyecto] = useState([]);
	const cargarDatosProyecto = async (id) => {
		const response = await fetch('http://localhost:4000/mostrar-proyecto/'+id);
		const data = await response.json();
		setDatosProyecto(data)
	};
	useEffect(() => {
		if (params.id) cargarProyectoAsignacionesRecursos(params.id)
		cargarRecursosDisponibles()
		if (params.id) cargarDatosProyecto(params.id)
	}, [params.id])
	const [ selectedRecursoId, setSelectedRecursoId ] = useState(null);
	const handleCheckBoxChange = (recursoId) => {
		setSelectedRecursoId(recursoId)
	};
	const isButtonAsignarDisabled = selectedRecursoId === null || proyectoAsignacionesRecursos.some(recurso => recurso.recurso_id === selectedRecursoId);
	const isButtonQuitarDisabled = selectedRecursoId === null || recursosDisponibles.some(recurso => recurso.recurso_id === selectedRecursoId);
	const [openDialog, setOpenDialog] = useState(false);
	const handleButtonClick = () => {
		setOpenDialog(true);
	};
	const [ selectedRecurso, setSelectedRecurso ] = useState(null);
	const proyectoSeleccionado = datosProyecto.length > 0 ? datosProyecto[0] : null;
	useEffect(() => {
		let selectedRecurso = proyectoAsignacionesRecursos.find(
			(recurso) => recurso.recurso_id === selectedRecursoId
		);
		if (!selectedRecurso) {
			selectedRecurso = recursosDisponibles.find(
				(recurso) => recurso.recurso_id === selectedRecursoId
			)
		}
		setSelectedRecurso(selectedRecurso)
	}, [proyectoAsignacionesRecursos, selectedRecursoId])
	const [openAsignarDialog, setOpenAsignarDialog] = useState(false);
	const [openQuitarDialog, setOpenQuitarDialog] = useState(false);
	const [openEditarDialog, setOpenEditarDialog] = useState(false);
	const handleAsignarButtonClick = () => {
		setOpenAsignarDialog(true);
	};
	const handleQuitarButtonClick = () => {
		setOpenQuitarDialog(true);
	};
	const handleEditarButtonClick = () => {
		setOpenEditarDialog(true);
	};
	const handleDialogClose = () => {
		setOpenAsignarDialog(false);
		setOpenQuitarDialog(false);
		setOpenEditarDialog(false);
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
			<Typography style={{ marginTop: '1rem', marginBottom: '1rem', fontSize: '2rem', fontFamily: 'monospace' }}>Recursos asignados al proyecto</Typography>
			<TableContainer component={Paper}>
				<Table>
						<TableHead sx = {{ backgroundColor: '#4285F4' }}>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Id</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Recurso</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Tipo</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Cant. Asig.</TableCell>
							<TableCell>
							</TableCell>
						</TableHead>
						<TableBody>
							{
								proyectoAsignacionesRecursos.map(row => (
									<TableRow key={row.recurso_id} sx={
										{'&:last-child td, &:last-child th': { border: 0 }}
									}>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.recurso_id}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.nombre}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.tipo_recurso}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.cantidad_asignada}</TableCell>
										<TableCell>
											<FormGroup>
												<FormControlLabel
													control={
														<Checkbox
															checked = {selectedRecursoId === row.recurso_id}
															onChange = {() => handleCheckBoxChange(row.recurso_id)}
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
			<Typography style={{ marginTop: '1rem', marginBottom: '1rem', fontSize: '2rem', fontFamily: 'monospace' }}>Recursos disponibles</Typography>
			<TableContainer component={Paper}>
				<Table>
						<TableHead sx = {{ backgroundColor: '#4285F4' }}>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Id</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Recurso</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Tipo</TableCell>
							<TableCell sx = {{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.4rem', textAlign: 'center' }}>Cant. Disp.</TableCell>   
							<TableCell></TableCell>
						</TableHead>
						<TableBody>
							{
								recursosDisponibles.map(row => (
									<TableRow key={row.recurso_id} sx={
										{'&:last-child td, &:last-child th': { border: 0 }}
									}>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.recurso_id}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.nombre}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.tipo_recurso}</TableCell>
										<TableCell sx = {{ fontSize: '1.2rem', textAlign: 'center' }}>{row.cantidad_disponible}</TableCell>
										<TableCell>
											<FormGroup>
												<FormControlLabel
													control={
														<Checkbox
															checked = {selectedRecursoId === row.recurso_id}
															onChange={() => handleCheckBoxChange(row.recurso_id)}
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
				Asignar recurso
			</Button>
			{
				openAsignarDialog && (
					<DialogAsignarRecurso
						open = { openAsignarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						recurso = { selectedRecurso }
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
				Quitar recurso
			</Button>
			{
				openQuitarDialog && (
					<DialogQuitarRecurso
						open = { openQuitarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						recurso = { selectedRecurso }
					/>
				)
			}
			<Button
				variant	= "contained"
				color = 'info'
				disabled = { isButtonQuitarDisabled }
				onClick = { handleEditarButtonClick }
				style={{ margin: '1rem' }}
			>
				Editar cantidad
			</Button>
			{
				openEditarDialog && (
					<DialogEditarRecurso
						open = { openEditarDialog }
						handleClose = { handleDialogClose }
						proyecto = { proyectoSeleccionado }
						recurso={ selectedRecurso }
					/>
				)
			}
		</Container>
	)
}