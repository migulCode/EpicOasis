export function fechaYMD(fecha = new Date()) {
  const año = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, "0")
  const dia = String(fecha.getDate()).padStart(2, "0")
  return `${año}-${mes}-${dia}`
}
