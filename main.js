const db = new PouchDB('tareas');

const inputName = document.getElementById('nombre');
const inputFecha = document.getElementById('fecha');
const btnAdd = document.getElementById('btnAdd');
const btnList = document.getElementById('btnList');
const lista = document.getElementById('listaTareas');

// Agregar tarea
btnAdd.addEventListener('click', () => {
    if (!inputName.value) return alert('Ingresa un nombre de tarea');

    const tarea = {
        _id: new Date().toISOString(),
        nombre: inputName.value,
        fecha: inputFecha.value,
        completada: false
    };

    db.put(tarea)
        .then(() => {
            // Limpiar campos, pero NO refrescar la lista automáticamente.
            // La lista sólo debe mostrarse cuando el usuario pulse "Listar Tareas".
            inputName.value = '';
            inputFecha.value = '';
        })
        .catch(console.error);
});

// Listar tareas
btnList.addEventListener('click', listarTareas);

function listarTareas() {
    db.allDocs({ include_docs: true, descending: true })
        .then(result => {
            lista.innerHTML = '';
            result.rows.forEach(row => {
                const tarea = row.doc;

                const li = document.createElement('li');
                li.classList.add('tarea');
                if (tarea.completada) li.classList.add('completada');

                li.textContent = `${tarea.nombre} (${tarea.fecha || 'Sin fecha'})`;

                // Cambio de estado al hacer clic
                li.addEventListener('click', () => {
                    tarea.completada = !tarea.completada;
                    db.put(tarea).then(listarTareas);
                });

                lista.appendChild(li);
            });
        });
}
