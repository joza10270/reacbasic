import React, { useState } from 'react';


const INITIAL_FORM = {
 name: '',
 email: '',
 password: '',
 password2: '',
};


const apiUrl = "http://localhost:3000";


export const Register = ({ setLogin }) => {
 const [formData, setFormData] = useState(INITIAL_FORM);
 const [successMessage, setSuccessMessage] = useState('');
 const [errorMessage, setErrorMessage] = useState('');


 // Función para actualizar formData
 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };


 // Enviar formulario
 const handleSubmit = async (e) => {
   e.preventDefault();
   setErrorMessage('');
   setSuccessMessage('');


   const { name, email, password, password2 } = formData;


   if (password !== password2) {
     setErrorMessage("Las contraseñas no coinciden");
     return;
   }


   try {
     // Comprobar si el usuario ya existe
     const res = await fetch(`${apiUrl}/users?email=${email}`);
     const data = await res.json();


     if (data.length > 0) {
       setErrorMessage('El usuario ya existe');
       return;
     }


     // Crear usuario
     await fetch(`${apiUrl}/users`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ name, email, password })
     });


     setSuccessMessage('Usuario creado con éxito');
     setFormData(INITIAL_FORM);


   } catch (error) {
     console.error(error);
     setErrorMessage('Error al registrar el usuario');
   }
 };


 return (
   <>
   <form onSubmit={handleSubmit}>
     <div className="mb-2">
       <label className="form-label small">Nombre</label>
       <input
         name="name"
         value={formData.name}
         onChange={handleChange}
         className="form-control form-control-sm"
         required
       />
     </div>


     <div className="mb-2">
       <label className="form-label small">Correo electrónico</label>
       <input
         type="email"
         name="email"
         value={formData.email}
         onChange={handleChange}
         className="form-control form-control-sm"
         required
       />
     </div>


     <div className="mb-2">
       <label className="form-label small">Contraseña</label>
       <input
         type="password"
         name="password"
         value={formData.password}
         onChange={handleChange}
         className="form-control form-control-sm"
         required
       />
     </div>


     <div className="mb-2">
       <label className="form-label small">Repite Contraseña</label>
       <input
         type="password"
         name="password2"
         value={formData.password2}
         onChange={handleChange}
         className="form-control form-control-sm"
         required
       />
     </div>


     {errorMessage && <div className="alert alert-danger py-1">{errorMessage}</div>}
     {successMessage && <div className="alert alert-success py-1">{successMessage}</div>}


     <div className="d-grid gap-2 mt-2">
       <button type="submit" className="btn btn-primary btn-sm">Registrar</button>
     </div>
   </form>


   {/* Botón para cambiar a Login */}
   <div className="mt-2 text-center">
       <button className="btn btn-link" onClick={() => setLogin(true)}>
         ¿Ya tienes cuenta? Inicia sesión
       </button>
   </div>
   </>
 );
};
