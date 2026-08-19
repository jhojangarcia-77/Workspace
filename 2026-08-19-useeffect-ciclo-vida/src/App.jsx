import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [mostrarReloj, setMostrarReloj] = useState(true)
  const [usuarioId, setUsuarioId] = useState(1)

  return (
    <div className="app">
      <h1>useEffect y Ciclo de Vida</h1>

      <section>
        <h2>1. Reloj</h2>
        <button onClick={() => setMostrarReloj(!mostrarReloj)}>
          {mostrarReloj ? 'Ocultar reloj' : 'Mostrar reloj'}
        </button>
        {mostrarReloj && <Reloj />}
      </section>

      <section>
        <h2>2. Contador automatico</h2>
        <ContadorAutomatico />
      </section>

      <section>
        <h2>3. Ancho de ventana</h2>
        <RastreadorVentana />
      </section>

      <section>
        <h2>4. Perfil de usuario</h2>
        <div className="botones-usuario">
          <button onClick={() => setUsuarioId(1)}>Usuario 1</button>
          <button onClick={() => setUsuarioId(2)}>Usuario 2</button>
        </div>
        <PerfilUsuario id={usuarioId} />
      </section>

      <section>
        <h2>5. Experimento: fases del ciclo de vida</h2>
        <ExperimentoFases />
      </section>
    </div>
  )
}

function Reloj() {
  const [segundos, setSegundos] = useState(0)

  // BUG 1: falta devolver clearInterval cuando el componente se desmonta.
  useEffect(() => {
    console.log('Reloj montado')
    const id = setInterval(() => {
      setSegundos((segundosActuales) => {
        console.log('tick, segundos:', segundosActuales + 1)
        return segundosActuales + 1
      })
    }, 1000)
  }, [])

  return <p>Segundos: {segundos}</p>
}

function ContadorAutomatico() {
  const [contador, setContador] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      // BUG 2: esta closure conserva el contador inicial en cero.
      console.log('El contador segun el efecto es:', contador)
      setContador(contador + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return <p>Contador: {contador}</p>
}

function RastreadorVentana() {
  const [ancho, setAncho] = useState(window.innerWidth)

  useEffect(() => {
    function manejarResize() {
      console.log('Resize detectado, ancho:', window.innerWidth)
      setAncho(window.innerWidth)
    }

    window.addEventListener('resize', manejarResize)
    // BUG 3: falta quitar este listener antes de registrar otro o desmontar.
  }, [ancho])

  return <p>Ancho actual: {ancho}px</p>
}

function PerfilUsuario({ id }) {
  const [nombre, setNombre] = useState('')

  useEffect(() => {
    console.log('Buscando datos del usuario', id)
    const nombres = { 1: 'Ana', 2: 'Luis' }
    setNombre(nombres[id])
    // BUG 4: falta id en las dependencias, por eso el efecto no reacciona al cambio.
  }, [])

  return <p>Nombre: {nombre}</p>
}

function ExperimentoFases() {
  const [clics, setClics] = useState(0)
  const esPrimeraVez = useRef(true)

  useEffect(() => {
    if (esPrimeraVez.current) {
      console.log('MONTADO')
      esPrimeraVez.current = false
    } else {
      console.log('ACTUALIZADO, clics:', clics)
    }

    return () => {
      console.log('LIMPIEZA (antes del proximo efecto o al desmontar)')
    }
  }, [clics])

  return (
    <div>
      <p>Clics: {clics}</p>
      <button onClick={() => setClics(clics + 1)}>Clickeame</button>
    </div>
  )
}

export default App
