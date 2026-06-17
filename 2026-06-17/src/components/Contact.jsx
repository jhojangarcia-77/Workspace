import { useState } from 'react';

function Contact() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (formulario.nombre && formulario.email && formulario.telefono && formulario.servicio && formulario.mensaje) {
      setEnviado(true);
    }
  };

  return (
    <section id="contacto" className="py-5 bg-dark text-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-titulo text-white">Contáctenos</h2>
          <p className="text-light opacity-75">
            Escríbenos y recibe una cotización rápida para tu proyecto eléctrico.
          </p>
        </div>

        <div className="row g-5">
          <div className="col-lg-4">
            <h4 className="mb-4">Información de contacto</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <span className="me-2">📍</span>
                Calle 10 # 43A-15, El Poblado, Medellín
              </li>
              <li className="mb-3">
                <span className="me-2">📞</span>
                <a href="tel:+573001234567" className="text-white text-decoration-none">
                  (300) 123-4567
                </a>
              </li>
              <li className="mb-3">
                <span className="me-2">📧</span>
                <a href="mailto:info@volttec.com.co" className="text-white text-decoration-none">
                  info@volttec.com.co
                </a>
              </li>
              <li className="mb-3">
                <span className="me-2">🕐</span>
                Lun–Vie 7am–6pm · Sáb 8am–2pm
              </li>
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="bg-white text-dark rounded-3 p-4">
              <form onSubmit={manejarEnvio}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label fw-semibold">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      placeholder="Tu nombre"
                      value={formulario.nombre}
                      onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="tu@correo.com"
                      value={formulario.email}
                      onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label fw-semibold">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      className="form-control"
                      placeholder="300 123 4567"
                      value={formulario.telefono}
                      onChange={(e) => setFormulario({ ...formulario, telefono: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="servicio" className="form-label fw-semibold">
                      Tipo de servicio
                    </label>
                    <select
                      id="servicio"
                      className="form-select"
                      value={formulario.servicio}
                      onChange={(e) => setFormulario({ ...formulario, servicio: e.target.value })}
                    >
                      <option value="">Selecciona un servicio...</option>
                      <option value="residencial">Instalación residencial</option>
                      <option value="comercial">Instalación comercial</option>
                      <option value="mantenimiento">Mantenimiento preventivo</option>
                      <option value="iluminacion">Iluminación LED</option>
                      <option value="planta">Plantas eléctricas / UPS</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label fw-semibold">
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      className="form-control"
                      rows="4"
                      placeholder="Describe brevemente tu necesidad..."
                      value={formulario.mensaje}
                      onChange={(e) => setFormulario({ ...formulario, mensaje: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn btn-voltec w-100 py-2">
                      Enviar solicitud
                    </button>
                    {enviado && (
                      <div className="alert alert-success mt-3" role="alert">
                        ✅ ¡Gracias {formulario.nombre}! Te contactaremos pronto.
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
