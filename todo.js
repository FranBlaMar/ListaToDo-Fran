let listaTareas = document.querySelector(".listaTareas");
let formTarea = document.querySelector("#crearTarea");
let textArea = document.querySelector("#textoTarea");
let boton = document.querySelector("#enviar");

formTarea.addEventListener("submit", (e)=>{
    e.preventDefault();

    const task ={
        task: textArea.value,
        checked: false
    }
    
    localStorage.setItem("task",JSON.stringify(task));
    location.reload();
})
