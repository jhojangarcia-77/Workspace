const razones = [
  {
    icono: '🏆',
    titulo: 'Personal certificado RETIE',
    descripcion:
      'Nuestro equipo cuenta con certificación RETIE y experiencia comprobada en proyectos residenciales y comerciales.',
  },
  {
    icono: '⏱️',
    titulo: 'Respuesta rápida',
    descripcion:
      'Atendemos emergencias y solicitudes en menos de 24 horas para que tu operación no se detenga.',
  },
  {
    icono: '🛡️',
    titulo: 'Garantía en mano de obra',
    descripcion:
      'Ofrecemos garantía de 1 año en la mano de obra y seguimiento en cada proyecto.',
  },
  {
    icono: '💼',
    titulo: 'Presupuesto sin costo',
    descripcion:
      'Realizamos cotizaciones claras y sin compromiso, con recomendaciones técnicas adaptadas a tu necesidad.',
  },
];

function WhyUs() {
  return (
    <section id="nosotros" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <img
              src="https://placehold.co/500x400/1a1e2e/f5c518?text=VoltTec"
              alt="Técnicos de VoltTec trabajando"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-lg-7">
            <h2 className="section-titulo mb-3">¿Por qué elegirnos?</h2>
            <p className="text-muted mb-3">
              VoltTec lleva más de 15 años brindando servicios eléctricos seguros y confiables en Medellín y su Área Metropolitana.
            </p>
            <p className="text-muted mb-4">
              Atendemos viviendas, comercios e industrias con soluciones modernas, certificadas y orientadas a la eficiencia energética.
            </p>

            <ul className="list-unstyled">
              {razones.map((razon, index) => (
                <li key={index} className="d-flex gap-3 mb-3">
                  <span style={{ fontSize: '1.5rem' }}>{razon.icono}</span>
                  <div>
                    <strong>{razon.titulo}</strong>
                    <p className="text-muted mb-0 small">{razon.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
