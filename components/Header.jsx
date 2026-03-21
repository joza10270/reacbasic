// Fitxer deixat intencionadament en blanc com a plantilla d'inici.
import React from 'react';
import { useState, useContext } from 'react'


import { UserContext } from './../context/AuthContext'


export const Header = () => {


   const { usuari, setUsuari, setAuthToken }= useContext(UserContext);


   // Nombre de usuario ficticio (para mostrar en el header)
   const username = usuari ? usuari.name : 'invitado';

    // Log out borro la persistencia del token y usuario
   const handleLogout = () => {
       setAuthToken(null);
       setUsuari(null);
       localStorage.removeItem("actualToken");
       localStorage.removeItem("actualUsuari");
   };






   return (
       // Header de la aplicación
       <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
          
           {/* Logo o título de la app */}
           <h1 className="h5 m-0">Mi Aplicación</h1>


           {/* Información del usuario y botón de logout */}
           <div className="d-flex align-items-center">


               {/* Mostramos el nombre del usuario */}
               <span className="me-3">Hola, {username}</span>


               {/* Botón de logout (solo estética) */}
               <button className="btn btn-light btn-sm"
                   onClick={handleLogout}
               >
                   Logout
               </button>


           </div>


       </header>
   )
}
