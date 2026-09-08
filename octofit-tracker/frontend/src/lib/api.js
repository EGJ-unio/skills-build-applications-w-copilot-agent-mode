const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  return []
}

export async function fetchCollection(endpointOrCollection) {
  const endpoint = endpointOrCollection.startsWith('http')
    ? endpointOrCollection
    : `${API_BASE_URL}/${endpointOrCollection}/`
  const response = await fetch(endpoint)
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${collection} (${response.status})`)
  }

  return getItems(await response.json())
}
