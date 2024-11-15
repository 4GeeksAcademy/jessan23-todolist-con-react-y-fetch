import React, { useState, useEffect } from "react";

const Tareas = () => {
  const apiUrl="https://playground.4geeks.com/todo"
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");

  const agregarTarea = () => {
    if (tarea.trim() !== "") {
      const nuevaTarea = { label: tarea, done: false };
      fetch(apiUrl+'/todos/jessicaanai', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevaTarea)
      })
      .then(response => {
        if(response.ok){
          return response.json()
        }
      })
      .then((data) => {
        if(data){

          setTareas([...tareas, data]);
          setTarea("");
        }
      })
      .catch(error => console.log('Error:', error));
    }
  };
  const crearUsuario = () => {
    fetch(apiUrl+'/users/jessicaanai', {
     method: 'POST'
   })
     .then(response => response.json())
     .then(data => {
       console.log(data);
     })
     .catch(error => console.log('Error:', error));
 };



  const obtenerTareas = () => {
     fetch(apiUrl+'/users/jessicaanai', {
      method: 'GET'
    })
      .then(response => {
        if (response.status==404){
          crearUsuario()
        }
        if(response.ok){
          return response.json()
        }
      })
      .then(data => {
        if (data){
       setTareas(data.todos);
        }
      })
      .catch(error => console.log('Error:', error));
  };

  const eliminarTarea = (id) => {
    fetch(apiUrl+'/todos/'+id, {
      method: 'DELETE'
    })
      .then(response => {
        if(response.ok){
          return response
        }
      })
      .then(data => {
        if(data){
          const nuevasTareas = tareas.filter(item => item.id !== id);
          setTareas(nuevasTareas);
        }
      })
      .catch(error => console.log('Error:', error));
    
  };

  useEffect(()=>{
    obtenerTareas()
  },[])

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
                onClick={() => eliminarTarea(item.id)}
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
      Quedan {tareas.length} tareas
    </div>
  );
};

export default Tareas;
