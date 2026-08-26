# Documentacion de codigo: back-end, front-end, JavaScript y React

## 1. Diferencias entre back-end y front-end

### Front-end

El **front-end** es la parte de una aplicacion que el usuario puede ver y utilizar. Se ejecuta principalmente en el navegador y se encarga de la interfaz y de la interaccion.

Sus responsabilidades habituales son:

- Mostrar paginas, formularios, botones, imagenes y mensajes.
- Recibir las acciones del usuario, como clics o escritura.
- Validar datos antes de enviarlos al servidor.
- Solicitar y mostrar informacion obtenida del back-end.
- Adaptar la interfaz a distintos tamanos de pantalla.

Tecnologias frecuentes: **HTML**, **CSS**, **JavaScript** y bibliotecas o frameworks como **React**.

### Back-end

El **back-end** es la parte de la aplicacion que funciona en el servidor. El usuario no la ve directamente. Procesa la logica de negocio y administra los datos.

Sus responsabilidades habituales son:

- Recibir y responder solicitudes del front-end.
- Aplicar reglas de negocio.
- Validar y proteger la informacion recibida.
- Consultar y modificar bases de datos.
- Gestionar usuarios, sesiones y permisos.
- Conectarse con otros servicios mediante APIs.

Tecnologias frecuentes: **Node.js**, Python, Java, PHP, bases de datos SQL o NoSQL y servidores web.

### Comparacion rapida

| Aspecto | Front-end | Back-end |
|---|---|---|
| Donde funciona | Navegador del usuario | Servidor |
| Que controla | Interfaz e interacciones | Logica, datos y seguridad |
| Tecnologias comunes | HTML, CSS, JavaScript, React | Node.js, APIs, bases de datos |
| Ejemplo | Formulario de inicio de sesion | Comprobar credenciales y crear la sesion |

Ambas partes se comunican normalmente mediante una **API**. Por ejemplo, el front-end puede enviar una solicitud `POST /usuarios` y el back-end puede validar los datos, guardarlos en la base de datos y devolver una respuesta.

### Como documentar ambos lados

La documentacion debe explicar la finalidad del codigo, sus entradas, sus salidas y las decisiones importantes.

En el front-end conviene documentar:

- Que pantalla o componente representa cada modulo.
- Que propiedades recibe y que eventos emite.
- Estados importantes, validaciones y estados de carga o error.
- Formato de los datos que consume de una API.

En el back-end conviene documentar:

- Rutas disponibles y metodos HTTP.
- Parametros, cuerpo de las solicitudes y respuestas.
- Codigos de estado y mensajes de error.
- Reglas de negocio, autenticacion y permisos.
- Estructura de los modelos o tablas.

## 2. Como documentar codigo JavaScript

Una buena documentacion de JavaScript debe ser breve y mantenerse junto al codigo. No es necesario describir cada linea: hay que explicar el **por que**, el contrato de la funcion y cualquier comportamiento que no sea evidente.

### Comentarios normales

Se usan para aclaraciones puntuales:

```js
// Se usa UTC para que la fecha sea igual en todos los servidores.
const fechaActual = new Date().toISOString();
```

Los comentarios deben actualizarse cuando cambia el codigo. Si solo repiten lo que hace la instruccion, aportan poco:

```js
// Evitar: suma uno a contador.
contador += 1;
```

### JSDoc

**JSDoc** es el formato mas utilizado para documentar funciones, clases, parametros y valores devueltos. Los comentarios comienzan con `/**` y pueden ser interpretados por editores y herramientas de generacion de documentacion.

```js
/**
 * Calcula el precio final aplicando un descuento porcentual.
 *
 * @param {number} precio Precio original; debe ser mayor o igual que cero.
 * @param {number} descuento Porcentaje entre 0 y 100.
 * @returns {number} Precio final redondeado a dos decimales.
 * @throws {RangeError} Si el precio o el descuento estan fuera de rango.
 */
function calcularPrecioFinal(precio, descuento) {
	if (precio < 0 || descuento < 0 || descuento > 100) {
		throw new RangeError('Parametros fuera de rango');
	}

	return Number((precio * (1 - descuento / 100)).toFixed(2));
}
```

Etiquetas utiles de JSDoc:

