import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Impresoras from '../componentes/Impresoras/Impresoras'
import Computadores from '../componentes/Computadores/Computadores'
import Reportes from '../componentes/Reportestecnicos/Reportescompu'
import Home from '../componentes/Home/Home'
import Table from '../componentes/datatable/datable'
import userContext from '../auth/hooks/UseContext'

export default function PrivateRoute() {

  const { user } = useContext(userContext);
    if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  // Check user role for authorized access
  const esTecnico = user && user.rol === 'TECNICO'

  // Verificar el rol del usuario antes de renderizar las rutas
  const esCoordinador = user && user.rol === 'COORDINADOR';


  return (
    <Routes>
      {/* Use individual Route components */}
      <Route path='/Home' element={<Home />}></Route>
      <Route path="/impresoras" element={<Impresoras />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/computadores" element={<Computadores />} />
      {/* Protected route for Coordinadors */}
      {esCoordinador && <Route path="/prueba" element={<Table />} />}

      {/* Protected route for Tecnicos */}
      {esTecnico && <Route path="/prueba-tecnico" element={<Table />} />}
      {/* Asegúrate de tener una ruta predeterminada o de redireccionar si no hay coincidencias */}
      <Route path="*" element={<Navigate to="/Home" />} />
    </Routes>
  );
}

