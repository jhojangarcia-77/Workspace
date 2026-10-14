Voy a redactar nuevamente toda la Parte 1 — Investigación teórica, con una redacción diferente, explicaciones más naturales y ejemplos nuevos, manteniendo los nueve puntos de la guía. El contenido estará preparado para guardarlo en `docs/despliegue.md`.

Los comandos DNS y los datos que dependan de tu equipo o de los precios vigentes quedarán identificados para que puedas comprobarlos y añadir evidencias propias.

Escritura

# PARTE 1. INVESTIGACIÓN TEÓRICA

## Publicación de proyectos React + Supabase

## 1\. Cómo llega un usuario a un sitio web

### 1.1. Recorrido desde el navegador hasta la página

Cuando una persona quiere visitar una página, no necesita conocer la dirección numérica del servidor. Escribe un nombre de dominio y el navegador realiza varias operaciones para encontrar el sitio y descargar sus recursos.

El recorrido funciona de la siguiente manera:

1. **Escritura de la dirección:** el usuario introduce una URL, por ejemplo, `https://miapp.com`.
2. **Búsqueda DNS:** el navegador comprueba si tiene guardada la dirección IP. Si no la encuentra en su caché, consulta un resolver DNS.
3. **Obtención de la IP:** el resolver obtiene la dirección correspondiente mediante consultas a los servidores DNS.
4. **Conexión con el servidor:** en HTTPS sobre TCP, el navegador establece una conexión TCP con el servidor. Si se utiliza HTTP/3, la comunicación emplea QUIC sobre UDP en lugar de TCP.
5. **Negociación de seguridad:** en una conexión HTTPS se establece TLS, que permite cifrar la comunicación y validar la identidad del servidor mediante su certificado.
6. **Petición HTTP:** el navegador solicita el recurso necesario, como el documento principal de la página.
7. **Respuesta del servidor:** el servidor devuelve un código de estado, cabeceras y el contenido solicitado. Por ejemplo, `200 OK` indica que la petición se atendió correctamente.
8. **Descarga de recursos:** el navegador obtiene otros archivos, como imágenes, hojas de estilo y código JavaScript.
9. **Visualización:** se interpreta el HTML, se aplican los estilos y se ejecuta JavaScript para mostrar la página.

En un proyecto React con Vite, el navegador normalmente descarga los archivos que se generaron durante la compilación. React utiliza JavaScript para construir la interfaz, mientras que las consultas a Supabase se realizan cuando la aplicación necesita acceder a los datos o a la autenticación.

### 1.2. Componentes de una URL

Consideremos la siguiente dirección:

`https://tienda.campus.edu.co:8443/catalogo?categoria=libros#novedades`

| Elemento | Valor | Descripción |
| --- | --- | --- |
| Esquema | `https` | Define el protocolo utilizado. |
| Subdominio | `tienda` | Separa un servicio del resto del dominio. |
| Dominio registrado | `campus.edu.co` | Identifica el nombre registrado dentro de la jerarquía DNS. |
| TLD | `.co` | Es la extensión de nivel superior. |
| Puerto | `8443` | Indica el puerto al que se conecta el cliente. |
| Ruta | `/catalogo` | Señala el recurso solicitado. |
| Query string | `?categoria=libros` | Contiene parámetros que la aplicación puede procesar. |
| Fragmento | `#novedades` | Identifica una sección o destino del documento en el cliente. |

El fragmento no suele enviarse al servidor en la petición HTTP. Por su parte, el puerto se puede omitir de la URL cuando se utiliza el puerto predeterminado del protocolo.

### 1.3. Dominio, subdominio y hosting

El **dominio** es el nombre que permite identificar un servicio en Internet, como `miapp.com`. El **subdominio** es una división del espacio de nombres, por ejemplo, `panel.miapp.com` o `api.miapp.com`. El **hosting** es el servicio que entrega los archivos de la web o proporciona los recursos para ejecutar la aplicación.

Se pueden contratar por separado porque cada servicio cumple una función distinta. El registrador gestiona el registro del dominio, el proveedor DNS administra sus registros y el hosting publica el contenido.

Por ejemplo, un estudiante puede registrar un dominio en Namecheap, utilizar Cloudflare para administrar el DNS y publicar su proyecto React en GitHub Pages. Para que funcione, debe configurar correctamente el dominio y el servicio de alojamiento.

---

## 2\. DNS

### 2.1. Definición y función

DNS significa _Domain Name System_. Es el sistema que permite relacionar nombres de dominio con información necesaria para localizar servicios de Internet.

Se suele comparar con una agenda de contactos porque es más fácil recordar `github.com` que memorizar una dirección IP. Sin embargo, DNS no solo relaciona nombres con direcciones: también publica información sobre correo electrónico, servidores autoritativos y verificaciones de servicios.

### 2.2. Jerarquía de resolución

La resolución DNS utiliza una estructura jerárquica:

- **Servidores raíz:** indican a qué servidores de nivel superior debe dirigirse una consulta.
- **Servidores TLD:** proporcionan información sobre la delegación de extensiones como `.com`, `.org` o `.co`.
- **Servidores autoritativos:** contienen los registros publicados para una zona DNS concreta.
- **Resolver recursivo:** recibe la consulta del usuario y busca la respuesta, utilizando la caché o consultando otros servidores.

Por ejemplo, al buscar la dirección de `miapp.com`, el resolver puede consultar la jerarquía DNS hasta encontrar los servidores que conocen los registros de ese dominio. Si la respuesta está en caché y todavía es válida, puede devolverla sin repetir todo el recorrido.

