// Fitxer deixat intencionadament en blanc com a plantilla d'inici.
import  { React, useState } from 'react';


const apiUrl = "http://localhost:3000";

export const TableItem = ({ table }) => {

    // Paa cambair el testo de estado en el frontend
    const [status, setStatus] = useState(table.status);
    
    const changeStatus = async () => {
        try {
            // 1️⃣ Obtener la mesa por ID (objeto, no array)
            const res = await fetch(`${apiUrl}/tables/${table.id}`);
            const data = await res.json();

            // 2️⃣ Cambiar status y vaciar orders si es necesario
            if (data.status === "Occupied") {
                data.status = "Free";
                data.orders = []; // eliminar orders al liberar
            } else {
                data.status = "Occupied";
            }

            // 3️⃣ Hacer PUT con la mesa actualizada
            await fetch(`${apiUrl}/tables/${table.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            // 4️⃣ Actualizar estado local
            setStatus(data.status);
        } catch (error) {
            console.error("Error cambiando status:", error);
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

                    {/* ?. evita error si orders es undefined */}
                    <span className="badge text-bg-warning px-3 py-2">
                        Comandes: {table.orders?.length || 0}
                    </span>
                </div>

                {/* MAP → recorrer array y pintar elementos */}
                {table.orders.map(order => (
                    
                    // key obligatorio en listas (React)
                    <p key={order.id}>

                        {/* IF en JSX dentro de texto */}
                        {order.name} - {order.isDone ? 'Servido' : 'Pendiente'}

                    </p>
                ))}

                <small className="text-secondary"></small>
            </div>
        </div>
    )
}
