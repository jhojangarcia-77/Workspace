const headers = {

  "Content-Type": "application/json",
};
const url =
  "https://zdxqpjewiwcsjefydpxa.supabase.co/rest/v1/estudiantes";
async function crearEstudiante() {
  try {

    console.log("Creando estudiante...");

    const nuevoEstudiante = {
      nombre: "mateo",
      edad: 16,
      email: "mateo555@mail.com",
      curso_id: 2,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify(nuevoEstudiante),
    });

    const data = await response.json();

    console.log("Estudiante creado:");
    console.table(data);

  } catch (error) {

    console.log("Error:");
    console.log(error);

  }
}
crearEstudiante();