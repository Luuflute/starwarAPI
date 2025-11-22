import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// IMPORTANTE: Agregamos las extensiones .js y .jsx explícitamente para evitar errores de resolución
import useFetch from '../hooks/UseFetch.jsx';
import { parseSwapiURL } from '../utils/urlHelpers.jsx';
import { Loading, ErrorMsg, Button } from '../components/ui/Common.jsx';

const ResourceList = () => {
  const { resource } = useParams();
  const [page, setPage] = useState(1);
  
  const { data, loading, error } = useFetch(`https://swapi.dev/api/${resource}/?page=${page}`);

  // Resetear página si cambiamos de categoría
  useEffect(() => setPage(1), [resource]);

  if (error) return <ErrorMsg msg={error} />;
  if (loading && !data) return <Loading />;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold capitalize text-gray-800">{resource}</h2>
        <span className="text-sm text-gray-500">
          Página {page} de {Math.ceil((data?.count || 0) / 10)}
        </span>
      </div>

      <div className="grid gap-3">
        {data?.results.map((item) => {
          const info = parseSwapiURL(item.url);
          if (!info) return null;

          return (
            <Link
              key={item.url}
              to={`/resource/${resource}/${info.id}`}
              className="block p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800 group-hover:text-blue-600">
                  {item.name || item.title || "Elemento Desconocido"}
                </span>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Paginación simple */}
      <div className="flex justify-center gap-4 pt-4">
        <Button onClick={() => setPage(p => p - 1)} disabled={!data?.previous}>
          <ChevronLeft size={16} /> Anterior
        </Button>
        <Button onClick={() => setPage(p => p + 1)} disabled={!data?.next}>
          Siguiente <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ResourceList;