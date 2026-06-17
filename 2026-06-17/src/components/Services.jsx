const servicios = [
  {
    icono: '⚡',
    titulo: 'Instalaciones residenciales',
    descripcion:
      'Instalamos sistemas eléctricos completos para viviendas nuevas y remodelaciones, cumpliendo la normativa RETIE vigente.',
  },
  {
    icono: '🏢',
    titulo: 'Instalaciones comerciales',
    descripcion:
      'Diseñamos y ejecutamos montajes eléctricos para locales comerciales, oficinas y talleres con énfasis en seguridad y eficiencia.',
  },
  {
    icono: '🔧',
    titulo: 'Mantenimiento preventivo',
    descripcion:
      'Revisamos tableros, circuitos y protecciones para evitar fallas y garantizar el funcionamiento confiable de sus instalaciones.',
  },
  {
    icono: '💡',
    titulo: 'Iluminación LED',
    descripcion:
      'Implementamos soluciones de iluminación LED para ahorrar energía, mejorar el confort visual y modernizar espacios residenciales y corporativos.',
  },
  {
    icono: '⚙️',
    titulo: 'Tableros eléctricos',
    descripcion:
      'Fabricamos y actualizamos tableros eléctricos con protecciones modernas para aumentar la seguridad y la capacidad de su red.',
  },
  {
    icono: '🔋',
    titulo: 'Plantas eléctricas y UPS',
    descripcion:
      'Suministramos, instalamos y damos mantenimiento a plantas eléctricas y sistemas UPS para continuidad de servicio en emergencias.',
  },
];

function Services() {
  return (
    <section id="servicios" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-titulo">Nuestros Servicios</h2>
          <p className="section-subtitulo text-muted">
            VoltTec ofrece soluciones eléctricas integrales para hogares y empresas en Medellín, con proyectos seguros y certificados.
          </p>
        </div>

        <div className="row g-4">
          {servicios.map((servicio, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div style={{ fontSize: '2.5rem' }}>{servicio.icono}</div>
                  <h5 className="card-title fw-bold mt-3">{servicio.titulo}</h5>
                  <p className="card-text text-muted">{servicio.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
