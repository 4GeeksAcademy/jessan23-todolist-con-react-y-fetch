import React, { useEffect, useState } from "react";

const Tareas = () => {
  const [tareas, setTareas] = useState([]) ;

  
  function obtenerTareas() {
    return fetch('https://playground.4geeks.com/todo/todos/Jessica', {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.results); 
        setTareas(data.results); 
      })
      .catch((error) => console.log('Error:', error));
  }

  
  function eliminarTarea(index) {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  }

  
  useEffect(() => {
    obtenerTareas();
  }, []); 

  return (
    <div className="text-center">
      <h1>Tareas</h1>
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
              <span>{item.todo.todos}</span>
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
