export function fixEmptyValue(value, defaultValue) {
  if (typeof value === 'undefined') {
    return defaultValue
  }

  return value
}

export function isEmptyValue(value){
  return (typeof value === 'undefined' || value === "")
}

export function getFontColour(editMode) {

  if (editMode) { 
    return "#1565c0"
  }
  else {
    return "black"
  }
}