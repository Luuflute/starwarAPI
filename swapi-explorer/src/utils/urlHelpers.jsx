// Extrae { resource, id } de una URL de SWAPI.
// Ej: "https://swapi.dev/api/people/1/" -> { resource: "people", id: "1" }
export const parseSwapiURL = (url) => {
  if (typeof url !== 'string' || !url.includes('swapi.dev/api/')) return null;
  
  // Filtramos segmentos vacíos
  const parts = url.split('/').filter(Boolean);
  const id = parts[parts.length - 1];
  const resource = parts[parts.length - 2];

  // Verificamos si el ID es numérico para confirmar que es un recurso individual
  return !isNaN(id) ? { resource, id } : null;
};