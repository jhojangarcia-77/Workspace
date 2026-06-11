const url =
  "https://zdxqpjewiwcsjefydpxa.supabase.co/rest/v1/estudiantes";
  
const headers = {
  
  "Content-Type": "application/json",
};
const url =
  "https://zdxqpjewiwcsjefydpxa.supabase.co/rest/v1/estudiantes";


  async function actualizarEstudiante(id) {
  try {

    console.log("Actualizando estudiante...");

    const estudianteActualizado = {
      edad: 18,
    };

    const response = await fetch(`${url}?id=eq.${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        Prefer: "return=representation",
      },
      body: JSON.stringify(estudianteActualizado),
    });

    const data = await response.json();

    console.log("Estudiante actualizado:");
    console.table(data);

  } catch (error) {

    console.log("Error:");
    console.log(error);

  }
}

actualizarEstudiante(9);