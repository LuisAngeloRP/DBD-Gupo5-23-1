import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const DialogQuitarEmpleado = ({ open, handleClose, proyecto, empleado }) => {
    const handleConfirm = async () => {
        try {
            console.log(proyecto.proyecto_id)
            console.log(empleado.empleado_id)
            const response = await fetch(`http://localhost:4000/quitar-asignacion-empleado/${proyecto.proyecto_id}/${empleado.empleado_id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error al quitar el recurso asignado')
            else window.location.reload()
        } catch (error) {
            console.error(error)
        }
        handleClose();
    };
    return (
        <Dialog open = { open } onClose = { handleClose }>
            <DialogContent>
                <Typography
                    variant='body1'
                    style={{ fontSize: '20px',color: 'red', fontWeight: 'bold' }}
                >
                    ¿Estás seguro de que deseas quitar al empleado
                </Typography>
                <Typography fontWeight = "bold">{empleado.concat}</Typography>
                <Typography>asignado al proyecto:</Typography>
                <Typography fontWeight = "bold">{proyecto.nombre_proyecto}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    variant = 'contained'
                    color = 'primary'
                    onClick={ handleConfirm }
                >
                    Confirmar
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
                    onClick={handleClose}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogQuitarEmpleado;