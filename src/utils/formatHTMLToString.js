//! Evitemos el XSS :D

export const htmlToText = (html) => {
  return html.replace(/<[^>]*>/g, "").trim()
}

export const htmlToTextCustom = (html) => {
  const brMarker = "---BR_MARKER_ONLY---" // Marcador temporal para los saltos de línea

  let text = html.replace(/<br\s*\/?>/gi, brMarker) // Reemplazar <br /> por el marcador
  text = text.replace(/<\/p>/gi, brMarker) // Reemplazar </p> por el marcador
  text = htmlToText(text) // Eliminar todas las etiquetas HTML

  text = text.replace(
    new RegExp(brMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
    "\n"
  ) // Reemplazar el marcador "brMarker" por saltos de línea "/n"

  return text
}