### 2.3. Registros DNS más utilizados

| Registro | Función | Ejemplo de valor |
| --- | --- | --- |
| A | Relaciona un nombre con una dirección IPv4. | `192.0.2.25` |
| AAAA | Relaciona un nombre con una dirección IPv6. | `2001:db8::25` |
| CNAME | Define un alias hacia otro nombre DNS. | `sitio.hosting.example` |
| ALIAS / ANAME | Permite que ciertos proveedores apunten el dominio raíz a otro nombre y resuelvan sus direcciones. | `miapp.hosting.example` |
| MX | Indica qué servidores reciben el correo del dominio. | `10 correo.ejemplo.com` |
| TXT | Publica textos para políticas, verificaciones y autenticación de correo. | `v=spf1 include:mail.example -all` |
| NS | Identifica los servidores autoritativos de la zona. | `ns1.proveedor.example` |
| SOA | Guarda información administrativa y de control de la zona DNS. | Nombre del servidor principal, contacto y número de serie. |

Las direcciones IP del ejemplo están reservadas para documentación y no deben utilizarse como destinos reales de alojamiento.

**A y AAAA:** permiten localizar un servidor mediante IPv4 o IPv6, respectivamente. Un servicio puede disponer de ambos tipos de registro.

**CNAME:** permite que un nombre sea alias de otro. Por ejemplo, `www.miapp.com` puede apuntar a un nombre proporcionado por la plataforma de hosting. En el DNS tradicional, un nombre con CNAME no puede contener libremente otros registros de datos en ese mismo nombre.

**ALIAS y ANAME:** son soluciones ofrecidas por determinados proveedores para el problema de utilizar un CNAME en el dominio raíz. El vértice de una zona, como `miapp.com`, necesita conservar registros propios de la zona. ALIAS y ANAME no son tipos de registro estándar equivalentes al CNAME; su implementación depende del proveedor.

**MX:** se utiliza para recibir correo. Su valor incluye una prioridad y un nombre de servidor. Si existen varios MX, normalmente se intenta primero el que tiene el número de prioridad más bajo.

**TXT:** puede contener una política SPF, una clave pública DKIM o un código de verificación de propiedad. Por ejemplo:

- SPF: `v=spf1 include:_spf.proveedor.example -all`
- DKIM: `v=DKIM1; k=rsa; p=CLAVE_PUBLICA`
- Verificación: `servicio-verification=TOKEN_DE_EJEMPLO`

Son ejemplos de formato, no valores válidos para cualquier dominio. SPF identifica qué remitentes están autorizados según la política publicada; DKIM permite verificar firmas de correo; y los códigos de verificación ayudan a demostrar el control del dominio.

**NS:** define los servidores que tienen autoridad sobre una zona. **SOA:** incluye datos administrativos como el servidor principal, el contacto de la zona, el número de serie y los temporizadores de sincronización.

### 2.4. TTL y propagación DNS

TTL significa _Time To Live_. Indica cuánto tiempo puede conservarse una respuesta DNS en caché antes de que deba actualizarse.

Por ejemplo, con un TTL de 600 segundos, una respuesta recién almacenada puede mantenerse durante diez minutos. Esto no significa que todas las cachés de Internet se actualicen exactamente al mismo tiempo.

La propagación DNS es el periodo en el que diferentes resolvers dejan de utilizar respuestas antiguas y consultan la nueva configuración. Su duración depende del TTL anterior, las cachés negativas, la actualización de la zona y el comportamiento de los resolvers.

Un cambio puede verse en pocos minutos, aunque algunos casos tardan más. No existe una garantía universal de que todos los usuarios observen el cambio dentro de un plazo fijo. Si se va a migrar un sitio, puede ser útil reducir el TTL con anticipación, teniendo en cuenta que las respuestas almacenadas anteriormente no desaparecen por cambiar el valor nuevo.

### 2.5. Práctica de consultas DNS

Ejecutar estos comandos permite investigar dominios reales:

```
nslookup github.io
dig github.com A
dig github.com MX
dig +trace anthropic.com
```

El primer comando muestra información sobre la resolución de `github.io`. El segundo consulta sus registros A para `github.com`; el tercero busca sus registros de correo; y el último muestra el recorrido de una consulta desde la raíz DNS hasta la información autoritativa de `anthropic.com`.

En Windows, si no se dispone de `dig`, se puede usar:

```
nslookup -type=MX github.com
```

**Evidencia personal:** pegar en esta sección la salida que produzca tu terminal, indicar la fecha de ejecución y explicar qué direcciones o servidores encontraste. No es recomendable copiar resultados de otra persona porque pueden variar según la red y el momento de la consulta.

Escritura

---

## 3\. Dominios

### 3.1. Qué es un registrador y cómo se diferencia de otros proveedores

Un registrador es una empresa autorizada para registrar nombres de dominio y gestionar sus renovaciones. El proveedor DNS se encarga de publicar los registros que relacionan el dominio con los servicios correspondientes. El proveedor de hosting ofrece el espacio y la infraestructura donde se publica el sitio.

Estas tareas no tienen que realizarse con la misma empresa. Por ejemplo, se puede registrar `proyecto.com` en Porkbun, utilizar los DNS de Cloudflare y alojar el frontend en Vercel. Para que el conjunto funcione, los registros DNS deben coincidir con la configuración de Vercel.

### 3.2. Extensiones genéricas y de país

Los TLD son las extensiones que aparecen al final de los nombres de dominio.

