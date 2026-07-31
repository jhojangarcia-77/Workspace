import { useEffect, useRef, useState } from 'react'
import './App.css'

const languages = ['JavaScript', 'Python', 'Java', 'C#']
const countries = ['Colombia', 'Argentina', 'Chile', 'España', 'México', 'Perú']

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [experience, setExperience] = useState(5)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [knownLanguages, setKnownLanguages] = useState([])
  const [modality, setModality] = useState('virtual')
  const [country, setCountry] = useState('')
  const [comments, setComments] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')
  const previewUrlRef = useRef('')
  const [favoriteColor, setFavoriteColor] = useState('#ff6b35')
  const [submittedData, setSubmittedData] = useState(null)

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const ageIsValid = age !== '' && Number(age) > 0
  const canSubmit = acceptedTerms && emailIsValid && ageIsValid

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    }
  }, [])

  const handleLanguageChange = (language) => {
    setKnownLanguages((current) =>
      current.includes(language)
        ? current.filter((item) => item !== language)
        : [...current, language],
    )
  }

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0] ?? null
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    previewUrlRef.current = selectedPhoto ? URL.createObjectURL(selectedPhoto) : ''
    setPhoto(selectedPhoto)
    setPhotoPreview(previewUrlRef.current)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    setSubmittedData({
      name,
      email,
      password: 'Registrada de forma segura',
      age,
      birthDate,
      experience,
      knownLanguages,
      modality,
      country,
      comments,
      photo: photo?.name ?? 'No se subió una foto',
      favoriteColor,
    })
  }

  return (
    <main className="page-shell">
      <header className="intro">
        <span className="eyebrow">FICHA DE INGRESO / 2026</span>
        <h1>Registro de estudiante</h1>
        <p>Completa tu perfil para comenzar tu recorrido de aprendizaje.</p>
      </header>

      <form className="registration-form" onSubmit={handleSubmit}>
        <section className="form-section">
          <div className="section-heading">
            <span className="section-number">01</span>
            <div><h2>Datos personales</h2><p>Cuéntanos un poco sobre ti.</p></div>
          </div>
          <div className="field-grid two-columns">
            <label>Nombre completo<input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Ej. Ana López" required /></label>
            <label>Correo electrónico<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ana@correo.com" required aria-invalid={email !== '' && !emailIsValid} /></label>
            <label>Contraseña<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Mínimo 8 caracteres" minLength="8" required /></label>
            <label>Edad<input type="number" value={age} onChange={(event) => setAge(event.target.value)} placeholder="18" min="1" required /></label>
            <label>Fecha de nacimiento<input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} required /></label>
            <label>País de residencia<select value={country} onChange={(event) => setCountry(event.target.value)} required><option value="">Selecciona un país</option>{countries.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
          </div>
        </section>

        <section className="form-section">
          <div className="section-heading"><span className="section-number">02</span><div><h2>Tu experiencia</h2><p>Personaliza tu punto de partida.</p></div></div>
          <div className="experience-control"><div className="range-label"><label htmlFor="experience">Nivel de experiencia</label><strong>{experience}<span>/10</span></strong></div><input id="experience" type="range" min="1" max="10" value={experience} onChange={(event) => setExperience(event.target.value)} /><div className="range-ends"><span>Recién comienzo</span><span>Avanzado</span></div></div>
          <fieldset><legend>Modalidad preferida</legend><div className="choice-row"><label className="choice"><input type="radio" name="modality" value="presencial" checked={modality === 'presencial'} onChange={(event) => setModality(event.target.value)} />Presencial</label><label className="choice"><input type="radio" name="modality" value="virtual" checked={modality === 'virtual'} onChange={(event) => setModality(event.target.value)} />Virtual</label></div></fieldset>
          <fieldset><legend>Lenguajes que conoces</legend><div className="choice-row">{languages.map((language) => <label className="choice" key={language}><input type="checkbox" checked={knownLanguages.includes(language)} onChange={() => handleLanguageChange(language)} />{language}</label>)}</div></fieldset>
        </section>

        <section className="form-section">
          <div className="section-heading"><span className="section-number">03</span><div><h2>Detalles finales</h2><p>Un último toque para conocerte mejor.</p></div></div>
          <div className="field-grid two-columns">
            <label className="file-field">Foto de perfil<input type="file" accept="image/*" onChange={handlePhotoChange} />{photo && <><span className="file-name">{photo.name}</span>{photoPreview && <img className="photo-preview" src={photoPreview} alt="Vista previa de la foto de perfil" />}</>}</label>
            <label className="color-field">Color favorito<div className="color-input"><input type="color" value={favoriteColor} onChange={(event) => setFavoriteColor(event.target.value)} /><span>{favoriteColor.toUpperCase()}</span></div></label>
            <label className="full-width">Comentarios<textarea value={comments} onChange={(event) => setComments(event.target.value)} placeholder="¿Qué esperas aprender?" rows="4" /></label>
          </div>
          <label className="terms"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />Acepto los términos y condiciones del registro.</label>
          {!canSubmit && (email !== '' || age !== '') && <p className="form-hint">Revisa que el correo y la edad sean válidos para continuar.</p>}
          <button className="submit-button" type="submit" disabled={!canSubmit}>Enviar registro <span aria-hidden="true">→</span></button>
        </section>
      </form>

      {submittedData && <section className="summary" aria-live="polite"><div className="summary-heading"><span className="success-mark">✓</span><div><span className="eyebrow">REGISTRO COMPLETADO</span><h2>Resumen de tu ficha</h2></div></div><dl>{Object.entries(submittedData).map(([key, value]) => <div key={key}><dt>{key.replace(/([A-Z])/g, ' $1')}</dt><dd>{Array.isArray(value) ? value.join(', ') || 'Ninguno' : value || 'No indicado'}</dd></div>)}</dl></section>}
    </main>
  )
}

export default App