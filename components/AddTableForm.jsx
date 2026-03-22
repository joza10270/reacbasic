// Fitxer deixat intencionadament en blanc com a plantilla d'inici.
import {React, useState} from 'react'


const apiUrl = "http://localhost:3000";

const INITIAL_FORM = {
    number: '',
    capacity: '',
};



export const TableAdd = ({onTableAdd}) => {

    const [formData, setFormData] = useState(INITIAL_FORM);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ errors, setErrors ] = useState('');


     // Función para actualizar formData
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Funcion para enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccessMessage('')
        setErrors('')

        const { number, capacity } = formData

        if (!number || !capacity){
            setErrors('Todos los campos son obligatorios')
            return;
        }

        try {
            const res= await fetch(`${apiUrl}/tables?number=${number}`)
            const data = await res.json();

            if (data.length > 0){
                setErrors('El numero de mesa ya existe')
                console.log('La mesa ya existe')
                return;
            }

            // Envio de POST  a db para añadirlo el ID lo pone POST
            await fetch(`${apiUrl}/tables`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ number, capacity, status:'Free', orders:[] })
            })

            // Mensaje de confirmacion de mes
            setSuccessMessage('Se ha creado con exito la mesa')
            setFormData(INITIAL_FORM)

            // Prop que es una funcion de actulizar las mesas al enviar el formulario
            onTableAdd();
            

        } catch (error){
            console.log('No llega al servidor')
            setErrors('El servidor no responde: ', error)
        }
        
    
    }

    return (
        <div className="container mt-4" style={{ maxWidth: '500px' }}>
            <div className="card shadow-sm p-4">
            <h4 className="mb-3 text-center">Añadir Mesa</h4>

            {/* Para que fucnione como formulario y soilo se nesecite el submit */}
            <form onSubmit={handleSubmit}>
                {/* Número de mesa */}
                <div className="mb-3">
                <label htmlFor="number" className="form-label fw-bold">
                    Número de mesa
                </label>
                <input
                    type="number"
                    // Impresciondible poner estos tres siempre ene rl formulario
                    name="number"
                    value={formData.number}
                    onChange={handleChange}

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
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
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
                {/* Mensajes de confirmacion */}
                {successMessage && <p className="text-success">{successMessage}</p>}
                {errors && <p className="text-danger">{errors}</p>}
                </div>
            </form>
            </div>
        </div>
    );
}