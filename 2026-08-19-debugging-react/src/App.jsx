import { useEffect, useState } from 'react'
import './App.css'

const tareasIniciales = [
  { id: 1, texto: 'Aprender React', categoria: 'estudio', completada: false },
  { id: 2, texto: 'Hacer ejercicio', categoria: 'salud', completada: true },
  { id: 3, texto: 'Leer un libro', categoria: 'ocio', completada: false },
  // Error 1 resuelto: se agrego una categoria valida para evitar undefined.toUpperCase().
  { id: 4, texto: 'Practicar debugging', categoria: 'estudio', completada: false },
]

function App() {
  const [tareas, setTareas] = useState(tareasIniciales)
  const [filtro, setFiltro] = useState('todas')

  // Error 2 resuelto: el arreglo de dependencias vacio ejecuta el efecto solo al montar.
  useEffect(() => {
    console.log('App montada')
  }, [])

  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'todas') return true
    // Error 3 resuelto: se comparan valores booleanos, no strings, para filtrar tareas.
    if (filtro === 'completadas') return tarea.completada === true
    if (filtro === 'pendientes') return tarea.completada === false
    return true
  })

  function agregarTarea(texto) {
    if (!texto.trim()) return
    // Error 4 resuelto: se crea un arreglo nuevo para que React detecte la tarea agregada.
    const nuevaTarea = { id: Date.now(), texto, categoria: 'general', completada: false }
    setTareas((tareasActuales) => [...tareasActuales, nuevaTarea])
  }

  function completarTarea(id) {
    // Error adicional resuelto: el estado funcional conserva actualizaciones rapidas consecutivas.
    setTareas((tareasActuales) =>
      tareasActuales.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: true } : tarea,
      ),
    )
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

  // Error 5 resuelto: se controla el error de carga y se guarda para poder mostrarlo.
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
