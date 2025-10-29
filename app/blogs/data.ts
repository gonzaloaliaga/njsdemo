interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    title: "Novedades en el catálogo",
    excerpt:
      "¡Descubre los nuevos lanzamientos de manga y cómics que han llegado a ComiCommerce este mes!",
    content: `Este mes hemos incorporado una selección exclusiva de títulos de manga y cómics, incluyendo ediciones limitadas y coleccionables. ¡No te pierdas los nuevos volúmenes de tus series favoritas y las novedades de autores emergentes!
  

  • Berserk Maximum Vol. 1

  • Spider-Man: Miles Morales

  • Jojo's Bizarre Adventure: Steel Ball Run

  ¡Y muchos más!`,
  },
  {
    id: 2,
    title: "Evento especial: Día del Cómic",
    excerpt:
      "Participa en nuestro evento anual con descuentos exclusivos y actividades para fans del cómic.",
    content: `El Día del Cómic llega a ComiCommerce con descuentos de hasta el 40% en títulos seleccionados, concursos, sorteos y charlas con autores invitados. ¡No te lo pierdas!
  

  • Descuentos en manga y cómics

  • Charlas y firmas de autores

  • Concurso de cosplay`,
  },
];