- **`.com`****:** extensión genérica utilizada por empresas, proyectos personales y servicios comerciales.
- **`.dev`****:** extensión genérica frecuente en sitios relacionados con programación. Los navegadores que aplican la política HSTS correspondiente exigen HTTPS.
- **`.app`****:** extensión utilizada habitualmente para aplicaciones. También requiere atención especial a HTTPS debido a las políticas HSTS.
- **`.co`****:** dominio de código de país de Colombia que también se comercializa internacionalmente.
- **`.com.co`****:** extensión de segundo nivel bajo `.co`, utilizada frecuentemente para actividades comerciales colombianas.

No todas las extensiones tienen las mismas condiciones de registro. Algunas pueden exigir residencia, documentación o cumplir requisitos específicos. Antes de registrar una extensión, conviene revisar las reglas del registro y del proveedor.

### 3.3. WHOIS y privacidad

WHOIS es un sistema para consultar información sobre el registro de dominios. Los resultados pueden incluir el registrador, las fechas de registro y vencimiento y los nameservers, además de información de contacto cuando las reglas aplicables permiten mostrarla.

La privacidad de dominio limita la exposición pública de ciertos datos personales, por ejemplo, sustituyendo los datos de contacto por información de un servicio intermediario. No significa que el registrador desconozca al titular ni que los datos estén fuera del alcance de los procedimientos legales aplicables.

RDAP es otro protocolo para consultar información de registro y se utiliza en distintos contextos como alternativa o complemento de WHOIS.

### 3.4. Nameservers y cambio de proveedor

Los nameservers son los servidores que publican las respuestas DNS autoritativas de un dominio.

Apuntar un dominio a otro proveedor puede significar cambiar los nameservers o modificar registros concretos. Si se cambian los nameservers, la nueva zona DNS debe estar preparada con todos los registros necesarios. Si solo se modifica un registro A o CNAME, se puede mantener el proveedor DNS existente.

Antes de una migración, se deben revisar los registros del sitio, el correo electrónico, las verificaciones de servicios y cualquier otro subdominio utilizado. Omitir un registro MX o TXT puede interrumpir el correo o invalidar una configuración existente.

### 3.5. Comparación de precios de dominios

Los siguientes precios son referencias publicadas en las páginas oficiales consultadas el 14 de octubre de 2026. Están expresados en dólares estadounidenses y pueden variar por promociones, impuestos o cambios de tarifa.

| Registrador | Dominio | Precio inicial o de registro publicado | Renovación publicada |
| --- | --- | --- | --- |
| Namecheap | `.com` | US$6,79 para nuevos clientes elegibles; la tarifa promocional general puede ser distinta. | US$18,48/año |
| Porkbun | `.com` | US$11,08/año | US$11,08/año en la tabla comparativa consultada |
| Namecheap | `.co` | US$7,98 promocional | US$45,48/año |
| Porkbun | `.co` | US$15,76 | US$31,20/año |

