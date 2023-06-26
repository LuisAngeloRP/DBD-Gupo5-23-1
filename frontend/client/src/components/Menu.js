import React from 'react';

const Menu = () => {
  return (
    <div
      className="menu"
      style={{
        width: '248px',
        backgroundColor: '#1E1E1E',
        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div
        style={{
            width: '100%',
            height: '62px',
            backgroundColor: '#3F3F3F',
            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            color: '#FFFFFF',
        }}
      >
        Administración
      </div>
      <div
        style={{
            width: '100%',
            height: '62px',
            backgroundColor: '#3F3F3F',
            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            color: '#FFFFFF',
        }}
      >
        Proyectos
      </div>
      <div
        style={{
            width: '100%',
            height: '62px',
            backgroundColor: '#3F3F3F',
            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            color: '#FFFFFF',
        }}
      >
        Clientes
      </div>
      <div
        style={{
            width: '100%',
            height: '62px',
            backgroundColor: '#3F3F3F',
            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            color: '#FFFFFF',
        }}
      >
        Recursos
      </div>
      <div
        style={{
            width: '100%',
            height: '62px',
            backgroundColor: '#3F3F3F',
            boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Trebuchet MS',
            fontSize: '20px',
            color: '#FFFFFF',
        }}
      >
        Reporte
      </div>
    </div>
  );
};

export default Menu;