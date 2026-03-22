// Fitxer deixat intencionadament en blanc com a plantilla d'inici.
import { UserContext } from './../context/AuthContext';
import React from 'react';
import { useState, useContext, useEffect } from 'react'
import { TableItem } from './TableItem';
import { TableAdd } from './AddTableForm'



const apiUrl = "http://localhost:3000";


export const TableList = () => {

    const { authToken } = useContext(UserContext);
  
   const [ successMessage, setSuccessMessage ] = useState('');
   const [ error, setErrors ] = useState('');
    const [ tables, setTables ] = useState([]);

    // Para altenrar el boton y el fomualrio solo se nesecita este estado 
    const [ showForm, setShowForm ] = useState(false)
    

   const searchTables = async () => {
        setErrors('');
        setSuccessMessage('');

        try {
            const rest= await fetch (`${apiUrl}/tables`)
            const data= await rest.json();
            console.log(data)

            if (data.length > 0){
                return setTables(data)
            }else {
                setErrors('La tabla esta vacia')
            }
            
        } catch (error) {
            setErrors('Conexion con el servidor fallido')
            console.log(error)
        }
       
   }


   useEffect(() => {
       searchTables()
   }, [authToken, ])
  
   return (
       <div className="container py-3">
            <h1>
                Lisatado de tablas 
            </h1>

            {/* Creo el boton para ir cambiando entre salir y añadir mesa */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Salir' : 'Añadir mesa'}
            </button>

            {/* Si es true me muetsra el formulario */}
            {showForm && <TableAdd onTableAdd={searchTables}/>}

            <div className="row g-3">
                {tables.map(table => (
                    <div key={table.id} className="col-12 col-md-6 col-lg-4">
                        <TableItem table={table} onDeleteTable={searchTables} />
                    </div>
                ))}
            </div>
            {error && <p className="text-danger">{error}</p>}

       </div>
   )
}
