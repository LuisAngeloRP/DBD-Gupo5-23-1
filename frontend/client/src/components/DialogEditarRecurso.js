import React, { useState } from 'react';
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

const DialogEditarRecurso = ({ open, handleClose, proyecto, recurso }) => {
    const [nuevaCantidad, setNuevaCantidad] = useState('');
    const [error, setError] = useState(null);
    const handleConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:4000/editar-cantidad-asignada-recurso/${proyecto.proyecto_id}/${recurso.recurso_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cantidad_asignada: nuevaCantidad })
            });
            if (!response.ok) throw new Error('Error al agregar el recurso asignado')
            else window.location.reload()
        } catch (error) {
            setError(error.message)
        }
        handleClose();
    };
    const handleCantidadChange = (event) => {
        const { value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0)) {
            setNuevaCantidad(value);
        }
    };
    return (
        <Dialog open={ open } onClose={ handleClose }>
            <DialogContent>
                <Typography>Estás editando la cantidad de:</Typography>
                <Typography fontWeight = "bold">{recurso.nombre}</Typography>
                <Typography>asignada al proyecto:</Typography>
                <Typography fontWeight = "bold">{proyecto.nombre_proyecto}</Typography>
                <Typography>Establece la nueva cantidad asignada:</Typography>
                <TextField
                    label="Cantidad"
                    type="number"
                    value = { nuevaCantidad }
                    onChange = { handleCantidadChange }
                    inputProps={{ min: 0 }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant = 'contained'
                    color = 'primary'
                    onClick = { handleConfirm }
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
                    onClick = { handleClose }
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
  
export default DialogEditarRecurso;