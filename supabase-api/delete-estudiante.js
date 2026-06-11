const headers = {

  "Content-Type": "application/json",
};
const url =
  "https://zdxqpjewiwcsjefydpxa.supabase.co/rest/v1/estudiantes";

async function eliminarEstudiante(id) {
  try {

    console.log("Eliminando estudiante...");

    const response = await fetch(`${url}?id=eq.${id}`, {
      method: "DELETE",
      headers,
    });

    console.log("Estudiante eliminado");
    console.log(response.status);

  } catch (error) {

    console.log("Error:");
    console.log(error);

  }
}
eliminarEstudiante(1)