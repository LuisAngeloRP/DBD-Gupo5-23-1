import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';


const CrearTarea = ({proyecto_id}) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [dia, setDia] = useState('');
    const [hora, setHora] = useState('');
    const [empleados, setEmpleados] = useState([]);
  const [selectedEmpleados, setSelectedEmpleados] = useState([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState('');
  
  const handleNombreChange = (event) => {
      setNombre(event.target.value);
    };

  const handleDescripcionChange = (event) => {
      setDescripcion(event.target.value);
    };
    
    const handleDiaChange = (event) => {
        setDia(event.target.value);
    };
    
    const handleHoraChange = (event) => {
        setHora(event.target.value);
    };
    useEffect(() => {
        fetch(`http://localhost:4000/empleados/${proyecto_id}`)
          .then((response) => response.json())
          .then((data) => {
            setEmpleados(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, [proyecto_id]);
    
      const handleEmpleadoChange = (event) => {
        setSelectedEmpleado(event.target.value);
      };

      const handleAgregarEmpleado = () => {
        if (selectedEmpleado) {
          setSelectedEmpleados([...selectedEmpleados, selectedEmpleado]);
          setSelectedEmpleado('');
    
          const updatedEmpleados = empleados.filter(
            (empleado) => empleado.empleado !== selectedEmpleado
          );
          setEmpleados(updatedEmpleados);
        }
      };

  const handleCrearReunion = async () => {
    try {
        const response = await fetch('http://localhost:4000/crear-tarea', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              nombre: nombre,
              descripcion: descripcion,
              dia: dia,
              hora: hora,
              proyectoId: proyecto_id,
              empleados: selectedEmpleados,
          }),
        });
        
        if (response.ok) {
          console.log('Reunión creada correctamente.');
          // Reset the form
          setDescripcion('');
          setDia('');
          setHora('');
          setSelectedEmpleados([]);
        } else {
          console.log('Error al crear la tarea.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    // Aumento de etiqueta para añadir la propiedad requiered
    <form> 
      <input type="text" required value={nombre} onChange={handleNombreChange} placeholder="Nombre" style={{width: 'calc(100% - 10px)', borderColor: '#D9D9D9' ,backgroundColor: '#D9D9D9', color: '#7D7D7D', fontSize: 48, paddingLeft: 10}}/>
    <div>
      <div>
      <Typography fontSize="30px">Encargados:</Typography>
        <select value={selectedEmpleado} onChange={handleEmpleadoChange} style={{width: '70%', fontSize: 24, color: 'white', background: '#595959', padding: '5px'}}>
            <option value=""></option>
            {empleados.map((empleado, index) => (
            <option key={index} value={empleado.usuario_id}>
                {empleado.empleado}
            </option>
            ))}
        </select>
        <button type="button" onClick={handleAgregarEmpleado} style={{
                                backgroundColor: '#FFFFFF',
                                color: '#000000',
                                fontSize: '18px',
                                marginLeft: 40,
                                padding: 10,
                                borderRadius: 10
                            }}>Agregar</button>
      <Typography fontSize="30px">Empleados seleccionados:</Typography>
        {selectedEmpleados.length === 0 ? (
          <p fontSize="15px">No se han seleccionado empleados.</p>
        ) : (
          <ul style={{margin:'10px 0'}}>
            {selectedEmpleados.map((empleado, index) => (
              <li key={index} style={{ fontSize: '20px', marginTop: '10px' }}>{empleado}</li>
            ))}
          </ul>
        )}
      <div>
        <Typography fontSize="30px">Día de entrega:</Typography>
      <input required type="date" value={dia} onChange={handleDiaChange} style={{fontSize: 24, color: 'white', background: '#595959', padding: '5px'}} />
        <Typography fontSize="30px">Hora de entrega:</Typography>
      <input required type="time" value={hora} onChange={handleHoraChange} style={{fontSize: 24, color: 'white', background: '#595959', padding: '5px'}} />
        <Typography fontSize="30px">Descripción de la tarea:</Typography>
      <input type="text" required value={descripcion} onChange={handleDescripcionChange} placeholder="Descripción de la reunión" style={{fontSize: 24,
      color: 'white', background: '#595959', width: 'calc(100% - 20px)', padding: '10px'}}/>
      </div>
        </div>
        
    </div>
      <button type="submit" onClick={handleCrearReunion} style={{
        position: 'absolute',
        right: 40,
        bottom: 40,
    backgroundColor: '#00D16D',
    color: '#FFFFFF',
    fontSize: '26px',
    paddingLeft: '36px',
    paddingRight: '36px',
    paddingTop: '6px',
    paddingBottom: '6px',
    borderColor: '#00D16D',
    borderRadius: 10 
  }}>Crear</button>
    </form>
  );
};

export default CrearTarea;