import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const DetallesTareaComponent = ({id}) => {
    const [detallesTarea, setDetallesTarea] = useState(null);
    const [encargados, setEncargados] = useState([]);
    const [adjuntos, setAdjuntos] = useState([]);
    const [fechaFinalizacion, setFechaFinalizacion] = useState('');
    const [estadoTarea, setEstadoTarea] = useState('')
  
    useEffect(() => {
      const obtenerDetallesTarea = async () => {
        try {
          const response = await fetch(`http://localhost:4000/mostrar-detalles-tarea/${id}`);
          const data = await response.json();
          setDetallesTarea(data.detallesTarea[0]);
          setEncargados(data.encargados);
          setAdjuntos(data.adjuntos);

          const { fecha_realizada_tarea, hora_realizada_tarea, estado_tarea } = data.detallesTarea[0];

          if (fecha_realizada_tarea && hora_realizada_tarea) {
            const fechaFinalizacion = `${fecha_realizada_tarea.substring(0, 10)} - ${hora_realizada_tarea}`;
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
                    <Typography variant="h6" marginTop='12px'>Encargado:</Typography>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {encargados.map((encargado, index) => (
                        <div key={index} style={{width: 'calc(100% - 26px)', marginTop: 6, backgroundColor: '#D9D9D9'}}>
                            <Typography style={{paddingLeft:10, fontSize: 20}}>{encargado.encargado} </Typography>
                        </div>
                        ))}
                    </div>
                    <Typography variant="h6" marginTop='12px'>Fecha Creación: </Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{detallesTarea.fecha_creacion}</Typography>
                    <Typography variant="h6" marginTop='12px'>Fecha Entrega:</Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}> {detallesTarea.fecha_entrega}</Typography>
                    <Typography variant="h6" marginTop='12px'>Descripción:</Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{detallesTarea.descripcion_tarea}</Typography>
                    <Typography variant="h6" marginTop='12px'>Fecha Realizada:</Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}> {fechaFinalizacion}</Typography>
                </div>
                <div div style={{borderLeft: '1px solid #000000', paddingLeft:11}}>
                <Typography variant="h6" marginTop='12px'>Estado de Tarea: </Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{estadoTarea}</Typography>
                    <Typography variant="h6" marginTop='12px'>Jefe de Proyecto: </Typography>
                    <Typography style={{width: 'calc(100% - 36px)', flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9', paddingLeft:10, fontSize: 20}}>{detallesTarea.jefe_proyecto}</Typography>
                    <Typography variant="h6" marginTop='12px'>Adjuntos:</Typography>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        
                        {adjuntos.map((adjuntos, index) => (
                        <div key={index} style={{flex: '1 0 100%', marginTop: 6, backgroundColor: '#D9D9D9'}}>
                        <Link to={adjuntos.adjunto_link} target="_blank" download={adjuntos.nombre_adjunto}>
                        <Typography style={{paddingLeft:10, fontSize: 20}}>{adjuntos.nombre_adjunto}</Typography>
                        </Link>
                    </div>
              ))}
            </div>
                </div>
            </div>
        </>
        )}
      </div>
    );
  };
  
  export default DetallesTareaComponent;