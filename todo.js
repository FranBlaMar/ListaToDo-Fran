let listaTareas = document.querySelector("#listaTareas");
let formTarea = document.querySelector("#crearTarea");
let textArea = document.querySelector("#textoTarea");
let boton = document.querySelector("#enviar");


//evento load de la ventana, para que cuando cargue cree todas las tareas que hay almacenadas en el localstorage
window.addEventListener("load", ()=>{
    //Obtengo las keys de todas mis tareas del localStorage
    let claves = Object.keys(localStorage);
    //Por cada key, obtengo la tarea
    claves.forEach(clave =>{
        let tarea = JSON.parse(localStorage.getItem(clave));
        //Llamo al metodo de escribir en el html la tarea, pasandole la tarea guardada en el localstorage
        crearTarea(tarea,clave);
    })
    

    //Añadimos los eventos a los checkbox y a los botones de borrar
    let listaCheckboxs = document.querySelectorAll('li input');
    //Recorremos todos los inputs check y comprobamos si en el localStorage estan marcados o no
    listaCheckboxs.forEach(check =>{
        let claveTarea = check.id;
        let tareaGuardada = JSON.parse(localStorage.getItem(claveTarea));
        //Si está marcado, hacemos que cada vez que se recargue la página esté marcado
        if (tareaGuardada.check == true){
            check.checked = true;
        }

        //Ahora le añado el evento change a cada check, si cambia su estado que cambie el valor check guardado en el localStorage
        check.addEventListener("change", (e)=>{
            let claveTarea = e.target.id;
            let tareaGuardada = JSON.parse(localStorage.getItem(claveTarea));
            if (tareaGuardada.check == false){
                const task ={
                    cuerpo: tareaGuardada.cuerpo,
                    check: true
                }
                localStorage.setItem(claveTarea,JSON.stringify(task));
            }
            else{
                const task ={
                    cuerpo: tareaGuardada.cuerpo,
                    check: false
                }
                localStorage.setItem(claveTarea,JSON.stringify(task));
            }
        })
    })
    //Obtengo todos los botones y les añado el evento click, que llama a una funcion de borrado
    let botonesBorrar = document.querySelectorAll('button');
    botonesBorrar.forEach(boton =>{
        boton.addEventListener("click", borrarTarea);
    })

})

        


formTarea.addEventListener("submit", (e)=>{
    e.preventDefault();
    //Obtengo la longitud del localstorage para poder asignarle un id unico a cada tarea
    let id = localStorage.length;
    //Creo un objeto task y le añado los tributos que necesite
    const task ={
        cuerpo: textArea.value,
        check: false
    }
    //Añado la tarea al localstorage, pasandole el id como key y el objeto task como valor
    localStorage.setItem(id, JSON.stringify(task));
    formTarea.reset();
    //Llamo a la funcion de escribir la tarea en el html
    crearTarea(task,id);
})

function crearTarea(task,idTask){
    //Creo los elementos necesarios para mostrar la tarea en el html
    let li = document.createElement("li");
    li.id= idTask;
    let checkbox = document.createElement("input");
    checkbox.type ="checkbox";
    checkbox.id = idTask;
    let cuerpoTarea = document.createElement("p");
    let textoCuerpo = document.createTextNode(task.cuerpo);
    cuerpoTarea.appendChild(textoCuerpo);
    let botonBorrar = document.createElement("button");
    let textoboton = document.createTextNode("Borrar");
    botonBorrar.appendChild(textoboton);
    botonBorrar.id= idTask;
    
    //Obtengo el dato "cuerpo" de la tarea almacenada en el localStorage
    li.appendChild(checkbox);
    li.appendChild(cuerpoTarea);
    li.appendChild(botonBorrar);
    listaTareas.appendChild(li);
}

function borrarTarea(e){
    let idTarea = e.target.id;
    localStorage.removeItem(idTarea);
    alert("Tarea Borrada");
}
    
    