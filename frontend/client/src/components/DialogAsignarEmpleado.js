import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

const DialogAsignarRecurso = ({ open, handleClose, proyecto, empleado }) => {
    const [horasAsignadas, setHorasAsignadas] = useState('');
    const [fechaFinTrabajo, setFechaFinTrabajo] = useState('');
    const dia = fechaFinTrabajo.$D;
    const mes = fechaFinTrabajo.$M;
    const anio = fechaFinTrabajo.$y;
    const fechaFormateada = `${anio}/${mes}/${dia}`;
    const [error, setError] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/agregar-asignacion-empleado/${proyecto.proyecto_id}/${empleado.empleado_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fecha_fin_trabajo: fechaFormateada,
                    horas_asignadas_trabajo: horasAsignadas
                })
            });
            if (!response.ok) throw new Error('Error al agregar el recurso asignado')
            else window.location.reload()
            handleClose()
        } catch (error) {
            setError(error.message);
        }
        handleClose();
    };
    const handleHorasAsignadasChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setHorasAsignadas(value);
        }
    };
    const handleFechaFinTrabajoChange = (date) => {
        setFechaFinTrabajo(date)
    };
    useEffect(() => {
        setError(null);
    }, [open]);
    return (
        <Dialog open={ open } onClose={ handleClose }>
            <DialogContent>
                <Typography>Estás asignando a:</Typography>
                <Typography fontWeight = "bold">{empleado.concat}</Typography>
                <Typography>al proyecto:</Typography>
                <Typography fontWeight = "bold">{proyecto.nombre_proyecto}</Typography>
                <Typography>Rellena los siguientes campos:</Typography>
                <Typography>
                    <TextField
                        label="Horas de trabajo por semana"
                        type="number"
                        value = { horasAsignadas }
                        onChange = { handleHorasAsignadasChange }
                        inputProps={{ min: 0 }}
                    />
                    <DialogContent>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value = { fechaFinTrabajo }
                                onChange = { handleFechaFinTrabajoChange }
                                format = 'DD/MM/YYYY'
                            />
                        </LocalizationProvider>
                    </DialogContent>
                </Typography>
                {error && <DialogContentText color="error">{error}</DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button
                    variant = 'contained'
                    onClick = { handleConfirm }
                    color = 'primary'
                >
                    Guardar cambios
                </Button>
                <Button
                    variant = 'contained'
                    sx = {
                        {
                            backgroundColor: 'red',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'darkred',
                            }
                        }
                    }
                    onClick={ handleClose }
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
  
export default DialogAsignarRecurso;