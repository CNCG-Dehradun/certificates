export async function fetchAttendees() {
  const response = await fetch("/TechTalks .json")
  const data = await response.json()
  return data
}

