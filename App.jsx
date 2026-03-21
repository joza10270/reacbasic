import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/AuthContext'


import {LoginRegister } from './components/LoginRegister'
import { Header } from './components/Header'
import { TableList } from './components/TableList'

import {TableAdd} from './components/AddTableForm'


export default function App() {


 // Busco el token en localStorage
 const tokenStorage = localStorage.getItem("actualToken");
 // BUsca el usuari en el localstorage
  const usuariStorage = localStorage.getItem("actualUsuari");


 // Estado del token en contexto
 // Si encuntra en el localstorage algo lo metene en el estado y el stado al context
 const [authToken, setAuthToken] = useState(tokenStorage);
 const [usuari, setUsuari] = useState(usuariStorage ? JSON.parse(usuariStorage) : null);



 return (
   <UserContext.Provider value={{ usuari, setUsuari, authToken, setAuthToken }}>


     {/* Si hay token mostramos la app con header y rutas protegidas */}
     {authToken ? (
       <div className="d-flex flex-column min-vh-100">
         <Header />


         <main className="flex-fill">
           <Routes>
             {/* Ruta principal protegida */}
             <Route path="/tablelist" element={<TableList />} />
             <Route path="/formadd" element={<TableAdd />} />


             {/* Redirección de cualquier ruta desconocida */}
             <Route path="*" element={<Navigate to="/tablelist" replace />} />
           </Routes>
         </main>
       </div>
     ) : (
       // Si no hay token, mostramos Login/Register
       <Routes>
         <Route path="/" element={<LoginRegister />} />


         {/* Redirección al login por defecto */}
         <Route path="*" element={<Navigate to="/" replace />} />
       </Routes>
     )}


   </UserContext.Provider>
 )
}