Fuentes oficiales: [Namecheap, precios de dominios](<https://www.namecheap.com/domains/>) y [Porkbun, precios y comparación de dominios](<https://porkbun.com/products/domains>). La comparación de `.co` también puede revisarse en [Porkbun: coste de un dominio .co](<https://porkbun.com/about/domain-cost-calculator/co>).

Los precios muestran por qué no basta con comparar el coste del primer año. Algunos registradores ofrecen promociones para captar nuevos clientes, pero aplican una tarifa regular cuando llega la renovación. También pueden existir impuestos, cargos propios de la extensión y cambios de tarifas mayoristas.

Para elegir un dominio, conviene calcular el coste de varios años, no solo el precio inicial. Los valores anteriores son una referencia de investigación y deben volver a verificarse en el carrito del registrador antes de comprar.

---

## 4\. HTTPS y certificados

### 4.1. Qué significa TLS/SSL

TLS (_Transport Layer Security_) protege los datos que se transmiten entre el navegador y el servidor. SSL es el nombre de protocolos antiguos que han sido reemplazados por versiones más seguras de TLS; por eso, aunque se siga diciendo «certificado SSL», normalmente se habla de certificados utilizados para conexiones HTTPS con TLS.

TLS ofrece tres protecciones principales:

- **Cifrado:** dificulta que terceros lean los datos durante la transmisión.
- **Integridad:** ayuda a detectar alteraciones de los datos mientras viajan.
- **Autenticación:** permite al navegador comprobar que el servidor presenta un certificado válido para el nombre solicitado.

Por ejemplo, al iniciar sesión en una aplicación, HTTPS protege las credenciales durante el tránsito. Sin embargo, no garantiza que la aplicación sea confiable ni protege automáticamente los datos guardados en una base de datos mal configurada.

### 4.2. Autoridad Certificadora y Let's Encrypt

Una Autoridad Certificadora (CA) es una entidad que emite certificados digitales siguiendo procedimientos de validación.

Let's Encrypt es una CA que permite obtener certificados TLS sin coste y automatiza su emisión y renovación mediante ACME. Gracias a ello, muchos sitios web pueden habilitar HTTPS sin comprar un certificado comercial.

Para obtener un certificado, el solicitante debe demostrar el control del dominio mediante uno de los métodos de validación admitidos. Después, el hosting o servidor debe configurarse para utilizarlo correctamente.

### 4.3. Certificados DV, OV y EV

| Tipo | Validación | Uso habitual |
| --- | --- | --- |
| DV (_Domain Validation_) | Comprueba el control del dominio. | Proyectos personales, aplicaciones web y páginas informativas. |
| OV (_Organization Validation_) | Comprueba el dominio y datos de una organización. | Empresas que necesitan validación organizativa. |
| EV (_Extended Validation_) | Aplica controles adicionales de identidad de la entidad. | Organizaciones con requisitos específicos de validación. |

Los tres tipos pueden cifrar las conexiones mediante TLS. La diferencia principal está en el nivel de validación de identidad y no en que EV proporcione necesariamente un cifrado más fuerte que DV.

### 4.4. Certificado wildcard

Un certificado wildcard cubre los nombres que coinciden con un patrón de subdominio. Por ejemplo, `*.miapp.com` puede cubrir `api.miapp.com` y `panel.miapp.com`.

No cubre automáticamente el dominio raíz `miapp.com` ni todos los subdominios de niveles más profundos. Es necesario comprobar los nombres incluidos en el certificado.

### 4.5. Error de certificado para un nombre de dominio

El error «certificado no válido para este nombre» aparece cuando el nombre de la URL no coincide con los nombres cubiertos por el certificado, o cuando existe otro problema de validación.

Puede ocurrir si se configura un dominio personalizado en un hosting antes de que termine la emisión del certificado, si el DNS apunta al destino incorrecto o si el certificado no incluye el dominio raíz y el subdominio que se están utilizando.

Por ejemplo, un certificado válido para `www.miapp.com` no necesariamente será válido para `miapp.com`. Para resolver el problema, hay que comprobar la configuración DNS, registrar todos los nombres necesarios en el hosting y verificar que el certificado se haya emitido correctamente.

### 4.6. Qué es HSTS

HSTS significa _HTTP Strict Transport Security_. Es una política que indica al navegador que debe acceder a un sitio mediante HTTPS durante un periodo determinado.

Un ejemplo de cabecera es:

```
Strict-Transport-Security: max-age=31536000
```

Este valor indica que el navegador debe recordar la política durante un año. La directiva opcional `includeSubDomains` puede extenderla a los subdominios, por lo que se debe activar solo cuando todos ellos estén preparados para funcionar con HTTPS.

HSTS reduce el riesgo de volver accidentalmente a HTTP, pero no sustituye la necesidad de tener un certificado válido y una configuración correcta del servidor.

---

## 5\. Modelos de alojamiento

### 5.1. Tipos de hosting y sus usos

| Modelo | Ejemplos | Ventajas | Desventajas | Caso recomendado |
| --- | --- | --- | --- | --- |
| Hosting compartido | Hostinger, cPanel | Precio bajo y administración sencilla. | Recursos compartidos y menor control del entorno. | Blogs, páginas institucionales y sitios pequeños. |
| VPS | DigitalOcean Droplet, Linode, AWS EC2 | Control del sistema operativo y libertad para instalar software. | Requiere mantenimiento, actualizaciones y medidas de seguridad. | Aplicaciones con backend propio y necesidades específicas. |
| Servidor dedicado | OVH, Hetzner | Recursos físicos reservados y mayor control del hardware. | Coste más alto y responsabilidad administrativa. | Servicios exigentes en recursos o aislamiento. |
| PaaS | Render, Railway, Heroku, Fly.io | Facilita los despliegues y reduce el trabajo de administrar infraestructura. | Cuotas, dependencia de la plataforma y posibles costes de crecimiento. | APIs y aplicaciones web que se quieren publicar rápidamente. |
| Serverless / Functions | Vercel Functions, AWS Lambda, Supabase Edge Functions | Infraestructura administrada y ejecución bajo demanda según el servicio. | Límites de ejecución, cuotas y posibles latencias iniciales. | Webhooks, tareas breves y endpoints concretos. |
| Hosting estático + CDN | GitHub Pages, Netlify, Cloudflare Pages, Vercel | Buena distribución de archivos, bajo mantenimiento y caché. | No ejecuta por sí solo un backend tradicional; puede requerir reglas SPA. | React compilado, portafolios y documentación. |
| BaaS | Supabase, Firebase, Appwrite | Proporciona base de datos, autenticación y otros servicios administrados. | Límites de uso, dependencia del proveedor y necesidad de controlar permisos. | Aplicaciones que necesitan backend sin construir toda la infraestructura. |

Los modelos no son excluyentes. Una aplicación puede utilizar GitHub Pages para su frontend, Supabase para los datos y funciones serverless para operaciones privadas.

### 5.2. CDN y problema que resuelve

Un CDN (_Content Delivery Network_) distribuye contenido entre servidores situados en diferentes ubicaciones. Así, el usuario puede recibir ciertos recursos desde un punto cercano en lugar de solicitarlos siempre al servidor de origen.

Esto ayuda a reducir la latencia, descargar trabajo del servidor original y reutilizar contenido almacenado en caché.

Por ejemplo, si una aplicación React utiliza una imagen que cambia pocas veces, un CDN puede conservar una copia y entregarla a los usuarios sin consultar continuamente al origen. Las consultas dinámicas a la base de datos necesitan un tratamiento distinto y no se vuelven más rápidas automáticamente por utilizar un CDN.

### 5.3. Diferencias entre sitios estáticos y dinámicos

Un sitio estático entrega archivos que ya están preparados, como HTML, CSS, JavaScript e imágenes. Un sitio dinámico genera respuestas durante las peticiones o consulta servicios para producir contenido según el usuario o los datos disponibles.

Una web estática puede seguir mostrando información dinámica en pantalla. Por ejemplo, el navegador puede cargar los archivos de React y después consultar Supabase para mostrar las tareas de un usuario. En ese caso, el frontend es estático, pero la aplicación utiliza servicios remotos dinámicos.

### 5.4. Por qué React con Vite o CRA puede alojarse como sitio estático

Durante el desarrollo, Vite proporciona herramientas para ejecutar y depurar la aplicación. Al ejecutar la compilación de producción, el código se transforma en archivos listos para el navegador.

En Vite, el comando habitual es:

```
npm run build
```

La salida predeterminada se guarda en `dist/`. En Create React App, normalmente se utiliza `build/`.

Como el navegador ejecuta el JavaScript y muestra la interfaz, el hosting solo necesita entregar esos archivos. Si la aplicación utiliza Supabase, las solicitudes de autenticación y datos se realizan directamente hacia sus servicios, siempre que la configuración y los permisos sean correctos.

### 5.5. SPA y errores al recargar una ruta

SPA significa _Single Page Application_. Es una aplicación web que carga un documento principal y utiliza JavaScript para cambiar las vistas sin descargar un HTML independiente para cada sección.

Por ejemplo, una aplicación React puede utilizar `/` para el inicio y `/dashboard` para el panel de usuario. Al navegar dentro de la aplicación, React Router puede mostrar el panel sin problemas.

Si el usuario recarga directamente `/dashboard`, el servidor estático puede buscar un archivo físico con esa ruta. Si no lo encuentra, responde con un error `404`.

Para solucionarlo, se configura una regla de fallback que devuelve `index.html` para las rutas de la aplicación que no correspondan a archivos existentes. El router del frontend se encarga entonces de interpretar la ruta. En GitHub Pages se puede necesitar una estrategia adicional, mientras que otras plataformas permiten configurar reescrituras.

Escritura

---

## 6\. Comparación de plataformas de despliegue

Las plataformas ofrecen distintas cuotas gratuitas, automatizaciones y herramientas. La siguiente tabla resume las características principales que deben evaluarse para un proyecto React + Supabase.

### 6.1. Tabla comparativa

| Característica | GitHub Pages | Netlify | Vercel | Cloudflare Pages | Render |
| --- | --- | --- | --- | --- | --- |
| Ancho de banda gratuito | Límite publicado de 100 GB/mes, sujeto a la política de uso. | Plan gratuito basado en créditos compartidos entre recursos. | Cuotas de transferencia según el plan Hobby y sus condiciones. | Las solicitudes de archivos estáticos son gratuitas e ilimitadas según la documentación de Pages. | Depende de la cuota del workspace y del servicio utilizado. |
| Builds gratuitos | Límite orientativo de 10 builds por hora para el mecanismo estándar de Pages; Actions tiene límites distintos. | Consumen créditos del plan gratuito. | Tiene límites de duración, concurrencia y uso. | Hasta 500 builds mensuales en Free, según la documentación consultada. | Los minutos de pipeline están sujetos a la cuota del plan. |
| Tamaño | Sitio publicado de hasta 1 GB. | Depende de los límites del plan y de los recursos utilizados. | Límite de 100 MB por archivo estático en Hobby, según la documentación de límites. | Hasta 20.000 archivos y 25 MiB por archivo estático en Free. | Consultar los límites vigentes del servicio estático. |
| Variables de entorno durante el build | Sí, con GitHub Actions y su configuración. | Sí. | Sí. | Sí. | Sí. |
| Rutas SPA sin configuración extra | No debe darse por hecho; puede necesitar una estrategia de fallback. | Generalmente sí, con las reglas adecuadas. | Compatible con configuraciones y reglas de enrutamiento apropiadas. | Puede aplicar fallback para SPA estáticas, según los archivos y la configuración del proyecto. | Puede requerir reglas de reescritura. |
| Backend o funciones serverless | No ofrece funciones serverless propias integradas en Pages. | Sí, mediante Netlify Functions. | Sí, mediante funciones y servicios compatibles. | Sí, mediante Pages Functions y Workers, con sus respectivas cuotas. | Sí, mediante servicios web y otros productos compatibles. |
| Dominio personalizado gratuito | Sí. | Sí. | Sí. | Sí. | Sí, sujeto a las condiciones del servicio. |
| HTTPS automático | Sí, tras configurar correctamente el dominio. | Sí. | Sí. | Sí. | Sí. |
| Previsualizaciones por Pull Request | No de forma equivalente a las plataformas con previews integradas; se puede crear un flujo propio. | Sí. | Sí. | Sí, mediante deployments de preview. | Disponible para configuraciones y servicios compatibles; verificar las condiciones actuales. |

Fuentes oficiales para verificar las condiciones y límites:

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- Netlify: https://www.netlify.com/pricing/
- Vercel: https://vercel.com/docs/limits
- Cloudflare Pages: https://developers.cloudflare.com/pages/platform/limits/
- Render: https://render.com/docs/static-sites y https://render.com/docs/free

Los límites pueden cambiar y no todos se comparan directamente. Por ejemplo, los créditos de Netlify pueden consumirse en diferentes recursos, por lo que no equivalen a una cantidad fija de ancho de banda. Antes de tomar una decisión, hay que comprobar la cuota del plan vigente y las condiciones de uso.

### 6.2. Plataforma elegida para el proyecto

Para un proyecto académico con React, Vite y Supabase, elegiría GitHub Pages si el propósito principal es aprender a compilar y publicar un frontend estático utilizando el mismo repositorio donde se guarda el código. El servicio permite publicar archivos estáticos sin administrar un servidor propio y puede combinarse con Supabase para la autenticación y la base de datos. Sin embargo, si necesitara funciones de backend integradas, despliegues de previsualización o una configuración más sencilla de las rutas SPA, evaluaría Vercel, Netlify o Cloudflare Pages. La decisión dependería de los requisitos del proyecto y de las cuotas disponibles.

---

## 7\. Supabase en producción

### 7.1. Qué significa BaaS

BaaS significa _Backend as a Service_. Es un modelo que ofrece servicios de backend ya preparados para que los desarrolladores puedan concentrarse en la lógica y la interfaz de su aplicación.

Supabase utiliza PostgreSQL como base de datos y ofrece servicios adicionales:

- **Postgres:** almacena los datos en tablas relacionadas y permite realizar consultas SQL.
- **Auth:** gestiona la identidad de los usuarios y los procesos de autenticación.
- **Storage:** guarda archivos, imágenes y otros objetos.
- **Realtime:** transmite determinados cambios y eventos a clientes conectados.
- **Edge Functions:** ejecuta código del lado del servidor en un entorno administrado.

En una aplicación de tareas, por ejemplo, Postgres puede guardar las tareas, Auth identifica a sus propietarios, Storage almacena los archivos adjuntos y Realtime permite reflejar cambios en las interfaces conectadas.

### 7.2. Clave publicable y clave secreta

Supabase utiliza claves para identificar las solicitudes que llegan a sus APIs. Las claves antiguas se denominan normalmente `anon` y `service_role`; también existen formatos más recientes, como las claves `sb_publishable_...` y `sb_secret_...`.

| Tipo de clave | Finalidad | Ubicación correcta |
| --- | --- | --- |
| `anon` o clave publicable | Permite al cliente utilizar las APIs con los permisos que correspondan al rol y a las políticas configuradas. | Puede incluirse en el frontend. |
| `service_role` o clave secreta | Permite operaciones privilegiadas y puede omitir RLS. | Solo en un entorno protegido del servidor. |

La clave publicable no debe confundirse con una contraseña. Puede inspeccionarse en el código que descarga el navegador, por lo que la protección de los datos debe depender de los permisos y las políticas correctas.

La clave secreta, en cambio, no puede incluirse en los archivos públicos de la aplicación, en un repositorio accesible ni en una variable `VITE_`. Si se filtra, puede permitir operaciones que los usuarios normales no deberían realizar.

### 7.3. Seguridad a nivel de fila (RLS)

RLS significa _Row Level Security_. Es una función de PostgreSQL que permite definir qué registros puede consultar, insertar, actualizar o eliminar cada usuario.

Es importante activarla cuando una tabla está disponible mediante la API de Supabase porque no basta con ocultar botones en React. Los usuarios pueden inspeccionar las solicitudes del navegador y realizar peticiones por otros medios.

RLS permite imponer las restricciones en la propia base de datos. Así, incluso si alguien intenta modificar una petición, la base de datos puede impedir que acceda a filas ajenas.

### 7.4. Ejemplo de políticas RLS

Supongamos que una tabla `notas` contiene `id`, `user_id` y `contenido`. La columna `user_id` guarda el identificador del propietario de cada nota.

El siguiente ejemplo permite a un usuario autenticado consultar, insertar y actualizar sus propias filas:

```
alter table public.notas
enable row level security;

create policy "Consultar mis notas"
on public.notas
for select
to authenticated
using (
  (select auth.uid()) = user_id
);

create policy "Insertar mis notas"
on public.notas
for insert
to authenticated
with check (
  (select auth.uid()) = user_id
);

create policy "Actualizar mis notas"
on public.notas
for update
to authenticated
using (
  (select auth.uid()) = user_id
)
with check (
  (select auth.uid()) = user_id
);
```

La expresión `auth.uid()` obtiene el identificador del usuario autenticado. La cláusula `USING` limita las filas existentes sobre las que se permite operar y `WITH CHECK` valida el propietario de las filas nuevas o modificadas.

En la política de actualización se utilizan ambas cláusulas para evitar que un usuario modifique registros ajenos o cambie el propietario de una fila para transferirla a otra cuenta.

También deben configurarse los privilegios SQL necesarios para la tabla y sus columnas. Estas políticas no conceden permisos de eliminación, porque el ejemplo no los necesita.

### 7.5. CORS, Site URL y Redirect URLs

CORS significa _Cross-Origin Resource Sharing_. Es un mecanismo del navegador que permite controlar las solicitudes entre distintos orígenes. Un origen está definido por el esquema, el host y el puerto.

Por ejemplo, una aplicación publicada en `https://usuario.github.io` puede realizar solicitudes a un servicio de Supabase que se encuentra en otro origen. Los endpoints que utilizan controles CORS deben permitir el origen que corresponda.

No todos los servicios se configuran de la misma manera, y CORS no reemplaza las políticas de seguridad de la base de datos.

En Supabase Auth se deben revisar dos configuraciones:

- **Site URL:** define la URL principal utilizada como destino predeterminado en determinados flujos de autenticación.
- **Redirect URLs:** indica qué direcciones están permitidas como destino después de procesos como la autenticación, la confirmación de correo o la recuperación de contraseña.

Si la aplicación se publica en GitHub Pages, se debe configurar la URL real de producción. Por ejemplo, si el repositorio es `mi-proyecto`, el sitio puede estar en `https://usuario.github.io/mi-proyecto/`.

Si solo se conserva `localhost` en la configuración, algunos flujos pueden intentar regresar a la dirección local, rechazar una redirección o terminar en una página incorrecta. Por eso es importante configurar los destinos de producción y comprobar los flujos de inicio de sesión.

### 7.6. Cuotas del plan gratuito de Supabase

El plan gratuito ofrece recursos útiles para aprender y desarrollar prototipos. Entre los límites documentados se encuentran los siguientes:

| Recurso | Límite de referencia |
| --- | --- |
| Proyectos gratuitos | Hasta 2 proyectos activos |
| Base de datos | 500 MB por proyecto |
| Almacenamiento de archivos | 1 GB |
| Transferencia de datos | 5 GB |
| Usuarios activos mensuales de Auth | 50.000 |
| Invocaciones de Edge Functions | 500.000 |
| Mensajes Realtime | 2 millones |
| Conexiones Realtime simultáneas | 200 |

Las cuotas pueden modificarse y otros recursos pueden tener restricciones adicionales. Se debe consultar la documentación oficial antes de publicar una aplicación que vaya a utilizarse de forma continua.

Supabase también puede pausar automáticamente proyectos gratuitos con actividad insuficiente durante un periodo aproximado de siete días. El propietario puede reanudarlos desde el panel mientras el proyecto siga dentro del periodo permitido para restauración. En un proyecto importante, hay que tener en cuenta esta limitación y planificar la disponibilidad.

Fuentes oficiales:

- Precios y cuotas: https://supabase.com/docs/guides/platform/billing-on-supabase
- Pausa de proyectos: https://supabase.com/docs/guides/platform/free-project-pausing
- Seguridad RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Claves de API: https://supabase.com/docs/guides/getting-started/api-keys
- Redirecciones de Auth: https://supabase.com/docs/guides/auth/redirect-urls

Escritura

---

## 8\. Variables de entorno y seguridad

### 8.1. Qué son las variables de entorno

Las variables de entorno son valores de configuración que un programa utiliza para conocer determinados parámetros sin tener que escribirlos directamente en el código fuente.

Por ejemplo, una aplicación puede utilizar una URL para conectarse a Supabase y diferentes valores para desarrollo y producción. Separar la configuración del código facilita mantener el proyecto y cambiar los valores según el entorno.

Los archivos `.env` se utilizan habitualmente para guardar estas variables durante el desarrollo local.

### 8.2. Por qué se excluye `.env` del repositorio

Un archivo `.env` puede contener contraseñas, tokens y credenciales privadas. Si se sube a un repositorio público, cualquier persona que pueda acceder al archivo puede copiar sus valores.

Por eso se recomienda añadir estas reglas a `.gitignore`:

```
.env
.env.*
!.env.example
```

El archivo `.env.example` puede mantenerse en el repositorio para indicar las variables necesarias sin revelar sus valores reales. Por ejemplo:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Es importante recordar que `.gitignore` evita que los archivos no rastreados se incorporen por accidente, pero no elimina archivos que ya están registrados en Git.

### 8.3. Variables `VITE_` y exposición pública

Vite utiliza el prefijo `VITE_` para identificar variables que pueden exponerse al código del cliente. Se accede a ellas mediante `import.meta.env`.

Ejemplo:

```
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

Durante la compilación, los valores utilizados por el frontend pueden quedar incluidos en los archivos JavaScript finales. Por eso, todo lo que se configure con el prefijo `VITE_` debe considerarse público.

La URL del proyecto y la clave publicable de Supabase pueden utilizarse en el cliente si se han configurado correctamente los permisos y las políticas RLS. Las contraseñas de bases de datos y las claves secretas nunca deben llevar ese prefijo.

Documentación: https://vite.dev/guide/env-and-mode

### 8.4. Secretos de build y secretos de runtime

Un secreto de build se utiliza durante la compilación o publicación del proyecto. Por ejemplo, GitHub Actions puede recibir un token desde GitHub Secrets para ejecutar una operación autorizada.

Un secreto de runtime se utiliza mientras un servicio está funcionando, como una credencial que un backend necesita para consultar una API privada.

La ubicación del secreto es fundamental. Si una variable privada se incorpora a los archivos JavaScript del frontend, se convierte en información accesible al público, aunque se haya introducido de forma segura durante el build.

Las credenciales privadas deben permanecer en el servidor o en un gestor de secretos y no deben enviarse al navegador.

### 8.5. Cómo actuar ante una clave filtrada

Si una clave secreta se publica accidentalmente en Git, se debe actuar como si ya hubiera sido copiada.

1. Revocar o rotar la credencial expuesta.
2. Actualizar los servicios autorizados para utilizar la nueva clave.
3. Revisar los registros disponibles para detectar posibles usos no autorizados.
4. Retirar el secreto del código actual y configurar una alternativa segura.
5. Revisar el historial de Git y limpiar los commits cuando sea necesario.
6. Comprobar `.gitignore`, los permisos del repositorio y las herramientas de detección de secretos.

Borrar la clave en un commit posterior no es suficiente porque el valor puede seguir presente en el historial. Incluso si se limpia el historial, la rotación es necesaria para evitar que una copia antigua siga siendo válida.

---

## 9\. Build y despliegue

### 9.1. Función de `npm run build`

El comando `npm run build` ejecuta el script de compilación definido en `package.json`. En un proyecto Vite convencional, ese script ejecuta `vite build`.

El proceso prepara los recursos para producción y genera una carpeta llamada `dist/`, que normalmente contiene:

- `index.html`, el documento principal.
- Archivos JavaScript que ejecuta React.
- Hojas de estilo CSS.
- Imágenes, fuentes y otros recursos procesados.
- Archivos estáticos copiados desde `public/`.

La carpeta exacta depende de la configuración del proyecto. En Create React App se utiliza normalmente `build/`, mientras que Vite utiliza `dist/` de forma predeterminada.

### 9.2. Técnicas de optimización

Las herramientas de compilación utilizan diferentes técnicas para reducir el tamaño de los recursos y mejorar la carga.

- **Minificación:** elimina caracteres y estructuras innecesarias del código para reducir su tamaño.
- **Tree shaking:** elimina código que no se utiliza cuando el empaquetador puede identificarlo de forma segura.
- **Code splitting:** divide el código en fragmentos para cargar solo los necesarios en cada momento.
- **Hashing:** incorpora identificadores derivados del contenido en los nombres de los archivos para facilitar el control de la caché.

Por ejemplo, un archivo llamado `index-a1b2c3.js` puede cambiar de nombre cuando cambia su contenido. De esta manera, el navegador puede distinguir la nueva versión de la anterior y evitar reutilizar una copia desactualizada.

### 9.3. Qué es CI/CD

CI/CD es un conjunto de prácticas que automatiza la integración, comprobación y publicación del software.

La integración continua (CI) permite ejecutar pruebas y compilaciones cada vez que se incorporan cambios. La entrega continua mantiene el proyecto preparado para publicar nuevas versiones, mientras que el despliegue continuo automatiza la publicación cuando se cumplen las condiciones definidas.

Por ejemplo, un proyecto puede ejecutar `npm ci`, realizar pruebas y comprobar `npm run build` antes de permitir que una versión llegue a producción.

### 9.4. GitHub Actions

GitHub Actions permite automatizar tareas directamente desde un repositorio de GitHub. Las instrucciones se guardan normalmente en archivos YAML dentro de `.github/workflows/`.

Un workflow puede ejecutarse cuando se actualiza una rama, se crea una Pull Request o se solicita una ejecución manual.

Para un proyecto React con Vite, un workflow puede instalar dependencias, compilar la aplicación y publicar el contenido de `dist/` en GitHub Pages.

Ejemplo de dos pasos de compilación:

```
- name: Instalar dependencias
  run: npm ci

- name: Crear build de producción
  run: npm run build
```

Este fragmento muestra solamente la instalación y la compilación. Para publicar en GitHub Pages se necesitan también los permisos, la configuración de publicación y los pasos correspondientes del workflow.

### 9.5. Publicar desde `gh-pages` o mediante Actions

Hay dos enfoques comunes para publicar un proyecto en GitHub Pages.

**Publicación desde una rama****`gh-pages`****:** se genera la compilación y se envían los archivos resultantes a una rama específica. GitHub Pages utiliza esa rama como origen de los archivos publicados. El proceso puede automatizarse con scripts, pero hay que mantener la rama actualizada.

**Publicación mediante GitHub Actions:** un workflow realiza la instalación, las verificaciones, la compilación y la publicación. Esto permite tener un proceso reproducible y comprobar que el build funciona antes de desplegarlo.

Para un proyecto con Vite, GitHub Actions es una buena alternativa porque puede automatizar el despliegue al actualizar la rama principal. También permite mantener el proceso documentado dentro del repositorio.

Documentación oficial: https://docs.github.com/en/actions/about-github-actions

---

## Bibliografía y fuentes de consulta

Las siguientes fuentes oficiales sirven para comprobar la información presentada y profundizar en los conceptos.

1. **MDN Web Docs — Cómo funciona la web:** https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web\_works
2. **Cloudflare — Introducción a DNS:** https://www.cloudflare.com/learning/dns/what-is-dns/
3. **ICANN — Información sobre dominios:** https://www.icann.org/
4. **Let's Encrypt — Cómo funciona:** https://letsencrypt.org/how-it-works/
5. **MDN Web Docs — Seguridad TLS:** https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security
6. **GitHub Docs — Límites de GitHub Pages:** https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
7. **Netlify — Precios:** https://www.netlify.com/pricing/
8. **Vercel — Límites de la plataforma:** https://vercel.com/docs/limits
9. **Cloudflare Pages — Límites:** https://developers.cloudflare.com/pages/platform/limits/
10. **Render — Sitios estáticos:** https://render.com/docs/static-sites
11. **Namecheap — Precios de dominios:** https://www.namecheap.com/domains/
12. **Porkbun — Precios de dominios:** https://porkbun.com/products/domains
13. **Supabase — Facturación y cuotas:** https://supabase.com/docs/guides/platform/billing-on-supabase
14. **Supabase — Pausa de proyectos gratuitos:** https://supabase.com/docs/guides/platform/free-project-pausing
15. **Supabase — Row Level Security:** https://supabase.com/docs/guides/database/postgres/row-level-security
16. **Supabase — Claves de API:** https://supabase.com/docs/guides/getting-started/api-keys
17. **Supabase — URLs de redirección:** https://supabase.com/docs/guides/auth/redirect-urls
18. **Vite — Variables de entorno y modos:** https://vite.dev/guide/env-and-mode
19. **GitHub Docs — GitHub Actions:** https://docs.github.com/en/actions/about-github-actions

**Fecha de consulta:** 14 de octubre de 2026.

Los precios y límites de los servicios pueden cambiar. Antes de entregar el documento, conviene abrir las páginas de precios, verificar los datos que se han incluido y registrar los resultados reales de los comandos DNS ejecutados en el equipo.

Con esto tienes una nueva versión completa de la Parte 1, con los nueve apartados y una redacción diferente.

Antes de entregarla, recuerda añadir la salida real de los cuatro comandos DNS y, si es posible, una captura del resultado de `npm run build`. Esas evidencias son importantes porque el criterio de evaluación exige ejemplos propios, no solamente explicaciones teóricas.
