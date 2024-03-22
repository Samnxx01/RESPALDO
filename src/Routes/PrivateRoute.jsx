import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Impresoras from '../componentes/Impresoras/Impresoras'
import Computadores from '../componentes/Computadores/Computadores'
import Reportes from '../componentes/Reportestecnicos/Reportescompu'

export default function PrivateRoute() {
  return (
    <Routes>
      {/* Use individual Route components */}
      <Route path="/impresoras" element={<Impresoras />} />
      <Route path="/reportes" element={<Reportes />} />
      <Route path="/computadores" element={<Computadores />} />
    </Routes>
  );
}

//ya me dejo de trolear , que seguimos