import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography, Select, MenuItem, Button } from '@mui/material';

const DetallesTareaCasComponent = ({id}) => {
    const [detallesTarea, setDetallesTarea] = useState(null);
    const [encargados, setEncargados] = useState([]);
    const [adjuntos, setAdjuntos] = useState([]);
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [fecha_creacion, setFechaCreacion] = useState('');
    const [fecha_entrega, setFechaEntrega] = useState('');
    const [estado_tarea, setEstado_Tarea] = useState('');
    const [estadoTarea, setEstadoTarea] = useState('');
    const [mostrarMenu, setMostrarMenu] = useState(false);

    const handleEstadoTareaChange = (event) => {
      setEstado_Tarea(event.target.value);
    };
  
    const handleEditarEstadoTarea = () => {
      const confirmar = window.confirm('¿Estás seguro de editar el estado?');
        if (confirmar){
        fetch(`http://localhost:4000/tarea/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado_tarea }),
        })
        .then(response => response.json())
        .then(data => {
          // Manejar la respuesta del servidor si es necesario
          console.log('Respuesta del servidor:', data);
          setMostrarMenu(false);
          })
          .catch(error => {
            console.error('Error al enviar la petición POST:', error);
          });
          window.location.reload();
        }  
    };
    
    const handleImagenClick = () => {
      setMostrarMenu(!mostrarMenu);
    };

    useEffect(() => {
      const obtenerDetallesTarea = async () => {
        try {
          const response = await fetch(`http://localhost:4000/mostrar-detalles-tareaCas/${id}`);
          const data = await response.json();
          setDetallesTarea(data.detallesTarea[0]);
          setEncargados(data.encargados);
          setAdjuntos(data.adjuntos);

          const { fecha_creacion_tarea, hora_creacion_tarea, fecha_limite_tarea, hora_limite_tarea, 
            fecha_realizada_tarea, hora_realizada_tarea, estado_tarea } = data.detallesTarea[0];
            const fecha_creacion = `${fecha_creacion_tarea.substring(0, 10)} - ${hora_creacion_tarea.substring(0, 8)}`;
            setFechaCreacion(fecha_creacion);
            const fecha_entrega = `${fecha_limite_tarea.substring(0, 10)} - ${hora_limite_tarea.substring(0, 8)}`;
            setFechaEntrega(fecha_entrega);

          if (fecha_realizada_tarea && hora_realizada_tarea) {
            const fechaFinalizacion = `${fecha_realizada_tarea.substring(0, 10)} - ${hora_realizada_tarea.substring(0, 8)}`;
              setFechaFinalizacion(fechaFinalizacion);
          } else {
              setFechaFinalizacion('---');
          }
          if (estado_tarea === 1) {const estadoTarea = "Pendiente"; setEstadoTarea(estadoTarea);}
          else if (estado_tarea === 2) {const estadoTarea = "En Progreso"; setEstadoTarea(estadoTarea);}
          else if (estado_tarea === 3) {const estadoTarea = "Finalizada"; setEstadoTarea(estadoTarea);}
        } catch (error) {
          console.log(error);
        }
      };
  
      obtenerDetallesTarea();
    }, [id]);
  
    return (
      <div>
        {detallesTarea && (
          <>
            <Typography style={{width: 'calc(100% - 10px)', backgroundColor: '#D9D9D9', color: '#7D7D7D', fontSize: 48, paddingLeft: 10}}>
                {detallesTarea.nombre_tarea}</Typography>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: 18 }}>
                <div >
                    <Typography variant="h6" marginTop='12px'>Fecha Creación: </Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{fecha_creacion}</Typography>
                    <Typography variant="h6" marginTop='12px'>Fecha Entrega:</Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}> {fecha_entrega}</Typography>
                    <Typography variant="h6" marginTop='12px'>Descripción:</Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{detallesTarea.descripcion_tarea}</Typography>
                    <Typography variant="h6" marginTop='12px'>Fecha Realizada:</Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}> {fechaFinalizacion}</Typography>
                </div>
                <div div style={{borderLeft: '1px solid #000000', paddingLeft:11}}>
                <Typography variant="h6" marginTop='12px'>Estado de Tarea: </Typography>
                <img
                  src={require("./img/edit.png")}
                  width='24px'
                  alt="Editar estado tarea"
                  onClick={handleImagenClick}
                  style={{ cursor: 'pointer' }}
                />
                {mostrarMenu && (
                  <Select
                    value={estado_tarea}
                    onChange={handleEstadoTareaChange}
                    style={{ marginLeft: 10, fontSize: 20}}
                    >
                    <MenuItem value="1">Pendiente</MenuItem>
                    <MenuItem value="2">En Progreso</MenuItem>
                    <MenuItem value="3">Finalizada</MenuItem>
                  </Select>
                )}
                {estadoTarea && mostrarMenu && (
                  <Button type="submit" onClick={handleEditarEstadoTarea} color="primary">
                    Guardar
                  </Button>
                )}
                {!mostrarMenu && (
                  <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{estadoTarea}</Typography>
                )}
                    <Typography variant="h6" marginTop='12px'>Jefe de Proyecto: </Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{detallesTarea.jefe_proyecto}</Typography>
                    {/* <Typography variant="h6" marginTop='12px'>Adjuntos:</Typography> */}
                </div>
            </div>
        </>
        )}
      </div>
    );
  };
  
  export default DetallesTareaCasComponent;