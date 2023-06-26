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

const DialogAsignarRecurso = ({ open, handleClose, proyecto, recurso }) => {
    const [cantidadAsignada, setCantidadAsignada] = useState('');
    const [tiempoAsignado, setTiempoAsignado] = useState('');
    const [error, setError] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/agregar-recurso-asignado/${proyecto.proyecto_id}/${recurso.recurso_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cantidad_asignada: cantidadAsignada,
                    tiempo_asignado: tiempoAsignado
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
    const handleCantidadChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setCantidadAsignada(value);
        }
    };
    const handleTiempoChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setTiempoAsignado(value);
        }
    };
    useEffect(() => {
        setError(null);
    }, [open]);
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <Typography>Estás asignando el recurso:</Typography>
                <Typography fontWeight = "bold">{recurso.nombre}</Typography>
                <Typography>al proyecto:</Typography>
                <Typography fontWeight = "bold">{proyecto.nombre_proyecto}</Typography>
                <Typography>Rellena los siguientes campos:</Typography>
                <Typography>
                    <TextField
                        label="Cantidad"
                        type="number"
                        value = { cantidadAsignada }
                        onChange = { handleCantidadChange }
                        inputProps={{ min: 0 }}
                    />
                </Typography>
                <Typography>
                    <TextField
                        label="Tiempo"
                        type="number"
                        value = { tiempoAsignado }
                        onChange={ handleTiempoChange }
                        inputProps={{ min: 0 }}
                    />
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