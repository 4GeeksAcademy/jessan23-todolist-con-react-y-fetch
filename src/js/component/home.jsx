import React, { useState } from "react";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");

  const agregarTarea = () => {
    if (tarea.trim() !== "") {
      const nuevaTarea = { label: tarea, done: false };
      fetch('https://playground.4geeks.com/todo/users/jessicaanai', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaTarea)
      })
      .then(response => response.json())
      .then(() => {
        setTareas([...tareas, nuevaTarea]);
        setTarea("");
      })
      .catch(error => console.log('Error:', error));
    }
  };

  const obtenerTareas = () => {
    return fetch('https://playground.4geeks.com/todo/users/jessicaanai', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setTareas(data.todos);
      })
      .catch(error => console.log('Error:', error));
  };

  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };

  return (
    <div className="text-center">
      <h1>Tareas</h1>
      <input 
        type="text"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        placeholder="Agregar tarea"
      />
      <button onClick={agregarTarea}>Agregar Tarea</button>
      <button onClick={obtenerTareas}>Obtener Tareas</button>
      <ol>
        {Array.isArray(tareas) && tareas.length > 0 ? (
          tareas.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "lightgrey",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                marginBottom: "10px",
                padding: "15px",
                transition: "background-color 0.3s ease",
              }}
            >
              <span>{item.label}</span>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarTarea(index)}
                style={{
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  padding: "0",
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </li>
          ))
        ) : (
          <li>No hay tareas disponibles.</li>
        )}
      </ol>
    </div>
  );
};

export default Tareas;
