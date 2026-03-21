import React from 'react';
import { useState, useContext } from 'react'


import { UserContext } from './../context/AuthContext'


// Constante de URL
const apiUrl = "http://localhost:3000";


// Fitxer deixat intencionadament en blanc com a plantilla d'inici.
export const Login = ({ setLogin }) => {


     // Cojemos el token para guardar el token en Context
     const { setAuthToken, setUsuari, usuari } = useContext(UserContext)
  
     // Hacemos que el fomrulario se sin react-hook-form
     const [ email, setEmail] = useState('')
     const [ password, setPassword ] = useState('')


   const handleSubmit = async (e) => {
       // Para que no recargue la pagina
       e.preventDefault();


       try {


           // 1. Envio la peticon al jsServer con post para el login
           const rest= await fetch (`${apiUrl}/users?email=${email}`)
           const data= await rest.json();  // <-- aquí faltaba el await


           // Si en data hay valor comprobamos el loguin
           if (data.length > 0){
               const userPassword = data[0].password ?? data[0].pasword;
               /// Comprobamos que la contraseña coincida
               if (userPassword === password) {
                   // Genero el token
                   const token = Math.random().toString(36).substring(2, 15);
                   // Lo guardo en localStorage para persistencia
                   localStorage.setItem('actualToken', token);
                   // Para que me lo devuelva en formato json
                   localStorage.setItem('actualUsuari', JSON.stringify(data[0]));
                   // LO gaurdo en el UserContext
                   setAuthToken(token)
                   setUsuari(data[0])


                   // Imformacion en consola
                   console.log('Loguin exitoso')
                   console.log(data[0])
               } else {
                   console.log('El login ha fallado: contraseña incorrecta')
               }
           } else {
               console.log('El loguin a fallado')
           }
       } catch (errors) {
           console.log('Error del servidor')
       }
   }
  
   return (
   <>
   <form onSubmit={handleSubmit}>
       <div className="mb-3">
           <label className="form-label">Email</label>
           <input
           type="email"
           className="form-control"
           placeholder="ejemplo@mir.cat"
           value={email}
           // Le paso el valor del campoa al estado
           onChange={e => setEmail(e.target.value)}
           required
           />
       </div>


       <div className="mb-3">
           <label className="form-label">Contrasenya</label>
           <input
           type="password"
           className="form-control"
           placeholder="Contrasenya"
           // Le paso el valor al form
           value={password}
           // Le passo al form el valor
           onChange={e => setPassword(e.target.value)}
           required
           />
       </div>


       <div className="d-grid gap-2">
           <button type="submit" className="btn btn-primary">Entrar</button>
       </div>
   </form>


   {/* Botón para cambiar a Register */}
   <div className="mt-2 text-center">
       <button className="btn btn-link" onClick={() => setLogin(false)}>
         ¿No tienes cuenta? Registrate
       </button>
   </div>
   </>
 );
  
}