- `@param`: describe un parametro y su tipo.
- `@returns`: describe el valor devuelto.
- `@throws`: indica errores que puede lanzar la funcion.
- `@example`: muestra un uso correcto.
- `@deprecated`: avisa que una funcion ya no debe utilizarse.
- `@see`: enlaza con otra funcion o recurso relacionado.

### Que debe incluir una documentacion JavaScript

- Proposito del modulo o funcion.
- Parametros, tipos y restricciones.
- Resultado que devuelve.
- Errores, efectos secundarios y cambios de estado.
- Ejemplo de uso cuando el comportamiento no es obvio.
- Dependencias externas o requisitos especiales.

La documentacion debe coincidir con la implementacion. Por ejemplo, no se debe indicar que una funcion devuelve un objeto si en realidad devuelve `null` cuando no encuentra resultados.

## 3. Como documentar codigo React

En React se documentan principalmente los **componentes**, sus **props**, el estado, los eventos y los efectos. La documentacion debe explicar el contrato de uso del componente: que recibe, que muestra y como se comporta en casos especiales.

### Documentar un componente y sus props

```jsx
/**
 * Muestra la informacion basica de un usuario.
 *
 * @param {Object} props Propiedades del componente.
 * @param {string} props.nombre Nombre que se muestra en pantalla.
 * @param {string} [props.rol='Invitado'] Rol opcional del usuario.
 * @param {() => void} [props.onSeleccionar] Funcion ejecutada al hacer clic.
 * @returns {JSX.Element} Tarjeta del usuario.
 */
function TarjetaUsuario({ nombre, rol = 'Invitado', onSeleccionar }) {
	return (
		<article>
			<h2>{nombre}</h2>
			<p>{rol}</p>
			{onSeleccionar && (
				<button type="button" onClick={onSeleccionar}>
					Seleccionar
				</button>
			)}
		</article>
	);
}
```

Si el proyecto usa TypeScript, las props tambien quedan documentadas mediante su tipo:

```tsx
type TarjetaUsuarioProps = {
	nombre: string;
	rol?: string;
	onSeleccionar?: () => void;
};
```

### Que documentar en React

- **Componente:** que representa y en que situaciones se utiliza.
- **Props:** nombre, tipo, obligatoriedad, valor por defecto y restricciones.
- **Eventos:** cuando se ejecutan y que informacion entregan.
- **Estado:** que representa y que acciones lo modifican.
- **Efectos (`useEffect`):** que recurso externo sincronizan y como se limpian.
- **Estados de interfaz:** carga, vacio, error y exito.
- **Accesibilidad:** etiquetas, roles, foco y uso mediante teclado cuando sea relevante.
- **Composicion:** componentes hijos esperados y estructura de `children`.

### Documentar un hook o un efecto

```jsx
/**
 * Obtiene una lista de usuarios cuando cambia el texto de busqueda.
 * Devuelve estados separados para que la interfaz pueda mostrar carga y error.
 *
 * @param {string} busqueda Texto enviado a la API.
 * @returns {{usuarios: Array, cargando: boolean, error: Error|null}}
 */
function useUsuarios(busqueda) {
	// Implementacion omitida.
}
```

En un `useEffect`, se debe explicar la dependencia que lo activa y la limpieza necesaria, por ejemplo cancelar una suscripcion o un temporizador. Tambien conviene evitar comentarios que describan detalles internos que pueden cambiar; es mejor documentar el comportamiento que necesita conocer quien reutiliza el componente.

### Documentacion complementaria de un proyecto React

Ademas de los comentarios del codigo, un proyecto React suele incluir:

- Un `README.md` con instalacion, comandos y variables de entorno.
- Una guia de componentes con ejemplos, por ejemplo Storybook.
- Documentacion de las APIs consumidas.
- Pruebas que demuestren los estados y comportamientos principales.

### Reglas practicas

1. Escribir nombres claros para reducir la necesidad de comentarios.
2. Documentar primero la API publica de cada modulo o componente.
3. Explicar decisiones y restricciones, no cada instruccion.
4. Incluir ejemplos pequenos y ejecutables.
5. Mantener la documentacion junto al codigo y revisarla en cada cambio.
6. Comprobar tambien los casos de error, carga, datos vacios y permisos.
