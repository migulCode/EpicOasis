const truncateDescription = (description: string | undefined, maxLength: number = 250): string => {
  if (!description) {
    return "No description available."
  }

  if (description.length <= maxLength) {
    return description
  }

  return description.slice(0, maxLength).trim() + "..."
}

export default truncateDescription