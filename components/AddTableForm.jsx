// Fitxer deixat intencionadament en blanc com a plantilla d'inici.
import {React, useState} from 'react'


const apiUrl = "http://localhost:3000";

const INITIAL_FORM = {
    number_table: '',
    capacity: '',
};



export const TableAdd = () => {

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ errors, setErrors ] = useState('');

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccessMessage('')
        setErrors('')

        const [ number_table, capacity ] = formData

        const res= await fetch(`${apiUrl}/tables`)

    }

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <div className="card shadow-sm p-4">
            <h4 className="mb-3 text-center">Añadir Mesa</h4>

            <form>
                {/* Número de mesa */}
                <div className="mb-3">
                <label htmlFor="number_table" className="form-label fw-bold">
                    Número de mesa
                </label>
                <input
                    type="text"
                    id="number"
                    name="number_table"
                    className="form-control"
                    placeholder="Numero de mes"
                />
                </div>

                {/* Capacidad */}
                <div className="mb-3">
                <label htmlFor="capacity" className="form-label fw-bold">
                    Capacidad
                </label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    className="form-control"
                    placeholder="Ej: 4"
                />
                </div>

                {/* Botón de enviar */}
                <button type="submit" className="btn btn-primary w-100">
                Añadir Mesa
                </button>

                {/* Mensajes de éxito o error */}
                <div className="mt-3">
                {successMessage && <p className="text-success">{successMessage}</p>}
                {errors && <p className="text-danger">{errors}</p>}
                </div>
            </form>
            </div>
        </div>
    );
}