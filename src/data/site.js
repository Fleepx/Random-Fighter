/**
 * Datos verificables del producto. Todo lo que se muestra en la landing sale
 * de aca, para que no haya cifras ni promesas escritas a mano en los componentes.
 *
 * Regla: si un dato no es verificable, no entra. A la fecha no hay gimnasios
 * clientes ni testimonios, asi que la pagina no incluye prueba social.
 */

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mpdm.randomfighter.dev";

export const MANAGER_URL = "https://manager.randomfighter.cl";

export const CONTACTO = {
  telefono: "+56 9 8187 2697",
  telefonoHref: "tel:+56981872697",
  soporte: "soporte@mpdm.cl",
  contacto: "contacto@mpdm.cl",
};

export const NAV_LINKS = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#preguntas", label: "Preguntas" },
];

export const BENEFICIOS = [
  {
    titulo: "Sabes cuándo vence tu plan",
    detalle:
      "El contador de días queda en la pantalla de inicio, junto al monto y la fecha de vencimiento. No vuelves a preguntar en recepción.",
  },
  {
    titulo: "Reservas tu cupo antes de llegar",
    detalle:
      "Ves el horario de la semana con día y hora, y tomas tu lugar en la clase desde el celular.",
  },
  {
    titulo: "Tu historial de pagos queda registrado",
    detalle:
      "Cada mensualidad con su fecha y su monto, siempre disponible. Sin comprobantes de papel ni capturas de pantalla.",
  },
  {
    titulo: "Tu perfil de combate te sigue",
    detalle:
      "Categoría, peso, disciplina e historial de resultados en un solo lugar, aunque cambies de academia.",
  },
  {
    titulo: "Encuentras academias cerca",
    detalle:
      "Buscas por disciplina, revisas las que están cerca tuyo y te matriculas sin pasar por la recepción.",
  },
];

export const PASOS = [
  {
    numero: "01",
    titulo: "Descarga la app y crea tu perfil",
    detalle:
      "Cargas tu categoría, tu peso y la disciplina que practicas. Toma un par de minutos.",
  },
  {
    numero: "02",
    titulo: "Busca tu academia y matricúlate",
    detalle:
      "Encuentras tu gimnasio en la app y te inscribes en el plan que ofrece.",
  },
  {
    numero: "03",
    titulo: "Reserva tus clases y paga desde el celular",
    detalle:
      "Tomas tu cupo en el horario que te sirve y pagas tu mensualidad con Mercado Pago.",
  },
];

export const PREGUNTAS = [
  {
    pregunta: "¿Tiene algún costo para mí?",
    respuesta:
      "No. Random Fighter es gratis para alumnos. La academia es la que contrata la plataforma, tú solo pagas tu mensualidad al gimnasio como siempre.",
  },
  {
    pregunta: "¿Sirve si mi gimnasio todavía no la usa?",
    respuesta:
      "Necesitas que tu academia esté en la plataforma para matricularte y reservar. Si todavía no está, puedes recomendarla: el primer mes es gratis para ellos.",
  },
  {
    pregunta: "¿Cómo pago mi mensualidad?",
    respuesta:
      "Desde la app, con Mercado Pago. El pago va directo a tu gimnasio y queda registrado en tu historial con fecha y monto.",
  },
  {
    pregunta: "¿Para qué disciplinas sirve?",
    respuesta:
      "Para deportes de contacto en general. Hoy se usa en jiu jitsu brasileño, boxeo y disciplinas de combate con clases por horario y categorías por peso.",
  },
  {
    pregunta: "¿Está disponible en iPhone?",
    respuesta:
      "Por ahora está publicada en Google Play para Android. La versión de iOS ya fue enviada y está en revisión en la App Store.",
  },
  {
    pregunta: "¿Qué pasa si reservo una clase y no puedo ir?",
    respuesta:
      "Puedes liberar tu cupo desde la app. Las condiciones de cancelación y de recuperación de clases las define cada academia.",
  },
  {
    pregunta: "¿Quién puede ver mis datos?",
    respuesta:
      "Tu academia ve tu matrícula, tu asistencia y el estado de tus pagos, que es lo que necesita para administrar tus clases. Tu historial de combates es parte de tu perfil.",
  },
  {
    pregunta: "¿Puedo cambiar de academia sin perder mi historial?",
    respuesta:
      "Sí. Tu perfil y tu historial de combates viajan contigo. Al matricularte en otra academia mantienes tu categoría, tu peso y tus resultados.",
  },
];
