import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useFetch from '../hooks/UseFetch';
import SmartValue from '../components/SmartValue';
import { Loading, ErrorMsg, Button } from '../components/ui/Common';

const ResourceDetail = () => {
  const { resource, id } = useParams();
  const navigate = useNavigate();
  
  // Fetch a la URL específica del recurso
  const { data, loading, error } = useFetch(`https://swapi.dev/api/${resource}/${id}/`);

  if (error) return <ErrorMsg msg={error} />;
  if (loading && !data) return <Loading />;

  // Extraemos el título principal (usualmente 'name' o 'title' en SWAPI)
  const title = data.name || data.title || `Elemento #${id}`;

  // Filtramos llaves técnicas que no queremos mostrar
  const ignoredKeys = ['url', 'created', 'edited', 'homeworld']; 
  // Nota: 'homeworld' se puede dejar, pero a veces es redundante si se trata como link

  return (
    <div className="animate-in slide-in-from-right-4 duration-300">
      <div className="mb-6">
        <Button onClick={() => navigate(-1)} className="mb-4 text-sm bg-gray-200 text-gray-800 hover:bg-gray-300">
          <ArrowLeft size={16} /> Volver
        </Button>
        
        <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-6">
          {title}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        {Object.entries(data).map(([key, value]) => {
          if (ignoredKeys.includes(key)) return null;

          return (
            <div key={key} className="flex flex-col border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                {key.replace(/_/g, ' ')}
              </span>
              <div className="text-gray-700 font-medium break-words">
                {/* Aquí ocurre la magia recursiva de navegación */}
                <SmartValue value={value} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceDetail;