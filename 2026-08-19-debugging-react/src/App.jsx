import { useEffect, useState } from 'react'
import './App.css'

const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  // Bug 1 resuelto: se agregó la categoría que faltaba para evitar undefined.toUpperCase().
  { id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false },
]

function App() {
  const [tareas, setTareas] = useState(tareasIniciales)
  const [filtro, setFiltro] = useState('todas')

  // Bug 2 resuelto: el arreglo vacío evita que el efecto se ejecute en cada render.
  useEffect(() => {
    console.log('App montada')
  }, [])

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'todas') return true
    // Bug 3 resuelto: se comparan valores booleanos con true y false, no con strings.
    if (filtro === 'completadas') return tarea.completada === true
    if (filtro === 'pendientes') return tarea.completada === false
    return true
  })

  function agregarTarea(texto) {
    if (!texto.trim()) return
    // Bug 4 resuelto: se crea un arreglo nuevo para que React detecte el cambio.
    const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false }
    setTareas((tareasActuales) => [...tareasActuales, nuevaTarea])
  }

  function completarTarea(id) {
    const nuevasTareas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: true } : tarea,
    )
    setTareas(nuevasTareas)
  }

  return (
    <div className="app">
      <h1>Mis Tareas</h1>
      <div className="filtros">
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('pendientes')}>Pendientes</button>
        <button onClick={() => setFiltro('completadas')}>Completadas</button>
      </div>
      <ul className="lista-tareas">
        {tareasFiltradas.map((tarea) => (
          <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
            <span>{tarea.texto}</span>
            <span className="categoria">{tarea.categoria.toUpperCase()}</span>
            <button onClick={() => completarTarea(tarea.id)}>✔</button>
          </li>
        ))}
      </ul>
      <AgregarTarea onAgregar={agregarTarea} />
      <PerfilUsuario />
    </div>
  )
}

function AgregarTarea({ onAgregar }) {
  const [texto, setTexto] = useState('')

  function manejarEnvio(event) {
    event.preventDefault()
    onAgregar(texto)
    setTexto('')
  }

  return (
    <form onSubmit={manejarEnvio} className="form-agregar">
      <input value={texto} onChange={(event) => setTexto(event.target.value)} placeholder="Nueva tarea" />
      <button type="submit">Agregar</button>
    </form>
  )
}

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null)
  const [error, setError] = useState('')

  // Bug 5 resuelto: se controla el error asíncrono y se muestra un mensaje en pantalla.
  useEffect(() => {
    const temporizador = setTimeout(() => {
      try {
        setUsuario({ nombre: 'Estudiante React' })
      } catch (errorDeCarga) {
        console.error(errorDeCarga)
        setError(errorDeCarga.message)
      }
    }, 1000)

    return () => clearTimeout(temporizador)
  }, [])

  if (error) return <p className="perfil error">Error: {error}</p>
  if (!usuario) return <p className="perfil">Cargando perfil...</p>

  return <p className="perfil">Perfil: {usuario.nombre}</p>
}

export default App
