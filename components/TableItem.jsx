// Fitxer deixat intencionadament en blanc com a plantilla d'inici.
import  { React, useState } from 'react';


const apiUrl = "http://localhost:3000";

// Objeto inicial para el formulario de edición de capacidad
const INITIAL_FORM = {
    capacity: '',
}

export const TableItem = ({ table, onDeleteTable }) => {

    // Estado para controlar el estado visual de la mesa en el frontend
    const [status, setStatus] = useState(table.status);
    
    // Estados para mensajes de éxito y error
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    
    // Estado para controlar modo edición de capacidad
    const [editCapacity, setEditCapacity] = useState(false);
    
    // Datos del formulario de edición de capacidad
    const [formData, setFormData] = useState(INITIAL_FORM);
    
    // Estado para controlar el input de nueva comanda
    const [newOrderName, setNewOrderName] = useState('');
    
    // Estado que contiene las órdenes actuales de la mesa
    const [orders, setOrders] = useState(table.orders || []);

    // Función para actualizar los datos del formulario de capacidad
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Función para agregar una nueva comanda a la mesa
    const addOrder = async (e) => {
        e.preventDefault();
        
        // Validar que el nombre de la comanda no esté vacío
        if (!newOrderName.trim()) {
            setError('El nombre de la comanda no puede estar vacío');
            return;
        }
        
        setSuccessMessage('');
        setError('');
        
        try {
            // Obtener la mesa actual del servidor
            const res = await fetch(`${apiUrl}/tables/${table.id}`);
            const data = await res.json();
            
            // Crear una nueva comanda con ID único (usando timestamp)
            const newOrder = {
                id: Date.now().toString(),
                name: newOrderName,
                isDone: false
            };
            
            // Agregar la nueva comanda al array de órdenes
            data.orders = [...(data.orders || []), newOrder];
            
            // Actualizar la mesa en el servidor
            await fetch(`${apiUrl}/tables/${table.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            // Actualizar estado local y limpiar input
            setOrders(data.orders);
            setNewOrderName('');
            setSuccessMessage('Comanda agregada exitosamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Error agregando comanda:", error);
            setError('Error al agregar la comanda');
        }
    };

    // Función para eliminar una comanda de la mesa
    const removeOrder = async (orderId) => {
        setSuccessMessage('');
        setError('');
        
        try {
            // Obtener la mesa actual del servidor
            const res = await fetch(`${apiUrl}/tables/${table.id}`);
            const data = await res.json();
            
            // Filtrar la comanda a eliminar
            data.orders = data.orders.filter(order => order.id !== orderId);
            
            // Actualizar la mesa en el servidor
            await fetch(`${apiUrl}/tables/${table.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            // Actualizar estado local
            setOrders(data.orders);
            setSuccessMessage('Comanda eliminada exitosamente');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Error eliminando comanda:", error);
            setError('Error al eliminar la comanda');
        }
    };

    // Función para marcar una comanda como servida o no servida
    const toggleOrderDone = async (orderId) => {
        setSuccessMessage('');
        setError('');
        
        try {
            // Obtener la mesa actual del servidor
            const res = await fetch(`${apiUrl}/tables/${table.id}`);
            const data = await res.json();
            
            // Encontrar la comanda y cambiar su estado isDone
            const orderToUpdate = data.orders.find(order => order.id === orderId);
            if (orderToUpdate) {
                orderToUpdate.isDone = !orderToUpdate.isDone;
            }
            
            // Actualizar la mesa en el servidor
            await fetch(`${apiUrl}/tables/${table.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            // Actualizar estado local
            setOrders(data.orders);
            setSuccessMessage('Estado de la comanda actualizado');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Error actualizando comanda:", error);
            setError('Error al actualizar la comanda');
        }
    };
    
    // Función para cambiar el estado de la mesa (Free/Occupied)
    const changeStatus = async () => {
        setSuccessMessage('');
        setError('');
        try {
            // Obtener la mesa por ID (objeto, no array)
            const res = await fetch(`${apiUrl}/tables/${table.id}`);
            const data = await res.json();

            // Cambiar status y vaciar orders si es necesario
            if (data.status === "Occupied") {
                data.status = "Free";
                data.orders = []; // Eliminar todas las órdenes al liberar la mesa
            } else {
                data.status = "Occupied";
            }

            // Hacer PUT con la mesa actualizada 
            await fetch(`${apiUrl}/tables/${table.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            // Actualizar estado local
            setStatus(data.status);
            setOrders(data.orders);
            setSuccessMessage(`Mesa ${data.status === 'Free' ? 'liberada' : 'ocupada'} exitosamente`);
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error("Error cambiando status:", error);
            setError('Error al cambiar el estado de la mesa');
        }
    };



    // Función para eliminar una mesa completamente del servidor
    const deleteTable = async () => {
        setError('');
        setSuccessMessage('');
        try {
            // Hacer DELETE de la mesa
            await fetch(`${apiUrl}/tables/${table.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            setSuccessMessage('Mesa eliminada exitosamente');
            setTimeout(() => {
                setSuccessMessage('');
                onDeleteTable();
            }, 3000);

        } catch (error) {
            console.error("Error eliminando mesa:", error);
            setError('Error al eliminar la mesa');
        }
    };


    // Función para cambiar la capacidad de la mesa
    const changeCapacity = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setError('');

        const { capacity } = formData;
        
        // Validar que la capacidad sea un número positivo
        if (!capacity || capacity < 1) {
            setError('La capacidad debe ser un número positivo (mínimo 1)');
            return;
        }
        
        try {
            // Obtener la mesa por ID (objeto, no array)
            const res = await fetch(`${apiUrl}/tables/${table.id}`);
            const data = await res.json();

            // Actualizar la capacidad
            data.capacity = parseInt(capacity);

            // Hacer PUT con la mesa actualizada 
            await fetch(`${apiUrl}/tables/${table.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            setSuccessMessage('Capacidad de la mesa actualizada exitosamente');
            setTimeout(() => {
                setSuccessMessage('');
                onDeleteTable();
                setEditCapacity(false);
                setFormData(INITIAL_FORM);
            }, 3000);
        } catch (error) {
            console.error("Error cambiando capacidad:", error);
            setError('Error al cambiar la capacidad');
        }
    };

    



    return (
        // Card principal (cada mesa)
        <div className="card shadow border-0 mb-3 overflow-hidden" style={{ borderRadius: '16px' }}>

            {/* HEADER: número de mesa */}
            <div
                className="px-3 py-2 text-white"
                style={{ background: 'linear-gradient(120deg, #0d6efd, #20c997)' }}
            >
                <h5 className="mb-0 fw-bold">
                    Taula #{table.number}
                </h5>
            </div>

            {/* BODY: info de la mesa */}
            <div className="card-body bg-light-subtle">

                <div className="d-flex flex-wrap gap-2 mb-2">

                    {/* IF en JSX → usar operador ternario */}
                    {/* Verde = Free | Rojo = Occupied */}
                    {status  === 'Free' ? (
                        <button className="badge text-bg-success px-3 py-2" onClick={changeStatus}>
                            Estat: {status}
                        </button>
                    ) : (
                        <button className="badge text-bg-danger px-3 py-2" onClick={changeStatus}>
                            Estat: {status}
                        </button>
                    )}

                    {/* Datos básicos */}
                    <span className="badge text-bg-primary px-3 py-2">
                        Capacitat: {table.capacity}
                    </span>
                    <button className="bi-pencil" onClick={() => setEditCapacity(!editCapacity)}>
                    </button>

                    {editCapacity && (
                        <div className="mb-3">
                            <form onSubmit={changeCapacity}>
                                <label htmlFor="capacity" className="form-label fw-bold mt-2">
                                    Nueva Capacidad
                                </label>
                                <div className="d-flex gap-2">
                                    <input
                                        type="number"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Ej: 4"
                                        min="1"
                                        required
                                    />

                                    <button type='submit' className="btn btn-sm btn-success">
                                        ✓ Confirmar
                                    </button>
                                    <button type='button' onClick={() => {
                                        setEditCapacity(false);
                                        setFormData(INITIAL_FORM);
                                    }} className="btn btn-sm btn-secondary">
                                        ✕ Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>    
                    )}


                {/* ?. evita error si orders es undefined */}
                    <span className="badge text-bg-warning px-3 py-2 ">
                        Comandes: {orders?.length || 0}
                    </span>
                    {/* ?. evita error si orders es undefined */}
                    <button className="badge text-bg-danger px-3 py-2" onClick={() => deleteTable()}>
                        Eliminar
                    </button>

                </div>

                <div className='mt-3'>
                    {successMessage && <p className='text-success fw-bold'>{successMessage}</p>}
                    {error && <p className='text-danger fw-bold'>{error}</p>}
                </div>

                {/* SECCIÓN DE COMANDES - Solo mostrar si la mesa está ocupada */}
                {status === 'Occupied' && (
                    <div className="mt-4">
                        <h6 className="fw-bold text-dark border-bottom pb-2">
                            📋 Gestión de Comandes
                        </h6>

                        {/* FORMULARIO PARA AGREGAR NUEVA COMANDA */}
                        <form onSubmit={addOrder} className="mb-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre del plat o beguda..."
                                    value={newOrderName}
                                    onChange={(e) => setNewOrderName(e.target.value)}
                                />
                                <button className="btn btn-outline-primary" type="submit">
                                    ➕ Afegir
                                </button>
                            </div>
                        </form>

                        {/* LISTA DE COMANDES */}
                        {orders && orders.length > 0 ? (
                            <div className="list-group small">
                                {orders.map(order => (
                                    <div 
                                        key={order.id} 
                                        className={`list-group-item d-flex justify-content-between align-items-center p-2 ${
                                            order.isDone ? 'bg-light' : ''
                                        }`}
                                    >
                                        {/* INFORMACIÓN DE LA COMANDA CON ESTILOS CONDICIONALES */}
                                        <span 
                                            className={`${
                                                order.isDone 
                                                    ? 'text-decoration-line-through text-muted' 
                                                    : 'text-dark'
                                            }`}
                                        >
                                            {order.name}
                                        </span>

                                        {/* BOTONES DE ACCIONES */}
                                        <div className="d-flex gap-2">
                                            {/* BOTÓN PARA MARCAR COMO SERVIDA/NO SERVIDA */}
                                            <button
                                                type="button"
                                                className={`btn btn-sm ${
                                                    order.isDone 
                                                        ? 'btn-success' 
                                                        : 'btn-outline-success'
                                                }`}
                                                onClick={() => toggleOrderDone(order.id)}
                                                title={order.isDone ? 'Marcar como no servida' : 'Marcar como servida'}
                                            >
                                                {order.isDone ? '✓ Servida' : '○ Pendent'}
                                            </button>

                                            {/* BOTÓN PARA ELIMINAR COMANDA */}
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => removeOrder(order.id)}
                                                title="Eliminar comanda"
                                            >
                                                🗑 Esborrar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-secondary small">Cap comanda afegida</p>
                        )}
                    </div>
                )}

                <small className="text-secondary"></small>
            </div>
        </div>
    )
}
